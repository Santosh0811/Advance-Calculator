import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { evaluate } from 'mathjs';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [pressedButtons, setPressedButtons] = useState({});
    const maxLength = 20; // Define the maximum length of input (for example, 15 characters)

    const handleMouseDown = (button) => setPressedButtons((prev) => ({ ...prev, [button]: true }));
    const handleMouseUp = (button) => setPressedButtons((prev) => ({ ...prev, [button]: false }));
    const handleMouseLeave = (button) => setPressedButtons((prev) => ({ ...prev, [button]: false }));

    const handleClick = (value) => {
        // If the input is less than the max length, append the value
        if (input.length < maxLength) {
            if (value === '/') {
                setInput((prevInput) => prevInput + '÷');
            } else {
                setInput((prevInput) => prevInput + value);
            }
        }
    };

    const handleEvaluate = () => {
        try {
            const expression = input.replace(/x/g, '*').replace(/÷/g, '/');
            const result = evaluate(expression).toString();
            setInput(result.replace(/\*/g, 'x').replace(/\//g, '÷'));
        } catch (e) {
            setInput('Error');
        }
    };

    const handleClear = () => setInput('');
    const handleDelete = () => setInput((prevInput) => prevInput.slice(0, -1));

    return (
        <div className="border-slate-400 border-2 rounded-2xl p-1.5 bg-slate-950">
            <div className="input-container">
                <input
                    className="border-1 border-slate-300 bg-white calc-1"
                    value={input}
                    disabled
                    maxLength={maxLength} // Set the max length on the input field
                />
                <span className="input-blink"></span>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '10px',
                    placeItems: 'center',
                }}
            >
                {['(', ')', 'clear', 'delete', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', 'equals', '/'].map(
                    (value, index) => {
                        const isPressed = pressedButtons[value] || false;
                        return (
                            <button
                                key={index}
                                onMouseDown={() => handleMouseDown(value)}
                                onMouseUp={() => handleMouseUp(value)}
                                onMouseLeave={() => handleMouseLeave(value)}
                                className={`clickable-btn ${isPressed ? 'pressed' : ''} border-2 rounded-full h-16 font-medium font-serif text-3xl w-16 ${getButtonStyle(
                                    value
                                )}`}
                                onClick={() => handleClickOrAction(value)}
                            >
                                {getButtonContent(value)}
                            </button>
                        );
                    }
                )}
            </div>
        </div>
    );

    function handleClickOrAction(value) {
        if (value === 'clear') {
            handleClear();
        } else if (value === 'delete') {
            handleDelete();
        } else if (value === 'equals') {
            handleEvaluate();
        } else {
            handleClick(value);
        }
    }

    function getButtonStyle(value) {
        switch (value) {
            case 'clear':
                return 'bg-red-500 hover:bg-red-400';
            case 'delete':
                return 'bg-yellow-500 hover:bg-yellow-400';
            case 'equals':
                return 'bg-slate-500 hover:bg-slate-400';
            default:
                return 'bg-slate-300 hover:bg-slate-600';
        }
    }

    function getButtonContent(value) {
        const iconSize = 'text-2xl';
        if (value === 'x') {
            return <i className={`${iconSize} fa-solid fa-xmark`} />;
        } else if (value === '/') {
            return <i className={`${iconSize} fa-solid fa-divide`} />;
        } else if (value === '+') {
            return <i className={`${iconSize} fa-solid fa-plus`} />;
        } else if (value === '-') {
            return <i className={`${iconSize} fa-solid fa-minus`} />;
        } else if (value === 'equals') {
            return <i className={`${iconSize} fa-solid fa-equals`} />;
        } else if (value === 'clear') {
            return <i className={`${iconSize} fa-solid fa-c`} />;
        } else if (value === 'delete') {
            return <i className={`${iconSize} fa-solid fa-delete-left`} />;
        } else {
            return <div className="text-2xl italic" dangerouslySetInnerHTML={{ __html: katex.renderToString(value) }} />;
        }
    }
};

export default Calculator;
