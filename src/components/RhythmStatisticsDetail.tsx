import React, { useState } from 'react';
import styled from 'styled-components';
import { useRhythmStatistics } from '../hooks/useDateRhythmCalculate';
import { useGetCurrentTheme } from '../store/useDarkModeStore';
import { ThemeType, lightTheme } from '../css/styles.theme';
import LinearProgressBar from './ui/LinearProgressBar';
import ButtonComponent from './ui/ButtonComponent';
import { FaPen, FaPlus } from 'react-icons/fa';
import RhythmExpandedTable from './RhythmExpandedTable';
import { useGetUser } from '../store/useUserStore';
import dayjs from 'dayjs';
import { useModal } from '../hooks/useModal';
import AddRhythm, { RhythmItem } from './AddRhythm';
import Modal from './ui/Modal';

export default function RhythmStatisticsDetail() {
  const { rhythmDetails } = useRhythmStatistics();
  const currentTheme = useGetCurrentTheme();
  const [expandedRhythm, setExpandedRhythm] = useState<string>(null);
  const user = useGetUser();
  const uid = user.uid;
  const formatDate = (date: string) => dayjs(date).format('YYYY.MM.DD');
  const handleExpandClick = (id: string) => {
    setExpandedRhythm((prev) => (prev === id ? null : id));
  };
  const [selectedRhythm, setSelectedRhythm] = useState(null);
  const { isOpen, closeModal, openModal } = useModal();

  const handleEditClick = (rhythm: RhythmItem) => {
    setSelectedRhythm(rhythm);
    openModal();
  };
  function handleCloseModal() {
    closeModal();
    setSelectedRhythm(null);
  }

  return (
    <div>
      <StyledRhythmStatisticsTitle>Rhythm Detail</StyledRhythmStatisticsTitle>
      <StyledRhythmStatisticsRightBox
        $currentTheme={currentTheme}
        $isMargin={true}
      >
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Time</th>
              <th>Preriod</th>
              <th>Progress</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {rhythmDetails.map((item) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{item.icon}</td>
                  <td>{item.title}</td>
                  <td>{item.time}</td>
                  <td>
                    {formatDate(item.startDate)} ~ {formatDate(item.endDate)}
                  </td>
                  <td>
                    <LinearProgressBar
                      totalCount={item.totalCount}
                      doneCount={item.doneCount}
                    />
                  </td>
                  <td>
                    <ButtonComponent
                      onClick={() => handleExpandClick(item.id)}
                      text={<FaPlus />}
                      textColor={lightTheme.textColor}
                      backgroundColor={'transparent'}
                      className='focusEffect'
                    />
                  </td>
                  <td>
                    <ButtonComponent
                      onClick={() => handleEditClick(item)}
                      text={<FaPen />}
                      textColor={lightTheme.textColor}
                      backgroundColor={'transparent'}
                    />
                  </td>
                </tr>
                {expandedRhythm === item.id && (
                  <tr>
                    <td colSpan={6}>
                      <RhythmExpandedTable
                        rhythmId={expandedRhythm}
                        uid={uid}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </StyledRhythmStatisticsRightBox>
      {selectedRhythm && (
        <Modal isOpen={isOpen}>
          <AddRhythm onClick={handleCloseModal} rhythm={selectedRhythm} />
        </Modal>
      )}
    </div>
  );
}

const StyledRhythmStatisticsRightBox = styled.div<{
  $isMargin?: boolean;
  $currentTheme: ThemeType;
}>`
  margin-bottom: ${({ $isMargin }) => ($isMargin ? '2rem' : '0rem')};
  background-color: ${lightTheme.statisbgColor};
  padding: 1.3rem;
  border-radius: 1rem;
  box-shadow: ${({ $currentTheme }) => $currentTheme.placeholderColor} 0px 3px
    8px;
  color: ${lightTheme.textColor};
`;
const StyledRhythmStatisticsTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledRhythmStatisticsDetailHeadBox = styled.div<{
  $currentTheme: ThemeType;
}>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid
    ${({ $currentTheme }) => $currentTheme.placeholderColor};
`;
const StyledRhythmStatisticsDetailHeadTitle = styled.p<{
  $padding?: string;
}>`
  padding-left: ${({ $padding }) => ($padding ? $padding : '0rem')};
`;
const StyledRhythmStatisticsDetailUl = styled.ul`
  max-height: 100px;
  overflow-y: scroll;
  display: block;
  margin-top: 1rem;
`;

const StyledRhythmStatisticsDetailLi = styled.li`
  display: flex;
  font-size: 1rem;
  padding: 0.3rem;
  text-align: center;
  width: 100%;
  height: 2rem;
  font-weight: bold;
`;

const StyledRhythmStatisticsDetailText = styled.p<{
  $width?: string;
}>`
  width: ${({ $width }) => ($width ? $width : '10%')};
`;
