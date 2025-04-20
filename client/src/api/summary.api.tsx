import { toast } from "sonner";

const generateSummary = async (url: string): Promise<string> => {
  const formData = new FormData();
  formData.append("url", url);

  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/generate/summary",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate summary");
    }

    const data = await response.json();
    toast.success("Summary Generated Succesfully!");
    return data.data;
  } catch (error) {
    toast.error("Something went wrong!");
    console.error("Error generating summary:", error);
    return "Something went wrong";
  }
};

const reGenerateSummary = async (oldSummary: string): Promise<string> => {
  const formData = new FormData();
  formData.append("oldSummary", oldSummary);

  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/generate/re-summary",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate summary");
    }

    const data = await response.json();
    toast.success("Summary Re-Generated Succesfully!");
    return data.data;
  } catch (error) {
    toast.error("Something went wrong!");
    console.error("Error generating summary:", error);
    return "Something went wrong";
  }
};

export { generateSummary, reGenerateSummary };
