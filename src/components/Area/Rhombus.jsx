import React, { useState } from 'react'
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Rhombus = () => {
  const [inputDiagonalValue1, setinputDiagonalValue1] = useState('');
  const [inputDiagonalValue2, setinputDiagonalValue2] = useState('');
  const [outputValue, setOutputValue] = useState('');

  // Helper function to validate inputs
  const isValidNumber = (value) => {
    return !isNaN(value) && value.trim() !== '';
  };

  const handleInputChangeDiagonal1 = (e) => {
    const value = e.target.value;
    setinputDiagonalValue1(value);
  };

  const handleInputChangeDiagonal2 = (e) => {
    const value = e.target.value;
    setinputDiagonalValue2(value);
  };

  // Calculate area when both length and width are provided and valid
  React.useEffect(() => {
    if (isValidNumber(inputDiagonalValue1) && isValidNumber(inputDiagonalValue2)) {
      setOutputValue((inputDiagonalValue1 * inputDiagonalValue2) / 2);
    } else {
      setOutputValue('');
    }
  }, [inputDiagonalValue1, inputDiagonalValue2]);

  return (
    <div className=''>
      <div className='flex flex-col gap-10'>
        {outputValue ? (
          <div
            className="text-xl italic"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`{\\text{Area of Rombus}} ≈ {${outputValue.toFixed(5)}^2}`),
            }}
          />
        ) : (
          <div
            className="text-2xl italic"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString('A = \\frac {{p} \\times {q}}{2}'),
            }}
          />
        )}

        <div className='flex flex-col gap-2'>
          <div>
            <span className='text-2xl mr-2 italic'>p</span>Diagonal
            <input
              className='ml-5 border-2 border-slate-500 w-36'
              value={inputDiagonalValue1}
              onChange={handleInputChangeDiagonal1}
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
            <span className='text-2xl mr-2 italic'>q</span>Diagonal
            <input
              className='ml-5 border-2 border-slate-500 w-36'
              value={inputDiagonalValue2}
              onChange={handleInputChangeDiagonal2}
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
                __html: katex.renderToString('A = \\frac {{p} \\times {q}}{2}'),
              }}
            />
            <div
              className="text-2xl italic"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(`= \\frac {${inputDiagonalValue1} \\times ${inputDiagonalValue2}}{2}`),
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

export default Rhombus;
