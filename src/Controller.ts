import { CourseConfig, UserCourseHistory } from './types'
import { TimeKeeper } from './TimeKeeper'
import { Course } from './Course'
import { StorageHelper } from './StorageHelper'
import { CourseConfigLoader } from './CourseConfigLoader'
import { View } from './View'

export class Controller {
    // コース全体の所要時間計測用
    private courseTimeKeeper: TimeKeeper
    // コース内の各問題の所要時間計測用
    private problemTimeKeeper: TimeKeeper
    private courseConfigList: CourseConfig[] = []
    private storageHelper: StorageHelper
    private currentCourse: Course | null = null
    private view: View

    constructor() {
        this.courseTimeKeeper = new TimeKeeper()
        this.problemTimeKeeper = new TimeKeeper()
        this.storageHelper = new StorageHelper('pika_uch_')
        this.courseConfigList = CourseConfigLoader.createCourseConfigList()
        this.view = new View()
    }

    initialize(): void {
        document.addEventListener('DOMContentLoaded', () => {
            // コース表を再作成する
            this.createCourseTable()
            // 回答入力欄の入力イベントにハンドラーを登録する
            this.view.answerInput.oninput = this.answerInputCheckEventHandler.bind(this)
        })
    }

    /**
     * 回答入力欄の入力イベントハンドラー
     * 入力欄のデータ属性に問題の数式と正解が予めセットされている前提
     */
    private answerInputCheckEventHandler(): void {
        if (this.currentCourse === null) {
            // 通常あり得ないが、進行中のコースが存在しない場合は何もしない
            return
        }
        const inputElem: HTMLInputElement = this.view.answerInput
        // 入力が正解の場合
        if (inputElem.value === inputElem.dataset.answer) {
            this.problemTimeKeeper.end()
            this.view.playCorrectSound()
            this.view.addEndProblemLog(inputElem.dataset.formula!, inputElem.dataset.answer, this.problemTimeKeeper.getDurationSec())
            this.view.updateProgressBar(Math.floor((this.currentCourse.doneProblemCount / this.currentCourse.allProblemCount) * 100))
            this.startNextProblem(this.currentCourse)
            return
        }
        // 回答が間違っていた場合の背景色指定クラス
        const errorBgColorClass = 'bg-danger-subtle'
        // 入力文字数が正解の文字数以上だが不正解ならば、ユーザーに知らせる
        if (inputElem.value.length >= inputElem.dataset.answer!.length) {
            if (inputElem.classList.contains(errorBgColorClass) === false) {
                inputElem.classList.add(errorBgColorClass)
                this.view.playIncorrectSound()
            }
        } else {
            // 回答修正中や入力途中であれば、エラー表示用背景色を解除する
            inputElem.classList.remove(errorBgColorClass)
        }
    }

    /**
     * コースを開始する
     * @param config コース設定
     * @returns 開始したコース
     */
    private startCourse(config: CourseConfig): Course {
        const course: Course = new Course(config)
        course.initialize()
        this.currentCourse = course
        // コースの所要時間計測を開始
        this.courseTimeKeeper.start()
        // プログレスバーを初期化
        this.view.updateProgressBar(0)
        // 学習ログ表示タブをアクティブにして、コース開始のログを追加
        this.view.showLearningLogTab()
        this.view.addStartCourseLog(config.courseName)
        return course
    }

    /**
     * コース内の次の問題へ進む
     * @param course 実施中のコース
     */
    private startNextProblem(course: Course): void {
        if (course.isEndOfCourse()) {
            this.endCourse(course)
            return
        }
        const problem = course.nextProblem()

        this.view.setCurrentCourseName(course.name)
        this.view.setFormulaOnBoard(problem.formula)

        this.view.prepareAnswerInput(problem.formula, problem.answer)
        this.problemTimeKeeper.start()
    }

    /**
     * コース完了時の処理をする
     * @param course 完了したコース
     */
    private endCourse(course: Course) {
        this.view.answerInput.value = ''
        this.view.answerInput.disabled = true

        this.view.updateProgressBar(100)
        this.courseTimeKeeper.end()
        const durationSec: number = this.courseTimeKeeper.getDurationSec()

        const uch: UserCourseHistory = this.getUserCourseHistory(course.id)

        let bestSec: number = uch.bestSec
        let isBestRecord = false
        if (uch.bestSec === 0 || durationSec < uch.bestSec) {
            bestSec = durationSec
            isBestRecord = true
        }

        const latestDoneCount: number = uch.doneCount + 1
        this.setUserCourseHistory(course.id, {
            doneDate: this.getTodayDateString(),
            doneCount: latestDoneCount,
            bestSec: bestSec,
        })

        this.view.setEndCourseMsgs(course, durationSec, isBestRecord)

        this.createCourseTable()
    }

    private createCourseTable() {
        // 既存の問題行を削除
        this.view.deleteAllRowsInCourseTable()

        this.courseConfigList.forEach((config) => {
            const uch: UserCourseHistory = this.getUserCourseHistory(config.courseId)
            let courseDoneDate: string = '-'
            if (uch.doneDate !== '') {
                courseDoneDate = this.formatDateStringForLog(uch.doneDate)
            }
            let courseBestSec: string = '-'
            if (uch.bestSec > 0) {
                courseBestSec = `${uch.bestSec}秒`
            }
            let courseDoneIcon: string = '<i class="bi bi-play"></i>'
            if (uch.doneCount > 9) {
                courseDoneIcon = '<i class="bi bi-patch-check-fill text-success"></i>'
            } else if (uch.doneCount > 4) {
                courseDoneIcon = '<i class="bi bi-patch-check text-success"></i>'
            } else if (uch.doneCount > 2) {
                courseDoneIcon = '<i class="bi bi-patch-check"></i>'
            } else if (uch.doneCount > 1) {
                courseDoneIcon = '<i class="bi bi-check-all"></i>'
            } else if (uch.doneCount > 0) {
                courseDoneIcon = '<i class="bi bi-check"></i>'
            }
            // 新しい行を作成
            const courseTableRow: HTMLTableRowElement = document.createElement('tr')
            courseTableRow.innerHTML = `<td>${courseDoneIcon}&nbsp;${config.courseName}</td><td>${courseDoneDate}</td><td>${courseBestSec}</td>`
            courseTableRow.addEventListener('click', () => {
                const course: Course = this.startCourse(config)
                this.startNextProblem(course)
            })
            this.view.addRowInCourseTable(courseTableRow)
        })
    }

    private setUserCourseHistory(courseId: string, uch: UserCourseHistory) {
        return this.storageHelper.set(courseId, uch)
    }

    private getUserCourseHistory(courseId: string): UserCourseHistory {
        const uch: UserCourseHistory = this.storageHelper.get(courseId)!
        if (uch !== null) {
            return uch
        }
        return {
            doneDate: '',
            doneCount: 0,
            bestSec: 0,
        }
    }

    /**
     * 日付をログ表示用にフォーマットする
     * @param inputDate 日付文字列
     * @returns 日付文字列
     */
    private formatDateStringForLog(inputDate: string): string {
        const date = new Date(inputDate)
        // 月は0から始まるため、1を加える
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${month}/${day}`
    }

    /**
     * 今日の日付文字列をyyyy-mm-dd形式で取得する
     * @returns 日付文字列
     */
    private getTodayDateString(): string {
        const today = new Date()
        const year = today.getFullYear()
        const month = ('0' + (today.getMonth() + 1)).slice(-2)
        const day = ('0' + today.getDate()).slice(-2)
        return year + '-' + month + '-' + day
    }
}
