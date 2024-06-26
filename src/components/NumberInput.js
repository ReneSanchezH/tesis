"use client";
import { useState } from "react";

function NumberInput({ onInputChange }) {
  const [isRandom, setIsRandom] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const generateRandomNumbers = () => {
    let randomNumbers = [];

    // Generate 2 numbers between 0 and 9
    for (let i = 0; i < 2; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10)); // Numbers between 0 and 9
    }

    // Generate 4 numbers between 10 and 99
    for (let i = 0; i < 4; i++) {
      randomNumbers.push(Math.floor(Math.random() * 90) + 10); // Numbers between 10 and 99
    }

    // Generate 4 numbers between 100 and 999
    for (let i = 0; i < 4; i++) {
      randomNumbers.push(Math.floor(Math.random() * 900) + 100); // Numbers between 100 and 999
    }

    // Shuffle the array
    for (let i = randomNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomNumbers[i], randomNumbers[j]] = [
        randomNumbers[j],
        randomNumbers[i],
      ];
    }

    return randomNumbers.join(",");
  };

  const handleRadioChange = (e) => {
    const value = e.target.value === "random";
    setIsRandom(value);
    if (value) {
      const randomNumbers = generateRandomNumbers();
      setInputValue(randomNumbers);
      onInputChange(randomNumbers);
    } else {
      setInputValue("");
      onInputChange("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ""); // Remover espacios
    setInputValue(value);
    onInputChange(value);
  };

  return (
    <div className="mb-4 mt-4 ml-4 flex items-center">
      <label className="mr-4 text-white">
        <input
          type="radio"
          name="mode"
          value="random"
          checked={isRandom}
          onChange={handleRadioChange}
          className="text-white"
        />
        Random
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="manual"
          checked={!isRandom}
          onChange={handleRadioChange}
          className="text-white"
        />
        Manual
      </label>
      {!isRandom && (
        <input
          type="text"
          placeholder="Enter numbers separated by commas"
          value={inputValue}
          onChange={handleInputChange}
          className="ml-2 p-2 border rounded bg-[#2e2e2e] text-white w-64"
        />
      )}
    </div>
  );
}

export default NumberInput;