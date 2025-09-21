import { CreateCourseDto } from "@/application/dto/course/CreateCourseDto";
import { Course } from "@/domain/course/Course";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import PersonId from "@/domain/person/value-objects/PersonId";
import { CourseRequest } from "@/infrastructure/dto/course/CourseRequest";
import { mapPersonDomainToResponse } from "./person-in-mapper";
import { CourseResponse } from "@/infrastructure/dto/course/CourseResponse";
import { mapLessonDomainToResponse } from "./lesson-in-mapper";

export const mapCourseRequestToCreateDto = (request: CourseRequest): CreateCourseDto => {
    return {
        personId: new PersonId(request.personId),
        lessonId: new LessonId(request.lessonId),
    }
};

export const mapCourseDomainToResponse = (course: Course): CourseResponse => {
    return {
        id: course.id.value,
        person: mapPersonDomainToResponse(course.person),
        lesson: mapLessonDomainToResponse(course.lesson),
        isFinished: course.isFinished.value
    }
};