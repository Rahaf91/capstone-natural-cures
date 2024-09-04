import { useState } from "react";
import symptoms from "../assets/symptoms.json";
import styled from "styled-components";
import Link from "next/link";
import Icon from "./Icons";

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
                <Icon name="delete" color="#85895e" size="sm" />
              </button>
            )}
          </InputGroup>
        ))}
        <button type="button" onClick={handleAddIngredients}>
          <Icon name="add" color="#85895e" size="sm" />
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
                <Icon name="delete" color="#85895e" size="sm" />
              </button>
            )}
          </div>
        ))}
      </section>

      {isEditMode ? (
        <>
          <Link href={`/remedy/${defaultData.id}`}>Cancel</Link>
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
const Button = styled.button`
  width: 40%;
  font-size: 1rem;
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
/*import { useState } from "react";
import symptoms from "../assets/symptoms.json";
import styled from "styled-components";
import Icon from "./Icons";
import Link from "next/link";
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
              <Button
                type="button"
                onClick={() => handleRemoveIngredients(index)}
              >
                <Icon name="delete" color="#85895e" size="sm" />
              </Button>
            )}
          </InputGroup>
        ))}
        <Button type="button" onClick={handleAddIngredients}>
          <Icon name="add" color="#85895e" size="sm" />
        </Button>
      </section>
      <section>
        <Label htmlFor="preparation">Preparation:</Label>
        <Textarea
          id="preparation"
          name="preparation"
          placeholder={isEditMode ? "" : "Enter preparation steps"}
          defaultValue={isEditMode ? defaultData.preparation : ""}
        />
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
          <DefaultOption value="">--Please select a symptom--</DefaultOption>
          {symptoms.map((symptom, index) => (
            <Option key={index} value={symptom}>
              {symptom}
            </Option>
          ))}
        </Select>

        {selectedSymptoms.map((selectedSymptom, index) => (
          <InputGroup key={index}>
            <Input type="text" value={selectedSymptom} readOnly />

            {selectedSymptoms.length > 1 && (
              <Button type="button" onClick={() => handleRemoveSymptom(index)}>
                <Icon
                  name="delete"
                  color="#85895e"
                  aria-label="Remove symptom"
                  size="sm"
                />
              </Button>
            )}
          </InputGroup>
        ))}
      </section>

      {isEditMode ? (
        <>
          <Link href={`/remedy/${defaultData.id}`}>Cancel</Link>
          <SubmitButton type="submit">Save</SubmitButton>
        </>
      ) : (
        <SubmitButton type="submit">Submit</SubmitButton>
      )}
    </Form>
  );
}

const SubmitButton = styled.button`
  width: 100px;
  height: 40px;
  font-size: 1rem;
  background-color: var(--background-color-button);
  color: var(--color-button);
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #6d7250;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(133, 137, 94, 0.3);
  }

  &:active {
    background-color: #9da37b;
  }
`;

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

const Button = styled.button`
  width: 35px;
  height: 35px;
  font-size: 1rem;
  background-color: #85895e;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
const Option = styled.option`
  color: var(--text-color);
`;

const DefaultOption = styled.option`
  color: grey;
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
`;*/
