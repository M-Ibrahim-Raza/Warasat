import React from "react";
import MinusButton from "./MinusButton";
import PlusButton from "./PlusButton";

const HeirInput = ({
  onIncrement,
  onDecrement,
  val,
  children,
  isSingle,
  onDelete,
}) => {
  return (
    <div
      id="heir-input"
      className={`relative flex w-96 bg-TCLG1 py-2 px-4 font-semibold rounded-md mx-auto border-TCDG2 ring-TCDG2 ring-[0.5px] text-TCDG2`}
    >
      {isSingle ? (
        <div className="flex flex-1 justify-center align-middle">
          <h1>{children}</h1>
        </div>
      ) : (
        <>
          <div className="flex flex-[75%] justify-center align-middle">
            <h1>{children}</h1>
          </div>
          <div className="flex flex-row flex-[25%] align-middle">
            <MinusButton onClick={onDecrement}></MinusButton>
            <div className="flex flex-1 w-6 align-middle justify-center">
              {val}
            </div>
            <PlusButton onClick={onIncrement}></PlusButton>
          </div>
        </>
      )}
      <button
        onClick={onDelete}
        className="absolute -right-7 hover:scale-105 cursor-pointer transition-all
      text-TCDG2 hover:text-TCR1
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-trash-2"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </button>
    </div>
  );
};

export default HeirInput;
