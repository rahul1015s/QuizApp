import { useState, useCallback } from 'react';
import QUESTIONS from '../question.js';
import Question from './Question.jsx';

export default function Quiz() {
  const [answerState, setAnswerState] = useState('');
  const [userAnswer, setUserAnswer] = useState([]);

  // Get the active question index based on the user's progress
  const activeQuestionIndex = answerState === '' ? userAnswer.length : userAnswer.length - 1;

  // Check if the quiz is complete by comparing the number of answers with the number of questions
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // If the quiz is complete, show a completion message with results
  if (quizIsComplete) {
    // Calculate the score
    const score = userAnswer.filter(
      (answer, index) => answer === QUESTIONS[index].answers[0]
    ).length;

    return (
      <div className="p-8 max-w-lg mx-auto bg-gradient-to-r from-teal-500 to-blue-400 rounded-xl shadow-xl text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">Quiz Completed!</h2>
        <p className="text-white text-lg">You've completed the quiz! Well done!</p>
        <p className="text-yellow-300 text-xl font-semibold">Your score: {score}/{QUESTIONS.length}</p>
        
        <ul className="text-white mt-6 space-y-4">
          {QUESTIONS.map((question, index) => (
            <li key={question.id} className="bg-white bg-opacity-20 p-4 rounded-lg">
              <p className="font-bold text-yellow-200">{question.text}</p>
              <p>Your answer: <span className="text-red-300">{userAnswer[index] || 'Skipped'}</span></p>
              <p>Correct answer: <span className="text-green-300">{question.answers[0]}</span></p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Display the current question and answers
  return (
    <div className="p-8 max-w-lg mx-auto bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-xl">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
