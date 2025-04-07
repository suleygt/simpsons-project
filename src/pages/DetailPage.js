import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCharacterContext } from "../context/CharacterContext";
import "./pages.css";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { characters } = useCharacterContext();

  const char = characters.find((c) => String(c.id) === String(id));

  if (!char) return <div className="character-not-found">Character not found</div>;

  return (
    <div className="detail-page">
      <button onClick={() => navigate("/")} className="go-back-button">
        ← Go Back
      </button>
      <img src={char.avatar} alt={char.name} className="character-image" />
      <h1 className="character-name">{char.name}</h1>
      <h2 className="character-job">{char.job}</h2>
      <p className="character-description">{char.description}</p>
    </div>
  );
};

export default DetailPage;