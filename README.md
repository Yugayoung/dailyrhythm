![제목을-입력해주세요_-001 (1)](https://github.com/user-attachments/assets/d2227488-0e84-4d7d-b2f3-17fce13008ec)

# DailyRhythm  

###### 개인 프로젝트

##### __기간: 2024.06.03 - 2024.07.16(7주)__
## 🔗 프로젝트 관련 링크
**배포 :** [https://dailyrhythm.vercel.app/](https://dailyrhythm.vercel.app/)

**Git :** [https://github.com/Yugayoung/dailyrhythm](https://github.com/Yugayoung/dailyrhythm)

**velog :** [마지막 프로젝트 - 첫번째 이야기](https://velog.io/@ga_dongiii/%EB%A7%88%EC%A7%80%EB%A7%89-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B2%AB%EB%B2%88%EC%A7%B8-%EC%9D%B4%EC%95%BC%EA%B8%B0)


## 🔥 Tech Stack
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) 
**react-query,** **zustand**


## ✍🏻 개요
 여러 앱을 사용해봤지만, 제가 원하는 기능이 모두 들어있는 앱을 찾을 수 없었습니다. 한 앱은 제가 필요로 하는 기능이 부족했고, 다른 앱은 사용하기 복잡했으며 이런 경험들을 바탕으로 사용자들이 자신의 루틴을 효율적으로 관리하고 즐길 수 있는 서비스를 제작하게 되었습니다.
## 💡 주요 기능
- Firebase를 통한 Google 로그인
- 루틴 설정 및 일정 관리
- 루틴에 대한 레포트 및 분석 
- 현재 위치 기반 날씨 조회

## 📺 화면 구성
| 홈 화면 | My하루 |
| :--: |:--: |
| <img width="1010" alt="스크린샷 2024-08-22 오후 5 30 28" src="https://github.com/user-attachments/assets/931d1f60-aa6b-4905-8a77-23c03cdc2ead">|<img width="1039" alt="스크린샷 2024-08-26 오후 7 17 02" src="https://github.com/user-attachments/assets/cb1c9d56-afd3-4202-9d0f-ea4b8d8a8585">|
| 반응형 | 리듬 탐색 |
<img width="1000" alt="스크린샷 2024-08-26 오후 7 17 46" src="https://github.com/user-attachments/assets/b712a81e-cd42-4b7f-b511-d04466ca386d">|<img width="600" alt="스크린샷 2024-08-26 오후 7 17 18" src="https://github.com/user-attachments/assets/6cb5884b-dddf-4dc6-9ecb-39528f2a2b4c"> <img width="1035" alt="스크린샷 2024-08-26 오후 7 17 31" src="https://github.com/user-attachments/assets/231e698a-cb1c-48f3-8219-196c1e63157c">|
## 🗂️ 아키텍쳐
**디렉토리 구조**
```
📦src
 ┣ 📂api
 ┃ ┣ 📜firebase.ts
 ┃ ┗ 📜weather.ts
 ┣ 📂components
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜AnimatedCircularProgressbarComponent.tsx
 ┃ ┃ ┣ 📜ButtonComponent.tsx
 ┃ ┃ ┣ 📜ConfirmModal.tsx
 ┃ ┃ ┣ 📜LinearProgressBar.tsx
 ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┣ 📜AddRhythm.tsx
 ┃ ┣ 📜AddRhythmButton.tsx
 ┃ ┣ 📜CalendarComponent.tsx
 ┃ ┣ 📜DropDown.tsx
 ┃ ┣ 📜Header.tsx
 ┃ ┣ 📜Navbar.tsx
 ┃ ┣ 📜NavbarBottom.tsx
 ┃ ┣ 📜ProtectedRoute.tsx
 ┃ ┣ 📜RhythmExpandedTable.tsx
 ┃ ┣ 📜RhythmList.tsx
 ┃ ┣ 📜RhythmStatisticsBadge.tsx
 ┃ ┣ 📜RhythmStatisticsComponent.tsx
 ┃ ┣ 📜RhythmStatisticsDetail.tsx
 ┃ ┣ 📜RhythmTitleInput.tsx
 ┃ ┣ 📜SelectHighlighter.tsx
 ┃ ┣ 📜SelectIcon.tsx
 ┃ ┣ 📜TimeAndPeriod.tsx
 ┃ ┣ 📜TodayRhythmStatistics.tsx
 ┃ ┣ 📜User.tsx
 ┃ ┣ 📜UserCard.tsx
 ┃ ┗ 📜Weather.tsx
 ┣ 📂css
 ┃ ┣ 📜GlobalStyles.ts
 ┃ ┣ 📜styles.highlighter.ts
 ┃ ┣ 📜styles.theme.ts
 ┃ ┗ 📜styles.width.ts
 ┣ 📂fonts
 ┃ ┣ 📜GmarketSansLight.otf
 ┃ ┣ 📜GmarketSansMedium.otf
 ┃ ┣ 📜GmarketSansTTFLight.ttf
 ┃ ┣ 📜GmarketSansTTFMedium.ttf
 ┃ ┣ 📜HancomSans-SemiBold.otf
 ┃ ┣ 📜HancomSansSemiBold.ttf
 ┃ ┣ 📜MoveSansLight.otf
 ┃ ┣ 📜MoveSansLight.ttf
 ┃ ┗ 📜ONEMobileTitleOTF.otf
 ┣ 📂hooks
 ┃ ┣ 📜useDateRhythmCalculate.ts
 ┃ ┣ 📜useModal.ts
 ┃ ┣ 📜useRhythm.ts
 ┃ ┣ 📜useScrollClipPath.ts
 ┃ ┣ 📜useScrollCount.ts
 ┃ ┣ 📜useScrollFadeIn.ts
 ┃ ┗ 📜useWindowSize.ts
 ┣ 📂images
 ┃ ┣ 📜GuideImage.png
 ┃ ┣ 📜badge10.png
 ┃ ┣ 📜badge100.png
 ┃ ┣ 📜badge300.png
 ┃ ┣ 📜badge50.png
 ┃ ┣ 📜badge500.png
 ┃ ┣ 📜basicLogoDark.png
 ┃ ┣ 📜basicLogoLight.png
 ┃ ┣ 📜goalImg.png
 ┃ ┣ 📜handImg.png
 ┃ ┣ 📜homeBottomImage.png
 ┃ ┣ 📜homeTopImage.png
 ┃ ┣ 📜introAddRhythm.gif
 ┃ ┣ 📜introBadge.gif
 ┃ ┣ 📜introDarkMode.gif
 ┃ ┣ 📜introRhythmCalendar.gif
 ┃ ┣ 📜introRhythmDetail.gif
 ┃ ┣ 📜introTodayReport.gif
 ┃ ┗ 📜introWeather.gif
 ┣ 📂pages
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜MyRhythm.tsx
 ┃ ┣ 📜NotFound.tsx
 ┃ ┗ 📜RhythmStatistics.tsx
 ┣ 📂store
 ┃ ┣ 📜useDarkModeStore.ts
 ┃ ┗ 📜useUserStore.ts
 ┣ 📜App.css
 ┣ 📜App.test.tsx
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```

## ✅ 업데이트 사항
프로젝트의 기능을 추가하거나 코드를 지속적으로 업데이트하고 있습니다.
(2024.11.12) 로그인 유효시간 리팩토링
(2024.10.24) 토큰 연장 요청 버튼 구현
(2024.10.22) 토큰 유효시간을 가져와 자동 로그아웃 기능 구현
(2024.10.20) Zustand 미들웨어인 persist 추가
(2024.10.16-17) 성능(FCP, CLS 등) 개선을 위한 코드 수정









