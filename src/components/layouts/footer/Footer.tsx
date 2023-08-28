import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={`${classes.split} ${classes.left}`}></div>
      <div className={`${classes.split} ${classes.right}`}></div>
    </div>
  );
};

export default Footer;
