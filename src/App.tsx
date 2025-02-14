import React, { useState } from 'react';
import { Brain, Key, Download } from 'lucide-react';
import { PDFUploader } from './components/PDFUploader';
import { QuizForm } from './components/QuizForm';
import { Quiz } from './components/Quiz';
import { QuizResult } from './components/QuizResult';
import type { QuizConfig, Question, QuizResult as QuizResultType } from './types';
import OpenAI from 'openai';
import { jsPDF } from 'jspdf'; // ✅ Corrected import

let openai: OpenAI | null = null;

function App() {
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }
    try {
      openai = new OpenAI({
        apiKey: apiKey.trim(),
        dangerouslyAllowBrowser: true
      });
      setIsApiKeySet(true);
      setError(null);
    } catch (error) {
      setError('Invalid API key format');
      console.error(error);
    }
  };

  const handlePDFUpload = (content: string) => {
    setPdfContent(content);
    setError(null);
  };

  const handleQuizStart = async (config: QuizConfig) => {
    if (!pdfContent) return;
    setLoading(true);
    setError(null);
    try {
      const generatedQuestions = await generateQuestions(pdfContent, config.numberOfQuestions);
      setQuestions(generatedQuestions);
      setQuizConfig(config);
      setStartTime(Date.now());
    } catch (error) {
      setError('Failed to generate quiz questions. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (answers: number[]) => {
    if (!questions || !quizConfig || !startTime) return;
    const correctAnswers = answers.reduce((acc, answer, index) => 
      answer === questions[index].correctAnswer ? acc + 1 : acc, 0);
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setResult({
      participantName: quizConfig.participantName,
      score: correctAnswers * quizConfig.marksPerQuestion,
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers: questions.length - correctAnswers,
      timeTaken
    });
  };

  const handleRestart = () => {
    setPdfContent(null);
    setQuizConfig(null);
    setQuestions(null);
    setResult(null);
    setStartTime(null);
    setError(null);
  };

  const downloadResultAsPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.text('Quiz Result', 10, 10);
    doc.text(`Participant: ${result.participantName}`, 10, 20);
    doc.text(`Score: ${result.score}`, 10, 30);
    doc.text(`Total Questions: ${result.totalQuestions}`, 10, 40);
    doc.text(`Correct Answers: ${result.correctAnswers}`, 10, 50);
    doc.text(`Incorrect Answers: ${result.incorrectAnswers}`, 10, 60);
    doc.text(`Time Taken: ${result.timeTaken} seconds`, 10, 70);
    doc.save('quiz_result.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">PDF Quiz Generator</h1>
          </div>
          <p className="text-gray-600">Upload a PDF and test your knowledge with AI-generated questions</p>
        </header>

        <main className="flex flex-col items-center justify-center gap-8">
          {error && <div className="w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
          {!pdfContent && <PDFUploader onPDFUpload={handlePDFUpload} />}
          {pdfContent && !quizConfig && (
            loading ? <p>Generating quiz questions...</p> : <QuizForm onSubmit={handleQuizStart} />
          )}
          {questions && quizConfig && !result && <Quiz questions={questions} duration={quizConfig.durationInMinutes} onComplete={handleQuizComplete} />}
          {result && (
            <>
              <QuizResult result={result} onRestart={handleRestart} />
              <button onClick={downloadResultAsPDF} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2">
                <Download className="w-5 h-5" /> Download Result
              </button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
