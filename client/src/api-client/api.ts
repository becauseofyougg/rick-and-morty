import axios from 'axios';
import urls from './urls';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllCharacters: async () => {
        const resp = await axios.get(`${urls.RICK_AND_MORTY_URL}/character`);
        return resp
      },
}