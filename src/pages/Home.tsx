import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { color, lightTheme } from '../css/styles.theme';
import useScrollFadeIn from '../hooks/useScrollFadeIn';
import homeTopImage from '../images/homeTopImage.webp';
import introAddRhythm from '../images/introAddRhythm.gif';
import introBadge from '../images/introBadge.gif';
import introDarkMode from '../images/introDarkMode.gif';
import introRhythmCalendar from '../images/introRhythmCalendar.gif';
import introRhythmDetail from '../images/introRhythmDetail.gif';
import introTodayReport from '../images/introTodayReport.gif';
import introWeather from '../images/introWeather.gif';
import homeBottomImage from '../images/homeBottomImage.webp';
import useScrollCount from '../hooks/useScrollCount';
import { motion, useAnimation } from 'framer-motion';
import { StyledBaseBox } from '../components/Navbar';
import { IoIosArrowDown } from 'react-icons/io';
import Typewriter from 'typewriter-effect';
import useScrollClipPath from '../hooks/useScrollClipPath';
import { BREAKPOINTS } from '../css/styles.width';
import { useWindowSize } from '../hooks/useWindowSize';

export default function Home() {
  const animatedHomeMiddleText1 = useScrollFadeIn('up', 1.2, 0.3);
  const animatedHomeMiddleText2 = useScrollFadeIn('up', 1.3, 0.5);
  const animatedHomeMiddleText3 = useScrollFadeIn('up', 1.4, 0.6);
  const animatedHomeMiddleText4 = useScrollFadeIn('up', 1.5, 0.7);
  const animatedHomeMiddleText5 = useScrollFadeIn('up', 1.5, 0.3);
  const animatedHomeMiddleText6 = useScrollFadeIn('left', 1, 0);
  const animatedHomeMiddleText7 = useScrollClipPath('down', 1, 0);
  const animatedHomeMiddleBox = useScrollClipPath('right', 1.2, 0.2);
  const animatedHomeMiddleBox2 = useScrollClipPath('left', 1.2, 0.3);
  const animatedHomeMiddleImg = useScrollClipPath('left', 1.1, 0);
  const animatedHomeBottomText = useScrollFadeIn('up', 1.2, 0.1);
  const { ref: countRef } = useScrollCount(365, 100);
  const controls = useAnimation();
  const ref = useRef(null);
  const viewPoint = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const isMobileWindow = windowSize.width < parseInt(BREAKPOINTS.smallMobile);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        controls.start({
          y: [0, -50, 0],
          transition: {
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
          },
        });
      } else {
        controls.stop();
      }
    });

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  function onMoveToView() {
    viewPoint.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <StyledHomeWrapper>
      <StyledHomeTopWrapper>
        <StyledHomeTopBox>
          <motion.div ref={ref} animate={controls}>
            <StyledHomeTopImg
              src={homeTopImage}
              alt='homeTopImage'
              loading='lazy'
            />
          </motion.div>
          <StyledArrowBox>
            <StyledArrowButton onClick={onMoveToView} aria-label='ArrowButton'>
              <IoIosArrowDown />
            </StyledArrowButton>
          </StyledArrowBox>
        </StyledHomeTopBox>
      </StyledHomeTopWrapper>
      <StyledHomeMiddleWrapper ref={viewPoint}>
        <StyledHomeMiddleTextBox>
          <p>" </p>
          <StyledHomeMiddleCount ref={countRef} />
          <p> 일, 나의 하루를 바꾸는 리듬 "</p>
        </StyledHomeMiddleTextBox>
        <StyledHomeMiddleImgBox>
          <StyledHomeMiddleImgDetailBox>
            <StyledHomeWidthBox>
              <StyledHomeImgBox>
                <StyledHomeMiddleImg
                  src={introAddRhythm}
                  alt='introAddRhythm'
                  loading='lazy'
                />
              </StyledHomeImgBox>
              <StyledHomeMiddleImgTextBox className='top_text'>
                <StyledHomeMiddleText
                  className='text_bold large '
                  {...animatedHomeMiddleText1}
                >
                  아이콘으로 한눈에,
                </StyledHomeMiddleText>
                <StyledHomeMiddleText
                  className='text_bold large '
                  {...animatedHomeMiddleText2}
                >
                  기간으로 계획적으로,
                </StyledHomeMiddleText>
                <StyledHomeMiddleText
                  className='text_bold large '
                  {...animatedHomeMiddleText3}
                >
                  시간으로 정교하게,
                </StyledHomeMiddleText>
                <StyledHomeMiddleText
                  className='text_bold large padding_bottom '
                  {...animatedHomeMiddleText4}
                >
                  형광펜으로 강조된
                </StyledHomeMiddleText>
                <StyledHomeMiddleText className='line_height midium_top'>
                  루틴을 추가해 <br /> 리듬을 만들어보세요.
                </StyledHomeMiddleText>
              </StyledHomeMiddleImgTextBox>
            </StyledHomeWidthBox>
          </StyledHomeMiddleImgDetailBox>
          <StyledHomeMiddleImgDetailBox className='width_img background_color'>
            <StyledHomeWidthBox className='width_img'>
              <StyledHomeMiddleImgTextBox className='width_img'>
                <StyledHomeMiddleText className='text_bold large title'>
                  한눈에 보는 나만의 성취!
                </StyledHomeMiddleText>
                {isMobileWindow ? (
                  <StyledHomeMiddleText
                    className='line_height small'
                    {...animatedHomeMiddleText5}
                  >
                    루틴 개수에 따라 색이 변하는 동그라미로 <br /> 매일의 진도를
                    확인하고,
                    <br />
                    시간 순서대로 정렬된 리스트로 효율적으로 관리하세요. <br />
                    모든 할 일을 완료하면 체크 표시로 성취감을 더하세요!
                  </StyledHomeMiddleText>
                ) : (
                  <StyledHomeMiddleText
                    className='line_height small'
                    {...animatedHomeMiddleText5}
                  >
                    루틴 개수에 따라 색이 변하는 동그라미로 매일의 진도를
                    확인하고,
                    <br />
                    시간 순서대로 정렬된 리스트로 효율적으로 관리하세요. <br />
                    모든 할 일을 완료하면 체크 표시로 성취감을 더하세요!
                  </StyledHomeMiddleText>
                )}
              </StyledHomeMiddleImgTextBox>
              <StyledHomeImgBox className='width_img'>
                <StyledHomeMiddleImg
                  className='width_img'
                  src={introRhythmCalendar}
                  alt='introRhythmCalendar'
                  loading='lazy'
                />
              </StyledHomeImgBox>
            </StyledHomeWidthBox>
          </StyledHomeMiddleImgDetailBox>
          <StyledHomeMiddleImgDetailBox className='width_img'>
            <StyledHomeWidthBox className='width_img'>
              <StyledHomeMiddleImgTextBox className='width_img'>
                <StyledHomeMiddleText className=' large title'>
                  현재 위치 기반의 날씨 정보를 실시간으로 체크하여
                </StyledHomeMiddleText>
              </StyledHomeMiddleImgTextBox>
              <StyledHomeImgBox className='width_img bottom_margin'>
                <StyledHomeMiddleImg
                  className='width_img'
                  src={introWeather}
                  alt='introWeather'
                  loading='lazy'
                />
              </StyledHomeImgBox>
              <StyledHomeMiddleImgTextBox className='width_img display_flex'>
                <StyledHomeMiddleText className=' large_width title'>
                  일정을 더욱
                </StyledHomeMiddleText>
                <StyledHomeMiddleText
                  {...animatedHomeMiddleText6}
                  className='text_bold large_width title'
                >
                  스마트하게
                </StyledHomeMiddleText>
              </StyledHomeMiddleImgTextBox>
            </StyledHomeWidthBox>
          </StyledHomeMiddleImgDetailBox>
          <StyledHomeMiddleImgDetailBox className='width_img background_color'>
            <StyledHomeWidthBox className='width_img '>
              <StyledHomeTwoImgBox>
                <div>
                  <StyledHomeMiddleImgTextBox className='height_img padding_bottom'>
                    <StyledHomeMiddleText
                      {...animatedHomeMiddleBox2}
                      className='line_height midium'
                    >
                      목표를 세우고, <br /> 뱃지로 성장하는 즐거움. <br />
                      채워지는 뱃지로 나만의 <br />
                    </StyledHomeMiddleText>
                  </StyledHomeMiddleImgTextBox>
                  <StyledHomeImgBox className='width_img'>
                    <StyledHomeMiddleImg
                      src={introBadge}
                      alt='introBadge'
                      loading='lazy'
                    />
                  </StyledHomeImgBox>
                </div>
                <div>
                  <StyledHomeImgBox className='width_img'>
                    <StyledHomeMiddleImg
                      src={introTodayReport}
                      alt='introTodayReport'
                      loading='lazy'
                    />
                  </StyledHomeImgBox>
                  <StyledHomeMiddleImgTextBox
                    {...animatedHomeMiddleBox}
                    className='height_img height_text text_bottom'
                  >
                    <StyledHomeMiddleText className='midium '>
                      오늘의 달성률로
                    </StyledHomeMiddleText>
                    <StyledHomeMiddleText className='midium '>
                      내 하루를 더 빛나게.
                    </StyledHomeMiddleText>
                  </StyledHomeMiddleImgTextBox>
                </div>
              </StyledHomeTwoImgBox>
              <StyledHomeMiddleImgTextBox className='type_text'>
                <Typewriter
                  options={{
                    strings: ['DAILYRHYTHM을 완성하다.'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </StyledHomeMiddleImgTextBox>
            </StyledHomeWidthBox>
          </StyledHomeMiddleImgDetailBox>

          <StyledHomeMiddleImgDetailBox className='width_img'>
            <StyledHomeWidthBox className='width_img'>
              <StyledHomeMiddleImgTextBox
                {...animatedHomeMiddleImg}
                className='width_img text_gap'
              >
                <StyledHomeMiddleText className='text_bold'>
                  다양한 리듬을 한곳에서 관리,
                </StyledHomeMiddleText>
                <StyledHomeMiddleText>
                  손쉽게 수정하고, 한눈에 완료 상태를 확인하며
                </StyledHomeMiddleText>
                <StyledHomeMiddleImgTextBox className='display_flex'>
                  <StyledHomeMiddleText className='text_bold'>
                    효율적인 하루
                  </StyledHomeMiddleText>
                  <StyledHomeMiddleText>를 완성하세요.</StyledHomeMiddleText>
                </StyledHomeMiddleImgTextBox>
              </StyledHomeMiddleImgTextBox>
              <StyledHomeImgBox className='width_img'>
                <StyledHomeMiddleImg
                  className='width_img'
                  src={introRhythmDetail}
                  alt='introRhythmDetail'
                  loading='lazy'
                />
              </StyledHomeImgBox>
            </StyledHomeWidthBox>
          </StyledHomeMiddleImgDetailBox>
          <StyledHomeMiddleImgDetailBox className='width_img background_color margin'>
            <StyledHomeWidthBox className='width_img'>
              <StyledHomeMiddleImgTextBox className='width_img text_bottom'>
                <StyledHomeMiddleText className='text_bold midium midium_large'>
                  어두운 환경에서도 편안하게.
                </StyledHomeMiddleText>
                <StyledHomeMiddleText className='line_height midium'>
                  다크 모드로 눈의 피로를 줄이고,
                  <br />
                  집중력을 유지하세요.
                </StyledHomeMiddleText>
              </StyledHomeMiddleImgTextBox>
              <StyledHomeImgBox
                {...animatedHomeMiddleText7}
                className='width_img'
              >
                <StyledHomeMiddleImg
                  className='width_img'
                  src={introDarkMode}
                  alt='introDarkMode'
                  loading='lazy'
                />
              </StyledHomeImgBox>
            </StyledHomeWidthBox>
          </StyledHomeMiddleImgDetailBox>
        </StyledHomeMiddleImgBox>
      </StyledHomeMiddleWrapper>
      <StyledHomeBottomWrapper>
        <StyledHomeBottomBox>
          <StyledhomeBottomImage
            src={homeBottomImage}
            alt='homeBottomImage'
            loading='lazy'
          />
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
      <StyledOrigin>출처 Freepik</StyledOrigin>
    </StyledHomeWrapper>
  );
}

const StyledArrowBox = styled(StyledBaseBox)`
  position: absolute;
  bottom: 5%;
  left: 50%;
  right: 50%;
`;

const StyledArrowButton = styled.button`
  font-weight: bold;
  font-size: 2.3rem;
  color: ${color.gray};
  background-color: transparent;
  border: none;
  transition: 1s ease;
  &:hover {
    transform: translateY(10px);
  }
`;
const StyledHomeWrapper = styled.section`
  position: absolute;
  width: 100%;
`;
const StyledOrigin = styled.p`
  text-align: end;
  background-color: ${lightTheme.accentColor};
  padding-bottom: 0.3rem;
  color: white;
  font-size: 0.7rem;
`;

const StyledHomeTopWrapper = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
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
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  background-color: white;
`;
const StyledHomeMiddleTextBox = styled(StyledBaseBox)`
  font-size: 1.7rem;
  font-weight: bold;
  margin: 6rem 0rem;
  @media (max-width: ${BREAKPOINTS.HomeSmall}) {
    font-size: 1.3rem;
  }
`;
const StyledHomeMiddleCount = styled.div`
  width: 4.5rem;
  font-size: 2rem;
`;
const StyledHomeMiddleImgBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledHomeMiddleImgDetailBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-bottom: 3rem;

  &.width_img {
    flex-direction: column;
  }
  &.height_img {
    flex-direction: column;
    width: 50%;
    gap: 1rem;
  }
  &.margin {
    margin-bottom: 0rem;
  }

  &.gap {
    gap: 1rem;
    margin-bottom: 2rem;
  }
  &.background_color {
    background-color: ${lightTheme.bodyBgColor};
    width: 100%;
    padding: 1rem 0rem;
  }
`;

const StyledHomeImgBox = styled(StyledBaseBox)`
  &.width_img {
    width: 100%;
  }

  &.bottom_margin {
    margin-bottom: 2rem;
  }
`;
const StyledHomeWidthBox = styled(StyledBaseBox)`
  width: 75%;
  &.width_img {
    flex-direction: column;
  }
  @media (max-width: ${BREAKPOINTS.HomeSmall}) {
    width: 90%;
  }
`;
const StyledHomeMiddleImg = styled.img`
  width: 100%;
  max-width: 25rem;
  &.width_img {
    max-width: 50rem;
  }
`;
const StyledHomeMiddleText = styled.h2`
  width: 100%;

  &.text_bold {
    font-weight: bold;
  }
  &.small {
    font-size: 1rem;
    @media (max-width: ${BREAKPOINTS.HomeSmall}) {
      font-size: 0.9rem;
    }
  }
  &.midium {
    font-size: 1.3rem;
    @media (max-width: ${BREAKPOINTS.HomeSmall}) {
      font-size: 1.1rem;
    }
  }
  &.midium_top {
    font-size: 1.3rem;
    @media (max-width: ${BREAKPOINTS.HomeSmall}) {
      font-size: 1.1rem;
    }
    @media (max-width: ${BREAKPOINTS.mobile}) {
      font-size: 0.95rem;
    }
  }
  &.midium_large {
    @media (max-width: ${BREAKPOINTS.HomeSmall}) {
      font-size: 1.2rem;
    }
  }
  &.large {
    font-size: 1.5rem;

    @media (max-width: ${BREAKPOINTS.HomeSmall}) {
      font-size: 1.1rem;
    }

    @media (max-width: ${BREAKPOINTS.mobile}) {
      font-size: 0.95rem;
    }
  }
  &.large_width {
    font-size: 1.2rem;
  }
  &.line_height {
    line-height: 1.5;
  }
  &.padding_bottom {
    padding-bottom: 1rem;
  }
  &.title {
    padding: 1rem 0rem;
    @media (max-width: ${BREAKPOINTS.HomeSmall}) {
      padding: 0.5rem 0rem;
    }
  }
`;
const StyledHomeMiddleImgTextBox = styled(StyledBaseBox)`
  flex-direction: column;
  width: 40%;
  padding-left: 2rem;
  font-family: 'GmarketSansMedium';
  gap: 1.5rem;

  &.top_text {
    width: 30%;
    @media (max-width: ${BREAKPOINTS.smallDesktopList}) {
      padding-left: 1rem;
      width: 40%;
    }
    @media (max-width: ${BREAKPOINTS.mediumMobile}) {
      padding-left: 1rem;
      width: 50%;
    }
  }

  &.type_text {
    font-size: 1.3rem;
    width: 100%;
    padding-top: 1rem;
    padding-left: 0rem;
    margin-bottom: 1rem;
    font-weight: bold;
    @media (max-width: ${BREAKPOINTS.HomeSmall}) {
      font-size: 1.3rem;
    }
  }
  &.height_img {
    width: 100%;
    padding-left: 0rem;
  }
  &.height_text {
    margin: 2rem 0rem 0rem 0rem;
    text-align: end;
    gap: 0.5rem;
  }
  &.width_img {
    width: 100%;
    text-align: center;
    padding-bottom: 2rem;
    padding-left: 0rem;
  }
  &.display_flex {
    flex-direction: row;
    gap: 0rem;
    padding-left: 0rem;
    width: 16rem;
  }
  &.text_gap {
    gap: 1rem;
  }
  &.text_bottom {
    padding-top: 1rem;
  }
  &.padding_bottom {
    padding-bottom: 1rem;
  }
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
const StyledHomeTwoImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
`;
