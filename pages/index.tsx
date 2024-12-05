import PokemonList from "@/component/Pokemons";
import { fetchAllPokemons } from "@/services/api";
import { Pokemon } from "@/utils/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const PAGE_LIMIT: Readonly<number> = 10;
export default function Home() {
  const {
    data,
    isLoading,
    error,
    isFetching,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infiniteQuery"],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllPokemons({
        limit: PAGE_LIMIT,
        offset: (pageParam - 1) * PAGE_LIMIT,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: Pokemon.PokemonProps,
      allPages: Pokemon.PokemonProps[]
    ) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <div>
        {data?.pages.map((page: Pokemon.PokemonProps) => (
          <PokemonList data={page.results} />
        ))}
      </div>
      <div ref={ref}></div>
    </>
  );
}
