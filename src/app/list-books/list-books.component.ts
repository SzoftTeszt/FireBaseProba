import { Component } from '@angular/core';
import { BaseService } from '../service/base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent {
  oszlopok=["key","cim","szerzo","mufaj","tartalom","oldalszam"];
  ujKonyv:any={};
  konyvek:any;

  showError=false;
  errorMessage="";

  constructor(private bs:BaseService){
    this.retriveBooks();
  }
  
  addBook(body:any){
    this.bs.create(body)
      .then(()=>console.log("Új könyv rögzítése sikeres"))
      .catch(err=>{this.showError=true, this.errorMessage=err.message})
  }

  retriveBooks(){
    this.bs.getAllBooks().snapshotChanges().pipe(
      map(changes=>
        changes.map(c=>
          ({key:c.payload.key, ...c.payload.val()})))
    ).subscribe({
      
      next:adat=>{this.konyvek=adat; console.log("Frissítés"); this.showError=false},
      error:err=>{console.log("Hiba");this.showError=true, this.errorMessage=err.message}
    
    })
  }

  onDelete(konyv:any){
    this.bs.delete(konyv.key).then(()=>console.log("Sikeres törlés"))
    .catch(err=>{this.showError=true, this.errorMessage=err.message});
  }
  onUpdate(konyv:any){
    this.bs.update(konyv.key, konyv).then(()=>console.log("Sikeres Frissítés"))
    .catch(err=>{this.showError=true, this.errorMessage=err.message});
  }

  onDeleteAll(){
    this.bs.deleteAll().then(()=>console.log("Összes törölve!"))
    .catch(err=>{this.showError=true, this.errorMessage=err.message});
  }

}


