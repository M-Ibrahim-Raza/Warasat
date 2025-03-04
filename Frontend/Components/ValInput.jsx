import React from "react";
import { useDispatch } from "react-redux";
import { setCurrency } from "../src/store/detailsSlice";

const ValInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  currencies,
  currency
}) => {

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col w-3/4">
      {label && (
        <label htmlFor={id} className="font-semibold text-TCDG2">
          {label}
        </label>
      )}
      <div className="relative">

        {currencies ? <select
          className="absolute inset-y-1.5 left-3 bg-transparent text-TCDG2 font-semibold focus:outline-none h-8 hover:border-2
          hover:border-TCDG1 rounded-xl text-center"
          value={currency}
          onChange={(e) => dispatch(setCurrency(e.target.value))}
        >
          {currencies.map((curr) => (
            <option
              key={curr}
              value={curr}
              className="bg-TCLG1 text-TCDG2 hover:bg-TCDG1 border-4 rounded-lg"
            >
              {curr}
            </option>
          ))}
        </select> : <div className="absolute inset-y-2 left-3.5 bg-transparent text-TCDG2 font-semibold 
          text-center">{currency}</div>}

        <input
          type="number"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-14 pr-4 py-2 bg-TCLG1/60 border-2 border-TCDG1 rounded-lg text-TCDG2 placeholder-TCDG2/70 focus:outline-none focus:ring-2 focus:ring-TCDG1 transition-all ease-in-out "
        />
      </div>
    </div>
  );
};

export default ValInput;
