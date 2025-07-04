import { toast } from "sonner";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const generateCaptions = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch(`${SERVER_URL}/api/v1/generate/caption`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to generate caption");
    }

    const data = await response.json();
    toast.success("Caption Generated Succesfully!");
    return data.data;
  } catch (error) {
    toast.error("Something went wrong!");
    console.error("Error generating caption:", error);
    return "Something went wrong";
  }
};

const generateAnotherCaption = async (oldCaption: string): Promise<string> => {
  const formData = new FormData();
  formData.append("oldCaption", oldCaption);

  try {
    const response = await fetch(`${SERVER_URL}/api/v1/generate/re-caption`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to generate caption");
    }

    const data = await response.json();
    toast.success("Caption Re-Generated Succesfully!");
    return data.data;
  } catch (error) {
    toast.error("Something went wrong!");
    console.error("Error generating caption:", error);
    return "Something went wrong";
  }
};

export { generateCaptions, generateAnotherCaption };
