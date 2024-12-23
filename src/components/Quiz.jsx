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

  // If the quiz is complete, show a completion message
  if (quizIsComplete) {
    return (
      <div className="p-8 max-w-lg mx-auto bg-gradient-to-r from-teal-500 to-blue-400 rounded-xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-white mb-6">Quiz is Completed!</h2>
        <p className="text-white text-lg">
          You've completed the quiz! Well done!
        </p>
        <p className="text-white text-lg">Your answers: {userAnswer.join(', ')}</p>
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
