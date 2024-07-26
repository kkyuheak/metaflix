import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IGetMovieImage, IGetMoviesResult } from "../api";
import { getMovieImg } from "../util";

const Slide = styled.div`
  position: relative;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
`;

const Box = styled(motion.div)<{ $backImg: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.$backImg});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

const rowVariants: Variants = {
  hidden: {
    x: window.innerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 10,
  },
};

interface ISliderProps {
  movieData?: IGetMoviesResult;
  movieImg?: IGetMovieImage[];
}
const Slider = ({ movieData, movieImg }: ISliderProps) => {
  // 슬라이더 페이지설정
  const [index, setIndex] = useState(0);

  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (movieData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movieData.results.length;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving(!leaving);

  // 슬라이더 한번에 보여줄 영화 갯수
  const offset = 6;

  // Box movieImg

  // movieData 받아옴 => movieId값을 꺼내서 배열boxImg에 저장 =>
  // boxImg안에 있는 값을 getBoxMovieImg로 데이터 요청 => 받아온 값의

  return (
    <Slide>
      <button onClick={increaseIndex}>click</button>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {movieImg
            ?.slice(offset * index, offset * index + offset)
            .map((movie) => {
              return (
                <Box
                  key={movie.id}
                  $backImg={getMovieImg(movie.backdrops[0].file_path)}
                ></Box>
              );
            })}
        </Row>
      </AnimatePresence>
    </Slide>
  );
};

export default Slider;
