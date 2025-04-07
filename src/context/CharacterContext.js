import React, { useState, useEffect, createContext, useContext } from "react";


const CharacterContext = createContext();
export const useCharacterContext = () => useContext(CharacterContext);

const API_URL = "https://67e3fa7c2ae442db76d26ba1.mockapi.io/simpsons";

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("simpsons");
    if (saved) {
      setCharacters(JSON.parse(saved));
    } else {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          const normalized = data.map((item) => ({
            ...item,
            about: item.description, // 🔥 API'den gelenleri uyumlu hale getiriyoruz
          }));
          setCharacters(normalized);
          localStorage.setItem("simpsons", JSON.stringify(normalized));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("simpsons", JSON.stringify(characters));
  }, [characters]);

  const addCharacter = (char) => {
    const newChar = { ...char, id: Date.now().toString() }; // benzersiz string id
    setCharacters((prev) => [...prev, newChar]);
  };

  const deleteCharacter = (id) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...characters];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setCharacters(updated);
  };

  const moveDown = (index) => {
    if (index === characters.length - 1) return;
    const updated = [...characters];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setCharacters(updated);
  };

  const sortCharacters = () => {
    const sorted = [...characters].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setCharacters(sorted);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        addCharacter,
        deleteCharacter,
        moveUp,
        moveDown,
        sortCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}