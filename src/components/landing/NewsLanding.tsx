import classes from "./NewsLanding.module.css";

const newsTexts = [
  {
    title: "최신 부동산 정보 뉴스",
    desc: "각종 포털사이트에서 볼 수 있는 최근 부동산 뉴스들을 한눈에 파악할 수 있고, 필요에 따라 내가 원하는 정보만 파악할 수 있습니다.",
  },
  {
    title: "북마크 등록하기",
    desc: "원하는 스크립트를 내가 관리하고 볼 수 있도록 북마크 등록이 가능합니다.",
  },
  {
    title: "검색 서비스",
    desc: "입력하는 텍스트에 따라 내가 원하는 내용을 바로 찾아볼 수 있습니다.",
  },
];

const NewsLanding = () => {
  return (
    <section id="news">
      <div className={classes.news__inner}>
        <h2 className={classes.news__title}>
          NewsLetter <em>뉴스 소식</em>
        </h2>
        <div className={classes.news__desc}>
          {newsTexts.map((news, key) => {
            return (
              <div key={key}>
                <span>{key + 1}.</span>
                <h3>{news.title}</h3>
                <p>{news.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsLanding;
