import classes from "./FAQ.module.css";

import { IoIosArrowDropdown } from "react-icons/io";

const Faq = () => {
  return (
    <div className={classes.faq__inner}>
      <div className={classes.faq__title}>
        <h2>
          FAQ <em>자주 묻는 질문</em>
        </h2>
      </div>
      <div className={classes.faq__wrap}>
        <div className={classes.faq__item}>
          <input type="checkbox" id="faq1" />
          <label htmlFor="faq1">
            질문사항 1{" "}
            <em>
              <IoIosArrowDropdown size="35" />
            </em>
          </label>
          <div>
            <p>
              이곳에는 자세한 서비스 이용방법에대한 문의사항이나 다른 유저가
              고민하고 해결했던 내용들이 포함되어있습니다. 본인이 궁금한 점을
              찾아서 문제를 해결하세요!
            </p>
          </div>
        </div>
        <div className={classes.faq__item}>
          <input type="checkbox" id="faq2" />
          <label htmlFor="faq2">
            질문사항 2{" "}
            <em>
              {" "}
              <IoIosArrowDropdown size="35" />
            </em>
          </label>
          <div>
            <p>
              이곳에는 자세한 서비스 이용방법에대한 문의사항이나 다른 유저가
              고민하고 해결했던 내용들이 포함되어있습니다. 본인이 궁금한 점을
              찾아서 문제를 해결하세요!
            </p>
          </div>
        </div>
        <div className={classes.faq__item}>
          <input type="checkbox" id="faq3" />
          <label htmlFor="faq3">
            질문사항 3{" "}
            <em>
              {" "}
              <IoIosArrowDropdown size="35" />
            </em>
          </label>
          <div>
            <p>
              이곳에는 자세한 서비스 이용방법에대한 문의사항이나 다른 유저가
              고민하고 해결했던 내용들이 포함되어있습니다. 본인이 궁금한 점을
              찾아서 문제를 해결하세요!
            </p>
          </div>
        </div>
        <div className={classes.faq__item}>
          <input type="checkbox" id="faq4" />
          <label htmlFor="faq4">
            질문사항 4{" "}
            <em>
              {" "}
              <IoIosArrowDropdown size="35" />
            </em>
          </label>
          <div>
            <p>
              이곳에는 자세한 서비스 이용방법에대한 문의사항이나 다른 유저가
              고민하고 해결했던 내용들이 포함되어있습니다. 본인이 궁금한 점을
              찾아서 문제를 해결하세요!
            </p>
          </div>
        </div>
        <div className={classes.faq__item}>
          <input type="checkbox" id="faq5" />
          <label htmlFor="faq5">
            질문사항 5{" "}
            <em>
              {" "}
              <IoIosArrowDropdown size="35" />
            </em>
          </label>
          <div>
            <p>
              이곳에는 자세한 서비스 이용방법에대한 문의사항이나 다른 유저가
              고민하고 해결했던 내용들이 포함되어있습니다. 본인이 궁금한 점을
              찾아서 문제를 해결하세요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Faq;

//FAQ 페이지에서 가장 두드러지는 css는 질문박스마다 아코디언메뉴 특성을 부여해 주어야한다.
// Input 과 label 이 id로 연결되어 라벨 클릭시 인풋이 체크되도록 해야한다.
