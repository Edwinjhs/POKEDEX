import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit{
  pokemons: any[]=[];
  page=1;
  perPage=6
  totalPokemons: number= 151;
  offset= 0;


  constructor(private dataService: DateService){}
  ngOnInit(): void {
    this.getPokemons();
  }
  // get pokemons

  getPokemons(){
    this.dataService.getPokemons(this.perPage, this.offset).subscribe((response:any)=>{
      // console.log(response)
      // this.pokemons=response.results;
      this.totalPokemons=response.count;
      console.log(this.totalPokemons)
      response.results.forEach((result: {name:string;}) => {
        this.dataService.getMoreData(result.name).subscribe((uniqResponse:any)=>{
          this.pokemons.push(uniqResponse);
        })
      })
    })
  }
  // getPokemons(){

  //   this.dataService.getPokemons(10, this.offset ).subscribe((response:any) => {
  //     this.totalPokemons = response.count;
  //   // console.log(response);
  //     response.results.forEach((result: { name: string; }) => {
  //       this.dataService.getMoreData(result.name).subscribe((uniqResponse:any) => {
  //         this.pokemons.push(uniqResponse);
  //         console.log(this.pokemons);
  //         console.log(this.pokemons.length);
  //         console.log(uniqResponse.name);
  //       });
  //     });
  //   });
  // }
//  CAMBIO DE PAGINATION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  OnchangePages(event:any){
    console.log(event);
    this.offset = (this.perPage*this.page)-this.perPage;
    this.page = event;
    this.getPokemons();
  }

  // getMorePokemons1(){
  //   this.dataService.getMorePokemons1(10, this.page + 10).subscribe ((response:any) => {
  //     this.totalPokemons=response.count;
  //     response.results.forEach((result: { name: string; }) => {
  //       this.dataService.getMoreData(result.name).subscribe((uniqResponse:any) => {
  //         this.pokemons.push(uniqResponse);
  //         console.log(this.pokemons);
  //         console.log(this.pokemons.length);
  //         console.log(uniqResponse.name);

  //       });
  //     });
  //   });
  // }
}

