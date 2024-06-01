import { Course } from './Course'

export class View {
    private _answerInput: HTMLInputElement
    private progressBar: HTMLElement
    private correctSoundAudio: HTMLAudioElement
    private incorrectSoundAudio: HTMLAudioElement
    private learningLogList: HTMLElement
    private learningLogTab: HTMLElement
    private currentCourseName: HTMLElement
    private board: HTMLElement
    private courseTableBody: HTMLElement

    constructor() {
        this._answerInput = document.getElementById('answer') as HTMLInputElement
        this.progressBar = document.getElementById('progress_bar') as HTMLElement
        this.learningLogTab = document.getElementById('log_tab') as HTMLElement
        this.learningLogList = document.getElementById('done_list_group') as HTMLElement
        this.currentCourseName = document.getElementById('current_course_name') as HTMLElement
        this.board = document.getElementById('board') as HTMLElement
        this.courseTableBody = document.getElementById('courseTableBody') as HTMLElement

        this.correctSoundAudio = document.getElementById('correct_sound') as HTMLAudioElement
        this.correctSoundAudio.load()
        this.incorrectSoundAudio = document.getElementById('incorrect_sound') as HTMLAudioElement
        this.incorrectSoundAudio.load()
    }

    get answerInput(): HTMLInputElement {
        return this._answerInput
    }

    addRowInCourseTable(row: HTMLTableRowElement) {
        this.courseTableBody.appendChild(row)
    }

    deleteAllRowsInCourseTable() {
        this.courseTableBody.querySelectorAll('tr').forEach((row) => row.remove())
    }

    setCurrentCourseName(courseName: string): void {
        this.currentCourseName.innerHTML = courseName
    }

    prepareAnswerInput(formula: string, answer: number): void {
        this._answerInput.setAttribute('data-formula', formula)
        this._answerInput.setAttribute('data-answer', answer.toString())
        this._answerInput.value = ''
        this._answerInput.disabled = false
        this._answerInput.focus()
    }

    setEndCourseMsgs(course: Course, durationSec: number, isBestRecord: boolean): void {
        let bestRecordIcon: string = ''
        if (isBestRecord) {
            bestRecordIcon = '<i class="bi bi-award"></i>'
        }
        const durationSecString = durationSec.toFixed(1)
        this.board.innerHTML = `<i class="bi bi-check-circle text-success"></i>&nbsp;全${course.doneProblemCount}問を${durationSecString}秒${bestRecordIcon}で完了`
        this.learningLogList.insertAdjacentHTML('afterbegin', `<li class="list-group-item"><i class="bi bi-check-circle text-success"></i>&nbsp;${course.name}&nbsp;全問完了(${durationSecString}秒${bestRecordIcon})</li>`)
    }

    setFormulaOnBoard(formula: string): void {
        this.board.innerHTML = `${formula}<i class="bi bi-question-square"></i>`
    }

    addEndProblemLog(formula: string, answer: string, durationSec: number) {
        this.learningLogList.insertAdjacentHTML('afterbegin', `<li class="list-group-item"><i class="bi bi-check text-success"></i>&nbsp;${formula}${answer}&nbsp;(${durationSec.toFixed(1)}秒)</li>`)
    }

    addStartCourseLog(courseName: string): void {
        this.learningLogList.insertAdjacentHTML('afterbegin', `<li class="list-group-item"><i class="bi bi-play-circle"></i>&nbsp;${courseName}&nbsp;開始</li>`)
    }

    showLearningLogTab(): void {
        this.learningLogTab.classList.remove('disabled')
        this.learningLogTab.click()
    }

    updateProgressBar(progressPercentageValue: number): void {
        this.progressBar.style.width = `${progressPercentageValue}%`
    }

    playCorrectSound(): void {
        this.correctSoundAudio.play()
    }

    playIncorrectSound(): void {
        this.incorrectSoundAudio.play()
    }
}
