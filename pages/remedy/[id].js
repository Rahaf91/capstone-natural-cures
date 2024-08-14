import RemedyDetails from "@/components/RemedyDetails";
import { useRouter } from "next/router";

export default function RemedyDetailsPage({ remedies }) {
  const router = useRouter();
  const { id } = router.query;

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  if (!currentRemedy) {
    return <p>...loading</p>;
  }

  return <RemedyDetails remedy={currentRemedy} />;
}
