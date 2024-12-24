const getUserByFromLS = () => {
  const userId = localStorage.getItem("userId");
  return userId || null;
};
export const methods = {
  getUserByFromLS,
};

// const getUserByFromLS = () => {
//     const userId = localStorage.getItem("userId");
//     const userName = localStorage.getItem("userName");  // Get the user name from localStorage
//     return { userId, userName };  // Return both userId and userName
// }

// export const methods = {
//     getUserByFromLS
// }
