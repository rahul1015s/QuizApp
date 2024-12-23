import { useState } from 'react';
import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../question.js';

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null,
  });

  function handleSelectAnswer(selected) {
    console.log('Selected answer:', selected);

    setAnswer({
      selectedAnswer: selected,
      isCorrect: null,
    });

    setTimeout(() => {
      // Check if the selected answer matches the correct answer
      const isCorrect = QUESTIONS[index].answers[0] === selected;
      console.log('Is correct:', isCorrect);

      setAnswer({
        selectedAnswer: selected,
        isCorrect: isCorrect, // Store correctness
      });

      setTimeout(() => {
        onSelectAnswer(selected); // Call the onSelectAnswer function after delay
      }, 500);
    }, 200);
  }

  let answerState = '';

  // Determine the state of the selected answer
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong'; // Set correct or wrong
    console.log('Answer state:', answerState);
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
    console.log('Answer state:', answerState);
  }

  return (
    <div className="p-8 max-w-lg mx-auto bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-xl">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2 className="text-3xl font-extrabold text-white mb-6">
        {QUESTIONS[index].text}
      </h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
