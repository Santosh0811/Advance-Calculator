import React, { useState } from 'react';

const WeightConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('grams');
  const [outputUnit, setOutputUnit] = useState('kilograms');

  const units = {
    grams: 1,
    kilograms: 1000,
    pounds: 453.59237,
    ounces: 28.3495,
    tonne: 1_000_000,        // 1 tonne = 1,000,000 grams
    milligram: 0.001,        // 1 milligram = 0.001 grams
    microgram: 0.000001,     // 1 microgram = 0.000001 grams
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

    const inputInGrams = value * units[input];
    const convertedValue = inputInGrams / units[output];
    setOutputValue(convertedValue.toFixed(4));
  };

  return (
    <div className='border-2 border-slate-300 rounded-lg mt-2 flex justify-center items-center flex-col p-2'>
      <div className='bg-slate-400 rounded-sm w-full text-center p-1'>
        Weight Convertor
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
    </div>

  );
};

export default WeightConverter;
