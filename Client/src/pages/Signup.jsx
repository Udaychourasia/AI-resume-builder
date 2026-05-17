import { useState } from "react";

import axios from "axios";

import {

  useNavigate,

} from "react-router-dom";

import toast from "react-hot-toast";


const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "https://ai-resume-builder-l94l.onrender.com/api/auth/signup",

        formData

      );

      // 🔥 SAVE TOKEN

      localStorage.setItem(

        "token",

        response.data.token

      );

      // 🔥 SAVE USER

      localStorage.setItem(

        "user",

        JSON.stringify(response.data.user)

      );

      toast.success("Signup Successful 😎");

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error("Signup Failed");

    }

  };


  return (

    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-5">

      <form

        onSubmit={handleSubmit}

        className="bg-zinc-800 p-8 lg:p-10 rounded-2xl w-full max-w-[400px] shadow-lg"

      >

        <h1 className="text-white text-3xl font-bold mb-6 text-center">

          Signup 🚀

        </h1>


        <input

          type="text"

          name="name"

          placeholder="Enter name"

          onChange={handleChange}

          className="w-full p-3 mb-4 rounded-lg bg-zinc-700 text-white outline-none"

        />


        <input

          type="email"

          name="email"

          placeholder="Enter email"

          onChange={handleChange}

          className="w-full p-3 mb-4 rounded-lg bg-zinc-700 text-white outline-none"

        />


        <input

          type="password"

          name="password"

          placeholder="Enter password"

          onChange={handleChange}

          className="w-full p-3 mb-5 rounded-lg bg-zinc-700 text-white outline-none"

        />


        <button className="w-full bg-blue-500 py-3 rounded-lg text-white hover:bg-blue-600 font-semibold">

          Signup

        </button>

      </form>

    </div>

  );

};

export default Signup;