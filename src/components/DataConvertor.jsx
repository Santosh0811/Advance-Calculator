import React, { useState } from 'react'

const DataConvertor = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputUnit, setInputUnit] = useState('bit');
    const [outputUnit, setOutputUnit] = useState('byte');

    const units = {
        bit: 1,                      // 1 bit is the base unit
        byte: 8,                     // 1 byte = 8 bits
        kilobit: 1000,               // 1 kilobit = 1000 bits
        kilobyte: 1024,              // 1 kilobyte = 1024 bytes
        megabit: 1000000,            // 1 megabit = 1000 kilobits = 1,000,000 bits
        megabyte: 1048576,           // 1 megabyte = 1024 kilobytes = 1,048,576 bytes
        gigabit: 1000000000,         // 1 gigabit = 1000 megabits = 1,000,000,000 bits
        gigabyte: 1073741824,        // 1 gigabyte = 1024 megabytes = 1,073,741,824 bytes
        terabit: 1000000000000,      // 1 terabit = 1000 gigabits = 1,000,000,000,000 bits
        terabyte: 1125899906842624,  // 1 terabyte = 1024 gigabytes = 1,125,899,906,842,624 bytes
        petabit: 1000000000000000,   // 1 petabit = 1000 terabits = 1,000,000,000,000,000 bits
        petabyte: 1125899906842624000, // 1 petabyte = 1024 terabytes = 1,125,899,906,842,624,000 bytes
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

        // Convert input value to base unit (bit)
        const inputInBits = parseFloat(value) * units[input];

        // Convert from base unit (bit) to the output unit
        const convertedValue = inputInBits / units[output];

        setOutputValue(convertedValue.toFixed(2));
    };
    return (
        <div className='border-2 rounded-lg border-slate-300 mt-2 flex justify-center items-center flex-col p-2'>
            <div className='bg-slate-400 rounded-sm w-full text-center p-1'>
                Data Convertor
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

export default DataConvertor
