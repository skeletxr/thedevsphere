import React from 'react';

const Card = () => {
  return (
    <div className="w-[280px] bg-white rounded-lg shadow-lg hover:cursor-pointer transition duration-200 ease-in-out">
      <div className="w-full h-[7em] rounded-t-lg bg-gradient-to-t from-[#7980c5] to-[#9198e5] flex items-start justify-end">
        <div className="transition duration-200 ease-in-out rounded-lg m-5 w-[30px] h-[30px] bg-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 683 683" height={683} width={683} className="w-[15px] h-[15px] transition duration-200 ease-in-out">
            <g clipPath="url(#clip0_993_25)">
              <mask height={683} width={683} y={0} x={0} maskUnits="userSpaceOnUse" style={{ maskType: 'luminance' }} id="mask0_993_25">
                <path fill="white" d="M0 -0.00012207H682.667V682.667H0V-0.00012207Z" />
              </mask>
              <g mask="url(#mask0_993_25)">
                <path strokeLinejoin="round" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={40} stroke="#CED8DE" d="M148.535 19.9999C137.179 19.9999 126.256 24.5092 118.223 32.5532C110.188 40.5866 105.689 51.4799 105.689 62.8439V633.382C105.689 649.556 118.757 662.667 134.931 662.667H135.039C143.715 662.667 151.961 659.218 158.067 653.09C186.451 624.728 270.212 540.966 304.809 506.434C314.449 496.741 327.623 491.289 341.335 491.289C355.045 491.289 368.22 496.741 377.859 506.434C412.563 541.074 496.752 625.242 524.816 653.348C530.813 659.314 538.845 662.667 547.308 662.667C563.697 662.667 576.979 649.395 576.979 633.019V62.8439C576.979 51.4799 572.48 40.5866 564.447 32.5532C556.412 24.5092 545.489 19.9999 534.133 19.9999H148.535Z" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_993_25">
                <rect fill="white" height="682.667" width="682.667" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="p-2.5 flex flex-col items-center">
        <p className="font-semibold text-black text-center text-base">Your product title</p>
        <p className="text-gray-500 text-xs text-center p-1.5">Description</p>
        <div className="mt-2.5 px-3 py-3.5 bg-[#7980c5] rounded-lg text-center">
          <p className="font-medium text-white text-sm">Add To Cart</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
