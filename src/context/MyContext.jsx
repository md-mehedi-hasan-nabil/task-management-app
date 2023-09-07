import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AUTH_DB = "auth";
const TASKS_DB = "tasks";
const USERS_DB = "users";

export const MyContext = createContext({});

export default function MyProvider({ children }) {
  const [loading, setLoading] = useState(true);
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
    const users = getData(USERS_DB);
    if (users) {
      const user = users.find(
        (user) => user.password === password && user.username === username
      );

      if (user) {
        setAuth(user);
        setData(AUTH_DB, user);
        return success("Login successfull", user);
      } else {
        return error("Username or password is wrong");
      }
    }
  }

  function createAccount({ username, password, bio, image }) {
    const user = { userId: uuidv4(), username, password, bio, image };

    const users = getData(USERS_DB);
   
    if (users) {
      setData(USERS_DB, JSON.stringify([...users, user]));

      return {
        success: true,
        message: "New account create successful.",
      };
    } else {
      setData(USERS_DB, JSON.stringify([user]));

      return {
        success: true,
        message: "New account create successful.",
      };
    }
  }

  /**
   *
   * @param {string} priority
   * @returns {string}
   */
  function getPriorityColor(priority) {
    let color = "";
    if (priority === "high") {
      color = "bg-red-600";
    } else if (priority === "medium") {
      color = "bg-blue-600";
    } else {
      // for low
      color = "bg-yellow-600";
    }
    return color;
  }

  function addNewTask(task) {
    const auth_user = getData(AUTH_DB);

    if (auth_user) {
      const { username, userId, image } = auth_user;
      const { title, description, priority, finishDate } = task;
      const color = getPriorityColor(priority);

      const newTask = {
        id: uuidv4(),
        title,
        description,
        createdAt: new Date().toLocaleDateString(),
        priority,
        color,
        finishDate,
        status: "pending",
        user: {
          userId,
          username,
          image,
        },
        team_members: [],
      };

      const tasks = getData(TASKS_DB);

      if (tasks) {
        setData(TASKS_DB, [...tasks, newTask]);
        return success("Task add successfull.", newTask);
      } else {
        setData(TASKS_DB, [newTask]);
        return success("Task add successfull.", newTask);
      }
    } else {
      return error("unauthorised");
    }
  }

  function getTasks() {
    return getData(TASKS_DB) ? getData(TASKS_DB) : [];
  }

  function getUsers() {
    return getData(USERS_DB) ? getData(USERS_DB) : [];
  }

  // function addTeamMember() {}

  useEffect(() => {
    // get data form localstore and initilize state as default
    setLoading(true);
    const loginUserInfo = getData(AUTH_DB);

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
    addNewTask,
    getTasks,
    getUsers,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
