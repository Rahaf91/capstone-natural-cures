import { useState } from "react";
import styled from "styled-components";
import Icon from "./Icons";
import { StyledButton } from "./StyledButtons";
import { StyledLinks } from "./StyledLinks";
import { IconButton } from "./StyledButtons";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
export default function RemedyForm({
  onAddRemedy,
  isEditMode,
  onEditRemedy,
  defaultData = {},
}) {
  const router = useRouter();
  const { data: remedies } = useSWR("/api/remedies");
  const [ingredients, setIngredients] = useState(
    isEditMode && defaultData.ingredients ? defaultData.ingredients : [""]
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState(
    isEditMode && defaultData.symptoms ? defaultData.symptoms : []
  );

  const [selectedCategory, setSelectedCategory] = useState(
    isEditMode && defaultData.category ? defaultData.category : ""
  );

  const [filteredSymptoms, setFilteredSymptoms] = useState([]);

  const categories = [...new Set(remedies.map((remedy) => remedy.category))];

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
      event.target.value = "";
    }
  }

  function handleSelectCategory(event) {
    const { value } = event.target;

    if (value) {
      const symptoms = [
        ...new Set(
          remedies
            .filter((remedy) => remedy.category === value)
            .flatMap((remedy) => remedy.symptoms)
        ),
      ];
      setSelectedCategory(value);
      setSelectedSymptoms([]);
      setFilteredSymptoms(symptoms);
    } else {
      setSelectedCategory("");
      setSelectedSymptoms([]);
      setFilteredSymptoms([]);
    }
  }

  function handleRemoveSymptom(index) {
    const newSymptoms = selectedSymptoms.filter(
      (_, currentIndex) => currentIndex !== index
    );
    setSelectedSymptoms(newSymptoms);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    let imageUrl = "";
    if (!isEditMode) {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const { url } = await response.json();
      imageUrl = url;
    }

    const remedyData = {
      ...formObject,
      ingredients: ingredients,
      symptoms: selectedSymptoms,
      category: selectedCategory,
    };

    isEditMode
      ? (onEditRemedy(remedyData), router.push(`/remedy/${defaultData._id}`))
      : (onAddRemedy({ ...remedyData, imageUrl }),
        router.push(`/categories/${selectedCategory}`));

    event.target.reset();
    setIngredients([""]);
    setSelectedSymptoms([]);
    setSelectedCategory("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <BackButtonWrapper>
        <StyledLinks $variant="back" href="/">
          <Image src="/back.svg" alt="back icon" width={60} height={60} />
        </StyledLinks>
      </BackButtonWrapper>
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
                  color="#fff"
                  size="lg"
                  aria-label="Remove ingredient"
                />
              </IconButton>
            )}
          </InputGroup>
        ))}
        <IconButton type="button" onClick={handleAddIngredients} $fullWidth>
          <Icon name="add" color="#fff" size="lg" aria-label="add ingredient" />
        </IconButton>
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
        <Label htmlFor="category" aria-label="Category, required">
          Category:<span>*</span>
        </Label>
        <Select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleSelectCategory}
          required
        >
          <option value="" disabled>
            Please select a category
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </section>
      <section>
        <Label htmlFor="symptoms" aria-label="Symptoms, required">
          Symptoms:<span>*</span>
        </Label>

        <Select id="symptoms" onChange={handleSelectSymptom}>
          <option value="" hidden>
            Please select a symptom
          </option>
          {filteredSymptoms.map((symptom, index) => (
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
                  color="#fff"
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
          <ButtonsContainer>
            <StyledButton variant="primary" type="submit">
              Save
            </StyledButton>
            <StyledLinks variant="cancel" href={`/remedy/${defaultData._id}`}>
              Cancel
            </StyledLinks>
          </ButtonsContainer>
        </>
      ) : (
        <>
          <section>
            <label htmlFor="cover" aria-label="cover, required">
              Image upload:<span>*</span>
            </label>
            <StyledFileInput
              name="cover"
              id="cover"
              accept="image/*"
              required
            />
          </section>
          <ButtonsContainer>
            <StyledButton variant="primary" type="submit">
              Submit
            </StyledButton>
            <StyledLinks variant="cancel" href="/">
              Cancel
            </StyledLinks>
          </ButtonsContainer>
        </>
      )}
    </Form>
  );
}

const Form = styled.form`
  position: relative;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 50%;
  gap: 0.5rem;
  background-color: var(--background-color);
  box-shadow: var(----header-card-box-shadow);
  padding: 1rem;
  font-family: var(--font-adventPro);
  @media (max-width: 600px) {
    max-width: 100%;
    padding: 1rem;
    box-shadow: none;
  }
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
  box-shadow: var(----header-card-box-shadow);

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
  box-shadow: var(----header-card-box-shadow);
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
  box-shadow: var(--header-card-box-shadow);
  &:focus {
    border-color: #85895e;
    outline: none;
  }
`;

const StyledFileInput = styled.input.attrs({
  type: "file",
})`
  padding: 1rem;
  border: none;
  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 600px) {
    align-items: center;
    flex-direction: column;
  }
`;
const BackButtonWrapper = styled.div`
  position: absolute;
  top: -4rem;
  left: 0;
  z-index: 10;
`;
