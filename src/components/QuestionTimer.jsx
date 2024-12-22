import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log("setTimeout");
        const timer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeout]);

    useEffect(() => {
        console.log("setInterval");
        const interval = setInterval(() => {
            setRemainingTime(prevRemainingTime => prevRemainingTime - 100);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex justify-center mt-4">
            {/* Progress bar wrapper */}
            <div className="w-3/4 h-4 bg-gray-200 rounded-full overflow-hidden flex justify-center">
                {/* Progress bar fill */}
                <div
                    className="h-full bg-yellow-300 rounded-full transition-all duration-100"
                    style={{ width: `${(remainingTime / timeout) * 100}%` }}
                />
            </div>
            {/* Display remaining time */}
            <div className="flex justify-between text-sm text-gray-600 mt-2 w-3/4">
                <span>{Math.ceil(remainingTime / 1000)}s</span>
            </div>
        </div>
    );
}
