import React, { useState } from 'react';
import Circle from './Area/Circle';
import Square from './Area/Square';
import Rectangle from './Area/Rectangle';
import Triangle from './Area/Triangle';
import Trapezium from './Area/Trapezium';
import Parallelogram from './Area/Parallelogram';
import Ellipse from './Area/Ellipse';
import Rhombus from './Area/Rhombus';

const Shapes = () => {
    const [popoverVisible, setPopoverVisible] = useState("");
    const [popoverContent, setPopoverContent] = useState(null);

    const contentMap = {
        circle: <Circle />,
        square: <Square />,
        rectangle: <Rectangle />,
        triangle: <Triangle />,
        trapezium: <Trapezium />,
        parallelogram: <Parallelogram />,
        ellipse: <Ellipse />,
        rhombus: <Rhombus />,
    };

    const handlePopoverClick = (shape) => {
        if (popoverVisible === shape) {
            setPopoverVisible("");
            setPopoverContent(null);
        } else {
            setPopoverContent(contentMap[shape]);
            setPopoverVisible(shape);
        }
    };

    return (
        <>
            <div className="border-2 rounded-lg border-slate-300 flex justify-center items-center flex-col p-2 relative">
                <div className="bg-slate-400 rounded-sm w-full text-center p-1">
                    Area of Shapes
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2 shape-1">
                    {['circle', 'square', 'rectangle', 'triangle', 'trapezium', 'parallelogram', 'ellipse', 'rhombus'].map((shape) => (
                        <div key={shape}>
                            <button
                                className="border-2 cursor-pointer rounded-full bg-slate-300 w-28 py-2 hover:bg-slate-400 transition"
                                onClick={() => handlePopoverClick(shape)}
                            >
                                {shape.charAt(0).toUpperCase() + shape.slice(1)}
                            </button>

                            {popoverVisible === shape && (
                                <div
                                    className="absolute z-50 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 mt-2 w-max shape-2"
                                >
                                    <div className="flex justify-between items-center px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            Area of {shape.charAt(0).toUpperCase() + shape.slice(1)}
                                        </h3>
                                        <i className="fa-solid fa-circle-xmark" onClick={handlePopoverClick}></i>
                                    </div>
                                    <div className="px-3 py-2">
                                        {popoverContent}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Shapes;
