import classes from "./CheckInsert.module.css";

const CheckInsert = () => {
  return (
    <form className={classes.form}>
      <label htmlFor="todo"></label>
      <input id="todo" />
    </form>
  );
};

export default CheckInsert;
