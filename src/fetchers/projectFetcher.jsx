import axios from 'axios'

export const getProjects = async () => {
  try {
    const res = await axios.get('/api/projects/getProjects');
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const addProjects = async (projectName) => {
    try {
      const res = await axios.post('/api/projects/addProjects', projectName);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

  export const setProject = async (projectName) => {
    try {
      const res = await axios.post('/api/projects/setProject', projectName);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }