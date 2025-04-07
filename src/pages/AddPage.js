import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharacterContext } from "../context/CharacterContext";

const AddPage = () => {
    const navigate = useNavigate();
    const { addCharacter } = useCharacterContext();
  
    const [form, setForm] = useState({
      name: "",
      job: "",
      avatar: "",
      description: "",
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.name || !form.job || !form.avatar || !form.description) {
        alert("Tüm alanları doldurmalısınız.");
        return;
      }
      addCharacter(form);
      navigate("/");
    };
  
    return (
      <div className="add-page">
        <button
          onClick={() => navigate("/")}
          className="add-back-button"
        >
          ← Go Back
        </button>
        <h1 className="add-title">The Simpsons</h1>
        <form
          onSubmit={handleSubmit}
          className="add-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="add-input"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="job"
            placeholder="Job"
            className="add-input"
            value={form.job}
            onChange={handleChange}
          />
          <input
            type="text"
            name="avatar"
            placeholder="Image URL"
            className="add-input"
            value={form.avatar}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="add-textarea"
            value={form.description}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="add-submit"
          >
            Add Character
          </button>
        </form>
      </div>
    );
     }
  
  export default AddPage;