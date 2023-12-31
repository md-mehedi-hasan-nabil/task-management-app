import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import toast from "react-hot-toast";
import { db } from "../db/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function Login() {
  const navigate = useNavigate();
  const users = useLiveQuery(() => db.users.toArray());
  const { setAuth } = useContext(MyContext);

  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    const { username, password } = data;

    const user = users?.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const {
        id,
        username: storeUsername,
        password: storePassword,
        bio,
        image,
      } = user;

      const obj = {
        id: id + "-" + storeUsername,
        username: storeUsername,
        password: storePassword,
        bio,
        image,
      };

      const resultId = await db.auth.add(obj);
      if (resultId) {
        setAuth(obj);
        toast.success("Account login successful.");
        navigate("/");
      } else {
        toast.error("Something is wrong.");
      }
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-96 mx-auto border p-8 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link to="/">
            <h2 className="text-2xl mb-5 font-semibold text-slate-800">
              Login to your account
            </h2>
          </Link>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type username..."
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type password..."
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Login
          </button>
          <div>
            <p className="mt-2">
              Donot have an account?{" "}
              <Link
                className="text-blue-600 hover:text-blue-700"
                to="/register"
              >
                Signup
              </Link>{" "}
              now
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
