import { CourseConfig } from './types'

export class CourseConfigLoader {
    constructor() {}
    static createCourseConfigList(): CourseConfig[] {
        return [
            {
                courseId: 'course_add_00',
                courseName: 'たし算&nbsp;0～9',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 0, max: 9 },
            },
            {
                courseId: 'course_add_10',
                courseName: 'たし算&nbsp;10～19',
                operator: 'addition',
                item2: { min: 0, max: 9 },
                item1: { min: 10, max: 19 },
            },
            {
                courseId: 'course_add_20',
                courseName: 'たし算&nbsp;20～29',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 20, max: 29 },
            },
            {
                courseId: 'course_add_30',
                courseName: 'たし算&nbsp;30～39',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 30, max: 39 },
            },
            {
                courseId: 'course_add_40',
                courseName: 'たし算&nbsp;40～49',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 40, max: 49 },
            },
            {
                courseId: 'course_add_50',
                courseName: 'たし算&nbsp;50～59',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 50, max: 59 },
            },
            {
                courseId: 'course_add_60',
                courseName: 'たし算&nbsp;60～69',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 60, max: 69 },
            },
            {
                courseId: 'course_add_70',
                courseName: 'たし算&nbsp;70～79',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 70, max: 79 },
            },
            {
                courseId: 'course_add_80',
                courseName: 'たし算&nbsp;80～89',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 80, max: 89 },
            },
            {
                courseId: 'course_add_90',
                courseName: 'たし算&nbsp;90～99',
                operator: 'addition',
                item1: { min: 0, max: 9 },
                item2: { min: 90, max: 99 },
            },
            {
                courseId: 'course_sub_10',
                courseName: 'ひき算&nbsp;10～19',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 10, max: 19 },
            },
            {
                courseId: 'course_sub_20',
                courseName: 'ひき算&nbsp;20～29',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 20, max: 29 },
            },
            {
                courseId: 'course_sub_30',
                courseName: 'ひき算&nbsp;30～39',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 30, max: 39 },
            },
            {
                courseId: 'course_sub_40',
                courseName: 'ひき算&nbsp;40～49',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 40, max: 49 },
            },
            {
                courseId: 'course_sub_50',
                courseName: 'ひき算&nbsp;50～59',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 50, max: 59 },
            },
            {
                courseId: 'course_sub_60',
                courseName: 'ひき算&nbsp;60～69',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 60, max: 69 },
            },
            {
                courseId: 'course_sub_70',
                courseName: 'ひき算&nbsp;70～79',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 70, max: 79 },
            },
            {
                courseId: 'course_sub_80',
                courseName: 'ひき算&nbsp;80～89',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 80, max: 89 },
            },
            {
                courseId: 'course_sub_90',
                courseName: 'ひき算&nbsp;90～99',
                operator: 'subtraction',
                item1: { min: 0, max: 9 },
                item2: { min: 90, max: 99 },
            },
            {
                courseId: 'course_dev_test',
                courseName: '開発用テスト',
                operator: 'subtraction',
                item1: { min: 0, max: 1 },
                item2: { min: 11, max: 12 },
            },
        ]
    }
}
