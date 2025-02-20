import React from "react";

const RadioButton = ({ id, name, value, checked, onChange, children }) => {
  return (
    <label htmlFor={id} className="flex items-center justify-center relative flex-1 min-w-24 max-w-52 p-4 bg-TCLG1/60 rounded-lg cursor-pointer hover:bg-TCLG1 transition-all ease-in">
      <input
        className="peer hidden"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />

      <span className="absolute inset-0 border border-TCDG1 rounded-lg peer-checked:border-[3px] hover:shadow-sm hover:shadow-TCDG2/50 peer-checked:border-TCDG1 hover:border-2 hover:border-TCDG2 transition-all ease-out"></span>

      <span className="absolute right-4 top-1/2 box-content block h-3.5 w-3.5 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-TCDG1"></span>

      <span className="mr-6 font-medium text-TCDG2/90 peer-checked:text-TCDG2 peer-checked:font-semibold">{children}</span>
    </label>
  );
};

export default RadioButton;
