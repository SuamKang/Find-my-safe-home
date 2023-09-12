import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/hooks";

import BoardForm from "../../components/board/BoardForm";
import { PostFormData } from "../../shared/types";
import { asyncBoardActions } from "../../redux/actions/board-action";

// 새로 생성할 엑션생성자를 onSubmit헨들러함수 안 로직으로 구성 => 해당 핸들러 양식컴포넌트에 props로 전달
const NewPostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 초기화
  const initialFormData: Partial<PostFormData> = {
    title: "",
    image: "",
    date: "",
    description: "",
  };

  // 게시글 작성 Create
  const addPostHandler = (formData: PostFormData) => {
    dispatch(asyncBoardActions.addPostFB(formData));
    navigate("/board"); // 보내고 전체 게시판 페이지로 이동
  };

  return <BoardForm onSubmit={addPostHandler} formData={initialFormData} />;
};

export default NewPostPage;
