import { Lesson } from "@/domain/course/lesson/Lesson";
import { CreateLessonDto } from "../dto/course/lesson/CreateLessonDto";
import LessonIsActive from "@/domain/course/lesson/value-objects/LessonIsActive";
import { CreateQuestionDto } from "../dto/course/lesson/question/CreateQuestionDto";
import { Question } from "@/domain/course/question/Questions";
import { CreateAnswerDto } from "../dto/course/lesson/question/answer/CreateAnswerDto";
import { Answer } from "@/domain/course/answer/Answer";
import { UpdateLessonDto } from "../dto/course/lesson/UpdateLessonDto";
import { UpdateQuestionDto } from "../dto/course/lesson/question/UpdateQuestionDto";
import { UseCaseException } from "../exception/UseCaseException";
import { UpdateAnswerDto } from "../dto/course/lesson/question/answer/UpdateAnswerDto";

export const createLessonFromDto = (lessonDto: CreateLessonDto): Omit<Lesson, "id"> => {
    return {
        title: lessonDto.title,
        description: lessonDto.description,
        type: lessonDto.type,
        isActive: new LessonIsActive(true),
        questions: lessonDto.questions.map(createQuestionFromDto)
    }
}

const createQuestionFromDto = (questionDto: CreateQuestionDto): Omit<Question, "id"> => {
    return {
        text: questionDto.question,
        answers: questionDto.answers.map(createAnswerFromDto)
    }
}

const createAnswerFromDto = (answerDto: CreateAnswerDto): Omit<Answer, "id"> => {
    return {
        text: answerDto.text,
        isCorrect: answerDto.isCorrect
    }
}

export const updateLessonFieldsFromDto = (lessonDto: UpdateLessonDto, existingLesson: Lesson): Lesson => {
    return {
        id: existingLesson.id,
        title: lessonDto.title ?? existingLesson.title,
        description: lessonDto.description ?? existingLesson.description,
        type: lessonDto.type ?? existingLesson.type,
        isActive: lessonDto.isActive ?? existingLesson.isActive,
        questions: lessonDto.questions
            ? validateQuestionsUpdate(lessonDto.questions, existingLesson.questions)
            : existingLesson.questions
    }
}

const validateQuestionsUpdate = (questionsDto: UpdateQuestionDto[], existingQuestions: Question[]): Question[] => {
    if (questionsDto.length <= 0) return existingQuestions;

    const updatedQuestions: Question[] = [...existingQuestions];

    for(const questionDto of questionsDto) {
        const index = existingQuestions.findIndex(question => question.id!.value === questionDto.id.value);

        if (index === -1) throw new UseCaseException(`Question not found for id: ${questionDto.id.value}`);

        const existingQuestion: Question = existingQuestions[index]!;

        updatedQuestions[index] = {
            id: existingQuestion.id!,
            text: questionDto.question ?? existingQuestion.text,
            answers: questionDto.answers
                ? validateAnswersUpdate(questionDto.answers, existingQuestion.answers)
                : existingQuestion.answers
        }
    }

    return updatedQuestions;
}

const validateAnswersUpdate = (answersDto: UpdateAnswerDto[], existingAnswers: Answer[]): Answer[] => {
    if (answersDto.length <= 0) return existingAnswers;

    const updatedAnswers: Answer[] = [...existingAnswers];

    for(const answerDto of answersDto) {
        const index = existingAnswers.findIndex(answer => answer.id!.value === answerDto.id.value);

        if (index === -1) throw new UseCaseException(`Answer not found for id: ${answerDto.id.value}`);

        const existingAnswer: Answer = existingAnswers[index]!;

        updatedAnswers[index] = {
            id: existingAnswer.id!,
            text: answerDto.text ?? existingAnswer.text,
            isCorrect: answerDto.isCorrect ?? existingAnswer.isCorrect
        }
    }

    return updatedAnswers;
}