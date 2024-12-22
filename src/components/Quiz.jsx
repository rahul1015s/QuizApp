import { useState } from 'react';
import QUESTIONS from '../question.js';

export default function Quiz() {
    const [userAnswer, setUserAnswer] = useState([]);

    const activeQuestionIndex = userAnswer.length;

    function handleAnswer (selectedAnswer) {
        setUserAnswer((prevUserAnswer) => {
            return [...prevUserAnswer, ...selectedAnswer];
        });
    }

    return (
        <div className='p-8 max-w-lg mx-auto bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-xl'>
           
            <h2 className='text-3xl font-extrabold text-white mb-6'>{QUESTIONS[activeQuestionIndex].text}</h2>
            
            <ul className='space-y-4'>
                {/* Mapping over the answers array and rendering each answer as a button */}
                {QUESTIONS[activeQuestionIndex].answers.map((answer) => (
                    <li key={answer}>
                        {/* Button for selecting an answer */}
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