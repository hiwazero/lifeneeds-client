// tokenUtils.js

// Function to get the token from local storage
export const getToken = () => {
  try {
    const token = sessionStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
