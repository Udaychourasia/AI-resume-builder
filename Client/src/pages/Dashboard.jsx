import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";


const Dashboard = () => {

  const [resumes, setResumes] = useState([]);

  const [selectedResume, setSelectedResume] = useState(null);

  const navigate = useNavigate();

  // 🔥 GET LOGGED IN USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // 🔥 FETCH ALL RESUMES

  useEffect(() => {

    const fetchResumes = async () => {

      try {

        // 🔥 CHECK USER

        if (!user?._id) return;

        const response = await axios.get(
  "https://ai-resume-builder-l94l.onrender.com/api/resume/all"
);

        setResumes(response.data);

      } catch (error) {

        console.log(error);

        toast.error("Failed to fetch resumes");

      }

    };

    fetchResumes();

  }, [user]);


  // 🔥 DELETE RESUME

  const deleteResume = async (id) => {

    try {

      await axios.delete(
        `https://ai-resume-builder-l94l.onrender.com/api/resume/delete/${id}`
      );

      setResumes(
        resumes.filter(
          (resume) => resume._id !== id
        )
      );

      toast.success("Resume Deleted");

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete resume");

    }

  };


  // 🔥 VIEW RESUME

  const viewResume = (resume) => {

    setSelectedResume(resume);

  };


  // 🔥 CLOSE MODAL

  const closeModal = () => {

    setSelectedResume(null);

  };


  return (

    <div className="min-h-screen bg-zinc-900 text-white p-5 lg:p-10">

      {/* 🔥 TOP */}

      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 mb-10">

        <h1 className="text-3xl lg:text-5xl font-bold">

          Dashboard 🚀

        </h1>

        <button

          onClick={() => navigate("/resume")}

          className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold"

        >

          Create Resume

        </button>

      </div>


      {/* 🔥 EMPTY */}

      {

        resumes.length === 0 && (

          <div className="text-center text-zinc-400 mt-20">

            <h2 className="text-2xl font-semibold mb-3">

              No resumes found 😄

            </h2>

            <p>

              Create your first AI resume 🚀

            </p>

          </div>

        )

      }


      {/* 🔥 CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {

          resumes.map((resume) => (

            <div

              key={resume._id}

              className="bg-zinc-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-all"

            >

              <h2 className="text-2xl lg:text-3xl font-bold mb-3 break-words">

                {resume.fullName}

              </h2>

              <p className="text-zinc-400 mb-4 break-words">

                {resume.skills}

              </p>


              <div className="flex flex-wrap gap-3">

               <div className="flex flex-wrap gap-3">

  {/* 🔥 VIEW */}

  <button

    onClick={() => viewResume(resume)}

    className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 font-medium"

  >

    View

  </button>


  {/* 🔥 EDIT ONLY OWNER */}

  {

    user?._id === resume.userId && (

      <button

        onClick={() =>
          navigate("/resume", {
            state: resume,
          })
        }

        className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 font-medium"

      >

        Edit

      </button>

    )

  }

</div>


                {/* 🔥 DELETE ONLY OWNER */}

                {

                  user?._id === resume.userId && (

                    <button

                      onClick={() => deleteResume(resume._id)}

                      className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 font-medium"

                    >

                      Delete

                    </button>

                  )

                }

              </div>

            </div>

          ))

        }

      </div>


      {/* 🔥 MODAL */}

      {

        selectedResume && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">

            <div className="bg-white text-black max-w-2xl w-full rounded-2xl p-6 lg:p-8 relative overflow-y-auto max-h-[90vh]">

              {/* 🔥 CLOSE */}

              <button

                onClick={closeModal}

                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg"

              >

                X

              </button>


              <h2 className="text-3xl lg:text-4xl font-bold mb-6 break-words">

                {selectedResume.fullName}

              </h2>


              <div className="mb-5">

                <h3 className="text-xl lg:text-2xl font-semibold mb-2">

                  Skills

                </h3>

                <p className="break-words">

                  {selectedResume.skills}

                </p>

              </div>


              <div className="mb-5">

                <h3 className="text-xl lg:text-2xl font-semibold mb-2">

                  Education

                </h3>

                <p className="break-words">

                  {selectedResume.education}

                </p>

              </div>


              <div className="mb-5">

                <h3 className="text-xl lg:text-2xl font-semibold mb-2">

                  Experience

                </h3>

                <p className="break-words">

                  {selectedResume.experience}

                </p>

              </div>


              <div>

                <h3 className="text-xl lg:text-2xl font-semibold mb-2">

                  Professional Summary

                </h3>

                <p className="break-words">

                  {selectedResume.summary}

                </p>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

};

export default Dashboard;