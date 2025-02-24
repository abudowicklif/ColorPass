"use client"; // Must be the first line

import React, { useState, useEffect } from "react";
import ColorGrid from "../components/color-grid";

function MainComponent() {
  const [demoGrid, setDemoGrid] = useState([]);

  useEffect(() => {
    const gridSize = 4;
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const grid = Array(gridSize)
      .fill()
      .map(() =>
        Array(gridSize)
          .fill()
          .map(() => ({
            char: letters[Math.floor(Math.random() * letters.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
          }))
      );
    setDemoGrid(grid);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 font-crimson-text">
            Welcome to ColorPass
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-roboto">
            A New Way to Secure Your Digital Life with Colors
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Sign In
            </a>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 font-crimson-text">
            How ColorPass Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 font-roboto">
                Instead of traditional text-based passwords, ColorPass uses a
                unique combination of colors and letters. Simply:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 font-roboto">
                <li>Choose your personal color sequence</li>
                <li>Find your color-letter combination in the grid</li>
                <li>Sign in with enhanced security</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <ColorGrid grid={demoGrid} gridSize={4} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainComponent;
