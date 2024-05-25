import { CourseConfig, Problem } from './types'

export class Course {
    private problemList: Problem[] = []
    private config: CourseConfig
    private _allProblemCount: number = 0

    constructor(config: CourseConfig) {
        this.config = config
    }

    get name(): string {
        return this.config.courseName
    }

    get id(): string {
        return this.config.courseId
    }

    get allProblemCount(): number {
        return this._allProblemCount
    }

    get remainingProblemCount(): number {
        return this.problemList.length
    }

    get doneProblemCount(): number {
        return this._allProblemCount - this.problemList.length
    }

    initialize(): void {
        this.buildProblemList()
        this._allProblemCount = this.problemList.length
    }

    private buildProblemList(): void {
        const item1Numbers = this.shuffleArray(this.createNumbersInRange(this.config.item1.min, this.config.item1.max))
        const item2Numbers = this.shuffleArray(this.createNumbersInRange(this.config.item2.min, this.config.item2.max))
        item1Numbers.forEach((num1) => {
            item2Numbers.forEach((num2) => {
                if (this.config.operator === 'addition') {
                    this.addProblem(`${num1} + ${num2} = `, num1 + num2)
                } else if (this.config.operator === 'subtraction') {
                    this.addProblem(`${num2} - ${num1} = `, num2 - num1)
                }
            })
        })
    }

    isEndOfCourse(): boolean {
        return this.problemList.length === 0
    }

    nextProblem(): Problem {
        if (this.isEndOfCourse()) {
            throw new Error("next problem doesn't exist in the course.")
        }
        return this.problemList.pop()!
    }

    private addProblem(formula: string, answer: number) {
        this.problemList.push({
            formula: formula,
            answer: answer,
        })
    }

    // 配列をシャッフルする関数
    private shuffleArray<T>(array: T[]): T[] {
        const shuffledArray: T[] = []
        // 元の配列から要素をランダムに取り出し、新しい配列に追加する
        while (array.length > 0) {
            const randomIndex = Math.floor(Math.random() * array.length)
            shuffledArray.push(array[randomIndex])
            array.splice(randomIndex, 1)
        }
        return shuffledArray
    }

    // 最小値から最大値までの数値の配列を作成する関数
    private createNumbersInRange(min: number, max: number): number[] {
        const numbers: number[] = []
        for (let i = min; i <= max; i++) {
            numbers.push(i)
        }
        return numbers
    }
}
