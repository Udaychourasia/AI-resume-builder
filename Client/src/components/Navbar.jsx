import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";


const Navbar = () => {

  const navigate = useNavigate();

  // 🔥 GET USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // 🔥 LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logout Successful");

    navigate("/login");

  };

  return (

    <nav className="fixed top-0 left-0 w-full z-50 flex flex-col lg:flex-row items-center justify-between px-5 lg:px-10 py-5 bg-black/20 backdrop-blur-md border-b border-white/10 text-white gap-5">
      {/* 🔥 LOGO */}

      <h1 className="text-2xl font-bold text-center">

        AI Resume Builder 🚀

      </h1>


      {/* 🔥 NAVIGATION */}

      <div className="flex flex-wrap items-center justify-center gap-3">

        <Link to="/">

          <button className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 text-sm lg:text-base">

            Home

          </button>

        </Link>


        <Link to="/dashboard">

          <button className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 text-sm lg:text-base">

            Dashboard

          </button>

        </Link>


        {/* 🔥 IF USER LOGGED IN */}

        {

          user ? (

            <>

              {/* 🔥 USER NAME */}

              <div className="bg-zinc-800 px-4 py-2 rounded-lg text-sm lg:text-base">

                👋 {user.name}

              </div>


              {/* 🔥 LOGOUT */}

              <button

                onClick={handleLogout}

                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-sm lg:text-base"

              >

                Logout

              </button>

            </>

          ) : (

            <>

              {/* 🔥 LOGIN */}

              <Link to="/login">

                <button className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 text-sm lg:text-base">

                  Login

                </button>

              </Link>


              {/* 🔥 SIGNUP */}

              <Link to="/signup">

                <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 text-sm lg:text-base">

                  Signup

                </button>

              </Link>

            </>

          )

        }

      </div>

    </nav>

  );

};

export default Navbar;