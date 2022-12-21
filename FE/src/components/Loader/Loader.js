import React from "react";
import "./style.css";

function Loader() {
  return (
    <div className="loader__spinner">
      <div className="loader__circle loader__one" />
      <div className="loader__circle loader__two" />
      <div className="loader__circle loader__three" />
    </div>
  );
}

export default Loader;
