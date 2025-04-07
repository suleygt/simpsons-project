import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacterContext } from "../context/CharacterContext";
import "./pages.css";



const ListPage = () => {
  const navigate = useNavigate();
  const {
    characters,
    deleteCharacter,
    moveUp,
    moveDown,
    sortCharacters,
  } = useCharacterContext();

  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Karakterler (context üzerinden gelen):", characters);
  }, [characters]);

  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-page">
      <div className="list-header">
        <img src="/logo192.png" alt="Simpsons Logo" className="logo" />
        <h1 className="title">The Simpsons</h1>
        <button className="add-btn" onClick={() => navigate("/add")}>
          + Add
        </button>
      </div>

      <div className="search-sort-bar">
        <input
          type="text"
          placeholder="Search character..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={sortCharacters}>Sort A-Z</button>
      </div>

      <ul className="character-list">
        {filtered.map((char, index) => (
          <li key={char.id} className="character-card">
            <div className="left-section">
              <span className="character-index">{index + 1}</span>
              <img src={char.avatar} alt={char.name} />
              <span className="character-name">{char.name}</span>
            </div>

            <div className="right-section">
              <button onClick={() => navigate(`/detail/${char.id}`)}>
                <span role="img" aria-label="View Details">🔍</span>
              </button>
              <button onClick={() => deleteCharacter(char.id)}>
                <span role="img" aria-label="Delete Character">🗑️</span>
              </button>
              <button onClick={() => moveUp(index)}>
                <span role="img" aria-label="Move Up">🔼</span>
              </button>
              <button onClick={() => moveDown(index)}>
                <span role="img" aria-label="Move Down">🔽</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;