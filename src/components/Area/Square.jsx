import React, { useState } from 'react'
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Square = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        solution(e.target.value);
    };

    const solution = (value = inputValue) => {
        if (value === '') {
            setOutputValue('');
            return;
        }
        const convertedValue = value * value;
        setOutputValue(convertedValue);
    };

    return (
        <div className=''>
            <div className='flex flex-col gap-10'>
                {outputValue ? (
                    <div
                    className="text-xl italic"
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString(`{\\text{Area of Square}} ≈ {${outputValue.toFixed(5)}^2}`),
                    }}
                />
                ) : (
                    <div
                        className="text-2xl italic"
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString('A = a^2'),
                        }}
                    />
                )}


                <span>
                    <span className='text-2xl mr-1.5 italic'>a</span>Side<input className='ml-10 border-2 border-slate-500 w-36' value={inputValue} onChange={handleInputChange} placeholder="Enter value" type='number' style={{ '-webkit-appearance': 'none', '-moz-appearance': 'textfield', color: "white", backgroundColor: "transparent" }} />
                </span>

                {outputValue ? (
                    <div className='flex flex-col'>
                        <span>Solution</span>
                        <div
                            className="text-2xl italic"
                            dangerouslySetInnerHTML={{
                                __html: katex.renderToString('A = a^2'),
                            }}
                        />
                        <div
                            className="text-2xl italic"
                            dangerouslySetInnerHTML={{
                                __html: katex.renderToString(`= ${inputValue}^2`),
                            }}
                            style={{ marginLeft: "30px" }}
                        />
                        <div
                            className="text-2xl italic"
                            dangerouslySetInnerHTML={{
                                __html: katex.renderToString(`≈ {${outputValue.toFixed(5)}^2}`),
                            }}
                            style={{ marginLeft: "30px" }}
                        />
                    </div>
                ) : ""}
            </div>


        </div>
    )
}

export default Square
