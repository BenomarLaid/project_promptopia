import { Suspense } from "react";
import UpdatePrompt from "./UpdatePromptComponent";

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<div>Chargement des données...</div>}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default UpdatePromptPage;
