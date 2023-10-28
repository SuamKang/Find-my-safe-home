import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BoardFormProps, PostFormData } from "../../shared/types";

import classes from "./BoardForm.module.css";

// 양식 폼 컴포넌트를 제네릭 타입으로 타입 지정
// BoardForm컴포넌트를 재사용하기 위해 formData를 props로 전달 -> 현재 편집중인 게시글 데이터를 초기값으로 가지거나, 새로운 게시글을 추가하기위한 빈 양식을 가질수 있어야 하기 때문이다.
const BoardForm: React.FC<BoardFormProps> = ({ formData, onSubmit }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(formData.title);
  const [image, setImage] = useState(formData.image);
  const [date, setDate] = useState(formData.date);
  const [description, setDescription] = useState(formData.description);

  // 입력 양식 받기
  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "title") setTitle(value);
    else if (name === "image") setImage(value);
    else if (name === "date") setDate(value);
    else if (name === "description") setDescription(value);
  };

  // 입력 양식 보내기
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const updatedFormData: PostFormData = {
      title,
      image,
      date,
      description,
    };

    onSubmit(updatedFormData);
  };

  const cancleHandler = () => {
    navigate("/board");
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={changeHandler}
          required
        />
      </p>
      <p>
        <label htmlFor="image">이미지</label>
        <input
          id="image"
          type="url"
          name="image"
          value={image}
          onChange={changeHandler}
          placeholder="이미지 주소를 복사해 넣어주세요."
          required
        />
      </p>
      <p>
        <label htmlFor="date">날짜</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={changeHandler}
          required
        />
      </p>
      <p>
        <label htmlFor="description">내용</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={description}
          onChange={changeHandler}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancleHandler}>
          취소
        </button>
        <button>저장</button>
      </div>
    </form>
  );
};

export default BoardForm;
