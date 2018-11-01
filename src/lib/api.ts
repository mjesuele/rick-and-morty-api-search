import axios from "axios";
import NodeCache from "node-cache";
import logger from "./logger";

const minutesAsSeconds = (n: number) => n * 60;
const cache = new NodeCache({ stdTTL: minutesAsSeconds(10) });

type RequestOptions = {
  baseUrl?: string,
};

type CharactersResponse = {
  info: CharactersResponseInfo,
  results: Character[],
};

type CharactersResponseInfo = {
  count: number,
  pages: number,
  next: string,
  prev: string,
};

type Character = {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: Location,
  location: Location,
  image: string,
  episode: string[],
  url: string,
  created: string,
};

type Location = {
  name: string,
  url: string,
};

const defaultRequestOptions: RequestOptions = {
  baseUrl: "https://rickandmortyapi.com/api",
};

export async function get<T>(path: string, options = defaultRequestOptions): Promise<T> {
  const cachedResult = cache.get(path);
  if (cachedResult) {
    logger.debug(`cache hit for ${path}`);
    return cachedResult as T;
  }

  logger.debug(`cache miss for ${path}`);
  const { data } = await axios.get<T>(`${options.baseUrl}${path}`);
  cache.set(path, data);
  return data;
}

export function getAllCharacters(options = defaultRequestOptions) {
  return get<CharactersResponse>("/character/", options);
}

export function getCharactersByName(name: string, options = defaultRequestOptions) {
  return get<CharactersResponse>(`/character/?name=${encodeURIComponent(name)}`, options);
}

export function getCharacterById(id: number, options = defaultRequestOptions) {
  return get<Character>(`/character/${id}`, options);
}

export function getCharactersByIds(ids: number[], options = defaultRequestOptions) {
  return get<Character[]>(`/character/${ids.join(",")}`, options);
}
