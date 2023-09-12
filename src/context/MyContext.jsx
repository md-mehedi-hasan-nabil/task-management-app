import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";

const INDEXED_DB_NAME = "collaborative-task-management";
const AUTH_COLLECTION = "auth";
const TASKS_COLLECTION = "tasks";
const USERS_COLLECTION = "users";

// let idb = indexedDB.open("collaborative-task-management", 1);

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
  function getData(collection, callback) {
    try {
      const idb = indexedDB.open(INDEXED_DB_NAME, 1);

      idb.onsuccess = function () {
        const db = idb.result;

        if (db.objectStoreNames.contains(collection)) {
          const objectStore = db
            .transaction(collection)
            .objectStore(collection);
          objectStore.openCursor().onsuccess = function (event) {
            const cursor = event.target.result;
            // console.log(cursor.value);
            typeof callback === "function" && callback(cursor.value);
            // cursor?.continue();
          };
        } else {
          typeof callback === "function" && callback(null);
        }
      };

      // const result = localStorage.getItem(key);
      // return result ? JSON.parse(result) : null;
    } catch (error) {
      console.log(error);
    }
  }

  function getTasks(callback) {
    return getData(TASKS_COLLECTION, callback);
  }

  function getUsers(callback) {
    return getData(USERS_COLLECTION, callback);
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   * set data to indexedDB
   */
  function setData(collection, value, callback) {
    try {
      const idb = indexedDB.open(INDEXED_DB_NAME, 1);

      idb.onupgradeneeded = function () {
        const db = idb.result;

        const objectStore = db.createObjectStore(collection, {
          keyPath: "username",
        });
        console.log(objectStore);
        objectStore.createIndex("password", "password", { unique: false });
        objectStore.createIndex("bio", "bio", { unique: false });
        objectStore.createIndex("image", "image", { unique: false });

        objectStore.transaction.oncomplete = function () {
          const userObjectStore = db
            .transaction(collection, "readwrite")
            .objectStore(collection);
          userObjectStore.add(value);
          console.log(userObjectStore);
          typeof callback === "function" && callback();
        };
      };

      // idb.onsuccess = function () {
      //   const res = idb.result;
      //   let tx = res.transaction(collection, "readwrite");
      //   let store = tx.objectStore(collection);
      //   store.add(value)
      // };
      // localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
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


  function logout() {
    const auth = getData(AUTH_COLLECTION);
    if (auth) {
      localStorage.removeItem(AUTH_COLLECTION);
      return success("Logout success.");
    } else {
      return error("User information is not found.");
    }
  }

  /**
   *
   * @param {string} task_id
   * @param {string} status
   */

  function taskStatusChange(task_id, status) {
    const tasks = getData(TASKS_COLLECTION);

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
      setData(TASKS_COLLECTION, newTasks);
      return success("Status update successfull.", newTasks);
    } else {
      return error("Task is not found.");
    }
  }

  const authInfo = useLiveQuery(() => db.auth.toArray());

  useEffect(() => {
    // get data form IndexedDB and initilize state as default
    setLoading(true);
    setRefetch(true);

    if (authInfo?.length > 0) {
      setAuth(authInfo[0]);
      setLoading(false);
      setRefetch(false);
    } else {
      setAuth(null);
      setLoading(false);
      setRefetch(false);
    }
  }, [authInfo, refetch]);

  const state = {
    loading,
    logout,
    auth,
    refetch,
    setRefetch,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
