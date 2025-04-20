import { toast } from "sonner";

export const copyToClipboard = (content: string) => {
  if (content) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success("Copied Successfully!");
      })
      .catch((err) => {
        toast.error("Failed to copy!");
        console.error("Failed to copy: ", err);
      });
  }
};
