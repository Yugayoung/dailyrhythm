export const lightTheme = {
  bgColor: '#FCF6FC', // 베이지색
  textColor: '#001d3d', // 남색
  primaryColor: '#9c89b8', // 보라색
  accentColor: '#efc3e6', // 분홍색
  secondaryColor: '#b8bedd', // 하늘색
  supportingColor: '#f0a6ca', // 진분홍색
  errorColor: '#EF2F24', // 빨강색
  placeholderColor: '#C2C2C2', // 회색
};

export const darkTheme = {
  bgColor: '#001d3d', // 남색
  textColor: '#FFFFFF', // 베이지색
  primaryColor: '#ffd60a', // 노랑색
  accentColor: '#003566', // 파랑색
  secondaryColor: '#ffc300', // 진노랑색
  supportingColor: '#7b68ee', // 하늘색
  errorColor: '#EF2F24', // 빨강색
  placeholderColor: '#9E9E9E', // 회색
};

export const color = {
  gray: '#F3F3F3',
  lightGray: '#e1e0e0',
};

export const theme = {
  lightTheme,
  darkTheme,
};
export type ThemeType = typeof lightTheme & typeof darkTheme;
export default theme;
