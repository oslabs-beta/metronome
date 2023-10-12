import axios from 'axios'

export const getProjects = async () => {
  try {
    const res = await axios.get('/api/projects/getProjects');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const addProjects = async ({id}) => {
    try {
      const res = await axios.post('/api/projects/addProjects', { id });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }