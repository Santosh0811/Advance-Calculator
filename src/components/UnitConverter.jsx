import React, { useState } from 'react'

const UnitConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');
    const [inputUnit, setInputUnit] = useState('meters');
    const [outputUnit, setOutputUnit] = useState('kilometers');

    const units = {
        meters: 1,
        kilometers: 1000,
        miles: 1609.34,        // 1 mile = 1609.34 meters
        feet: 0.3048,         // 1 foot = 0.3048 meters
        millimeters: 0.001,   // 1 millimeter = 0.001 meters
        centimeters: 0.01,    // 1 centimeter = 0.01 meters
        inches: 0.0254,       // 1 inch = 0.0254 meters
        micrometer: 1e-6,     // 1 micrometer = 1e-6 meters (0.000001 meters)
        nanometer: 1e-9,      // 1 nanometer = 1e-9 meters (0.000000001 meters)
        yard: 0.9144,         // 1 yard = 0.9144 meters
        'nautical mile': 1852 // 1 nautical mile = 1852 meters
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        convertUnits(e.target.value);
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

        const inputInMeters = value * units[input];
        const convertedValue = inputInMeters / units[output];
        setOutputValue(convertedValue.toFixed(4));
    };
    return (
        <div className='border-2 rounded-lg border-slate-300 mt-2 flex justify-center items-center flex-col p-2'>
            <div className='bg-slate-400 rounded-sm w-full text-center p-1'>
                Length Convertor
            </div>
            <div className='mt-2 text-white'>
                <label className='text-sm'>Enter value:</label>
                <div className='flex gap-2'>
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter value"
                        className='border-2 border-slate-500 p-1 rounded'
                        type='number'
                        style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'textfield',
                            color: "white",
                            backgroundColor: "transparent"
                        }}
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

export default UnitConverter
