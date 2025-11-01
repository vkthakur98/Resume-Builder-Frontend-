import React, { useState } from "react";

export default function ProfileSection() {
  const [profileText, setProfileText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateAI = async () => {
    setLoading(true);
    
    // Replace this with actual API call later
    setTimeout(() => {
      setProfileText("Experienced frontend developer with a passion for creating responsive, user-friendly interfaces using React and Tailwind CSS.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <label className="block text-lg font-medium text-gray-700">
        Professional Profile
      </label>
      <textarea
        className="w-full p-3 border rounded-lg resize-none h-40"
        placeholder="Write something about yourself..."
        value={profileText}
        onChange={(e) => setProfileText(e.target.value)}
      />
      <button
        onClick={handleGenerateAI}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate with AI ✨"}
      </button>
    </div>
  );
}
