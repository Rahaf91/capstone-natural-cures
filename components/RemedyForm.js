import { useState } from "react";
import symptoms from "../assets/symptoms.json";

//We should  include also  validation messages which indicate the fields that need completion.
export default function RemedyForm({ onAddRemedy }) {
  const [ingredients, setIngredients] = useState([""]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptoms, setCustomSymptoms] = useState("");

  function handleIngredientChange(index, value) {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  }

  function handleAddIngredients() {
    setIngredients([...ingredients, ""]);
  }

  function handleRemoveIngredients(index) {
    const newIngredients = ingredients.filter(
      (_, currentIndex) => currentIndex !== index
    );
    setIngredients(newIngredients);
  }

  ///////////////////////////////////////////////////

  function handleSelectChange(event) {
    const { value } = event.target;
    if (value && !selectedSymptoms.includes(value)) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  }

  function handleAddSymptoms() {
    if (customSymptoms && !selectedSymptoms.includes(customSymptoms)) {
      setSelectedSymptoms([...selectedSymptoms, customSymptoms]);
      setCustomSymptoms("");
    }
  }

  function handleRemoveSymptom(index) {
    const newSymptoms = selectedSymptoms.filter(
      (_, currentIndex) => currentIndex !== index
    );
    setSelectedSymptoms(newSymptoms);
  }
  /////////////////////////////////////////////////////////

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRemedy = {
      title: formData.get("title"),
      ingredients: ingredients,
      preparation: formData.get("preparation"),
      usage: formData.get("usage"),
      symptoms: selectedSymptoms,
      imageUrl: "/path/to/placeholder-image.jpg",
    };
    onAddRemedy(newRemedy);
    event.target.reset();
    setIngredients([""]);
    setSelectedSymptoms([]);
    setCustomSymptoms("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Remedy</h2>

      <label htmlFor="title">Title </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter remedy title"
        required
      />

      <section>
        <label>Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              placeholder="Enter remedy ingredient"
              onChange={(event) =>
                handleIngredientChange(index, event.target.value)
              }
              required
            />

            <button
              type="button"
              onClick={() => handleRemoveIngredients(index)}
            >
              🗑️
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddIngredients}>
          <span>+</span>
        </button>
      </section>

      <label htmlFor="preparation">Preparation </label>
      <textarea
        id="preparation"
        name="preparation"
        placeholder="Enter preparation steps"
        required
      />

      <label htmlFor="usage">Usage</label>
      <textarea
        id="usage"
        name="usage"
        placeholder="Enter usage instructions"
        required
      />

      <section>
        <label>Symptoms</label>
        <select id="symptoms" name="symptoms" onChange={handleSelectChange}>
          <option value="">Select a symptom</option>
          {symptoms.map((symptom, index) => (
            <option key={index} value={symptom}>
              {symptom}
            </option>
          ))}
        </select>

        {selectedSymptoms.map((selectedSymptom, index) => (
          <div key={index}>
            {selectedSymptom}
            <button type="button" onClick={() => handleRemoveSymptom(index)}>
              🗑️
            </button>
          </div>
        ))}

        <input
          type="text"
          name="customSymptom"
          value={customSymptoms}
          placeholder="Enter custom symptom"
          onChange={(event) => setCustomSymptoms(event.target.value)}
        />
        <button type="button" onClick={handleAddSymptoms}>
          <span>+</span>
        </button>
      </section>

      <button type="submit">Add Remedy</button>
    </form>
  );
}
