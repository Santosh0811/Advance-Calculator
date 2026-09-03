import React, { useState } from 'react'

const Temperature = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputUnit, setInputUnit] = useState('celsius');
    const [outputUnit, setOutputUnit] = useState('fahrenheit');

    const units = {
        celsius: 25,      // Example temperature in Celsius
        fahrenheit: 77,    // Equivalent to 25°C in Fahrenheit
        kelvin: 298.15,    // Equivalent to 25°C in Kelvin
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
        setInputValue(value);
        convertUnits(value);
    };

    const handleInputUnitChange = (e) => {
        setInputUnit(e.target.value);
        convertUnits(inputValue, e.target.value, outputUnit);
    };

    const handleOutputUnitChange = (e) => {
        setOutputUnit(e.target.value);
        convertUnits(inputValue, inputUnit, e.target.value);
    };

    const convertUnits = (value = inputValue, input = inputUnit, output = outputUnit) => {
        if (value === '') {
            setOutputValue('');
            return;
        }

        let inputInCelsius;

        // Convert input value to Celsius
        if (input === 'celsius') {
            inputInCelsius = parseFloat(value);
        } else if (input === 'fahrenheit') {
            inputInCelsius = (parseFloat(value) - 32) * (5 / 9);
        } else if (input === 'kelvin') {
            inputInCelsius = parseFloat(value) - 273.15;
        }

        let convertedValue;

        // Convert from Celsius to the output unit
        if (output === 'celsius') {
            convertedValue = inputInCelsius;
        } else if (output === 'fahrenheit') {
            convertedValue = (inputInCelsius * (9 / 5)) + 32;
        } else if (output === 'kelvin') {
            convertedValue = inputInCelsius + 273.15;
        }

        setOutputValue(convertedValue.toFixed(2));
    };
    return (
        <div className='border-2 rounded-lg border-slate-300 lg:mt-1 mt-2 flex justify-center items-center flex-col p-2'>
            <div className='bg-slate-400 rounded-sm w-full text-center p-1'>
                Temperature Convertor
            </div>
            <div className='mt-2 text-white'>
                <label className='text-sm'>Enter value:</label>
                <div className='flex gap-2'>
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter value"
                        className='border-2 text-white bg-transparent border-slate-500 p-1 rounded'
                        type="text"
                        inputMode="decimal"
                    />
                    <select
                        value={inputUnit}
                        onChange={handleInputUnitChange}
                        className='border-2 border-slate-500 p-1 rounded w-32'
                    >
                        {Object.keys(units).map((unit) => (
                            <option key={unit} value={unit} className='bg-slate-900'>
                                {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <label className='text-sm'>Converted value:</label>
                <div className='flex gap-2'>
                    <input
                        type="text"
                        value={outputValue}
                        placeholder="Converted Value"
                        readOnly
                        className='border-2 border-slate-500 bg-transparent p-1 rounded'
                    />
                    <select
                        value={outputUnit}
                        onChange={handleOutputUnitChange}
                        className='border-2 border-slate-500 p-1 rounded w-32'
                    >
                        {Object.keys(units).map((unit) => (
                            <option key={unit} value={unit} className='bg-slate-900'>
                                {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div >

    )
}

export default Temperature
