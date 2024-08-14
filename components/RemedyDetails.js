import Image from "next/image";
import Link from "next/link";

export default function RemedyDetails({ remedy }) {
  return (
    <>
      <h2>{remedy.title}</h2>
      <Image
        src={remedy.imageUrl}
        alt={remedy.title}
        width={250}
        height={250}
      />
      <h3>Information</h3>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {remedy.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>
        <strong>Preparation:</strong>
      </p>
      {remedy.preparation}

      <p>
        <strong>Usage:</strong>
      </p>
      {remedy.usage}
      <p>
        <strong>Symptoms:</strong>
      </p>
      <ul>
        {remedy.symptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>
      <Link href="/"> &larr; Back</Link>
    </>
  );
}
