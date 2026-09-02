import React, { useState } from 'react'
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Rectangle = () => {
  const [inputLengthValue, setInputLengthValue] = useState('');
  const [inputWidthValue, setInputWidthValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  // Helper function to validate inputs
  const isValidNumber = (value) => {
    return !isNaN(value) && value.trim() !== '';
  };

  const handleInputChangeLength = (e) => {
    const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
    setInputLengthValue(value);
  };

  const handleInputChangeWidth = (e) => {
    const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
    setInputWidthValue(value);
  };

  // Calculate area when both length and width are provided and valid
  React.useEffect(() => {
    if (isValidNumber(inputLengthValue) && isValidNumber(inputWidthValue)) {
      setOutputValue(inputLengthValue * inputWidthValue);
    } else {
      setOutputValue('');
    }
  }, [inputLengthValue, inputWidthValue]);

  return (
    <div className='flex flex-col gap-10 max-w-[340px] overflow-x-auto'>
      {outputValue ? (
        <div
          className="text-xl italic"
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(`{\\text{Area of Rectangle}} ≈ {${outputValue.toFixed(5)}^2}`),
          }}
        />
      ) : (
        <div
          className="text-2xl italic"
          dangerouslySetInnerHTML={{
            __html: katex.renderToString('A = w \\times l'),
          }}
        />
      )}

      <div className='flex flex-col gap-2'>
        <div>
          <span className='text-2xl mr-2 italic'>l</span>Length
          <input
            className='ml-5 text-white bg-transparent border-2 border-slate-500 w-36'
            value={inputLengthValue}
            onChange={handleInputChangeLength}
            placeholder="Enter value"
            type="text"
            inputMode="decimal"
          />
        </div>
        <div>
          <span className='text-2xl mr-2 italic'>w</span>Width
          <input
            className='ml-5 text-white bg-transparent border-2 border-slate-500 w-36'
            value={inputWidthValue}
            onChange={handleInputChangeWidth}
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
              __html: katex.renderToString('A = w \\times l'),
            }}
          />
          <div
            className="text-2xl italic"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`= ${inputWidthValue} \\times ${inputLengthValue}`),
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
  );
}

export default Rectangle;
