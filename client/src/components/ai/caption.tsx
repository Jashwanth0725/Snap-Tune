import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { generateCaptions, generateAnotherCaption } from "@/api/caption.api";
import { copyToClipboard } from "@/utils/clipboard";
import { saveCaption } from "@/db/caption.db";
import { useAuth } from "@/auth/firebase.auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Caption() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [captionGenerated, setCaptionGenerated] = useState(false);
  const [captionText, setCaptionText] = useState("");
  const [generating, setGenerating] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const userId = user?.uid ?? "";

  const countRef = useRef<number>(10);
  const [generationCount2, setGenerationCount] = useState<number>(10);

  // Load count from localStorage only on first mount
  useEffect(() => {
    const storedCount = localStorage.getItem("generationCount2");
    const parsedCount = storedCount ? parseInt(storedCount) : 10;
    setGenerationCount(parsedCount);
    countRef.current = parsedCount;
  }, []);

  // Update both state and localStorage together
  const updateGenerationCount = (newCount: number) => {
    setGenerationCount(newCount);
    countRef.current = newCount;
    localStorage.setItem("generationCount2", newCount.toString());
  };

  // Decrement and update storage
  const decrementCount = () => {
    const updated = countRef.current - 1;
    updateGenerationCount(updated);
    return updated;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setCaptionGenerated(false);
      setCaptionText("");
    }
  };

  const generateCaption = async () => {
    if (!image) return;

    if (countRef.current <= 0) {
      toast.error("Please subscribe to continue");
      navigate("/pricing");
      return;
    }

    if (countRef.current === 5 && !user?.uid) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    setGenerating(true);
    decrementCount();

    try {
      const caption = await generateCaptions(image);
      setCaptionText(caption);
      setCaptionGenerated(true);
    } catch (error) {
      toast.error("Error generating caption");
    } finally {
      setGenerating(false);
    }
  };

  const generateAnotherCaptionHandler = async () => {
    if (countRef.current <= 0) {
      navigate("/pricing");
      return;
    }

    if (countRef.current === 5 && !user?.uid) {
      navigate("/login");
      return;
    }

    decrementCount();

    try {
      const newCaption = await generateAnotherCaption(captionText);
      setCaptionText(newCaption);
    } catch (err) {
      toast.error("Error regenerating caption");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 sm:mt-10 gap-4 p-4 sm:p-10 border border-dashed border-blue-500 rounded-[10px] bg-blue-50">
      {/* Upload */}
      <label className="cursor-pointer text-blue-600 font-medium border border-blue-500 px-3 sm:px-4 py-2 rounded hover:bg-blue-100 transition text-sm sm:text-base">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* Preview */}
      {previewUrl && (
        <div className="w-full max-w-xs sm:max-w-sm">
          <img
            src={previewUrl}
            alt="Preview"
            className="rounded shadow-md w-full object-cover"
          />
        </div>
      )}

      {/* Generate Button */}
      <div className="w-full max-w-xs sm:max-w-sm">
        <Button
          className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600 transition w-full text-sm sm:text-base"
          disabled={!image || generating}
          onClick={generateCaption}
        >
          {generating
            ? "Generating..."
            : image
            ? `Generate Caption (Remaining: ${generationCount2})`
            : "Upload an image first"}
        </Button>
      </div>

      {/* Caption Output */}
      {captionGenerated && (
        <div className="w-full max-w-xs sm:max-w-sm space-y-3">
          <p className="text-black font-medium text-sm sm:text-base bg-white p-4 rounded border border-gray-300">
            {captionText}
          </p>

          <div className="flex flex-row gap-2 justify-center">
            <Button
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
              onClick={() => {
                if (!image) return;

                if (!user) {
                  toast.error("Please login!");
                  navigate("/login");
                  return;
                }

                setSaving(true);
                saveCaption(userId, image, captionText);
                setTimeout(() => setSaving(false), 2000);
              }}
            >
              {saving ? "Saving..." : "Save Caption"}
            </Button>

            <Button
              className="bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
              onClick={generateAnotherCaptionHandler}
            >
              Regenerate
            </Button>

            <Button
              className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition"
              onClick={() => copyToClipboard(captionText)}
            >
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
