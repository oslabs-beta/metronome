import axios from 'axios'

export const loginUser = async ({email, password}) => {
  try {
    console.log('reachedlogin');
    console.log(email)
    console.log(password)
    const res = await axios.post('/api/users/login', { email, password });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const registerUser = async (name, email, password) => {
  try {
    const res = await axios.post('/api/users/register', { name:name, email:email, password:password });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const checkSession = async () => {
  try {
    const res = await axios.get('api/check-session');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const logoutUser = async () => {
  try {
    const res = await axios.post('/api/logout');
    return res.data.loggedOut;
  } catch (err) {
    console.log(err);
    return err;
  }
}
