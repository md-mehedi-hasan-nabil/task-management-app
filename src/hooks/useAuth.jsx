import { useContext } from "react";
import { MyContext } from "../context/MyContext";

export default function useAuth() {
    const { auth } = useContext(MyContext);

    if (auth && auth?.username) {
        return true;
    } else {
        return false;
    }
}