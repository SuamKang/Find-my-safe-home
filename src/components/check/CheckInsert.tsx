import { useState, FormEvent, ChangeEvent } from "react";

import classes from "./CheckInsert.module.css";

import { useAppDispatch } from "../../redux/hooks";
import { asycnCheckActions } from "../../redux/actions/check-action";

const CheckInsert = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue) {
      dispatch(asycnCheckActions.addCheckFB(inputValue));
      setInputValue("");
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        id="todo"
        type="text"
        name="text"
        maxLength={15}
        value={inputValue}
        onChange={changeHandler}
        placeholder="체크해야할 목록을 적어주세요.(최대 15자 내외)"
        autoFocus
      />
    </form>
  );
};

export default CheckInsert;
