import { useState } from "react";
import { useRouter } from "next/router";
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

  /*function handleInputChange(index, event) {
    const { name, value } = event.target;
    const fields = [...formInputs];
    fields[index][name] = value;
    setInputs(fields);
  }*/

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

  return (
    <form onSubmit={handleSubmit}>
      <lable htmlFor="title">Title</lable>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter remedy title"
        value={formInputs.title}
        onChange={handleChange}
        required
      ></input>

      <label htmlFor="ingredients-group" aria-label="Ingredients, required">
        Ingredients:
      </label>
      {formInputs.ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            value={ingredient}
            onChange={(event) =>
              handleIngredientChange(index, event.target.value)
            }
            placeholder="Enter ingredient"
            required
          />
          <button type="button" onClick={() => handleRemoveIngredients(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddIngredients}>
        Add Ingredient
      </button>

      <label htmlFor="preparation">Preparation:</label>
      <textarea
        id="preparation"
        name="preparation"
        value={formInputs.preparation}
        placeholder="Enter preparation steps"
      />

      <label htmlFor="usage">Usage:</label>
      <textarea
        id="usage"
        name="usage"
        value={formInputs.usage}
        placeholder="Enter usage instructions"
      />
      <button type="submit">Save</button>
      <button type="submit" onClick={() => router.push(`/remedy/${id}`)}>
        Cancel
      </button>
    </form>
  );
}
