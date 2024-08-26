![제목을-입력해주세요_-001 (1)](https://github.com/user-attachments/assets/d2227488-0e84-4d7d-b2f3-17fce13008ec)

## DailyRhythm  

###### 개인 프로젝트

##### __기간: 2024.07.03 - 2024.07.16(7주)__
---
### 🔗 프로젝트 관련 링크
**배포 :** [https://dailyrhythm.vercel.app/](https://velog.velcdn.com/images/ga_dongiii/post/9c17e548-f37f-4576-9249-b5139d6fbc73/image.png)

**Git :** [https://github.com/Yugayoung/dailyrhythm](https://velog.velcdn.com/images/ga_dongiii/post/e610df07-8380-48a3-b06e-96b28aad14f0/image.png)

**velog :** [마지막 프로젝트 - 첫번째 이야기](https://velog.io/@ga_dongiii/%EB%A7%88%EC%A7%80%EB%A7%89-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%B2%AB%EB%B2%88%EC%A7%B8-%EC%9D%B4%EC%95%BC%EA%B8%B0)
### 🔥 Tech Stack
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) 
**react-query,** **zustand**
### ✍🏻 개요
 여러 앱을 사용해봤지만, 제가 원하는 기능이 모두 들어있는 앱을 찾을 수 없었습니다. 한 앱은 제가 필요로 하는 기능이 부족했고, 다른 앱은 사용하기 복잡했으며 이런 경험들을 바탕으로 사용자들이 자신의 루틴을 효율적으로 관리하고 즐길 수 있는 서비스를 제작하게 되었습니다.
### 👉🏻 주요 기능

### 📺 화면 구성

### 🗂️ 아키텍쳐
디렉토리 구조
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








