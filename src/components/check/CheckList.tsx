import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CheckInsert from "./CheckInsert";
import CheckItem from "./CheckItem";
import classes from "./CheckList.module.css";
import { asycnCheckActions } from "../../redux/actions/check-action";

const CheckList = () => {
  const todos = useAppSelector((state) => state.check.checks);
  console.log(todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asycnCheckActions.getCheckFB());
  }, [dispatch]);

  return (
    <section className={classes.container}>
      <h1>체크리스트</h1>
      <CheckInsert />
      <div className={classes.list}>
        <ul>
          {todos?.map((todo) => (
            <CheckItem
              key={todo.cid}
              cid={todo.cid}
              text={todo.text}
              done={todo.done}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CheckList;
