import React from 'react';
import { Clock, User, Hash, Award } from 'lucide-react';
import type { QuizConfig } from '../types';

interface QuizFormProps {
  onSubmit: (config: QuizConfig) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({ onSubmit }) => {
  const [config, setConfig] = React.useState<QuizConfig>({
    participantName: '',
    numberOfQuestions: 10,
    marksPerQuestion: 1,
    durationInMinutes: 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="w-4 h-4" />
          Participant Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.participantName}
          onChange={(e) => setConfig({ ...config, participantName: e.target.value })}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Hash className="w-4 h-4" />
          Number of Questions
        </label>
        <input
          type="number"
          required
          min="1"
          max="50"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.numberOfQuestions}
          onChange={(e) => setConfig({ ...config, numberOfQuestions: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Award className="w-4 h-4" />
          Marks per Question
        </label>
        <input
          type="number"
          required
          min="1"
          max="10"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.marksPerQuestion}
          onChange={(e) => setConfig({ ...config, marksPerQuestion: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Clock className="w-4 h-4" />
          Duration (minutes)
        </label>
        <input
          type="number"
          required
          min="5"
          max="180"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={config.durationInMinutes}
          onChange={(e) => setConfig({ ...config, durationInMinutes: parseInt(e.target.value) })}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Start Quiz
      </button>
    </form>
  );
};