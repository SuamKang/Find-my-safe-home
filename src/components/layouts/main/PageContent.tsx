import { ReactNode } from "react";

import classes from "./PageContent.module.css";

interface Props {
  children?: ReactNode;
}

const PageContent: React.FC<Props> = ({ children }) => {
  return (
    <main id="main" role="main" className={classes.content}>
      {children}
    </main>
  );
};

export default PageContent;
