import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { literalMap } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getPokemonsByName(name: any) {
    throw new Error('Method not implemented.');
  }
  pokemonsapi = 'https://pokeapi.co/api/v2'

  constructor(private http:HttpClient) { }
// Get Pokemons
  getPokemons(limit: number, offset: number){
    return this.http.get(this.pokemonsapi + `/pokemon?limit=${limit}&offset=${offset}`)
  }
  // getMorePokemons1(limit:number,offset:number){
  //   return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  // }

// getMorePokemonData
  getMoreData(name:string){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }


}


