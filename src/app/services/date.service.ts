import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { literalMap } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  searchPokemon(value: any, arg1: Promise<void>, arg2: void) {
    throw new Error('Method not implemented.');
  }
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

  // getPokemonByName(name:string){
  //   return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

  // }

  getAllPokemons() {
    var pokemons: any[]=[];
    this.getPokemons(151, 0).subscribe((response:any)=>{
      // console.log(response)
      // this.pokemons=response.results;      // console.log(this.totalPokemons)
      response.results.forEach((result: {name:string;}) => {
        this.getMoreData(result.name).subscribe((uniqResponse:any)=>{
          pokemons.push(uniqResponse);
        })
      })
    })
    return pokemons;
  }

}
