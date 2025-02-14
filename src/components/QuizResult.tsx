import React from 'react';
import type { QuizResult } from '../types';
import { Trophy, XCircle, CheckCircle, Clock } from 'lucide-react';

interface QuizResultProps {
  result: QuizResult;
  onRestart: () => void;
}

export const QuizResult: React.FC<QuizResultProps> = ({ result, onRestart }) => {
  const percentage = (result.score / (result.totalQuestions * result.correctAnswers)) * 100;

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">Great job, {result.participantName}!</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>Final Score</span>
          </div>
          <span className="font-bold">{result.score} points</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Correct Answers</span>
          </div>
          <span className="font-bold">{result.correctAnswers}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span>Incorrect Answers</span>
          </div>
          <span className="font-bold">{result.incorrectAnswers}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>Time Taken</span>
          </div>
          <span className="font-bold">{Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Start New Quiz
      </button>
    </div>
  );
};