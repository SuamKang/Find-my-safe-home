import { useNavigate, useParams } from "react-router-dom";
import BoardForm from "../../components/board/BoardForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { asyncBoardActions } from "../../redux/actions/board-action";
import { PostFormData } from "../../shared/types";

// 새로 생성할 엑션생성자를 onSubmit헨들러함수 안 로직으로 구성 => 해당 핸들러 양식컴포넌트에 props로 전달
const EditPostPage = () => {
  const { postId } = useParams();

  const dispatch = useAppDispatch();
  // 게시판 스토어에 담긴 배열중 현재 접속한 경로와 같은 게시글 id를 가져옴
  const postData = useAppSelector((state) =>
    state.board.posts.find((post) => post.pid === postId)
  );
  const navigate = useNavigate();

  // Partial은 모든 필드를 선택적 필드로 만들어 주는 타입이다.
  // Partial(파티셜)을 이용해서 객체의 필드에 맞는 타입이 없을때 undefined가 나올 수 있는 상황에 대비하여 적용시켜서 타입에러를 해결했다. -> Partial 제네릭 형식에대한 부분 더 찾아보기

  // 기존 수정할 게시글 데이터 긁어오기
  const initialFormData: Partial<PostFormData> = {
    title: postData?.title,
    image: postData?.image,
    date: postData?.date,
    description: postData?.description,
  };

  const editPostHandler = (formData: Partial<PostFormData>) => {
    dispatch(asyncBoardActions.editPostFB(postId, formData));
    navigate(`/board/${postId}`);
  };

  return <BoardForm onSubmit={editPostHandler} formData={initialFormData} />;
};

export default EditPostPage;
