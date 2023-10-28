import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CheckInsert from "./CheckInsert";
import CheckItem from "./CheckItem";
import classes from "./CheckList.module.css";
import { asycnCheckActions } from "../../redux/actions/check-action";

const CheckList = () => {
  const dispatch = useAppDispatch();
  // 해당 유저의 체크리스트 항목들만 가져오게 현재 로그인한 유저 정보 사용
  const user = useAppSelector((state) => state.auth.user);
  // console.log(user);
  const todos = useAppSelector((state) => state.check.checks);
  // console.log(todos);

  useEffect(() => {
    dispatch(asycnCheckActions.getCheckFB());
  }, [dispatch]);

  return (
    <section className={classes.container}>
      <h1>체크리스트</h1>
      <CheckInsert />
      <div className={classes.list}>
        <ul>
          {todos
            ?.filter((todo) => todo.userId === user?.uid)
            ?.map((todo) => (
              <CheckItem
                key={todo.cid}
                userId={todo.userId}
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
