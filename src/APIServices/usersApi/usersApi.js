import axios from "axios";

export const registerApi = async (userData) => {
  try {
    const res = await axios.poss(
      `${BASE_URL}/users/register`,
      {
        username: userData.username,
        email: userData.email,
        passowrd: userData.password,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {}
};
