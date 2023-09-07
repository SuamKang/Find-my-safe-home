import BoardLanding from "../components/landing/BoardLanding";
import FaqLanding from "../components/landing/FaqLanding";
import Intro from "../components/landing/IntroLanding";
import NewsLanding from "../components/landing/NewsLanding";
import PageContent from "../components/layouts/main/PageContent";

const HomePage = () => {
  return (
    <PageContent>
      <Intro />
      <NewsLanding />
      <BoardLanding />
      <FaqLanding />
    </PageContent>
  );
};

export default HomePage;
