import React, { useEffect, useState } from 'react';
import { useGetUser } from '../store/useUserStore';
import styled from 'styled-components';
import { GoGoal } from 'react-icons/go';
import { ThemeType } from '../css/styles.theme';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import ButtonComponent from './ui/ButtonComponent';
import { FaPen } from 'react-icons/fa';
import { BREAKPOINTS } from '../css/styles.width';

export default function UserCard() {
  const user = useGetUser();
  const currentTheme = useGetCurrentTheme();
  const [goal, setGoal] = useState('"나의 목표를 설정해보세요."');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const savedGoal = localStorage.getItem('userGoal');
    if (savedGoal) {
      setGoal(savedGoal);
    }
  }, []);

  function handleEditClick() {
    setEditing(true);
  }
  function handleSaveClick() {
    setEditing(false);
    localStorage.setItem('userGoal', goal);
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setGoal(event.target.value);
  }

  return (
    <StyledUserCardBox>
      <StyledGoalEditBox>
        {editing ? (
          <>
            <ButtonComponent onClick={handleSaveClick} text={'저장'} />
          </>
        ) : (
          <>
            <ButtonComponent
              onClick={handleEditClick}
              text={<FaPen />}
              backgroundColor={'transparent'}
            />
          </>
        )}
      </StyledGoalEditBox>
      <UserImg
        src={user.photoURL}
        alt={user.email}
        referrerPolicy='no-referrer'
        $currentTheme={currentTheme}
        loading='lazy'
      />
      <StyledUserDescriptionBox>
        <StyledUserImail>{user.email}</StyledUserImail>
        <StyledUserGoalBox>
          <StyledUserGoalIconBox>
            <GoGoal />
          </StyledUserGoalIconBox>
          <StyledUserGoalDetailBox>
            {editing ? (
              <>
                <StyledTextarea value={goal} onChange={handleChange} />
              </>
            ) : (
              <>{goal}</>
            )}
          </StyledUserGoalDetailBox>
        </StyledUserGoalBox>
      </StyledUserDescriptionBox>
    </StyledUserCardBox>
  );
}

const StyledUserCardBox = styled.div`
  position: relative;
  width: 21rem;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  background-color: #ffffffb5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'ONEMobileTitleOTF';
  margin-bottom: 2rem;
  @media (max-width: ${BREAKPOINTS.smallDesktop}) {
    width: 93%;
  }
`;
const StyledGoalEditBox = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
`;
const StyledUserDescriptionBox = styled.div`
  display: grid;
  gap: 1rem;
`;
const StyledUserGoalBox = styled.div`
  display: flex;
  font-size: 0.9rem;
`;
const StyledUserGoalIconBox = styled.div`
  padding-top: 0.3rem;
  font-size: 1rem;
`;
const StyledUserGoalDetailBox = styled.div`
  width: 10rem;
  height: 3rem;
  overflow: auto;
  white-space: normal;
  word-wrap: break-word;
  padding: 0.5rem;
`;
const StyledUserImail = styled.h2`
  font-size: 1.1rem;
  font-family: 'ONEMobileTitleOTF';
  text-align: center;
  font-weight: bold;
`;

const UserImg = styled.img<{
  $currentTheme: ThemeType;
}>`
  width: 6rem;
  border-radius: 100%;
  border: 4px solid ${({ $currentTheme }) => $currentTheme.textColor};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border: none;
  resize: none;
`;
