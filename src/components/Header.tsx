import { motion, useAnimation, useScroll, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled(motion.header)`
  width: 100%;
  height: 70px;
  background-color: #000000;
  position: fixed;
  top: 0;
  color: #fff;
`;

const Inner = styled.div`
  max-width: 1600px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
`;

const LeftItems = styled.div`
  width: 450px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
  padding-left: 10px;
`;

const Svg = styled.svg`
  height: 50px;
`;

const LeftList = styled.ul`
  display: flex;
  gap: 10px;
  font-size: 17px;
`;

const Item = styled.li`
  cursor: pointer;
  padding: 10px;
  position: relative;
`;

const Circle = styled(motion.span)`
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: 0px;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 50%;
  background-color: blue;
`;

const RightItems = styled.ul`
  width: 300px;
  height: 100%;
  /* background-color: blue; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightItem = styled.li`
  cursor: pointer;
`;

const SearchBack = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchItems = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled(motion.input)`
  width: 550px;
  height: 60px;
  padding: 5px 15px;
  background-color: #323232;
  border: none;
  border-radius: 6px;
  outline: none;
  font-size: 18px;
  color: #fff;

  &::placeholder {
    font-size: 16px;
    padding-left: 5px;
  }
`;

const SearchInputIcon = styled.span`
  position: absolute;
  right: 10px;
`;

const logoVarients: Variants = {
  initial: {
    pathLength: 0,
    fill: "rgba(8, 71, 209, 0.1)",
    stroke: "rgba(255, 255, 255, 0)",
  },
  animate: {
    pathLength: 1,
    fill: "rgba(8, 71, 209, 1)",
    stroke: "rgba(255, 255, 255, 1)",
  },
};

const headerVarients: Variants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

const searchVarients: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const Header = () => {
  const { pathname } = useLocation();
  const [openSearch, setOpenSearch] = useState(false);
  const searchOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSearch(true);
  };

  const searchClose = () => {
    setOpenSearch(false);
  };

  const { scrollY } = useScroll();
  const headerAnimation = useAnimation();

  // 헤더 스크롤시 배경 애니메이션
  useEffect(() => {
    scrollY.on("change", () => {
      console.log(scrollY.get());
      if (scrollY.get() > 80) {
        headerAnimation.start("scroll");
      } else {
        headerAnimation.start("top");
      }
    });
  }, [scrollY, headerAnimation]);

  return (
    <>
      <Wrapper
        variants={headerVarients}
        initial="top"
        animate={headerAnimation}
      >
        <Inner>
          <LeftItems>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <motion.path
                variants={logoVarients}
                initial="initial"
                animate="animate"
                transition={{
                  default: { duration: 3 },
                  fill: { duration: 2, delay: 1.5 },
                }}
                strokeWidth={5}
                d="M640 317.9C640 409.2 600.6 466.4 529.7 466.4C467.1 466.4 433.9 431.8 372.8 329.8L341.4 277.2C333.1 264.7 326.9 253 320.2 242.2C300.1 276 273.1 325.2 273.1 325.2C206.1 441.8 168.5 466.4 116.2 466.4C43.4 466.4 0 409.1 0 320.5C0 177.5 79.8 42.4 183.9 42.4C234.1 42.4 277.7 67.1 328.7 131.9C365.8 81.8 406.8 42.4 459.3 42.4C558.4 42.4 640 168.1 640 317.9H640zM287.4 192.2C244.5 130.1 216.5 111.7 183 111.7C121.1 111.7 69.2 217.8 69.2 321.7C69.2 370.2 87.7 397.4 118.8 397.4C149 397.4 167.8 378.4 222 293.6C222 293.6 246.7 254.5 287.4 192.2V192.2zM531.2 397.4C563.4 397.4 578.1 369.9 578.1 322.5C578.1 198.3 523.8 97.1 454.9 97.1C421.7 97.1 393.8 123 360 175.1C369.4 188.9 379.1 204.1 389.3 220.5L426.8 282.9C485.5 377 500.3 397.4 531.2 397.4L531.2 397.4z"
              />
            </Svg>
            <LeftList>
              <Item>
                <Link to={"/"}>
                  홈 {pathname === "/" && <Circle layoutId="circle" />}
                </Link>
              </Item>
              <Item>
                <Link to={"/tv"}>
                  TV 프로그램
                  {pathname === "/tv" && <Circle layoutId="circle" />}
                </Link>
              </Item>
              <Item>
                <Link to={"/movies"}>
                  영화 {pathname === "/movies" && <Circle layoutId="circle" />}
                </Link>
              </Item>
            </LeftList>
          </LeftItems>
          <RightItems>
            <RightItem>
              <RxMagnifyingGlass size={40} color="white" onClick={searchOpen} />
            </RightItem>
          </RightItems>
        </Inner>
        {openSearch ? (
          <SearchBack
            onClick={searchClose}
            variants={searchVarients}
            initial="initial"
            animate="animate"
          >
            <SearchItems
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
              }}
            >
              <SearchInput placeholder="티비 드라마 또는 영화 제목을 입력해주세요" />
              <SearchInputIcon>
                <RxMagnifyingGlass color="white" size={33} />
              </SearchInputIcon>
            </SearchItems>
          </SearchBack>
        ) : null}
      </Wrapper>
      <Outlet />
    </>
  );
};

export default Header;
