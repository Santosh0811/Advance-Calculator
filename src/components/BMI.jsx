import React, { useState, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const BMI = () => {
    const [inputWeightValue, setinputWeightValue] = useState('');
    const [inputHeightValue, setinputHeightValue] = useState('');
    const [category, setCategory] = useState("");
    const [outputValue, setOutputValue] = useState('');
    const [isVisible, setisVisible] = useState("");

    const handleBMIChart = () => {
        setisVisible(!isVisible);
    }

    const isValidNumber = (value) => {
        return !isNaN(value) && value.trim() !== '';
    };

    const handleInputChangeWeight = (e) => {
        const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
        setinputWeightValue(value);
    };

    const handleInputChangeHeight = (e) => {
        const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
        setinputHeightValue(value);
    };

    useEffect(() => {
        if (isValidNumber(inputWeightValue) && isValidNumber(inputHeightValue)) {
            const bmi = inputWeightValue / (inputHeightValue * inputHeightValue);
            setOutputValue(bmi);

            if (bmi < 18.5) {
                setCategory("Under Weight");
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                setCategory("Normal Weight");
            } else if (bmi >= 25 && bmi <= 29.9) {
                setCategory("Over Weight");
            } else if (bmi >= 30 && bmi <= 34.9) {
                setCategory("Obesity (Class 1)");
            } else if (bmi >= 35 && bmi <= 39.9) {
                setCategory("Obesity (Class 2)");
            } else {
                setCategory("Obesity (Class 3)");
            }
        } else {
            setOutputValue('');
            setCategory('');
        }
    }, [inputWeightValue, inputHeightValue]);


    return (
        <div className='border-2 border-slate-300 rounded-lg mt-2 flex justify-center items-center flex-col p-2'>
            <div className='bg-slate-400 rounded-sm w-full text-center p-1'>
                BMI Calculator
            </div>

            <div className='mt-2 text-white max-w-[300px] overflow-x-auto'>
                <div className='flex flex-col gap-3'>
                    {outputValue ? (
                        <span className='italic'>BMI ≈ {outputValue.toFixed(5)} is <span className='font-bold'>{category}</span></span>
                    ) : (
                        <div
                            className="italic"
                            dangerouslySetInnerHTML={{
                                __html: katex.renderToString('BMI = \\frac {\\text{weight (kg)}} {\\text{meter (m)}^2}'),
                            }}
                        />
                    )}

                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-10'>
                            <span className='italic'>kg Weight</span>
                            <input
                                className='border-2 text-white bg-transparent border-slate-500 p-1 w-36 rounded'
                                value={inputWeightValue}
                                onChange={handleInputChangeWeight}
                                placeholder="Enter in Kgs"
                                type="text"
                                inputMode="decimal"
                            />
                        </div>
                        <div className='flex gap-11.5'>
                            <span className='italic'>m Height</span>
                            <input
                                className='border-2 text-white bg-transparent border-slate-500 p-1 w-36 rounded'
                                value={inputHeightValue}
                                onChange={handleInputChangeHeight}
                                placeholder="Enter in Mts"
                                type="text"
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    {outputValue && (
                        <div>
                            <span className='text-sm'>Solution</span>
                            <div className='flex flex-col gap-2 text-xl'>
                                <div
                                    className="italic"
                                    dangerouslySetInnerHTML={{
                                        __html: katex.renderToString('BMI = \\frac {\\text{weight (kg)}} {\\text{meter (m)}^2}'),
                                    }}
                                />
                                <div
                                    className="italic"
                                    dangerouslySetInnerHTML={{
                                        __html: katex.renderToString(`= \\frac {${inputWeightValue}} {${inputHeightValue}^2}`),
                                    }}
                                    style={{ marginLeft: "63px" }}
                                />
                                <div
                                    className="italic"
                                    dangerouslySetInnerHTML={{
                                        __html: katex.renderToString(`≈ ${outputValue.toFixed(5)}`),
                                    }}
                                    style={{ marginLeft: "63px" }}
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <button data-popover-target="popover-default" type="button" className="w-full mt-2 text-white bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center laptop">BMI Chart</button>

            <button className="w-full mt-2 text-white bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mobile" onClick={handleBMIChart}>BMI Chart</button>

            <div data-popover id="popover-default" role="tooltip" className="absolute z-10 invisible inline-block w-80 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                    <h3 className="font-semibold text-white text-center">BMI Chart</h3>
                </div>
                <div className="px-3 py-2">
                    <table className='min-w-full text-center table-auto bg-transparent border-2 border-gray-200 shadow-md'>
                        <thead className='bg-slate-400 text-black'>
                            <tr>
                                <th className='px-6 py-3 font-bold text-md border-r-2 border-gray-300'>BMI Range</th>
                                <th className='px-6 py-3 font-bold text-md'>Category</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            <tr>
                                <td className='px-6 py-3 text-sm border-r-2 border-gray-300'>Below 18.5</td>
                                <td className='px-6 py-3 text-sm'>Under Weight</td>
                            </tr>
                            <tr>
                                <td className='px-6 py-3 text-sm border-r-2 border-gray-300'>18.5 - 24.9</td>
                                <td className='px-6 py-3 text-sm'>Normal Weight</td>
                            </tr>
                            <tr>
                                <td className='px-6 py-3 text-sm border-r-2 border-gray-300'>25 - 29.9</td>
                                <td className='px-6 py-3 text-sm'>Over Weight</td>
                            </tr>
                            <tr>
                                <td className='px-6 py-3 text-sm border-r-2 border-gray-300'>30 - 34.9</td>
                                <td className='px-6 py-3 text-sm'>Obesity (Class 1)</td>
                            </tr>
                            <tr>
                                <td className='px-6 py-3 text-sm border-r-2 border-gray-300'>35 - 39.9</td>
                                <td className='px-6 py-3 text-sm'>Obesity (Class 2)</td>
                            </tr>
                            <tr>
                                <td className='px-6 py-3 text-sm border-r-2 border-gray-300'>40 and above</td>
                                <td className='px-6 py-3 text-sm'>Obesity (Class 3)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div data-popper-arrow></div>
            </div>

            {isVisible && <table className='min-w-full mt-2 text-center table-auto bg-transparent border-2 border-gray-200 shadow-md'>
                <thead className='bg-slate-400 text-black'>
                    <tr>
                        <th className='px-4 py-3 font-bold text-md border-r-2 border-gray-300'>BMI Range</th>
                        <th className='px-4 py-3 font-bold text-md'>Category</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 text-white'>
                    <tr>
                        <td className='px-4 py-3 text-sm border-r-2 border-gray-300'>Below 18.5</td>
                        <td className='px-4 py-3 text-sm'>Under Weight</td>
                    </tr>
                    <tr>
                        <td className='px-4 py-3 text-sm border-r-2 border-gray-300'>18.5 - 24.9</td>
                        <td className='px-4 py-3 text-sm'>Normal Weight</td>
                    </tr>
                    <tr>
                        <td className='px-4 py-3 text-sm border-r-2 border-gray-300'>25 - 29.9</td>
                        <td className='px-4 py-3 text-sm'>Over Weight</td>
                    </tr>
                    <tr>
                        <td className='px-4 py-3 text-sm border-r-2 border-gray-300'>30 - 34.9</td>
                        <td className='px-4 py-3 text-sm'>Obesity (Class 1)</td>
                    </tr>
                    <tr>
                        <td className='px-4 py-3 text-sm border-r-2 border-gray-300'>35 - 39.9</td>
                        <td className='px-4 py-3 text-sm'>Obesity (Class 2)</td>
                    </tr>
                    <tr>
                        <td className='px-4 py-3 text-sm border-r-2 border-gray-300'>40 and above</td>
                        <td className='px-4 py-3 text-sm'>Obesity (Class 3)</td>
                    </tr>
                </tbody>
            </table>}
        </div>
    );
};

export default BMI;
