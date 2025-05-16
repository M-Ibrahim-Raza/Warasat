import React, { useState, useEffect } from "react";

const MAX_PERCENT = 33.33;

const PercentageInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
}) => {
  const [rawValue, setRawValue] = useState(value?.toString() || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setRawValue(value.toString());
      setError(""); // Clear error on external value update
    }
  }, [value]);

  const handleKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Escape",
      "ArrowUp",
      "ArrowDown",
      "F5",
    ];
    const isDigit = /^[0-9]$/.test(e.key);
    const isDot = e.key === ".";
    const hasDot = rawValue.includes(".");

    if (!isDigit && !allowedKeys.includes(e.key) && !(isDot && !hasDot)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    let input = e.target.value.replace(" %", "");

    if (/^\d*\.?\d*$/.test(input)) {
      const parsed = parseFloat(input);

      if (input === "") {
        setRawValue("");
        setError("");
        onChange("");
        return;
      }

      if (!isNaN(parsed)) {
        if (parsed < MAX_PERCENT) {
          setRawValue(input);
          setError("");
          onChange(parsed);
        } else {
          // Value exceeds max allowed percentage
          setError("Will should not exceed 1/3 of total assets (33.33%)");
        }
      }
    }
  };

  const handleBlur = () => {
    if (rawValue !== "") {
      const num = parseFloat(rawValue);
      if (!isNaN(num)) {
        const formatted = num.toFixed(2);
        setRawValue(formatted);
      }
    }
  };

  return (
    <div className="flex flex-col w-3/4">
      {label && (
        <label htmlFor={id} className="font-semibold text-TCDG2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          id={id}
          name={name}
          value={rawValue ? `${rawValue} %` : ""}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full pl-4 py-2 bg-TCLG1/60 border-2 rounded-lg text-TCDG2 placeholder-TCDG2/70 focus:outline-none focus:ring-2 transition-all ease-in-out font-medium focus:text-TCDG2 focus:font-semibold ${error ? "border-red-600 focus:ring-red-600" : "border-TCDG1 focus:ring-TCDG1"
            }`}
        />
      </div>
      {error && (
        <p className="text-red-600 mt-1 text-sm font-medium">{error}</p>
      )}
    </div>
  );
};

export default PercentageInput;
