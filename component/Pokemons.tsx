import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pokemon } from "@/utils/type";

export type PokemonCollection = {
  data: Pokemon.SinglePokemon[];
};
const PokemonList = ({ data }: PokemonCollection) => {
  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        {/* Responsive grid layout for posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((pokemon: Pokemon.SinglePokemon, index: number) => (
            <Card key={index} className="hover:shadow-lg">
              {/* Card Header with title and description */}
              <CardHeader>
                <CardTitle>{pokemon.name}</CardTitle>
                <CardTitle>{pokemon.name}</CardTitle>
                <CardDescription>{pokemon.url}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default PokemonList;
