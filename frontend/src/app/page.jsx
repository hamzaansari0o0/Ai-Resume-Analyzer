"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("Full-time Job");
  const [expLevel, setExpLevel] = useState("Beginner Level");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first! 📄");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    formData.append("jobType", jobType);
    formData.append("expLevel", expLevel);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/resume/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (error) {
      console.error("Error analyzing resume", error);
      alert("Something went wrong!");
    }
    setLoading(false);
  };

  // Helper function to render badges
  const renderBadges = (items, colorClass) => {
    if (!items || items.length === 0) return <p className="text-gray-500 text-sm italic">None found</p>;
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">AI Resume Analyzer 🚀</h1>
      <p className="text-gray-600 mb-8 font-medium">Powered by Gemini AI & Next.js</p>

      {/* Upload Box */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-100">
        
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description (JD) or Target Role</label>
          <textarea
            rows="4"
            placeholder="Paste the full job description here, or simply write the role (e.g. MERN Stack Developer)..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
            <select 
              value={jobType} 
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Full-time Job">Full-time Job</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
            <select 
              value={expLevel} 
              onChange={(e) => setExpLevel(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="Beginner Level">Beginner</option>
              <option value="Medium Level">Medium</option>
              <option value="Professional Level">Professional</option>
            </select>
          </div>
        </div>

        <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center hover:bg-gray-100 transition-colors">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"
            />
        </div>
        
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? "Analyzing with AI... 🧠" : "Analyze Resume"}
        </button>
      </div>

      {/* Results Box */}
      {result && (
        <div className="mt-10 bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl border border-gray-100">
          
          {/* Header & Score */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-6 border-b border-gray-200">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Analysis Report</h2>
                <p className="text-gray-500 mt-1">
                    Based on {jobDescription ? "Provided Job Description" : "General Industry"} criteria
                </p>
            </div>
            
            <div className={`mt-4 md:mt-0 flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 shadow-sm ${
                result.ATS_score >= 80 ? "border-green-500 bg-green-50 text-green-700" :
                result.ATS_score >= 50 ? "border-yellow-500 bg-yellow-50 text-yellow-700" :
                "border-red-500 bg-red-50 text-red-700"
            }`}>
              <span className="text-3xl font-extrabold">{result.ATS_score}</span>
              <span className="text-xs font-semibold uppercase tracking-wider">Score</span>
            </div>
          </div>

          {/* JD Match Analysis Section (NEW) */}
          {result.jd_match_feedback && (
             <div className="mb-8 p-5 bg-teal-50 border-l-4 border-teal-500 rounded-r-xl shadow-sm">
               <h3 className="text-lg font-bold text-teal-800 flex items-center mb-2">
                 <span className="mr-2">🎯</span> JD Match Analysis
               </h3>
               <p className="text-teal-900 leading-relaxed text-sm">
                 {result.jd_match_feedback}
               </p>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Skills Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">✅</span> Skills Detected
              </h3>
              {renderBadges(result.skills_detected, "bg-green-100 text-green-800 border border-green-200")}
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">❌</span> Missing Skills
              </h3>
              {renderBadges(result.missing_skills, "bg-red-100 text-red-800 border border-red-200")}
            </div>
          </div>

          {/* Action Verbs Section */}
          {result.action_verbs && (
             <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
               <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <span className="mr-2">⚡</span> Action Verbs Analysis
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                 <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Strong Verbs Used</h4>
                    {renderBadges(result.action_verbs.strong_used, "bg-blue-200 text-blue-800")}
                 </div>
                 <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Weak Verbs to Replace</h4>
                    {renderBadges(result.action_verbs.weak_used, "bg-orange-100 text-orange-800 border border-orange-200")}
                 </div>
               </div>

               {result.action_verbs.feedback && (
                  <div className="mt-4 p-3 bg-white bg-opacity-60 rounded-lg text-blue-900 text-sm">
                    <strong>💡 Pro Tip:</strong> {result.action_verbs.feedback}
                  </div>
               )}
             </div>
          )}

          {/* Suggestions Section */}
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <span className="mr-2">💡</span> AI Suggestions
            </h3>
            <ul className="space-y-3">
              {result.suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}