import React, { useState } from 'react'
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Circle = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
        setInputValue(value);
        solution(value);
    };

    const solution = (value = inputValue) => {
        if (value === '') {
            setOutputValue('');
            return;
        }
        const convertedValue = Math.PI.toFixed(5) * value * value;
        setOutputValue(convertedValue);
    };

    return (
        <div className='flex flex-col gap-10 max-w-[340px] overflow-x-auto'>
            {outputValue ? (
                <div
                    className="text-xl italic"
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString(`{\\text{Area of Circle}} ≈ {${outputValue.toFixed(5)}^2}`),
                    }}
                />
            ) : (
                <div
                    className="text-2xl italic"
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString('A = π \\times r^2'),
                    }}
                />
            )}

            <span>
                <span className='text-2xl mr-1.5 italic'>r</span>Radius<input className='ml-10 text-white bg-transparent border-2 border-slate-500 w-36' type="text" inputMode="decimal" value={inputValue} onChange={handleInputChange} placeholder="Enter value" />
            </span>

            {outputValue && (
                <div className='flex flex-col'>
                    <span>Solution</span>
                    <div
                        className="text-2xl italic"
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString('A = π \\times r^2'),
                        }}
                    />
                    <div
                        className="text-2xl italic"
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(`= ${Math.PI.toFixed(5)} \\times ${inputValue}^2`),
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
            )}
        </div>
    )
}

export default Circle
