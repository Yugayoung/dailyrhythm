import React from 'react';
import { UserInfo } from '../store/useUserStore';
import styled from 'styled-components';

interface UserProps {
  user: UserInfo;
}

const User: React.FC<UserProps> = ({ user }) => {
  return (
    <div>
      <UserImg
        src={user.photoURL}
        alt={user.email}
        referrerPolicy='no-referrer'
      />
      <span>{user.displayName}</span>
    </div>
  );
};

const UserImg = styled.img`
  width: 4rem;
  border-radius: 100%;
`;

export default User;
