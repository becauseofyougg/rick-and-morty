export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  email: string;
  password: string;
  bio?: string;
}

interface CharactersInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface LocationInfo {
  name: string;
  url: string;
}
interface OriginInfo {
  name: string;
  url: string;
}
export interface SingleCharacterInfo {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: LocationInfo;
  name: string;
  origin: OriginInfo;
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface AllCharacters {
  info: CharactersInfo;
  results: SingleCharacterInfo[];
}
