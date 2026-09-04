import React, { useState } from 'react'
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Trapezium = () => {
    const [inputBaseValue1, setinputBaseValue1] = useState('');
    const [inputBaseValue2, setinputBaseValue2] = useState('');
    const [inputHeightValue, setinputHeightValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    // Helper function to validate inputs
    const isValidNumber = (value) => {
        return !isNaN(value) && value.trim() !== '';
    };

    const handleInputChangeBase1 = (e) => {
        const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
        setinputBaseValue1(value);
    };

    const handleInputChangeBase2 = (e) => {
        const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
        setinputBaseValue2(value);
    };

    const handleInputChangeHeight = (e) => {
        const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
        setinputHeightValue(value);
    };

    // Calculate area when both length and width are provided and valid
    React.useEffect(() => {
        if (isValidNumber(inputBaseValue1) && isValidNumber(inputBaseValue2) && isValidNumber(inputHeightValue)) {
            const base1 = parseFloat(inputBaseValue1);
            const base2 = parseFloat(inputBaseValue2);
            const height = parseFloat(inputHeightValue);
            const area = ((base1 + base2) / 2) * height;
            setOutputValue(area);
        } else {
            setOutputValue('');
        }
    }, [inputBaseValue1, inputBaseValue2, inputHeightValue]);

    return (
        <div className='flex flex-col gap-10 max-w-[340px] overflow-x-auto'>
            {outputValue ? (
                <div
                    className="text-xl italic"
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString(
                            `\\text{Area of Trapezium} \\approx ${outputValue.toFixed(5).endsWith(".00000")
                                ? outputValue.toFixed(0)
                                : outputValue.toFixed(5).replace(/(\.\d{2,5}?)0+$/, "$1")
                            }^2`
                        ),
                    }}
                />
            ) : (
                <div
                    className="text-2xl italic"
                    dangerouslySetInnerHTML={{
                        __html: katex.renderToString('A = \\frac{(a + b)}{2} \\times h'),
                    }}
                />
            )}

            <div className='flex flex-col gap-2'>
                <div>
                    <span className='text-2xl mr-2 italic'>a</span>Base
                    <input
                        className='ml-7 text-white bg-transparent border-2 border-slate-500 w-36'
                        value={inputBaseValue1}
                        onChange={handleInputChangeBase1}
                        placeholder="Enter value"
                        type="text"
                        inputMode="decimal"
                    />
                </div>
                <div>
                    <span className='text-2xl mr-2 italic'>b</span>Base
                    <input
                        className='ml-7 text-white bg-transparent border-2 border-slate-500 w-36'
                        value={inputBaseValue2}
                        onChange={handleInputChangeBase2}
                        placeholder="Enter value"
                        type="text"
                        inputMode="decimal"
                    />
                </div>
                <div>
                    <span className='text-2xl mr-2 italic'>h</span>Height
                    <input
                        className='ml-4.5 text-white bg-transparent border-2 border-slate-500 w-36'
                        value={inputHeightValue}
                        onChange={handleInputChangeHeight}
                        placeholder="Enter value"
                        type="text"
                        inputMode="decimal"
                    />
                </div>
            </div>

            {outputValue && (
                <div className='flex flex-col'>
                    <span>Solution</span>

                    <div
                        className="text-2xl italic"
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString('A = \\frac{(a + b)}{2} \\times h'),
                        }}
                    />
                    <div
                        className="text-2xl italic"
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(`= \\frac{(${inputBaseValue1} + ${inputBaseValue2})}{2} \\times ${inputHeightValue}`),
                        }}
                        style={{ marginLeft: "30px" }}
                    />
                    <div
                        className="text-2xl italic"
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(`\\approx ${outputValue.toFixed(5).endsWith(".00000")
                                ? outputValue.toFixed(0)
                                : outputValue.toFixed(5).replace(/(\.\d{2,5}?)0+$/, "$1")
                                }^2`),
                        }}
                        style={{ marginLeft: "30px" }}
                    />
                </div>
            )}
        </div>
    );
}

export default Trapezium;
