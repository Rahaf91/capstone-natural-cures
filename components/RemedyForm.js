import { useState } from "react";
import symptoms from "../assets/symptoms.json";
import styled from "styled-components";
import Link from "next/link";
import Icon from "./Icons";
import { StyledButton } from "./StyledButtons";

export default function RemedyForm({
  onAddRemedy,
  isEditMode,
  onEditRemedy,
  defaultData = {},
}) {
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

      <Label htmlFor="title" aria-label="Title, required">
        Title:<span>*</span>
      </Label>
      <Input
        id="title"
        name="title"
        type="text"
        placeholder={isEditMode ? "" : "Enter remedy title"}
        defaultValue={isEditMode ? defaultData.title : ""}
        required
      />

      <section>
        <Label htmlFor="ingredients-group" aria-label="Ingredients, required">
          Ingredients: <span>*</span>
        </Label>
        {ingredients.map((ingredient, index) => (
          <InputGroup key={index}>
            <IngredientInput
              id={`ingredient-${index}`}
              type="text"
              name="ingredients"
              value={ingredient}
              placeholder={isEditMode ? "" : "Add remedy ingredient"}
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
                <Icon
                  name="delete"
                  color="#85895e"
                  size="sm"
                  aria-label="Remove ingredient"
                />
              </button>
            )}
          </InputGroup>
        ))}
        <button type="button" onClick={handleAddIngredients}>
          <Icon
            name="add"
            color="#85895e"
            size="sm"
            aria-label="add ingredient"
          />
        </button>
      </section>

      <Label htmlFor="preparation">Preparation:</Label>
      <Textarea
        id="preparation"
        name="preparation"
        placeholder={isEditMode ? "" : "Enter preparation steps"}
        defaultValue={isEditMode ? defaultData.preparation : ""}
      />

      <Label htmlFor="usage">Usage:</Label>
      <Textarea
        id="usage"
        name="usage"
        placeholder={isEditMode ? "" : "Enter usage instructions"}
        defaultValue={isEditMode ? defaultData.usage : ""}
      />

      <section>
        <Label htmlFor="symptoms" aria-label="Symptoms, required">
          Symptoms:<span>*</span>
        </Label>
        <Select
          id="symptoms"
          name="symptoms"
          onChange={handleSelectSymptom}
          required={!isEditMode && selectedSymptoms.length === 0}
        >
          <option value="">Please select a symptom</option>
          {symptoms.map((symptom, index) => (
            <option key={index} value={symptom}>
              {symptom}
            </option>
          ))}
        </Select>

        {selectedSymptoms.map((selectedSymptom, index) => (
          <div key={index}>
            <Input type="text" value={selectedSymptom} readOnly />

            {selectedSymptoms.length > 1 && (
              <button type="button" onClick={() => handleRemoveSymptom(index)}>
                <Icon
                  name="delete"
                  color="#85895e"
                  size="sm"
                  aria-label="Remove symptom"
                />
              </button>
            )}
          </div>
        ))}
      </section>

      {isEditMode ? (
        <>
          <Link href={`/remedy/${defaultData.id}`}>Cancel</Link>
          <button type="submit">Save</button>
        </>
      ) : (
        <StyledButton type="submit">Submit</StyledButton>
      )}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 0.5rem;
  background-color: var(--background-color);
  box-shadow: var(--box-shadow);
  padding: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow);

  &:focus {
    border-color: #85895e;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;

  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow);
  background-color: var(--card-background);
  text-align: center;

  &:focus {
    border-color: #85895e;
    outline: none;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow);

  &:focus {
    border-color: #85895e;
    outline: none;
  }
`;
const IngredientInput = styled.input`
  background-color: var(--card-background);
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  box-shadow: var(--box-shadow);

  &:focus {
    border-color: #85895e;
    outline: none;
  }
`;
