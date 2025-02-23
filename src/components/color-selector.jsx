"use client";
import React from "react";

function ColorSelector({
  colors = ["red", "blue", "green", "yellow", "purple", "orange"],
  onColorSelect = () => {},
  selectedColor = null,
  disabled = false,
}) {
  const handleColorSelect = (color) => {
    if (!disabled) {
      onColorSelect(color);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Color selection"
      className="p-4 rounded-lg"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorSelect(color)}
            disabled={disabled}
            aria-checked={selectedColor === color}
            role="radio"
            className={`
              p-4 rounded-lg border-2 transition-all duration-300
              ${
                selectedColor === color
                  ? "border-gray-900 dark:border-gray-100"
                  : "border-transparent"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
              flex items-center space-x-3
            `}
          >
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="font-medium capitalize text-gray-900 dark:text-gray-100">
              {color}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorSelectorStory() {
  const [selectedColor1, setSelectedColor1] = useState(null);
  const [selectedColor2, setSelectedColor2] = useState("blue");

  return (
    <div className="space-y-8">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Default State
        </h2>
        <ColorSelector
          onColorSelect={setSelectedColor1}
          selectedColor={selectedColor1}
        />
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Pre-selected Color
        </h2>
        <ColorSelector
          onColorSelect={setSelectedColor2}
          selectedColor={selectedColor2}
        />
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Disabled State
        </h2>
        <ColorSelector selectedColor="red" disabled={true} />
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Custom Colors
        </h2>
        <ColorSelector
          colors={["pink", "teal", "indigo"]}
          selectedColor="teal"
        />
      </div>
    </div>
  );
}

export default ColorSelector;