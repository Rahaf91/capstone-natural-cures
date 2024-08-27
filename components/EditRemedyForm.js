import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledButton } from "./StyledButton";
export default function EditRemedyForm({ onSave, remedy }) {
  const router = useRouter();
  const { id } = router.query;

  const [formInputs, setFormInputs] = useState({
    title: remedy.title,
    ingredients: remedy.ingredients,
    preparation: remedy.preparation,
    usage: remedy.usage,
    symptoms: remedy.symptoms,
  });

  function handleChange(event) {
    setFormInputs({ ...formInputs, [event.target.name]: event.target.value });
  }

  function handleIngredientChange(index, value) {
    const newIngredients = [...formInputs.ingredients];
    newIngredients[index] = value;
    setFormInputs({ ...formInputs, ingredients: newIngredients });
  }

  function handleAddIngredients() {
    setFormInputs({
      ...formInputs,
      ingredients: [...formInputs.ingredients, ""],
    });
  }

  function handleRemoveIngredients(index) {
    if (formInputs.ingredients.length > 1) {
      const newIngredients = formInputs.ingredients.filter(
        (_, currentIndex) => currentIndex !== index
      );
      setFormInputs({ ...formInputs, ingredients: newIngredients });
    }
  }

  function handleSymptomChange(index, value) {
    const newSymptoms = [...formInputs.symptoms];
    newSymptoms[index] = value;
    setFormInputs({ ...formInputs, symptoms: newSymptoms });
  }

  function handleAddSymptoms() {
    setFormInputs({ ...formInputs, symptoms: [...formInputs.symptoms, ""] });
  }

  function handleRemoveSymptoms(index) {
    if (formInputs.symptoms.length > 1) {
      const newSymptoms = formInputs.symptoms.filter(
        (_, currentIndex) => currentIndex !== index
      );
      setFormInputs({ ...formInputs, symptoms: newSymptoms });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedRemedy = {
      ...formInputs,
    };
    onSave(updatedRemedy);
  }

  const { title, ingredients, preparation, usage, symptoms } = formInputs;
  return (
    <StyledForm onSubmit={handleSubmit} aria-labelledby="form">
      <label htmlFor="title" aria-label="Title, required">
        Title:<span>*</span>
      </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter remedy title"
        value={title}
        onChange={handleChange}
        required
      ></input>

      <FormSection>
        <label htmlFor="ingredients-group" aria-label="Ingredients, required">
          Ingredients:<span>*</span>
        </label>
        {ingredients.map((ingredient, index) => (
          <section key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(event) =>
                handleIngredientChange(index, event.target.value)
              }
              placeholder="Enter ingredient"
              required
            />
            <StyledButton
              type="button"
              aria-label="remove ingredient"
              onClick={() => handleRemoveIngredients(index)}
              disabled={ingredients.length === 1}
              $variant="danger"
            >
              Remove
            </StyledButton>
          </section>
        ))}
        <StyledButton
          type="button"
          aria-label="add ingredient"
          onClick={handleAddIngredients}
          $variant="primary"
        >
          Add Ingredient
        </StyledButton>
      </FormSection>

      <label htmlFor="preparation" aria-label="preparation">
        Preparation:
      </label>
      <textarea
        id="preparation"
        name="preparation"
        value={preparation}
        onChange={handleChange}
        placeholder="Enter preparation steps"
      />

      <label htmlFor="usage" aria-label="usage">
        Usage:
      </label>
      <textarea
        id="usage"
        name="usage"
        value={usage}
        onChange={handleChange}
        placeholder="Enter usage instructions"
      />

      <FormSection>
        <label htmlFor="symptoms-group" aria-label="Symptoms, required">
          Symptoms:<span>*</span>
        </label>
        {symptoms.map((symptom, index) => (
          <section FormSection key={index}>
            <input
              type="text"
              value={symptom}
              onChange={(event) =>
                handleSymptomChange(index, event.target.value)
              }
              placeholder="Enter symptom"
              required
            />
            <StyledButton
              type="button"
              aria-label="remove symptom"
              onClick={() => handleRemoveSymptoms(index)}
              disabled={symptoms.length === 1}
              $variant="danger"
            >
              Remove
            </StyledButton>
          </section>
        ))}
        <StyledButton
          type="button"
          aria-label="add symptom"
          onClick={handleAddSymptoms}
          $variant="primary"
        >
          Add Symptom
        </StyledButton>
      </FormSection>

      <ButtonContainer>
        <StyledButton type="submit" $variant="success">
          Save
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => router.push(`/remedy/${id}`)}
          $variant="secondary"
        >
          Cancel
        </StyledButton>
      </ButtonContainer>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 70vh;
  margin: 0 auto;
  gap: 0.5rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
