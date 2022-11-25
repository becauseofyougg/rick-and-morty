import axios from 'axios';

const api = `https://rickandmortyapi.com/api`

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllCharacters: async () => {
        const resp = await axios.get(`${api}`);
        return resp
      },
}