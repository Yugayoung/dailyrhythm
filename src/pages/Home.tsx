import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../css/styles.theme';

export default function Home() {
  return (
    <>
      <StyledTitleWrapper>
        <StyledTitleBox>
          <StyledTitleText>DAILY RHYTHM</StyledTitleText>
        </StyledTitleBox>
      </StyledTitleWrapper>
      <StyledBox></StyledBox>
    </>
  );
}

const StyledTitleWrapper = styled.section`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: ${lightTheme.accentColor};
`;

const StyledTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 10px;
  right: 0;
  position: absolute;
  width: 250px;
`;

const StyledBox = styled.div`
  margin-top: 100rem;
  height: 30rem;
`;

const StyledTitleText = styled.h1`
  color: #fff;
  font-size: 80px;
  font-weight: bold;
  font-family: 'GmarketSansMedium';
  transform: rotate(20deg) skew(-20deg);
  -webkit-transform: rotate(20deg) skew(-20deg);
  -moz-transform: rotate(20deg) skew(-20deg);
  -o-transform: rotate(20deg) skew(-20deg);
  -ms-transform: rotate(20deg) skew(-20deg);
  text-shadow: 1px 1px 0 #51b3a3, 2px 2px 0 #51b3a3, 3px 4px 0 #51b3a3,
    4px 5px 0 #51b3a3, 5px 7px 0 #51b3a3, 6px 8px 0 #51b3a3, 7px 10px 0 #51b3a3,
    8px 11px 0 #51b3a3, 9px 13px 0 #51b3a3, 10px 14px 0 #51b3a3,
    11px 16px 0 #51b3a3, 12px 17px 0 #51b3a3, 13px 19px 0 #51b3a3,
    14px 20px 0 #51b3a3, 15px 22px 0 #51b3a3, 16px 23px 0 #51b3a3,
    17px 25px 0 #51b3a3, 18px 26px 0 #51b3a3, 19px 28px 0 #51b3a3,
    20px 29px 0 #51b3a3, 21px 30px 0 #389788, 23px 31px 0 #389788,
    24px 32px 0 #389788, 26px 33px 0 #389788, 27px 34px 0 #389788,
    29px 35px 0 #389788, 30px 36px 0 #389788, 32px 37px 0 #389788,
    33px 38px 0 #389788, 35px 39px 0 #389788, 36px 40px 0 #389788,
    38px 41px 0 #389788, 39px 42px 0 #389788, 41px 43px 0 #389788,
    42px 44px 0 #389788, 44px 45px 0 #389788, 45px 46px 0 #389788,
    47px 47px 0 #389788, 48px 49px 0 #7ee5d6, 49px 51px 0 #7ee5d6,
    50px 53px 0 #7ee5d6, 51px 55px 0 #7ee5d6, 52px 57px 0 #7ee5d6,
    53px 59px 0 #7ee5d6, 54px 61px 0 #7ee5d6, 55px 63px 0 #7ee5d6,
    56px 65px 0 #7ee5d6, 57px 67px 0 #7ee5d6, 58px 69px 0 #7ee5d6,
    59px 71px 0 #7ee5d6, 60px 73px 0 #7ee5d6, 61px 75px 0 #7ee5d6,
    62px 77px 0 #7ee5d6, 63px 79px 0 #7ee5d6, 65px 80px 0 #51b3a3,
    68px 81px 0 #51b3a3, 70px 82px 0 #51b3a3, 72px 83px 0 #51b3a3,
    74px 84px 0 #51b3a3, 76px 85px 0 #51b3a3, 78px 86px 0 #51b3a3,
    80px 87px 0 #51b3a3, 82px 88px 0 #51b3a3, 84px 89px 0 #51b3a3,
    86px 90px 0 #51b3a3, 88px 91px 0 #51b3a3, 90px 92px 0 #51b3a3;
`;
