import React from "react";

const Loading = ({ loading }) => (
  <div
    className="spinner-border ml-4"
    role="status"
    style={{
      color: loading ? "#7245AD" : "white",
    }}
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loading;
