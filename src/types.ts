export interface QuizConfig {
  participantName: string;
  numberOfQuestions: number;
  marksPerQuestion: number;
  durationInMinutes: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  participantName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeTaken: number;
}