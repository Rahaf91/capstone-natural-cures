import { useState } from "react";
import symptoms from "../assets/symptoms.json";
import styled from "styled-components";

export default function RemedyForm({ onAddRemedy }) {
  const [ingredients, setIngredients] = useState([""]);

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

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

  function handleSelectSymptom(event) {
    const { value } = event.target;
    if (value && !selectedSymptoms.includes(value)) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  }

  function handleRemoveSymptom(index) {
    const newSymptoms = selectedSymptoms.filter(
      (_, currentIndex) => currentIndex !== index
    );
    setSelectedSymptoms(newSymptoms);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRemedy = {
      title: formData.get("title"),
      ingredients: ingredients,
      preparation: formData.get("preparation"),
      usage: formData.get("usage"),
      symptoms: selectedSymptoms,
      imageUrl: "/placeholder.jpg",
    };
    onAddRemedy(newRemedy);
    event.target.reset();
    event.target.title.focus();
    setIngredients([""]);
    setSelectedSymptoms([]);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add Remedy</h2>

      <label htmlFor="title">
        Title:<span aria-label="required">*</span>
      </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter remedy title"
        required
      />

      <section>
        <label htmlFor="ingredients-group">
          Ingredients:<span aria-label="required">*</span>
        </label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              id={`ingredient-${index}`}
              type="text"
              name="ingredients"
              value={ingredient}
              placeholder="Enter remedy ingredient"
              onChange={(event) =>
                handleIngredientChange(index, event.target.value)
              }
              required
            />

            {ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveIngredients(index)}
              >
                🗑️
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAddIngredients}>
          <span>+</span>
        </button>
      </section>

      <label htmlFor="preparation">Preparation:</label>
      <textarea
        id="preparation"
        name="preparation"
        placeholder="Enter preparation steps"
      />

      <label htmlFor="usage">Usage:</label>
      <textarea
        id="usage"
        name="usage"
        placeholder="Enter usage instructions"
      />

      <section>
        <label>
          Symptoms:<span aria-label="required">*</span>
        </label>
        <select
          id="symptoms"
          name="symptoms"
          onChange={handleSelectSymptom}
          required
        >
          <option value="">Please select a symptom</option>
          {symptoms.map((symptom, index) => (
            <option key={index} value={symptom}>
              {symptom}
            </option>
          ))}
        </select>

        {selectedSymptoms.map((selectedSymptom, index) => (
          <div key={index}>
            <input type="text" value={selectedSymptom} readOnly />
            <button type="button" onClick={() => handleRemoveSymptom(index)}>
              🗑️
            </button>
          </div>
        ))}
      </section>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 45rem;
  margin: 0 auto;
  padding-bottom: 2rem;
`;

const Button = styled.button`
  width: 40%;
  cursor: pointer;
  font-size: 1rem;
`;
