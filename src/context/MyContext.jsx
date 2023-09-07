import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const MyContext = createContext(null);

export default function MyProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(null);

  /**
   *
   * @param {string} key
   * get data from localStorage
   */
  function getData(key) {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   * set data to localStorage
   */
  function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   *
   * @param {string} message
   * @param {string} data
   * @returns {object}
   *
   */
  function success(message, data = {}) {
    return {
      success: true,
      message,
      data,
    };
  }

  /**
   *
   * @param {string} message
   * @param {string} data
   * @returns {object}
   *
   */
  function error(message) {
    return {
      success: false,
      message,
    };
  }

  /**
   *
   * @param {string} username
   * @param {string} password
   * @returns
   */
  function login(username, password) {
    const users = getData("users");
    if (users) {
      const user = users.find(
        (user) => user.password === password && user.username === username
      );

      if (user) {
        setAuth(user);
        setData("auth", user);
        return success("Login successfull", user);
      } else {
        return error("Username or password is wrong");
      }
    }
  }

  function createAccount({ username, password, bio, image }) {
    setLoading(true);
    const user = { userId: uuidv4(), username, password, bio, image };

    const users = getData("users");
    console.log(users);
    if (users) {
      setData("users", JSON.stringify([...users, user]));
      setLoading(false);
      return {
        success: true,
        message: "New account create successful.",
      };
    } else {
      setData("users", JSON.stringify([user]));
      setLoading(false);
      return {
        success: true,
        message: "New account create successful.",
      };
    }
  }

  useEffect(() => {
    // get data form localstore and initilize state as default
    setLoading(true);
    const loginUserInfo = getData("auth");
  
    if (loginUserInfo) {
      setAuth(loginUserInfo);
      setLoading(false);
    } else {
      setAuth(null);
      setLoading(false);
    }
  }, []);

  const state = {
    loading,
    createAccount,
    login,
    auth,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
