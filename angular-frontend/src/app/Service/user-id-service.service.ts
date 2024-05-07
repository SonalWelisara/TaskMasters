import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdServiceService {
  private userId : number | undefined ; 

  constructor() { }

  setUserId(id: number){
    this.userId = id;
  }

  getUserId():number|undefined{
    return this.userId ; 
  }
}
