import CheckInsert from "./CheckInsert";
import CheckItem from "./CheckItem";
import classes from "./CheckList.module.css";

// todo리스트 상태 관리 해야함!!!
const CheckList = () => {
  return (
    <section className={classes.container}>
      <h1>체크리스트</h1>
      <CheckInsert />
      <ul>
        <CheckItem />
      </ul>
    </section>
  );
};

export default CheckList;
