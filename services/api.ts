import { Infinite, Pokemon } from "@/utils/type";

const API_URL: Readonly<string | undefined> = process.env.NEXT_PUBLIC_API_URL;

export const fetchAllPokemons = async ({
  limit = 10,
  offset = 0,
}: Infinite.Pagination.PaginationPartialProps) => {
  const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
  const data: Pokemon.PokemonProps = await response.json();

  return data;
};
