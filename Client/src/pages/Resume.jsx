import { useState, useRef } from "react";

import axios from "axios";

import html2pdf from "html2pdf.js";

import toast from "react-hot-toast";

import {

  useNavigate,

  useLocation,

} from "react-router-dom";


const Resume = () => {

  // 🔥 GET EDIT DATA

  const location = useLocation();

  const editData = location.state;

  // 🔥 FORM STATE

  const [formData, setFormData] = useState({

    fullName: editData?.fullName || "",

    skills: editData?.skills || "",

    education: editData?.education || "",

    experience: editData?.experience || "",

    summary: editData?.summary || "",

  });

  const [loading, setLoading] = useState(false);

  const [atsResult, setAtsResult] = useState("");

  const [error, setError] = useState("");

  const [template, setTemplate] = useState("modern");

  const resumeRef = useRef();

  const navigate = useNavigate();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // 🔥 Generate AI Summary

  const generateSummary = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await axios.post(
        "https://ai-resume-builder-l94l.onrender.com/api/ai/generate-summary",
        {
          role: formData.experience,
          skills: formData.skills,
        }
      );

      setFormData({
        ...formData,
        summary: response.data.summary,
      });

      toast.success("AI Summary Generated");

    } catch (error) {

      console.log(error);

      setError("Failed to generate AI summary");

      toast.error("Failed to generate AI summary");

    } finally {

      setLoading(false);

    }

  };

  // 🔥 ATS SCORE CHECKER

  const checkATSScore = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "https://ai-resume-builder-l94l.onrender.com/api/ai/check-ats",
        {
          skills: formData.skills,
          experience: formData.experience,
          summary: formData.summary,
        }
      );

      setAtsResult(response.data.ats);

      toast.success("ATS Score Generated");

    } catch (error) {

      console.log(error);

      toast.error("Failed to check ATS score");

    } finally {

      setLoading(false);

    }

  };

  // 🔥 Save Resume

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    // 🔥 GET LOGGED IN USER

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    // 🔥 EDIT MODE

    if (editData) {

      await axios.put(

        `https://ai-resume-builder-l94l.onrender.com/api/resume/update/${editData._id}`,

        {

          ...formData,

          userId: user._id,

        }

      );

      toast.success("Resume Updated Successfully 😎");

    }

    // 🔥 CREATE MODE

    else {

      await axios.post(

        "https://ai-resume-builder-l94l.onrender.com/api/resume/create",

        {

          ...formData,

          userId: user._id,

        }

      );

      toast.success("Resume Saved Successfully 😎");

    }

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    toast.error("Failed to save resume");

  }

};

  // 🔥 Download PDF

  const downloadPDF = () => {

    const element = resumeRef.current;

    const options = {
      margin: 0.5,
      filename: "resume.pdf",
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(options).from(element).save();

    toast.success("Downloading Resume PDF");

  };

  return (

    <div className="min-h-screen bg-zinc-900 text-white p-5 lg:p-10">

      {/* 🔥 Heading */}

      <h1 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-10 text-center">
        AI Resume Builder 🚀
      </h1>

      {/* 🔥 Template Selector */}

      <div className="flex flex-wrap justify-center gap-4 mb-8">

        <button
          onClick={() => setTemplate("modern")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all ${
            template === "modern"
              ? "bg-blue-500"
              : "bg-zinc-700"
          }`}
        >
          Modern
        </button>

        <button
          onClick={() => setTemplate("dark")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all ${
            template === "dark"
              ? "bg-purple-500"
              : "bg-zinc-700"
          }`}
        >
          Dark
        </button>

        <button
          onClick={() => setTemplate("minimal")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all ${
            template === "minimal"
              ? "bg-green-500"
              : "bg-zinc-700"
          }`}
        >
          Minimal
        </button>

      </div>

      {/* 🔥 Main Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

        {/* 🔥 LEFT SIDE FORM */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-zinc-800 p-5 lg:p-8 rounded-2xl shadow-lg"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="p-4 rounded-lg bg-zinc-900 outline-none"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="p-4 rounded-lg bg-zinc-900 outline-none"
          />

          <textarea
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="p-4 rounded-lg bg-zinc-900 outline-none h-28"
          />

          <textarea
            name="experience"
            placeholder="Experience / Role"
            value={formData.experience}
            onChange={handleChange}
            className="p-4 rounded-lg bg-zinc-900 outline-none h-28"
          />

          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={handleChange}
            className="p-4 rounded-lg bg-zinc-900 outline-none h-40"
          />

          {/* 🔥 Generate AI Summary */}

          <button
            type="button"
            onClick={generateSummary}
            disabled={loading}
            className={`w-full py-4 rounded-lg transition-all font-semibold ${
              loading
                ? "bg-zinc-600 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600"
            }`}
          >

            {
              loading
                ? "Generating..."
                : "Generate AI Summary"
            }

          </button>

          {/* 🔥 Save Resume */}

          <button
            className="w-full bg-blue-500 py-4 rounded-lg hover:bg-blue-600 font-semibold"
          >
            Save Resume
          </button>

          {/* 🔥 ATS BUTTON */}

          <button
            type="button"
            onClick={checkATSScore}
            className="w-full bg-orange-500 py-4 rounded-lg hover:bg-orange-600 font-semibold"
          >
            Check ATS Score
          </button>

          {/* 🔥 Error */}

          {
            error && (
              <p className="text-red-500 font-medium">
                {error}
              </p>
            )
          }

        </form>

        {/* 🔥 RIGHT SIDE */}

        <div>

          {/* 🔥 Resume Preview */}

          <div
            ref={resumeRef}
            className={`p-5 lg:p-8 rounded-2xl shadow-lg break-words transition-all

            ${
              template === "modern"
                ? "bg-white text-black"

                : template === "dark"
                ? "bg-black text-white border border-zinc-700"

                : "bg-zinc-100 text-black border-l-8 border-green-500"
            }
            `}
          >

            <h2 className="text-2xl lg:text-4xl font-bold mb-6">
              {formData.fullName || "Your Name"}
            </h2>

            <div className="mb-5">

              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Skills
              </h3>

              <p>
                {formData.skills || "Your skills will appear here"}
              </p>

            </div>

            <div className="mb-5">

              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Education
              </h3>

              <p>
                {formData.education || "Your education details"}
              </p>

            </div>

            <div className="mb-5">

              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Experience
              </h3>

              <p>
                {formData.experience || "Your experience details"}
              </p>

            </div>

            <div>

              <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                Professional Summary
              </h3>

              <p>
                {formData.summary || "AI generated summary will appear here"}
              </p>

            </div>

          </div>

          {/* 🔥 Download PDF */}

          <button
            onClick={downloadPDF}
            className="w-full mt-5 bg-green-500 px-6 py-4 rounded-lg hover:bg-green-600 text-white font-semibold"
          >
            Download PDF
          </button>

          {/* 🔥 ATS RESULT */}

          {
            atsResult && (

              <div className="mt-5 bg-zinc-800 p-5 rounded-2xl text-white">

                <h2 className="text-2xl font-bold mb-3">
                  ATS Analysis 🚀
                </h2>

                <pre className="whitespace-pre-wrap text-sm">
                  {atsResult}
                </pre>

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default Resume;