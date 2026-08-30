import React, { useState } from 'react'
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Triangle = () => {
  const [inputBaseValue, setinputBaseValue] = useState('');
  const [inputHeightValue, setinputHeightValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  // Helper function to validate inputs
  const isValidNumber = (value) => {
    return !isNaN(value) && value.trim() !== '';
  };

  const handleInputChangeBase = (e) => {
    const value = e.target.value;
    setinputBaseValue(value);
  };

  const handleInputChangeHeight = (e) => {
    const value = e.target.value;
    setinputHeightValue(value);
  };

  // Calculate area when both length and width are provided and valid
  React.useEffect(() => {
    if (isValidNumber(inputBaseValue) && isValidNumber(inputHeightValue)) {
      setOutputValue(0.5 * inputBaseValue * inputHeightValue);
    } else {
      setOutputValue('');
    }
  }, [inputBaseValue, inputHeightValue]);

  return (
    <div className=''>
      <div className='flex flex-col gap-10'>
        {outputValue ? (
          <div
            className="text-xl italic"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`{\\text{Area of Triangle}} ≈ {${outputValue.toFixed(5)}^2}`),
            }}
          />
        ) : (
          <div
            className="text-2xl italic"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString('A = \\frac{1}{2} \\times b \\times h'),
            }}
          />
        )}

        <div className='flex flex-col gap-2'>
          <div>
            <span className='text-2xl mr-2 italic'>b</span>Base
            <input
              className='ml-7 border-2 border-slate-500 w-36'
              value={inputBaseValue}
              onChange={handleInputChangeBase}
              placeholder="Enter value"
              type='number'
              style={{
                '-webkit-appearance': 'none',
                '-moz-appearance': 'textfield',
                color: "white",
                backgroundColor: "transparent"
              }}
            />
          </div>
          <div>
            <span className='text-2xl mr-2 italic'>h</span>Height
            <input
              className='ml-4.5 border-2 border-slate-500 w-36'
              value={inputHeightValue}
              onChange={handleInputChangeHeight}
              placeholder="Enter value"
              type='number'
              style={{
                '-webkit-appearance': 'none',
                '-moz-appearance': 'textfield',
                color: "white",
                backgroundColor: "transparent"
              }}
            />
          </div>
        </div>

        {outputValue && (
          <div className='flex flex-col'>
            <span>Solution</span>
            <div
              className="text-2xl italic"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString('A = \\frac{1}{2} \\times b \\times h'),
              }}
            />
            <div
              className="text-2xl italic"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(`= \\frac{1}{2} \\times ${inputBaseValue} \\times ${inputHeightValue}`),
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
    </div>
  );
}

export default Triangle;
