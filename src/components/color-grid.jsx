"use client";  
import React, { useState, useEffect } from "react";  // ✅ Corrected import statement

function ColorGrid({
  grid = [],
  onCellClick = () => {},
  isLoading = false,
  gridSize = 4,
}) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (refreshing) {
      const timer = setTimeout(() => setRefreshing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [refreshing]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4 p-4 w-fit mx-auto">
        {Array.from({ length: 16 })
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
      </div>
    );
  }

  return (
    <div className="w-fit mx-auto">
      <div
        role="grid"
        aria-label="Color grid game board"
        className={`grid grid-cols-4 gap-4 p-4 ${
          refreshing ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const cellId = `${rowIndex}-${colIndex}`;
            return (
              <button
                key={cellId}
                onClick={() => {
                  setRefreshing(true);
                  onCellClick(rowIndex, colIndex);
                }}
                className={`w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100`}
                style={{
                  backgroundColor: cell.color,
                  color: ["yellow", "white"].includes(cell.color)
                    ? "black"
                    : "white",
                }}
                role="gridcell"
                aria-label={`${cell.char} in ${cell.color} at row ${
                  rowIndex + 1
                }, column ${colIndex + 1}`}
              >
                <span>{cell.char}</span>
                <span className="sr-only">{` (${cell.color})`}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function ColorGridStory() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const newGrid = Array.from({ length: 4 })
      .fill(0)
      .map(() =>
        Array.from({ length: 4 })
          .fill(0)
          .map(() => ({
            char: letters[Math.floor(Math.random() * letters.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
          }))
      );

    setGrid(newGrid);
  }, []);

  const handleCellClick = (row, col) => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const newGrid = [...grid];
    newGrid[row][col] = {
      char: letters[Math.floor(Math.random() * letters.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setGrid(newGrid);
  };

  return (
    <div className="space-y-8">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Interactive Grid
        </h2>
        <ColorGrid grid={grid} onCellClick={handleCellClick} />
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Loading State
        </h2>
        <ColorGrid grid={[]} isLoading={true} />
      </div>

      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Empty Grid
        </h2>
        <ColorGrid
          grid={Array.from({ length: 4 }).fill(
            Array.from({ length: 4 }).fill({ char: "", color: "gray" })
          )}
        />
      </div>
    </div>
  );
}

export default ColorGrid;