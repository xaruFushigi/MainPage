import React, { useState, useEffect, createContext } from "react";
export const MyContext = createContext();
const ContextProvider = (props) => {
  const contextValues = {};
  return (
    <div>
      <MyContext.Provider value={contextValues}>
        {props.children}
      </MyContext.Provider>
    </div>
  );
};

export default ContextProvider;
