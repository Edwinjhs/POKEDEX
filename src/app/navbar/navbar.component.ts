import { Component } from '@angular/core';
import { getJSON } from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

pokeCard = document.querySelector('[data-poke-card]') as HTMLElement;
pokeName = document.querySelector('[data-poke-name]') as HTMLElement;
pokeImg = document.querySelector('[data-poke-img]') as HTMLElement;
pokeImgContainer = document.querySelector('[data-poke-img-container]') as HTMLElement;
pokeId = document.querySelector('[data-poke-id]') as HTMLElement;
pokeTypes = document.querySelector('[data-poke-types]') as HTMLElement;
pokeStats = document.querySelector('[data-poke-stats]') as HTMLElement;
pokeWeight = document.querySelector('[data-poke-weight]') as HTMLElement;
pokeHP = document.querySelector('[data-poke-hp]') as HTMLElement;
pokeAtt = document.querySelector('[data-poke-att]') as HTMLElement;
submit = document.getElementById('submitsearch');
typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

  searchPokemon = (event: { preventDefault: () => void; target: { pokemon: { value: any; }; }; }) => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => this.renderPokemonData(response))
        .catch(err => this.renderNotFound())
}
  renderPokemonData = (data: { sprites?: any; name?: any; id?: any; weight?: any; stats: any; types?: any; }) => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;
    this.pokeName.textContent = data.name;
    this.pokeImg.setAttribute('src', sprite);
    this.pokeId.textContent = "Nº " [data.id];
    this.pokeWeight.textContent = "Peso:" [data.weight];
    this.pokeHP.textContent = 'Salud:' [data.stats[0].base_stat];
    this.pokeHP.textContent = 'Ataque:' [data.stats[1].base_stat];
    //setCardColor(types); //COLOR FONDO TARJETA
    this.renderPokemonTypes(types);
    //renderPokemonStats(stats);
}
    renderPokemonTypes = (types: any[]) => {
      this.pokeTypes.innerHTML = '';
      types.forEach(type => {
        const typeTextElement = document.createElement("div");
        //typeTextElement.style.color = typeColors[type.type.name]; //DA EL COLOR AL TIPO
        // typeTextElement.style.background = this.typeColors[type.type.name];
        typeTextElement.textContent = type.type.name; //DA EL TIPO DE POKEMON
        this.pokeTypes.appendChild(typeTextElement);
      });
    }
    renderPokemonStats = (stats: any[]) => {
      this.pokeStats.innerHTML = '';
      stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        this.pokeStats.appendChild(statElement);
    });
  }
  renderNotFound = () => {
    this.pokeName.textContent = 'No encontrado';
    this.pokeImg.setAttribute('src', 'pokebola.png');
    this.pokeImg.style.background =  '#fff';
    this.pokeTypes.innerHTML = '';
    this.pokeStats.innerHTML = '';
    this.pokeId.textContent = '';
    this.pokeWeight.textContent = '';
    this.pokeHP.textContent = '';
    this.pokeAtt.textContent = '';
  }




}
