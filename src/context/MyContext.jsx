import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AUTH_DB = "auth";
const TASKS_DB = "tasks";
const USERS_DB = "users";

export const MyContext = createContext({});

export default function MyProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
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

  function getTasks() {
    return getData(TASKS_DB) ? getData(TASKS_DB) : [];
  }

  function getUsers() {
    return getData(USERS_DB) ? getData(USERS_DB) : [];
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

  function logout() {
    const auth = getData(AUTH_DB);
    if (auth) {
      localStorage.removeItem(AUTH_DB);
      return success("Logout success.");
    } else {
      return error("User information is not found.");
    }
  }

  function createAccount({ username, password, bio, image }) {
    const user = { id: uuidv4(), username, password, bio, image };

    const users = getData(USERS_DB);

    if (users) {
      setData(USERS_DB, [...users, user]);

      return {
        success: true,
        message: "New account create successful.",
      };
    } else {
      setData(USERS_DB, [user]);

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
      color = "bg-green-600";
    }
    return color;
  }

  /**
   *
   * @param {object} task
   * @returns object
   */
  function addNewTask(task) {
    const auth_user = getData(AUTH_DB);

    if (auth_user) {
      const { username, id, image } = auth_user;
      const { title, description, priority, due_date } = task;
      const color = getPriorityColor(priority);

      const newTask = {
        id: uuidv4(),
        title,
        description,
        createdAt: new Date().toLocaleDateString(),
        priority,
        color,
        due_date,
        status: "pending",
        user: {
          id,
          username,
          image,
        },
        team_members: [{ id: uuidv4(), username, userId: id, image }],
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

  // function addTeamMember() {}

  /**
   *
   * @param {string} task_id
   * @param {string} status
   */

  function taskStatusChange(task_id, status) {
    const tasks = getData(TASKS_DB);

    if (tasks) {
      const newTasks = tasks.map((task) => {
        if (task.id == task_id) {
          return {
            ...task,
            status,
          };
        } else {
          return task;
        }
      });
      setData(TASKS_DB, newTasks);
      return success("Status update successfull.", newTasks);
    } else {
      return error("Task is not found.");
    }
  }

  useEffect(() => {
    // get data form localstore and initilize state as default
    setLoading(true);
    setRefetch(true);

    const loginUserInfo = getData(AUTH_DB);

    if (loginUserInfo) {
      setAuth(loginUserInfo);
      setLoading(false);
      setRefetch(false);
    } else {
      setAuth(null);
      setLoading(false);
      setRefetch(false);
    }
  }, []);

  const state = {
    loading,
    createAccount,
    login,
    logout,
    auth,
    addNewTask,
    getTasks,
    getUsers,
    taskStatusChange,
    refetch,
    setRefetch,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
