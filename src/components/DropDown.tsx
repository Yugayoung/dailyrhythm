import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
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

  const windowSizeItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ButtonComponent
          onClick={onClick}
          backgroundColor={'transparent'}
          text={'Logout'}
          textColor={lightTheme.textColor}
          textSize={'0.7rem'}
          className='padding-none dropdown witheBgColor'
        />
      ),
    },
  ];
  const smallWindowSizeItems: MenuProps['items'] = [
    {
      key: '1',
      label: <StyledLink to='/my-rhythm'>My하루</StyledLink>,
    },
    {
      key: '2',
      label: <StyledLink to='/rhythm-statistics'>리듬탐색</StyledLink>,
    },
    {
      key: '3',
      label: (
        <ButtonComponent
          onClick={onClick}
          backgroundColor={'transparent'}
          text={'Logout'}
          textColor={lightTheme.textColor}
          textSize={'0.8rem'}
          hoverTextColor={lightTheme.errorColor}
          className='padding-none dropdown '
        />
      ),
    },
  ];

  const dropdownItems =
    windowSize.width < parseInt(BREAKPOINTS.smallDesktop)
      ? smallWindowSizeItems
      : windowSizeItems;

  return (
    <div>
      <Dropdown
        menu={{ items: dropdownItems }}
        placement='bottom'
        arrow
        trigger={['click']}
        overlayClassName='custom-dropdown'
      >
        <ButtonComponent
          backgroundColor={'transparent'}
          text={
            <>
              <IoIosArrowDown />
            </>
          }
          textColor={currentTheme.textColor}
          textSize={'1rem'}
          className='padding-none'
        />
      </Dropdown>
    </div>
  );
}

const StyledLink = styled(Link)`
  font-family: 'GmarketSansMedium';
`;
