import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useWindowSize } from '../hooks/useWindowSize';
import { BREAKPOINTS } from '../css/styles.width';
import styled from 'styled-components';
import { lightTheme } from '../css/styles.theme';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import ButtonComponent from './ui/ButtonComponent';
import { Link } from 'react-router-dom';

interface DropDownProps {
  onClick: () => void;
}

export default function DropDown({ onClick }: DropDownProps) {
  const windowSize = useWindowSize();
  const currentTheme = useGetCurrentTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const isSmallWindow = windowSize.width < parseInt(BREAKPOINTS.smallDesktop);

  const windowSizeItems = (
    <DropdownMenu>
      <Triangle />
      <DropdownMenuItem>
        <ButtonComponent
          onClick={onClick}
          backgroundColor={'transparent'}
          text={'Logout'}
          textColor={lightTheme.textColor}
          textSize={'0.7rem'}
          hoverTextColor={lightTheme.errorColor}
          className='padding-none dropdown witheBgColor'
        />
      </DropdownMenuItem>
    </DropdownMenu>
  );

  const smallWindowSizeItems = (
    <DropdownMenu>
      <Triangle />
      <DropdownMenuItem className='smallDesktopDropdownMenu'>
        <StyledLink to='/my-rhythm'>My하루</StyledLink>
        <StyledLink to='/rhythm-statistics'>리듬탐색</StyledLink>
        <ButtonComponent
          onClick={onClick}
          backgroundColor={'transparent'}
          text={'Logout'}
          textColor={lightTheme.textColor}
          textSize={'0.8rem'}
          hoverTextColor={lightTheme.errorColor}
          className='padding-none dropdown '
        />
      </DropdownMenuItem>
    </DropdownMenu>
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    function handleScroll() {
      if (isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <Dropdown ref={dropdownRef}>
      <ButtonComponent
        onClick={toggleDropdown}
        backgroundColor={'transparent'}
        text={<IoIosArrowDown />}
        textColor={currentTheme.textColor}
        textSize={'1rem'}
        className='padding-none'
      />
      {isOpen && (isSmallWindow ? smallWindowSizeItems : windowSizeItems)}
    </Dropdown>
  );
}

const StyledLink = styled(Link)`
  font-family: 'GmarketSansMedium';
  font-size: 0.8rem;
  color: ${lightTheme.textColor};
  text-decoration: none;
  padding: 0.5rem 0.7rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled.div`
  position: absolute;
  display: inline-block;
  right: 30px;
  bottom: -6px;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    right: 1px;
    bottom: -13px;
  }
`;

const DropdownMenuItem = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  right: 5%;

  &.smallDesktopDropdownMenu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    gap: 0.5rem;
    width: 5rem;
  }
`;

const Triangle = styled.div`
  position: absolute;
  width: 0px;
  height: 0px;
  border-bottom: 8px solid white;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  left: -41px;
  bottom: -9px;
  z-index: 1001;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    left: -54px;
  }
`;
