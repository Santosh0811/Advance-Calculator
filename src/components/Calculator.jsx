import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { evaluate } from 'mathjs';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [pressedButtons, setPressedButtons] = useState({});
    const maxLength = 20;

    const handleMouseDown = (button) => {
        setPressedButtons((prev) => ({ ...prev, [button]: true }));
    };

    const handleMouseUp = (button) => {
        setPressedButtons((prev) => ({ ...prev, [button]: false }));
    };

    const handleMouseLeave = (button) => {
        setPressedButtons((prev) => ({ ...prev, [button]: false }));
    };

    const handleClick = (value) => {
        setInput((prevInput) => {
            if (prevInput.length >= maxLength) {
                return prevInput;
            }

            const operators = ['+', '-', 'x', '/'];
            const displayValue = value === '/' ? '÷' : value;

            // -------------------------
            // OPERATOR
            // -------------------------
            if (operators.includes(value)) {
                // Don't allow operator as first character
                if (prevInput === '') {
                    return prevInput;
                }

                const lastChar = prevInput.slice(-1);

                // If previous character is an operator,
                // replace it instead of adding another one
                if (['+', '-', 'x', '÷'].includes(lastChar)) {
                    return prevInput.slice(0, -1) + displayValue;
                }

                return prevInput + displayValue;
            }

            // -------------------------
            // DECIMAL
            // -------------------------
            if (value === '.') {
                const currentNumber = prevInput.split(/[+\-x÷()]/).pop();

                // Don't allow two decimals in same number
                if (currentNumber.includes('.')) {
                    return prevInput;
                }

                // Start decimal number with 0
                if (
                    prevInput === '' ||
                    ['+', '-', 'x', '÷', '('].includes(prevInput.slice(-1))
                ) {
                    return prevInput + '0.';
                }
            }

            // -------------------------
            // NORMAL VALUE
            // -------------------------
            return prevInput + displayValue;
        });
    };

    const handleEvaluate = () => {
        if (!input.trim()) {
            return;
        }

        // If expression ends with an operator, do nothing
        if (/[+\-x÷]$/.test(input)) {
            return;
        }

        // Don't evaluate if there are consecutive operators
        if (/[+\-x÷]{2,}/.test(input)) {
            return;
        }

        // Don't evaluate invalid decimal numbers
        if (/(^|[+\-x÷])\d*\.\d*\./.test(input)) {
            return;
        }

        try {
            const expression = input
                .replace(/x/g, '*')
                .replace(/÷/g, '/');

            const result = evaluate(expression);

            if (typeof result !== 'number' || !Number.isFinite(result)) {
                return;
            }

            setInput(String(result));
        } catch (error) {
            // Invalid expression -> do nothing
            console.log('Invalid expression:', input);
        }
    };

    const handleClear = () => {
        setInput('');
    };

    const handleDelete = () => {
        setInput((prevInput) => prevInput.slice(0, -1));
    };

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
        }

        if (value === '/') {
            return <i className={`${iconSize} fa-solid fa-divide`} />;
        }

        if (value === '+') {
            return <i className={`${iconSize} fa-solid fa-plus`} />;
        }

        if (value === '-') {
            return <i className={`${iconSize} fa-solid fa-minus`} />;
        }

        if (value === 'equals') {
            return <i className={`${iconSize} fa-solid fa-equals`} />;
        }

        if (value === 'clear') {
            return <i className={`${iconSize} fa-solid fa-c`} />;
        }

        if (value === 'delete') {
            return <i className={`${iconSize} fa-solid fa-delete-left`} />;
        }

        return (
            <div
                className="text-2xl italic"
                dangerouslySetInnerHTML={{
                    __html: katex.renderToString(value),
                }}
            />
        );
    }

    const buttons = [
        '(', ')', 'clear', 'delete',
        '7', '8', '9', 'x',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '.', '0', 'equals', '/'
    ];

    return (
        <div className="border-slate-400 border-2 rounded-2xl p-1.5 bg-slate-950">
            <div className="input-container">
                <input
                    className="border-1 border-slate-300 bg-white calc-1"
                    value={input}
                    disabled
                    maxLength={maxLength}
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
                {buttons.map((value, index) => {
                    const isPressed = pressedButtons[value] || false;

                    return (
                        <button
                            key={index}
                            onMouseDown={() => handleMouseDown(value)}
                            onMouseUp={() => handleMouseUp(value)}
                            onMouseLeave={() => handleMouseLeave(value)}
                            onClick={() => handleClickOrAction(value)}
                            className={`clickable-btn ${isPressed ? 'pressed' : ''
                                } border-2 rounded-full h-16 font-medium font-serif text-3xl w-16 ${getButtonStyle(
                                    value
                                )}`}
                        >
                            {getButtonContent(value)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Calculator;
