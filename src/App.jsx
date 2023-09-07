import 'flowbite';
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
