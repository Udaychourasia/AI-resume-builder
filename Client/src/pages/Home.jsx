import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";


const Home = () => {

  const navigate = useNavigate();

  return (

    <>

      {/* 🔥 NAVBAR */}

      <Navbar />


      {/* 🔥 HERO SECTION */}

      <div className="relative min-h-screen bg-[#0f0f17] overflow-hidden flex items-center justify-center px-5">

        {/* 🔥 Animated Background Blobs */}

        <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse"></div>

        <div className="absolute w-[400px] h-[400px] bg-blue-500/30 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse"></div>

        <div className="absolute w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl top-[40%] left-[45%] animate-bounce"></div>


        {/* 🔥 HERO CONTENT */}

        <div className="relative z-10 text-center max-w-4xl">

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">

            AI Resume Builder 🚀

          </h1>


          <p className="text-zinc-300 text-lg md:text-2xl mb-10">

            Build professional resumes using AI,
            ATS analysis and modern templates.

          </p>


          <button

            onClick={() => navigate("/resume")}

            className="bg-blue-500 hover:bg-blue-600 transition-all px-8 py-4 rounded-2xl text-xl font-semibold shadow-2xl hover:scale-105"

          >

            Get Started

          </button>

        </div>

      </div>

    </>

  );

};

export default Home;