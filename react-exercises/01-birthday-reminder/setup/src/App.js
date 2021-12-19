import React, { useState } from "react";
import data from "./data";
import List from "./List";

function App() {
  // hook people value to data
  const [people, setPeople] = useState(data);

  return (
    <main>
      <section className="container">
        <h3>{people.length} birthday today.</h3>

        {/* setting props for List = people value of useState */}
        <List props={people} />

        <button onClick={() => setPeople([])}>clear all</button>
      </section>
    </main>
  );
}

export default App;
