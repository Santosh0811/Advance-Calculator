import React from 'react'
import WeightConverter from './WeightConverter';
import UnitConverter from './UnitConverter';
import Shapes from './Shapes';
import Calculator from './Calculator';
import BMI from './BMI';
import Temperature from './Temperature';
import DataConvertor from './DataConvertor';

const Panel = () => {
    return (
        <div className='flex justify-evenly items-center panel-1'>
            <div className='w-max'>

                <Calculator />

            </div>
            
            <div className='w-max'>
                <Shapes />

                <UnitConverter />

                <WeightConverter />
            </div>

            <div className='w-max'>

                <Temperature />

                <DataConvertor />

                <BMI />

            </div>

        </div>
    )
}

export default Panel
