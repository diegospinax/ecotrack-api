import { Course } from "@/domain/course/Course"
import { CourseId } from "@/domain/course/value-objects/CourseId"
import { CourseEntity } from "@/infrastructure/entities/course/CourseEntity"
import { mapEntityToPersonDomain } from "./person-out-mapper"
import { mapEntityToLessonDomain } from "./lesson-out-mapper"
import { CourseIsFinished } from "@/domain/course/value-objects/CourseIsFinished"


export const mapEntityToCourseDomain = (entity: CourseEntity): Course => {
    return {
        id: new CourseId(entity.id),
        person: mapEntityToPersonDomain(entity.person),
        lesson: mapEntityToLessonDomain(entity.lesson),
        isFinished: new CourseIsFinished(entity.isFinished)
    }
}