import { useState } from "react";
import symptoms from "../assets/symptoms.json";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function RemedyForm({
  onAddRemedy,
  isEditMode,
  onEditRemedy,
  defaultData = {},
}) {
  const router = useRouter();

  const [ingredients, setIngredients] = useState(
    isEditMode && defaultData.ingredients ? defaultData.ingredients : [""]
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState(
    isEditMode && defaultData.symptoms ? defaultData.symptoms : []
  );

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
    const formObject = Object.fromEntries(formData);

    const remedyData = {
      ...formObject,
      ingredients: ingredients,
      symptoms: selectedSymptoms,
    };

    isEditMode
      ? onEditRemedy(remedyData)
      : onAddRemedy({ ...remedyData, imageUrl: "/placeholder.jpg" });

    event.target.reset();
    setIngredients([""]);
    setSelectedSymptoms([]);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {isEditMode ? <h2>Edit Remedy</h2> : <h2>Add Remedy</h2>}

      <label htmlFor="title" aria-label="Title, required">
        Title:<span>*</span>
      </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter remedy title"
        defaultValue={isEditMode ? defaultData.title : ""}
        required
      />

      <section>
        <label htmlFor="ingredients-group" aria-label="Ingredients, required">
          Ingredients: <span>*</span>
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
                <span aria-label="Remove ingredient">🗑️</span>
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddIngredients}>
          <span aria-label="Add ingredient">+</span>
        </button>
      </section>

      <label htmlFor="preparation">Preparation:</label>
      <textarea
        id="preparation"
        name="preparation"
        placeholder="Enter preparation steps"
        defaultValue={isEditMode ? defaultData.preparation : ""}
      />

      <label htmlFor="usage">Usage:</label>
      <textarea
        id="usage"
        name="usage"
        placeholder="Enter usage instructions"
        defaultValue={isEditMode ? defaultData.usage : ""}
      />

      <section>
        <label htmlFor="symptoms" aria-label="Symptoms, required">
          Symptoms:<span>*</span>
        </label>
        <select id="symptoms" name="symptoms" onChange={handleSelectSymptom}>
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

            {selectedSymptoms.length > 1 && (
              <button type="button" onClick={() => handleRemoveSymptom(index)}>
                <span aria-label="Remove ingredient">🗑️</span>
              </button>
            )}
          </div>
        ))}
      </section>

      {isEditMode ? (
        <>
          <Button
            type="button"
            onClick={() => router.push(`/remedy/${defaultData.id}`)}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </>
      ) : (
        <Button type="submit">Submit</Button>
      )}
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
  font-size: 1rem;
`;
