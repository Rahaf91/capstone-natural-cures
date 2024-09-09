import { useState } from "react";
import symptoms from "../assets/symptoms.json";
import styled from "styled-components";
import Icon from "./Icons";
import { StyledButton } from "./StyledButtons";
import { StyledLinks } from "./StyledLinks";
import { IconButton } from "./StyledButtons";

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
    const selectElement = event.target;
    const { value } = selectElement;
    if (value && !selectedSymptoms.includes(value)) {
      setSelectedSymptoms([...selectedSymptoms, value]);
      selectElement.value = "";
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
      <section>
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
      </section>

      <section>
        <Label htmlFor="ingredients-group" aria-label="Ingredients, required">
          Ingredients: <span>*</span>
        </Label>
        {ingredients.map((ingredient, index) => (
          <InputGroup key={index}>
            <Input
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
              <IconButton
                type="button"
                onClick={() => handleRemoveIngredients(index)}
              >
                <Icon
                  name="delete"
                  color="#ffa500"
                  size="lg"
                  aria-label="Remove ingredient"
                />
              </IconButton>
            )}
          </InputGroup>
        ))}
        <IconButton type="button" onClick={handleAddIngredients} $fullWidth>
          <Icon
            name="add"
            color="#F6F9C7"
            size="lg"
            aria-label="add ingredient"
          />
        </IconButton>
      </section>
      <section>
        <Label htmlFor="preparation">Preparation:</Label>
        <Textarea
          id="preparation"
          name="preparation"
          placeholder={isEditMode ? "" : "Enter preparation steps"}
          defaultValue={isEditMode ? defaultData.preparation : ""}
        />{" "}
      </section>
      <section>
        <Label htmlFor="usage">Usage:</Label>
        <Textarea
          id="usage"
          name="usage"
          placeholder={isEditMode ? "" : "Enter usage instructions"}
          defaultValue={isEditMode ? defaultData.usage : ""}
        />
      </section>
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
          <option value="" hidden>
            Please select a symptom
          </option>
          {symptoms.map((symptom, index) => (
            <option key={index} value={symptom}>
              {symptom}
            </option>
          ))}
        </Select>

        {selectedSymptoms.map((selectedSymptom, index) => (
          <InputGroup key={index}>
            <Input type="text" value={selectedSymptom} readOnly />

            {selectedSymptoms.length > 1 && (
              <IconButton
                type="button"
                onClick={() => handleRemoveSymptom(index)}
              >
                <Icon
                  name="delete"
                  color="#ffa500"
                  size="lg"
                  aria-label="Remove symptom"
                />
              </IconButton>
            )}
          </InputGroup>
        ))}
      </section>

      {isEditMode ? (
        <>
          <StyledLinks href={`/remedy/${defaultData.id}`}>Cancel</StyledLinks>
          <StyledButton type="submit">Save</StyledButton>
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
  font-family: var(--font-adventPro);
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
