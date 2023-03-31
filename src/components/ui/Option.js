import React from "react";

const Option = ({ htmlFor, title, ...rest }) => {
  return (
    <label htmlFor={htmlFor}>
      <input {...rest} />
      {title}
    </label>
  );
};

export default Option;
