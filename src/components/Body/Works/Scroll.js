import React from "react";

const Scroll = (props) => {
  return (
    <div
      style={{
        overflowY: "scroll",
        border: "3px solid #3d4145",
        height: "300px",
        borderRadius: "10px",
      }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
