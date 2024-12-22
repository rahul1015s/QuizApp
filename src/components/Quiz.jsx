import { useState } from 'react';
import QUESTIONS from '../question.js';

export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);

    // The active question index is based on how many answers the user has given.
    const activeQuestionIndex = userAnswer.length;

    // Check if the quiz is complete by comparing the number of answers with the number of questions
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    // Handle selecting an answer by adding the selected answer to the userAnswer array
    function handleAnswer(selectedAnswer) {
        setUserAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer];
        });
    }

    // Display "Quiz is Completed!" message when the quiz is done
    if (quizIsComplete) {
        return (
            <div className='p-8 max-w-lg mx-auto bg-gradient-to-r from-teal-500 to-blue-400 rounded-xl shadow-xl'>
                <h2 className='text-3xl font-extrabold text-white mb-6'>Quiz is Completed!</h2>
            
            </div>
        );
    }

    
    // Shuffling the answers for the current question
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);  // Simple random shuffling logic


    // Display the current question and answers
    return (
        <div className='p-8 max-w-lg mx-auto bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-xl'>
            <h2 className='text-3xl font-extrabold text-white mb-6'>{QUESTIONS[activeQuestionIndex].text}</h2>
            
            <ul className='space-y-4'>
                {/* Map over the shuffled answers and render each as a button */}
                {shuffledAnswers.map((answer) => (
                    <li key={answer}>
                        <button 
                            onClick={() => handleAnswer(answer)} 
                            className='w-full px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-teal-600 hover:text-white focus:outline-none'>
                            {answer}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
