import { useState } from "react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/utils/clipboard";
import { useAuth } from "@/auth/firebase.auth";
import { saveSummary } from "@/db/summary.db";
import { generateSummary, reGenerateSummary } from "@/api/summary.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Summarize() {
  const [link, setLink] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const userId = user?.uid ?? "";
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (!link) return;
    setGenerating(true);
    const summary = await generateSummary(link); // Replace with real API
    setSummaryText(summary);
    setSummaryGenerated(true);
    setGenerating(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 sm:mt-10 gap-4 p-4 sm:p-10 border border-dashed border-blue-500 rounded-[10px] bg-blue-50">
      {/* YouTube Link Input */}
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="https://youtube.com/..."
        className="w-full max-w-xs sm:max-w-sm px-4 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Generate Button */}
      <div className="w-full max-w-xs sm:max-w-sm">
        <Button
          className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600 transition w-full text-sm sm:text-base"
          disabled={!link || generating}
          onClick={handleSummarize}
        >
          {generating ? "Summarizing..." : "Generate Summary"}
        </Button>
      </div>

      {/* Summary Output */}
      {summaryGenerated && (
        <div className="w-full max-w-xs sm:max-w-sm space-y-3">
          <p className="text-black font-medium text-sm sm:text-base bg-white p-4 rounded border border-gray-300">
            {summaryText}
          </p>

          <div className="flex flex-row gap-2 justify-center">
            <Button
              className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
              onClick={() => {
                if (!user) {
                  toast.error("Please login!");
                  navigate("/login");
                  return;
                }

                setSaving(true);
                saveSummary(userId, link, summaryText); // Save like caption
                setTimeout(() => setSaving(false), 2000);
              }}
            >
              {saving ? "Saving..." : "Save Summary"}
            </Button>

            <Button
              className="bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
              onClick={async () => {
                const newSummary = await reGenerateSummary(summaryText);
                setSummaryText(newSummary);
              }}
            >
              Regenerate
            </Button>

            <Button
              className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition"
              onClick={() => copyToClipboard(summaryText)}
            >
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
