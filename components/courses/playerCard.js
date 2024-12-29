import React, { useState } from 'react';

const PlayerCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col min-h-[58px] max-w-[298px] w-full border border-gray-300 rounded-lg bg-white overflow-hidden transition-all duration-300">
        <input hidden checked={isOpen} onChange={toggleDropdown} className="sr-only" name="state-dropdown" id="state-dropdown" type="checkbox" />
        <label
          aria-label="dropdown scrollbar"
          htmlFor="state-dropdown"
          className="trigger cursor-pointer list-none select-none font-semibold text-inherit w-full flex items-center gap-4 p-4 h-max relative z-10 rounded-lg bg-white"
        />
        <ul
          className={`list ${isOpen ? 'opacity-100 translate-y-0 mt-0 max-h-80' : 'opacity-0 translate-y-[3rem] mt-[-100%]'} overflow-hidden auto-scroll gap-4 p-4 transition-all duration-500 ease-out`}
          role="list"
          dir="auto"
        >
          <li className="listitem" role="listitem">
            <article className="article p-4 rounded-lg text-sm font-medium text-justify border border-gray-300 inline-block w-full bg-white">
              Hover to view scrollbar.
            </article>
          </li>
          <li className="listitem" role="listitem">
            <article className="article p-4 rounded-lg text-sm font-medium text-justify border border-gray-300 inline-block w-full bg-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sunt tempora recusandae dolorum.
            </article>
          </li>
          <li className="listitem" role="listitem">
            <article className="article p-4 rounded-lg text-sm font-medium text-justify border border-gray-300 inline-block w-full bg-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sunt tempora recusandae dolorum.
            </article>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerCard;
