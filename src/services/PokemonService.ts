import { GenericService } from "./GenericService";

export class PokemonService {
  private static instance: PokemonService;
  private constructor() {}

  public static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      PokemonService.instance = new PokemonService();
    }
    return PokemonService.instance;
  }

  async getAllPokemons(
    offset: number = 0,
    limit: number = 20
  ): Promise<APIResponse> {
    return GenericService.get({
      endpoint: `/pokemon?offset=${
        offset === 0 ? 0 : limit * offset
      }&limit=${limit}`,
    });
  }

  async getPokemonByName(name: string): Promise<APIResponse> {
    return GenericService.get({
      endpoint: `/pokemon/${name}`,
    });
  }

  async getPokemonById(id: number): Promise<APIResponse> {
    return GenericService.get({
      endpoint: `/pokemon/${id}`,
    });
  }
}
