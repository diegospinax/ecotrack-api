import { CreateLessonDto } from "@/application/dto/course/lesson/CreateLessonDto";
import { UpdateLessonDto } from "@/application/dto/course/lesson/UpdateLessonDto";
import { createLessonFromDto, updateLessonFieldsFromDto } from "@/application/util/lesson-usecase-util";
import { Lesson } from "@/domain/course/lesson/Lesson";
import { LessonRepository } from "@/domain/course/lesson/ports/LessonRepository";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import { CreateLessonUseCase } from "./cases/CreateLessonUseCase";
import { DeleteLessonUseCase } from "./cases/DeleteLessonUseCase";
import { FindLessonUseCase } from "./cases/FindLessonUseCase";
import { UpdateLessonUseCase } from "./cases/UpdateLessonUseCase";
import { UseCaseException } from "@/application/exception/UseCaseException";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";


export class LessonUseCase implements CreateLessonUseCase, FindLessonUseCase, UpdateLessonUseCase, DeleteLessonUseCase {
    constructor(private lessonRepository: LessonRepository) { }

    public async create(lessonDto: CreateLessonDto): Promise<Lesson> {
        if (lessonDto.questions.length < 4)
            throw new UseCaseException("A lesson must have four questions");

        for (let questionDto of lessonDto.questions) {
            if (questionDto.answers.length < 4) 
                throw new UseCaseException("A question must have four answers");
        }

        const lesson = createLessonFromDto(lessonDto);
        return await this.lessonRepository.create(lesson);
    }

    public async findAll(): Promise<Lesson[]> {
        return await this.lessonRepository.findAll();
    }

    public async findById(lessonId: LessonId): Promise<Lesson> {
        const existingLesson = await this.validateExistingLesson(lessonId);
        return existingLesson;
    }

    public async findAllByType(lessonType: LessonType): Promise<Lesson[]> {
        return await this.lessonRepository.findAllByType(lessonType);
    }

    public async update(lessonDto: UpdateLessonDto): Promise<void> {
        const existingLesson = await this.validateExistingLesson(lessonDto.id);

        const lesson: Lesson = updateLessonFieldsFromDto(lessonDto, existingLesson);

        await this.lessonRepository.update(lesson);
    }

    public async delete(lessonId: LessonId): Promise<void> {
        const existingLesson = await this.validateExistingLesson(lessonId);
        await this.lessonRepository.delete(existingLesson.id);
    }

    private async validateExistingLesson(lessonId: LessonId): Promise<Lesson> {
        const existingLesson = await this.lessonRepository.findById(lessonId);

        if (!existingLesson) throw new UseCaseException(`Lesson not found for id: ${lessonId.value}`);

        return existingLesson;
    }
}