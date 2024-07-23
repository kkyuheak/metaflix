import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";

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

const Box = styled(motion.div)`
  height: 200px;
  background-color: #fff;
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
  data: IGetMoviesResult;
}
const Slider = ({ data }: ISliderProps) => {
  // 슬라이더 인덱스설정
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => prev + 1);
  };
  const toggleLeaving = () => setLeaving(!leaving);

  // 슬라이더 한번에 보여줄 영화 갯수
  const offset = 6;

  return (
    <Slide>
      <button onClick={increaseIndex}>click</button>
      <AnimatePresence onExitComplete={toggleLeaving}>
        <Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((movie) => {
              return <Box key={movie.id}>{movie.title}</Box>;
            })}
        </Row>
      </AnimatePresence>
    </Slide>
  );
};

export default Slider;
