import PokemonList from "@/component/Pokemons";
import { fetchAllPokemons } from "@/services/api";
import { Pokemon } from "@/utils/type";
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const PAGE_LIMIT = 10;

const HomePage = () => {
  const { data, error, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["infinitePost"],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllPokemons({
        limit: PAGE_LIMIT,
        offset: (pageParam - 1) * PAGE_LIMIT,
      }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: Pokemon.PokemonProps,
      allPages: Pokemon.PokemonProps[]
    ): number | undefined => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });

  const { ref } = useInView({
    onChange(inView, entry) {
      if (inView) {
        console.log("entry entry");
        console.log(entry);

        fetchNextPage();
      }
    },
  });

  return (
    <>
      {data?.pages.map((page: Pokemon.PokemonProps, index: number) => (
        <PokemonList data={page.results} key={index} />
      ))}

      <p ref={ref} style={{ height: "1px" }}></p>
      {isFetchingNextPage && "Loading..."}
    </>
  );
};

export default HomePage;
