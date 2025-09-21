import { Answer } from "@/domain/course/answer/Answer";
import AnswerId from "@/domain/course/answer/value-objects/AnswerId";
import AnswerIsCorrect from "@/domain/course/answer/value-objects/AnswerIsCorrect";
import AnswerText from "@/domain/course/answer/value-objects/AnswerText";
import { Lesson } from "@/domain/course/lesson/Lesson";
import LessonDescription from "@/domain/course/lesson/value-objects/LessonDescription";
import LessonId from "@/domain/course/lesson/value-objects/LessonId";
import LessonIsActive from "@/domain/course/lesson/value-objects/LessonIsActive";
import LessonTitle from "@/domain/course/lesson/value-objects/LessonTitle";
import LessonType from "@/domain/course/lesson/value-objects/LessonType";
import { Question } from "@/domain/course/question/Question";
import QuestionId from "@/domain/course/question/value-objects/QuestionId";
import QuestionText from "@/domain/course/question/value-objects/QuestionText";
import { AnswerEntity } from "@/infrastructure/entities/course/AnswerEntity";
import { LessonEntity } from "@/infrastructure/entities/course/LessonEntity";
import { QuestionEntity } from "@/infrastructure/entities/course/QuestionEntity";

export function mapEntityToLessonDomain(entity: LessonEntity): Lesson {
    return {
        id: new LessonId(entity.id),
        title: new LessonTitle(entity.title),
        description: new LessonDescription(entity.description),
        type: new LessonType(entity.type),
        isActive: new LessonIsActive(entity.isActive),
        questions: entity.questions.map(mapEntityToQuestionDomain)
    }
}

function mapEntityToQuestionDomain(entity: QuestionEntity): Question {
    return {
        id: new QuestionId(entity.id),
        text: new QuestionText(entity.question),
        answers: entity.answers.map(mapEntityToAnswerDomain)
    }
}

function mapEntityToAnswerDomain(entity: AnswerEntity): Answer {
    return {
        id: new AnswerId(entity.id),
        text: new AnswerText(entity.answer),
        isCorrect: new AnswerIsCorrect(entity.isCorrect)
    }
}