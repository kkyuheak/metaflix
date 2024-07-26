import { useQuery } from "@tanstack/react-query";
import { getBoxMovieImg, getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { getMovieImg } from "../util";

import Slider from "../components/Slider";

const HomeWrapper = styled.div`
  height: 10000px;
  background-color: #1e272e;
`;

const Loader = styled(motion.div)`
  width: 70px;
  height: 70px;
  border: 6px solid #fff;
  border-top-color: blue;
  position: absolute;
  inset: 0;
  margin: auto;
  border-radius: 50%;
`;

const Banner = styled.div<{ $backImg: string }>`
  height: 100vh;
  color: #fff;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.$backImg});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-left: 60px;
`;

const Title = styled.h1`
  font-size: 50px;
`;

const Overview = styled.p`
  width: 800px;
  font-size: 20px;
  line-height: 150%;
`;

const loadVarants: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 1.6, ease: "linear" },
  },
};

const Home = () => {
  const { data: nowPlayData, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "now_Play"],
    queryFn: getMovies,
  });
  console.log(nowPlayData);

  const { data: boxMovieImg } = useQuery({
    queryKey: ["boxMovieImg"],
    queryFn: async () => {
      if (nowPlayData) {
        const movieImg = nowPlayData.results.map((item) =>
          getBoxMovieImg(item.id)
        );
        return Promise.all(movieImg);
      }
    },
    enabled: !!nowPlayData,
  });

  console.log(boxMovieImg);

  // 배너 랜덤한 객체 뽑기
  const randomNum = Math.floor(Math.random() * 20);

  return (
    <HomeWrapper>
      {isLoading ? (
        <Loader variants={loadVarants} initial="initial" animate="animate" />
      ) : (
        <>
          <Banner
            $backImg={getMovieImg(
              nowPlayData?.results[randomNum].backdrop_path || ""
            )}
          >
            <Title>{nowPlayData?.results[randomNum].title}</Title>
            <Overview>{nowPlayData?.results[randomNum].overview}</Overview>
          </Banner>
          <Slider movieData={nowPlayData} />
        </>
      )}
    </HomeWrapper>
  );
};

export default Home;
