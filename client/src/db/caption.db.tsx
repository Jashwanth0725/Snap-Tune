import { toast } from "sonner";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const saveCaption = async (
  userId: string,
  image: File,
  caption: string
): Promise<string> => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("image", image);
  formData.append("caption", caption);

  try {
    const response = await fetch(`${SERVER_URL}/api/v1/users/caption`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      toast.error("Failed to save in database");
      throw new Error("Failed to save in Database");
    }

    const data = await response.json();
    toast.success("Saved Successfully!");
    return data.data;
  } catch (error) {
    toast.error("Something went wrong!");
    console.error("Error saving caption:", error);
    return "Something went wrong";
  }
};
