import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { getBoxMovieImg, IGetMoviesResult } from "../api";
import { useQuery } from "@tanstack/react-query";

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
  height: 150px;
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
  movieData?: IGetMoviesResult;
}
const Slider = ({ movieData }: ISliderProps) => {
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
  // const [img, setImg] = useState<any>([]);

  const boxImg = movieData?.results.map((movie) => movie.id);
  console.log(boxImg);

  const { data } = useQuery({
    queryKey: ["boxImg"],
    queryFn: () => {
      const result = boxImg?.map(async (item) => {
        return await getBoxMovieImg(item);
      });
      return result;
    },
  });

  if (data) {
    const result = data.map((item) => {
      const response = item.then((res) => res);
      response.then((res) => {
        return res;
      });
    });
    console.log(result);
    // console.log(data[0].then((res) => console.log(res.backdrops[0].file_path)));
  }
  // movieData 받아옴 => movieId값을 꺼내서 배별로 boxImg에 저장 =>

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
          {movieData?.results
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
