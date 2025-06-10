import React, { useState, useEffect } from "react";
import "./styles.css";

const API_URL =
  "https://www.random.org/strings/?num=10&len=32&upperalpha=on&unique=off&format=plain";

export default function App() {
  const [charCount, setCharCount] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const text = await response.text();
      const lines = text.trim().split("\n");

      const combined = lines.join("");
      const count = {};

      for (const char of combined) {
        if (/^[A-Z]$/.test(char)) {
          count[char] = (count[char] || 0) + 1;
        }
      }

      setCharCount(count);
    };

    fetchData();
  }, []);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="border border-black p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">Hello Purwadhika Student !</h1>
        <div className="flex flex-col items-center text-lg font-medium">
          {alphabet.map((letter) => (
            <div key={letter}>
              {letter} : {charCount[letter] || 0}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
