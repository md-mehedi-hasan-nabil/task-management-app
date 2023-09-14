import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";

export const MyContext = createContext({});

export default function MyProvider({ children }) {
  const authInfo = useLiveQuery(() => db.auth.toArray());
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [auth, setAuth] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");

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
    auth,
    refetch,
    setRefetch,
    filterKeyword,
    setFilterKeyword,
  };

  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
