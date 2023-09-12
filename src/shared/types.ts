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

// 타입스크립트 Partial<T>은 제네릭 타입으로, 주어진 타입 'T'의 모든 속성을 "선택적"으로 만들어주는 유틸리티 타입이다.
// 이는 기존 타입의 일부 속성을 선택적으로 사용하고자할거나 생략할때 유용하게 쓰인다.

// // 예시
// interface Person {
//   name: string;
//   age: number;
//   email: string;
// }

// // Partial을 사용하여 Person 타입의 일부 속성을 선택적으로 만듦
// type PartialPerson = Partial<Person>;

// // 사용 예시
// const partialPerson: PartialPerson = {
//   name: "Alice", // 선택적으로 지정
//   age: 30, // 선택적으로 지정
//   // email 속성은 생략 가능
// };

// 위 코드에서 Person이라는 인터페이스 정의하고 Partial을 사용해 새로운 타입을 하나 더 생성했다.
// 위에서 PartialPerson은 name과 age속성을 선택적으로 지정했고, email은 생략되있는걸 볼 수 있다.
// 이렇게 Partial을 사용하면 기존 타입을 수정하지 않고 일부 속성을 선택적으로 다룰 수 있어 꽤 편리한 점이 있는것 같다.
// 이러한 선택적 속성은 주로 객체를 생성할 때 일부 속성만 필요한 경우에 사용되며, 나중에 다른 속성을 추가할 수 있는 유연성을 제공해준다.
