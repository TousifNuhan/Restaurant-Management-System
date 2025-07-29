import React from 'react';

const Cover = ({img,title,p}) => {
    return (
        
            <div
                className="hero h-[33rem]"
                style={{
                    backgroundImage:
                        `url(${img})`,
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="w-3xl bg-[#15151599] py-14">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5 w-4/5 mx-auto">
                           {p}
                        </p>
                       
                    </div>
                </div>
            </div>
      
    );
};

export default Cover;