import { Injectable } from '@angular/core';
import { AngularFireList,AngularFireDatabase } from '@angular/fire/compat/database';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private dbPath="/konyvek";
  konyvekRef: AngularFireList<Book>
  constructor(private db:AngularFireDatabase) {
    this.konyvekRef= db.list(this.dbPath);
   }

  getAllBooks(){
    return this.konyvekRef;
  }

  create(konyv:any){
    return this.konyvekRef.push(konyv);
  }

  update(key:string, value:any){
    return this.konyvekRef.update(key,value);
  }
  delete(key:string){
    return this.konyvekRef.remove(key);
  }

  deleteAll(){
    return this.konyvekRef.remove();
  }

}
