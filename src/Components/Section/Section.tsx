import React, { ReactNode } from "react";
import "./section.scss";

const Section = (props: {
  title: string,
  children: ReactNode
}) => {
  const { title, children } = props;
  return (
    <fieldset className={"section"}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
};

export default Section;
