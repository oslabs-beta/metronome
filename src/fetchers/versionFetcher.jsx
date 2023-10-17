import axios from 'axios'

export const getVersions = async () => {
  try {
    const res = await axios.get('/api/versions/getVersions');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const addVersions = async (versionName) => {
    try {
      const res = await axios.post('/api/versions/addVersions', versionName);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  export const setVersion = async (versionName) => {
    try {
      const res = await axios.post('/api/versions/setVersion', versionName);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }