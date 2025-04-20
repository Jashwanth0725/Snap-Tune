// import { useAuth } from "@/auth/firebase.auth";
import { toast } from "sonner";
// const { user } = useAuth();

export const saveSummary = async (
  userId: string,
  link: string,
  summary: string
): Promise<string> => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("url", link);
  formData.append("summary", summary);

  try {
    const response = await fetch("http://localhost:8000/api/v1/users/caption", {
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
