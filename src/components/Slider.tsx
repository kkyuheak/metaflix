import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IGetMovieImage, IGetMoviesResult } from "../api";
import { getMovieImg } from "../util";

const ArrowBtn = styled(motion.div)<{ $right?: boolean; $show?: boolean }>`
  width: 50px;
  height: 50px;
  color: #000;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 30px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.$right ? "" : "10px")};
  right: ${(props) => (props.$right ? "10px" : "")};
  margin: auto 0;
  cursor: pointer;
  z-index: 2;
  opacity: ${(props) => (props.$show ? 1 : 0)};

  &:hover {
    background-color: #c5c5c5;
  }
`;

const Slide = styled(motion.div)`
  position: relative;
  border: 1px solid red;
  height: 200px;
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

const arrowBtnVar: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
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

  // 슬라이드 호버 시 ArrowBtn
  const [show, setShow] = useState(false);
  const [leftShow, setLeftShow] = useState(false);
  const handleMouseOver = () => {
    setShow(true);
    index > 0 ? setLeftShow(true) : setLeftShow(false);
    console.log("on");
  };

  const handleMouseLeave = () => {
    setShow(false);
  };
  return (
    <Slide onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <ArrowBtn onClick={increaseIndex} $show={leftShow}>
        {"<"}
      </ArrowBtn>
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
      <ArrowBtn $show={show} $right onClick={increaseIndex}>
        {">"}
      </ArrowBtn>
    </Slide>
  );
};

export default Slider;
