export namespace Infinite.Pagination {
  export type PaginationProps = {
    limit: number;
    offset: number;
  };

  export type PaginationPartialProps = Partial<PaginationProps>;
}

export namespace Pokemon {
  export type PokemonProps = {
    count: number;
    next: string | null;
    previous: string | null;
    results: SinglePokemon[];
  };

  export type SinglePokemon = {
    name: string;
    url: string;
  };
}
