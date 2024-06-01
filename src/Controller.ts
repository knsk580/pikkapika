import { CourseConfig, UserCourseHistory } from './types'
import { TimeKeeper } from './TimeKeeper'
import { Course } from './Course'
import { StorageHelper } from './StorageHelper'
import { CourseConfigLoader } from './CourseConfigLoader'
import { View } from './View'

export class Controller {
    private courseTimeKeeper: TimeKeeper
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

    initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createCourseTable()
            this.view.answerInput.oninput = this.answerInputCheckEventHandler.bind(this)
        })
    }

    private answerInputCheckEventHandler(): void {
        if (this.currentCourse === null) {
            return
        }
        const inputElem: HTMLInputElement = this.view.answerInput
        if (inputElem.value === inputElem.dataset.answer) {
            this.problemTimeKeeper.end()
            this.view.playCorrectSound()
            this.view.addEndProblemLog(inputElem.dataset.formula!, inputElem.dataset.answer, this.problemTimeKeeper.getDurationSec())
            this.view.updateProgressBar(Math.floor((this.currentCourse.doneProblemCount / this.currentCourse.allProblemCount) * 100))
            this.startNextProblem(this.currentCourse)
        } else {
            const errorBgColorClass = 'bg-danger-subtle'
            if (inputElem.value.length >= inputElem.dataset.answer!.length) {
                if (inputElem.classList.contains(errorBgColorClass) === false) {
                    inputElem.classList.add(errorBgColorClass)
                    this.view.playIncorrectSound()
                }
            } else {
                inputElem.classList.remove(errorBgColorClass)
            }
        }
    }

    private startCourse(config: CourseConfig): Course {
        const course: Course = new Course(config)
        course.initialize()
        this.currentCourse = course

        this.courseTimeKeeper.start()
        this.view.updateProgressBar(0)
        this.view.showLearningLogTab()
        this.view.addStartCourseLog(config.courseName)
        return course
    }

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

    private endCourse(course: Course) {
        this.view.answerInput.value = ''
        this.view.answerInput.disabled = true

        this.view.updateProgressBar(100)
        this.courseTimeKeeper.end()
        const durationSec: number = this.courseTimeKeeper.getDurationSec()

        const uch: UserCourseHistory = this.getUserCourseHistory(course.id)

        // let bestRecordIcon: string = ''
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

    // 日付をログ用の文字列にフォーマットする関数
    private formatDateStringForLog(inputDate: string): string {
        const date = new Date(inputDate)
        // 月は0から始まるため、1を加える
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${month}/${day}`
    }

    private getTodayDateString(): string {
        const today = new Date()
        const year = today.getFullYear()
        const month = ('0' + (today.getMonth() + 1)).slice(-2)
        const day = ('0' + today.getDate()).slice(-2)
        return year + '-' + month + '-' + day
    }
}
