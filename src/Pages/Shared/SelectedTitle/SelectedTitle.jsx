import React from 'react';

const SelectedTitle = ({heading,subHeading}) => {
    return (
        <div className='max-w-3/12 mx-auto text-center mb-8'>
            <p className='text-[#D99904] font-medium mb-2'>--- {subHeading} ---</p>
            <h3 className='border-y-4 border-[#e8e8e8] text-3xl font-medium py-3'>{heading}</h3>
        </div>
    );
};

export default SelectedTitle;