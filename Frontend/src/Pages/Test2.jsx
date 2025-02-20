import React from "react";

const Test2 = () => {
  return (
    <div class="flex py-20 items-center justify-center">
      <form class="grid w-60 sm:w-96 grid-cols-1 gap-2">
        <div class="relative">
          <input
            class="peer hidden"
            id="radio_1"
            type="radio"
            name="radio"
            checked
          />
          <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-indigo-500"></span>
          <label
            class="flex cursor-pointer flex-col rounded-lg border border-gray-300 p-4 peer-checked:border-4 peer-checked:border-indigo-700"
            for="radio_1"
          >
            <span class="text-xs font-semibold uppercase">Small</span>
            <span class="mt-2 text-xl font-bold">Micro VPS</span>
            <ul class="mt-2 text-sm">
              <li>45 GBs</li>
              <li>3.0 GHz</li>
            </ul>
          </label>
        </div>
        <div class="relative">
          <input class="peer hidden" id="radio_2" type="radio" name="radio" />
          <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-indigo-500"></span>

          <label
            class="flex cursor-pointer flex-col rounded-lg border border-gray-300 p-4 peer-checked:border-4 peer-checked:border-indigo-700"
            for="radio_2"
          >
            <span class="text-xs font-semibold uppercase">Medium</span>
            <span class="mt-2 text-xl font-bold">Smart VPS</span>
            <ul class="mt-2 text-sm">
              <li>45 GBs</li>
              <li>3.0 GHz</li>
            </ul>
          </label>
        </div>
        <div class="relative">
          <input class="peer hidden" id="radio_3" type="radio" name="radio" />
          <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-indigo-500"></span>

          <label
            class="flex cursor-pointer flex-col rounded-lg border border-gray-300 p-4 peer-checked:border-4 peer-checked:border-indigo-700"
            for="radio_3"
          >
            <span class="text-xs font-semibold uppercase">Big</span>
            <span class="mt-2 text-xl font-bold">Super VPS</span>
            <ul class="mt-2 text-sm">
              <li>45 GBs</li>
              <li>3.0 GHz</li>
            </ul>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Test2;
