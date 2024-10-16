import React from 'react';
import { UserInfo } from '../store/useUserStore';
import styled from 'styled-components';
import { BREAKPOINTS } from '../css/styles.width';
import ButtonComponent from './ui/ButtonComponent';
import { useGetCurrentTheme } from '../store/useDarkModeStore';

interface UserProps {
  user: UserInfo | null;
  onClick?: () => void;
}

export default function User({ user, onClick }: UserProps) {
  const currentTheme = useGetCurrentTheme();

  if (!user) {
    return null;
  }
  return (
    <StyledUserBox>
      <UserImg
        src={user.photoURL}
        alt={user.email}
        referrerPolicy='no-referrer'
        loading='lazy'
      />
      <StyledUserNameWapper>
        <StyledUserName>{user.displayName}</StyledUserName> 님
      </StyledUserNameWapper>
      <ButtonComponent
        onClick={onClick}
        text={'Logout'}
        backgroundColor={'transparent'}
        textColor={currentTheme.errorColor}
        hoverTextColor={currentTheme.textColor}
        className='padding-none'
      />
    </StyledUserBox>
  );
}

const StyledUserBox = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  width: 2.5rem;
  border-radius: 100%;
  border: 1px solid white;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    margin-right: 0.2rem;
  }
`;

const StyledUserNameWapper = styled.span`
  display: none;
  font-size: 1rem;
  font-weight: 500;
  margin: 0rem 0.4rem 0rem 0.3rem;
  @media (min-width: ${BREAKPOINTS.smallDesktop}) {
    display: block;
  }
`;
const StyledUserName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;
