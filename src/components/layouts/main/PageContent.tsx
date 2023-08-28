import { ReactNode } from "react";

import classes from "./PageContent.module.css";

interface Props {
  children?: ReactNode;
}

const PageContent: React.FC<Props> = ({ children }) => {
  return <div className={classes.content}>{children}</div>;
};

export default PageContent;
