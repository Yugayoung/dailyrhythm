import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../css/styles.theme';
import useScrollFadeIn from '../hooks/useScrollFadeIn';
import homeMiddleImage1 from '../images/homeMiddleImage1.png';
import homeMiddleImage2 from '../images/homeMiddleImage2.png';
import homeMiddleImage3 from '../images/homeMiddleImage3.png';
import homeMiddleImage4 from '../images/homeMiddleImage4.png';
import homeTopImage from '../images/homeTopImage.png';
import homeBottomImage from '../images/homeBottomImage.png';
import useScrollCount from '../hooks/useScrollCount';
import { motion, useAnimation } from 'framer-motion';

export default function Home() {
  const animatedHomeMiddleRightImg = useScrollFadeIn('left', 1.2, 0.3);
  const animatedHomeMiddleRightImgHem = useScrollFadeIn('left', 1.2, 0.6);
  const animatedHomeMiddleLeftImg = useScrollFadeIn('right', 1.2, 0.5);
  const animatedHomeMiddleLeftImgHem = useScrollFadeIn('right', 1.2, 0.6);
  const animatedHomeBottomText = useScrollFadeIn('up', 1.2, 0.1);
  const { ref: countRef } = useScrollCount(365, 100);
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      y: [0, -50, 0],
      transition: {
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [controls]);

  return (
    <StyledHomeWrapper>
      <StyledHomeTopWrapper>
        <StyledHomeTopBox>
          <motion.div animate={controls}>
            <StyledHomeTopImg src={homeTopImage} alt='homeTopImage' />
          </motion.div>
        </StyledHomeTopBox>
      </StyledHomeTopWrapper>
      <StyledHomeMiddleWrapper>
        <StyledHomeMiddleTextBox>
          <p>" </p>
          <StyledHomeMiddleCount ref={countRef} />
          <p> 일, 나의 하루를 바꾸는 리듬 "</p>
        </StyledHomeMiddleTextBox>
        <StyledHomeMiddleImgBox>
          <StyledHomeMiddleLeftImgBox>
            <StyledhomeMiddleImage
              {...animatedHomeMiddleLeftImg}
              src={homeMiddleImage2}
              alt='homeMiddleImage2'
            />
            <StyledhomeMiddleImage
              {...animatedHomeMiddleLeftImgHem}
              src={homeMiddleImage4}
              alt='homeMiddleImage4'
            />
          </StyledHomeMiddleLeftImgBox>
          <StyledHomeMiddleRightImgBox>
            <StyledhomeMiddleImage
              {...animatedHomeMiddleRightImg}
              src={homeMiddleImage1}
              alt='homeMiddleImage1'
            />

            <StyledhomeMiddleImage
              {...animatedHomeMiddleRightImgHem}
              src={homeMiddleImage3}
              alt='homeMiddleImage3'
            />
          </StyledHomeMiddleRightImgBox>
        </StyledHomeMiddleImgBox>
      </StyledHomeMiddleWrapper>
      <StyledHomeBottomWrapper>
        <StyledHomeBottomBox>
          <StyledhomeBottomImage src={homeBottomImage} alt='homeBottomImage' />
          <StyledHomeBottomTextBox {...animatedHomeBottomText}>
            <StyledHomeBottomTitle>
              일상도 DailyRhythm과 함께 <br />
            </StyledHomeBottomTitle>
            <StyledHomeBottomText>
              건강한 습관을 시작하셨나요?
            </StyledHomeBottomText>
            <StyledHomeBottomText>시작부터 관리까지</StyledHomeBottomText>
            <StyledHomeBottomText>
              이제 데일리리듬과 함께 하세요.
            </StyledHomeBottomText>
          </StyledHomeBottomTextBox>
        </StyledHomeBottomBox>
      </StyledHomeBottomWrapper>
    </StyledHomeWrapper>
  );
}

const StyledHomeWrapper = styled.section`
  position: absolute;
  width: 100%;
`;

const StyledHomeTopWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60rem;
  background-color: ${lightTheme.accentColor};
`;

const StyledHomeTopBox = styled.div`
  margin: auto;
  width: 30rem;
`;

const StyledHomeTopImg = styled.img`
  width: 100%;
`;
const StyledHomeMiddleWrapper = styled.section`
  display: grid;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  background-color: white;
`;
const StyledHomeMiddleTextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  font-weight: bold;
  margin: 6rem 0rem;
`;
const StyledHomeMiddleCount = styled.div`
  width: 4.5rem;
  font-size: 2rem;
`;
const StyledHomeMiddleImgBox = styled.div`
  display: flex;
  width: 75%;
  margin: auto;
`;
const StyledHomeMiddleLeftImgBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  flex: 1;
`;
const StyledHomeMiddleRightImgBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const StyledhomeMiddleImage = styled.img`
  width: 100%;
  margin-bottom: 5rem;
`;

const StyledHomeBottomWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50rem;
  background-color: ${lightTheme.accentColor};
`;

const StyledHomeBottomBox = styled.div`
  margin: auto;
  width: 40rem;
`;
const StyledHomeBottomTextBox = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 5rem;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'GmarketSansMedium';
  color: white;
  gap: 0.5rem;
`;
const StyledhomeBottomImage = styled.img`
  width: 100%;
`;
const StyledHomeBottomTitle = styled.h1`
  margin-bottom: 2rem;
`;
const StyledHomeBottomText = styled.h2`
  font-size: 1.5rem;
  margin: auto;
`;
