import axios from 'axios';
import { RICK_AND_MORTY_URL } from './urls';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllCharacters: async () => {
        const resp = await axios.get(`${RICK_AND_MORTY_URL}`);
        return resp
      },
}