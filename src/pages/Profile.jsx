import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { auth, logout } = useContext(MyContext);

  function handleLogout() {
    const result = logout();
    if (result?.success) {
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1499336315816-097655dcfbda)",
        }}
        className="mt-4 h-56 bg-slate-200 rounded-lg bg-center bg-cover bg-no-repeat"
      ></div>
      <img
        className="w-32 h-32 mx-auto -mt-16 rounded-full object-cover ring-4 ring-blue-500"
        src={auth?.image}
        alt="avatar"
      />
      <div>
        <h2 className="text-2xl font-semibold capitalize text-center my-5">
          {auth?.username}
        </h2>
        <div className="text-center">
          <p className="capitalize font-medium text-xl mb-3">
            Hi! I am {auth?.username}. {auth?.bio}
          </p>
          <p className=" text-lg px-4 md:px-20">
            I am interested in web technologies. I am a front-end web developer.
            Create a website's graphical user interface using HTML, CSS and
            JavaScript. In my spare/free time, I like to hangout with my
            friends.
          </p>
        </div>

        <div className="text-center mt-5">
          <p className="text-xl">
            <b>Task:</b> 3
          </p>
          <button
            onClick={handleLogout}
            className="mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
