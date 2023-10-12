import axios from 'axios'

export const getVersions = async () => {
  try {
    const res = await axios.get('/api/projects/getVersions');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const addVersions = async ({id}) => {
    try {
      const res = await axios.post('/api/projects/addVersions', { id });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }