import React from "react";
import loader from "../../images/loader.gif";

export default () => {
  return (
    <div>
      <img className="loader-image" src={loader} alt="Loading..." />
    </div>
  );
};
