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

  async getAllPokemons(): Promise<APIResponse> {
    return GenericService.get({
      endpoint: "/",
    });
  }
  
  async getPokemonByName(name: string): Promise<APIResponse> {
    return GenericService.get({
      endpoint: `/${name}`,
    });
  }

  async getPokemonById(id: number): Promise<APIResponse> {
    return GenericService.get({
      endpoint: `/${id}`,
    });
  }
}
