import React, { useState, useEffect, memo } from "react";
import list from "./list.json";
import "./styles/AppStyles.css";

const Item = memo(function Item({ name }) {
  const [clicks, setClicks] = useState(0);

  console.count("Item render");

  return (
    <li onClick={() => setClicks((c) => c + 1)} className="item">
      {name} | clicks: {clicks}
    </li>
  );
});

function App() {
  const [items, setItems] = useState(list);
  const [useIndexKey, setUseIndexKey] = useState(false);
  const [measure, setMeasure] = useState(false);

  useEffect(() => {
    if (measure) {
      console.timeEnd("React render time");
      setMeasure(false);
    }
  }, [items]);

  function reverseList() {
    console.clear();
    console.time("React render time");

    const newList = [...items].reverse();

    setMeasure(true);
    setItems(newList);
  }

  return (
    <div className="app-container">
      <h2>React Key Diffing Benchmark</h2>

      <div style={{ marginBottom: 10 }}>
        <button onClick={reverseList}>Reverse List</button>

        <button
          onClick={() => setUseIndexKey(!useIndexKey)}
          className="toggle-button"
        >
          Toggle Key Type → {useIndexKey ? "index" : "id"}
        </button>
      </div>

      <p>
        Current Key: <b>{useIndexKey ? "index" : "id"}</b>
      </p>

      <ul>
        {items.map((item, index) => (
          <Item key={useIndexKey ? index : item.id} name={item.name} />
        ))}
      </ul>
    </div>
  );
}

export default App;
