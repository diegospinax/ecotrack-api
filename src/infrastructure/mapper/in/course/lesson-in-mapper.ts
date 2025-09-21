import { CreateLessonDto } from "@/application/dto/course/lesson/CreateLessonDto";
import { CreateAnswerDto } from "@/application/dto/course/lesson/question/answer/CreateAnswerDto";
import { UpdateAnswerDto } from "@/application/dto/course/lesson/question/answer/UpdateAnswerDto";
import { CreateQuestionDto } from "@/application/dto/course/lesson/question/CreateQuestionDto";
import { UpdateQuestionDto } from "@/application/dto/course/lesson/question/UpdateQuestionDto";
import { UpdateLessonDto } from "@/application/dto/course/lesson/UpdateLessonDto";
import { Answer } from "@/domain/course/answer/Answer";
import AnswerId from "@/domain/course/answer/value-objects/AnswerId";
import AnswerIsCorrect from "@/domain/course/answer/value-objects/AnswerIsCorrect";
import AnswerText from "@/domain/course/answer/value-objects/AnswerText";
import { Lesson } from "@/domain/course/lesson/Lesson";
import LessonDescription from '@/domain/course/lesson/value-objects/LessonDescription';
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonType from '@/domain/course/lesson/value-objects/LessonType';
import { Question } from "@/domain/course/question/Question";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";
import QuestionText from "@/domain/course/question/value-objects/QuestionText";
import { CreateLessonRequest, UpdateLessonRequest } from "@/infrastructure/dto/course/lesson/LessonRequest";
import { LessonResponse } from "@/infrastructure/dto/course/lesson/LessonResponse";
import { CreateAnswerRequest, UpdateAnswerRequest } from "@/infrastructure/dto/course/lesson/question/answer/AnswerRequest";
import { AnswerResponse } from "@/infrastructure/dto/course/lesson/question/answer/AnswerResponse";
import { CreateQuestionRequest, UpdateQuestionRequest } from "@/infrastructure/dto/course/lesson/question/QuestionRequest";
import { QuestionResponse } from "@/infrastructure/dto/course/lesson/question/QuestionResponse";

export const mapLessonDomainToResponse = (lesson: Lesson): LessonResponse => {
    return {
        id: lesson.id.value,
        title: lesson.title.value,
        description: lesson.description.value,
        type: lesson.type.value,
        isActive: lesson.isActive.value,
        questions: lesson.questions.map(mapQuestionDomainToResponse)
    }
};

const mapQuestionDomainToResponse = (question: Question): QuestionResponse => {
    return {
        id: question.id!.value,
        text: question.text.value,
        answers: question.answers.map(mapAnswerDomainToResponse)
    }
}

const mapAnswerDomainToResponse = (answer: Answer): AnswerResponse => {
    return {
        id: answer.id!.value,
        text: answer.text.value,
        isCorrect: answer.isCorrect.value
    }
}

export const mapLessonRequestToCreateDto = (request: CreateLessonRequest): CreateLessonDto => {
    return {
        title: new LessonTitle(request.title),
        description: new LessonDescription(request.description),
        type: new LessonType(request.type),
        questions: request.questions.map(mapQuestionRequestToCreateDto)
    }
}

const mapQuestionRequestToCreateDto = (request: CreateQuestionRequest): CreateQuestionDto => {
    return {
        question: new QuestionText(request.text),
        answers: request.answers.map(mapAnswerRequestToCreateDto)
    }
}

const mapAnswerRequestToCreateDto = (request: CreateAnswerRequest): CreateAnswerDto => {
    return {
        text: new AnswerText(request.text),
        isCorrect: new AnswerIsCorrect(request.isCorrect)
    }
}

export const mapLessonRequestToUpdateDto = (request: UpdateLessonRequest, lessonId: LessonId): UpdateLessonDto => {
    return {
        id: lessonId,
        ...(request.title && { title: new LessonTitle(request.title) }),
        ...(request.description && { description: new LessonDescription(request.description) }),
        ...(request.type && { type: new LessonType(request.type) }),
        ...(request.questions && { questions: request.questions.map(mapQuestionRequestToUpdateDto) })
    }
}

const mapQuestionRequestToUpdateDto = (request: UpdateQuestionRequest): UpdateQuestionDto => {
    return {
        id: new QuestionId(request.id),
        ...(request.text && { text: new QuestionText(request.text) }),
        ...(request.answers && { answers: request.answers.map(mapAnswerRequestToUpdateDto) })
    }
}

const mapAnswerRequestToUpdateDto = (request: UpdateAnswerRequest): UpdateAnswerDto => {
    return {
        id: new AnswerId(request.id),
        ...(request.text && { text: new AnswerText(request.text) }),
        ...(request.isCorrect && { isCorrect: new AnswerIsCorrect(request.isCorrect) })
    }
}
