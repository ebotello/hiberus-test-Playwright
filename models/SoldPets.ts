import { SimplePetEntity } from "../types/pet"

export default class SoldPets {
    readonly pets: SimplePetEntity[]
  
    constructor(pets: SimplePetEntity[]) {
      if(!pets) {
        throw new Error('need pets data');
      }
  
      if(pets && !Array.isArray(pets)) {
        throw new Error('pets data must be a array of objects [{}. {}]');
      }
  
      pets.forEach(pet => {
        if(pet.hasOwnProperty('id') && pet.hasOwnProperty('name')) {
          return true;
        } else {
          throw new Error('pets object must have this structure { id, name }');
        }
      });
  
      this.pets = pets;
    }
  
    getCountSoldReport(): any {
      let data: any = {};
  
      this.pets.forEach((pet) => {
        if(!data[pet.name]) {
          data[pet.name] = 1;
        } else {
          data[pet.name]++;
        }
      })
  
      return data;
    }
  }
  