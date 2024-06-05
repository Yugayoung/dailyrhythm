import React from 'react';
import { UserInfo } from '../store/useUserStore';
import styled from 'styled-components';

interface UserProps {
  user: UserInfo;
}

const User: React.FC<UserProps> = ({ user }) => {
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
};

const StyledUserBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 0.7rem;
`;

const UserImg = styled.img`
  width: 4rem;
  border-radius: 100%;
`;

const StyledUserNameWapper = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;
const StyledUserName = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

export default User;
