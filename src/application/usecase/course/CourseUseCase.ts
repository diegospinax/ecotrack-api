import { CourseRepository } from "@/domain/course/ports/CourseRepository";
import { CreateCourseUseCase } from "./cases/CreateCourseUseCase";
import { FindCourseUseCase } from "./cases/FindCourseUseCase";
import { UpdateCourseUseCase } from "./cases/UpdateCourseUseCase";
import { CourseId } from "@/domain/course/value-objects/CourseId";
import { Course } from "@/domain/course/Course";
import PersonId from "@/domain/person/value-objects/PersonId";
import { PersonRepository } from "@/domain/person/ports/PersonRepository";
import { LessonRepository } from "@/domain/course/lesson/ports/LessonRepository";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import { Lesson } from "@/domain/course/lesson/Lesson";
import { UseCaseException } from "@/application/exception/UseCaseException";
import { Person } from "@/domain/person/Person";
import { CreateCourseDto } from "@/application/dto/course/CreateCourseDto";
import { CourseIsFinished } from "@/domain/course/value-objects/CourseIsFinished";

export class CourseUseCase implements CreateCourseUseCase, FindCourseUseCase, UpdateCourseUseCase {
    constructor(
        private courseRepository: CourseRepository,
        private personRepository: PersonRepository,
        private lessonRepository: LessonRepository
    ) { }

    public async create(courseDto: CreateCourseDto): Promise<Course> {
        const existingPerson = await this.validateExistingPerson(courseDto.personId);
        const existingLesson = await this.validateExistingLesson(courseDto.lessonId);
        
        const existingCourse = await this.courseRepository.findByPersonIdAndLessonId(courseDto.personId, courseDto.lessonId);

        if (existingCourse)
            throw new UseCaseException("Person already registered in lesson.");


        const course: Omit<Course, "id"> = {
            lesson: existingLesson,
            person: existingPerson,
            isFinished: new CourseIsFinished(false)
        }

        return await this.courseRepository.create(course);
    }

    public async findAll(): Promise<Course[]> {
        return await this.courseRepository.findAll();
    }

    public async findAllByPersonId(personId: PersonId): Promise<Course[]> {
        const existingPerson = await this.validateExistingPerson(personId);

        return await this.courseRepository.findAllByPersonId(existingPerson.id);
    }

    public async findAllByLessonId(lessonId: LessonId): Promise<Course[]> {
        const existingLesson = await this.validateExistingLesson(lessonId);

        return await this.courseRepository.findAllByLessonId(existingLesson.id);
    }

    public async updateStateToFinished(courseId: CourseId): Promise<void> {
        const existingCourse = await this.courseRepository.findById(courseId);

        if (!existingCourse) throw new UseCaseException(`Course not found for id: ${courseId.value}`);
        if (existingCourse.isFinished.value) 
            throw new UseCaseException("Course already finished.");

        await this.courseRepository.updateStateToFinished(courseId);
    }

    private async validateExistingLesson(lessonId: LessonId): Promise<Lesson> {
        const existingLesson = await this.lessonRepository.findById(lessonId);

        if(!existingLesson) throw new UseCaseException(`Lesson not found for id: ${lessonId.value}`)

        return existingLesson;
    }

    private async validateExistingPerson(personId: PersonId): Promise<Person> {
        const existingPerson = await this.personRepository.findById(personId);

        if(!existingPerson) throw new UseCaseException(`Person not found for id: ${personId.value}`);

        return existingPerson;
    }

}