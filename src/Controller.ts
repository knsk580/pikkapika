import { CourseConfig, UserCourseHistory } from './types'
import { TimeKeeper } from './TimeKeeper'
import { Course } from './Course'
import { StorageHelper } from './StorageHelper'
import { CourseConfigLoader } from './CourseConfigLoader'

export class Controller {
    private courseTimeKeeper: TimeKeeper
    private problemTimeKeeper: TimeKeeper
    private courseConfigList: CourseConfig[] = []
    private correctSoundAudio: HTMLAudioElement
    private incorrectSoundAudio: HTMLAudioElement
    private storageHelper: StorageHelper

    constructor() {
        this.courseTimeKeeper = new TimeKeeper()
        this.problemTimeKeeper = new TimeKeeper()
        this.correctSoundAudio = document.getElementById('correct_sound') as HTMLAudioElement
        this.incorrectSoundAudio = document.getElementById('incorrect_sound') as HTMLAudioElement
        this.storageHelper = new StorageHelper('pika_uch_')
        this.courseConfigList = CourseConfigLoader.createCourseConfigList()
    }

    initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createCourseTable()
        })
    }

    private startCourse(config: CourseConfig): Course {
        const course: Course = new Course(config)
        course.initialize()
        this.courseTimeKeeper.start()
        document.getElementById('progress_bar')!.style.width = '0%'

        const logTab: HTMLElement = document.getElementById('log_tab') as HTMLElement
        logTab.classList.remove('disabled')
        logTab.click()
        document.getElementById('done_list_group')!.insertAdjacentHTML('afterbegin', `<li class="list-group-item"><i class="bi bi-play-circle"></i>&nbsp;${config.courseName}&nbsp;開始</li>`)
        return course
    }

    private startNextProblem(course: Course): void {
        if (course.isEndOfCourse()) {
            this.endCourse(course)
            return
        }
        const problem = course.nextProblem()

        document.getElementById('current_course_name')!.innerText = course.name
        document.getElementById('calculation')!.innerHTML = `${problem.formula}<i class="bi bi-question-square"></i>`
        this.problemTimeKeeper.start()

        const answerInput = document.getElementById('answer') as HTMLInputElement
        //TODO data属性の中だけを変更し、removeとaddを繰り返さない
        const keyupHandler = () => {
            if (answerInput.value === problem.answer.toString()) {
                this.problemTimeKeeper.end()
                const durationSecondsString: string = this.problemTimeKeeper.getDurationSec().toFixed(1)
                console.log(`correct: ${problem.answer}`)
                this.correctSoundAudio.play()
                document.getElementById('done_list_group')!.insertAdjacentHTML('afterbegin', `<li class="list-group-item"><i class="bi bi-check text-success"></i>&nbsp;${problem.formula}${problem.answer}&nbsp;(${durationSecondsString}秒)</li>`)
                const progress: number = Math.floor((course.doneProblemCount / course.allProblemCount) * 100)
                document.getElementById('progress_bar')!.style.width = `${progress}%`
                this.startNextProblem(course)
            } else {
                const errorBgColorClass = 'bg-danger-subtle'
                if (answerInput.value.length >= problem.answer.toString().length) {
                    console.log(`incorrect: ${problem.answer}`)
                    if (answerInput.classList.contains(errorBgColorClass) === false) {
                        answerInput.classList.add(errorBgColorClass)
                        this.incorrectSoundAudio.play()
                    }
                } else {
                    answerInput.classList.remove(errorBgColorClass)
                }
            }
        }

        answerInput.removeEventListener('keyup', keyupHandler)
        answerInput.addEventListener('keyup', keyupHandler)
        answerInput.value = ''
        answerInput.disabled = false
        answerInput.focus()
    }

    private endCourse(course: Course) {
        const answerInput = document.getElementById('answer') as HTMLInputElement
        answerInput.value = ''
        answerInput.disabled = true

        document.getElementById('progress_bar')!.style.width = '100%'
        this.courseTimeKeeper.end()
        const durationSeconds: number = this.courseTimeKeeper.getDurationSec()

        const uch: UserCourseHistory = this.getUserCourseHistory(course.id)

        let bestRecordIcon: string = ''
        let bestSec: number = uch.bestSec
        if (uch.bestSec === 0 || durationSeconds < uch.bestSec) {
            bestSec = durationSeconds
            bestRecordIcon = '<i class="bi bi-award"></i>'
        }

        const latestDoneCount: number = uch.doneCount + 1
        this.setUserCourseHistory(course.id, {
            doneDate: this.getTodayDateString(),
            doneCount: latestDoneCount,
            bestSec: bestSec,
        })

        const durationSecondsString: string = durationSeconds.toFixed(1)
        document.getElementById('calculation')!.innerHTML = `<i class="bi bi-check-circle text-success"></i>&nbsp;全${course.doneProblemCount}問を${durationSecondsString}秒${bestRecordIcon}で完了`
        document.getElementById('done_list_group')!.insertAdjacentHTML('afterbegin', `<li class="list-group-item"><i class="bi bi-check-circle text-success"></i>&nbsp;${course.name}&nbsp;全問完了(${durationSecondsString}秒${bestRecordIcon})</li>`)

        this.createCourseTable()
    }

    private createCourseTable() {
        // 既存の問題行を削除
        document.querySelectorAll('tr.problem_row').forEach((row) => row.remove())

        const courseTableBody: HTMLElement = document.getElementById('courseTableBody') as HTMLElement
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
            courseTableRow.id = config.courseId
            courseTableRow.classList.add('problem_row')
            courseTableRow.innerHTML = `<td>${courseDoneIcon}&nbsp;${config.courseName}</td><td>${courseDoneDate}</td><td>${courseBestSec}</td>`
            courseTableRow.addEventListener('click', () => {
                const course: Course = this.startCourse(config)
                this.startNextProblem(course)
            })
            courseTableBody.appendChild(courseTableRow)
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
