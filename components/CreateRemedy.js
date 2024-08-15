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
  }
}
