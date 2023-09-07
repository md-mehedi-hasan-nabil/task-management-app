import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";

export default function Register() {
  const { createAccount } = useContext(MyContext);

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const { username, password, bio, image: imageFile } = data;

    let reader = new FileReader();
    reader.onloadend = function () {
      const result = createAccount({
        username,
        password,
        bio,
        image: reader.result,
      });
      console.log(result);
    };
    reader.readAsDataURL(imageFile[0]);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full md:w-[30rem] mx-auto border p-6 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link to="/">
            <h2 className="text-2xl my-5 font-semibold text-slate-800">
              Create your account
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
          <div className="mb-6">
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bio
            </label>
            <textarea
              {...register("bio")}
              id="bio"
              rows="4"
              name="bio"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type bio..."
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="user_avatar"
            >
              Upload file
            </label>
            <input
              {...register("image")}
              name="image"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              id="user_avatar"
              type="file"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
          >
            Create an account
          </button>

          <p className="mt-2">
            Already have an account{" "}
            <Link className="text-blue-600 hover:text-blue-700" to="/login">
              login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
