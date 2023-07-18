import React from "react";
import { Helmet } from "react-helmet";

const Title = ({ titleName, isAdmin = false }) => {
  return (
    <div>
      <Helmet>
        <title>
          {titleName} | {isAdmin ? "Learning Portal Admin" : "Learning Portal"}
        </title>
      </Helmet>
    </div>
  );
};

export default Title;
