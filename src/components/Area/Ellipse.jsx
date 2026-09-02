import React, { useState } from 'react'
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Ellipse = () => {
  const [inputAxisValue1, setinputAxisValue1] = useState('');
  const [inputAxisValue2, setinputAxisValue2] = useState('');
  const [outputValue, setOutputValue] = useState('');

  // Helper function to validate inputs
  const isValidNumber = (value) => {
    return !isNaN(value) && value.trim() !== '';
  };

  const handleInputChangeAxis1 = (e) => {
    const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
    setinputAxisValue1(value);
  };

  const handleInputChangeAxis2 = (e) => {
    const value = e.target.value.replace(/(?!^-)[^0-9.]/g, "");
    setinputAxisValue2(value);
  };

  // Calculate area when both length and width are provided and valid
  React.useEffect(() => {
    if (isValidNumber(inputAxisValue1) && isValidNumber(inputAxisValue2)) {
      setOutputValue(Math.PI.toFixed(5) * inputAxisValue1 * inputAxisValue2);
    } else {
      setOutputValue('');
    }
  }, [inputAxisValue1, inputAxisValue2]);

  return (
    <div className='flex flex-col gap-10 max-w-[340px] overflow-x-auto'>
      {outputValue ? (
        <div
          className="text-xl italic"
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(`{\\text{Area of Ellipse}} ≈ {${outputValue.toFixed(5)}^2}`),
          }}
        />
      ) : (
        <div
          className="text-2xl italic"
          dangerouslySetInnerHTML={{
            __html: katex.renderToString('A = π \\times a \\times b'),
          }}
        />
      )}

      <div className='flex flex-col gap-2'>
        <div>
          <span className='text-2xl mr-2 italic'>a</span>Axis
          <input
            className='ml-5 text-white bg-transparent border-2 border-slate-500 w-36'
            value={inputAxisValue1}
            onChange={handleInputChangeAxis1}
            placeholder="Enter value"
            type="text"
            inputMode="decimal"
          />
        </div>
        <div>
          <span className='text-2xl mr-2 italic'>b</span>Axis
          <input
            className='ml-5 text-white bg-transparent border-2 border-slate-500 w-36'
            value={inputAxisValue2}
            onChange={handleInputChangeAxis2}
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
              __html: katex.renderToString('A = π \\times a \\times b'),
            }}
          />
          <div
            className="text-2xl italic"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(`= ${Math.PI.toFixed(5)} \\times ${inputAxisValue1} \\times ${inputAxisValue2}`),
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

export default Ellipse;
