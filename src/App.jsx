import React, { useState } from "react";
import "./styles.css";

const defaultData = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

const Domino = ({ card }) => (
  <div className="domino">
    <div>{card[0]}</div>
    <div>-</div>
    <div>{card[1]}</div>
  </div>
);

function App() {
  const [dominos, setDominos] = useState([...defaultData]);
  const [removeTotal, setRemoveTotal] = useState("");

  const doubleCount = dominos.filter(([a, b]) => a === b).length;

  const sortDominos = (order) => {
    const sorted = [...dominos].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      if (sumA === sumB) return a[0] - b[0];
      return order === "asc" ? sumA - sumB : sumB - sumA;
    });
    setDominos(sorted);
  };

  const flip = () => {
    setDominos(dominos.map(([a, b]) => [b, a]));
  };

  const removeDup = () => {
    const seen = new Set();
    const unique = dominos.filter(([a, b]) => {
      const key1 = `${a},${b}`;
      const key2 = `${b},${a}`;
      if (seen.has(key1) || seen.has(key2)) return false;
      seen.add(key1);
      seen.add(key2);
      return true;
    });
    setDominos(unique);
  };

  const removeByTotal = () => {
    const total = parseInt(removeTotal);
    if (!isNaN(total)) {
      const filtered = dominos.filter(([a, b]) => a + b !== total);
      setDominos(filtered);
      setRemoveTotal("");
    }
  };

  const reset = () => {
    setDominos([...defaultData]);
  };

  return (
    <div className="container">
      <h2>Dominoes</h2>

      <div>
        <label>Source</label>
        <pre>{JSON.stringify(dominos)}</pre>
      </div>

      <div>
        <label>Double Numbers</label>
        <div>{doubleCount}</div>
      </div>

      <div className="domino-container">
        {dominos.map((card, index) => (
          <Domino key={index} card={card} />
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => sortDominos("asc")}>Sort (ASC)</button>
        <button onClick={() => sortDominos("desc")}>Sort (DESC)</button>
        <button onClick={flip}>Flip</button>
        <button onClick={removeDup}>Remove Dup</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <input
          type="number"
          placeholder="Input Total"
          value={removeTotal}
          onChange={(e) => setRemoveTotal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") removeByTotal();
          }}
        />
        <div className="buttons">
          <button onClick={removeByTotal}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default App;
