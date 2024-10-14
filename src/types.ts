export type CourseConfig = {
    courseId: string
    courseName: string
    operator: 'addition' | 'subtraction' | 'multiplication'
    item1: { min: number; max: number }
    item2: { min: number; max: number }
}

export type Problem = {
    formula: string
    answer: number
}

export type UserCourseHistory = {
    doneDate: string
    doneCount: number
    bestSec: number
    latestSec: number
}
