import React from 'react';
import { UserInfo } from '../store/useUserStore';
import styled from 'styled-components';

interface UserProps {
  user: UserInfo;
}

export default function User({ user }: UserProps) {
  return (
    <StyledUserBox>
      <UserImg
        src={user.photoURL}
        alt={user.email}
        referrerPolicy='no-referrer'
      />
      <StyledUserNameWapper>
        <StyledUserName>{user.displayName}</StyledUserName> 님
      </StyledUserNameWapper>
    </StyledUserBox>
  );
}

const StyledUserBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 0.7rem;
`;

const UserImg = styled.img`
  width: 2.5rem;
  border-radius: 100%;
  margin-right: 0.3rem;
`;

const StyledUserNameWapper = styled.span`
  display: none;

  font-size: 1rem;
  font-weight: 500;
  @media (min-width: 768px) {
    display: block;
  }
`;
const StyledUserName = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;
