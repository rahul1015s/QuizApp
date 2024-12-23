import { useRef } from 'react';

export default function Answers({
    answers,
    answerState,
    selectedAnswer,
    onSelect,
    
}) {
    const shuffledAnswers = useRef();
    if (!shuffledAnswers.current) {
        // Shuffling the answers for the current question
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5); // Simple random shuffling logic
    }

    return (
        <ul className='space-y-4'>
            {/* Map over the shuffled answers and render each as a button */}
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = 'bg-gray-200 text-black'; // Default for unselected answers

                // Apply correct/wrong styles only if the answer is selected
                if (isSelected) {
                    if (answerState === 'correct') {
                        cssClass = 'bg-green-500 text-white'; // Green for correct
                    } else if (answerState === 'wrong') {
                        cssClass = 'bg-red-500 text-white'; // Red for wrong
                    }
                }

                return (
                    <li key={answer}>
                        <button
                                onClick={() => onSelect(answer)}
                                className={`w-full px-6 py-3 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none ${cssClass} button-hover`}
                                disabled={answerState !== ''} // Disable buttons once an answer is selected
                                >
                                {answer}
                        </button>

                    </li>
                );
            })}
        </ul>
    );
}
