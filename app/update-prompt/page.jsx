"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!promptId) return;

    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (error) {
        console.error("Erreur lors de la récupération du prompt :", error);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      alert("Missing PromptId!");
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
      });

      if (response.ok) router.push("/");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
