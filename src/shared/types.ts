// 게시판 타입

// 게시글 입력 양식 데이터 타입
export interface PostFormData {
  title: string | undefined;
  image: string | undefined;
  date: string | undefined;
  description: string | undefined;
}

// 게시글 양식에 적용될 props타입
export interface BoardFormProps {
  formData: Partial<PostFormData>; // PostData 타입으로 formData props를 선언
  onSubmit: (formData: PostFormData) => void;
}

// 게시글 하나(객체) - 유저 포함
export interface PostProps {
  userId: string | undefined | null;
  userName: string | undefined | null;
  pid: string | undefined | null;
  title: string | undefined;
  image: string | undefined;
  description: string | undefined;
  date: string | undefined;
}

// 선택적 필드 타입 설정
export type PartialPost = Partial<PostProps>;

// 게시판 타입
export interface BoardTypes {
  posts: PostProps[];
  status: string;
  error: null | string;
}

// 체크리스트 타입

export interface checkDetailDataType {
  text: string;
  done: boolean;
}

export interface checkDataType extends checkDetailDataType {
  cid: string;
}

export interface CheckType {
  checks: checkDataType[];
}
