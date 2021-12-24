import React from "react";

const style = {
  backgroundColor: "white",
  textTransform: "capitalize",
  padding: "0.4rem 1rem",
  margin: "0 0.5rem",
  border: "1px solid #dcdcdc",
};

export const RefreshButton = ({ next }) => {
  return (
    <button className="shadow-sm" style={style} onClick={next}>
      refresh
    </button>
  );
};
