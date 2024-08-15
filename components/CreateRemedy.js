import { useState } from "react";
import symptoms from "../assets/symptoms.json";

export default function AddRemedy() {
  const [inputsFields, setInputFields] = useState([
    { title: "", ingredients: [""], preparation: "", usage: "", symptoms: [] },
  ]);

  function handleChange(event) {
    const { name, value } = event.target;

    setInputFields((inputsFields) => {
      return {
        ...inputsFields,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newRemedy = {
      title: inputsFields.title,
      ingredients: inputsFields.ingredients,
      symptoms: inputsFields.symptoms,
      preparation: inputsFields.preparation,
      usage: inputsFields.usage,
      imageUrl: "/placeholder.jpeg",
    };
  }

  return <form onSubmit={handleSubmit}></form>;
}
