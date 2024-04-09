import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private baseURI: string = "https://seccionales.unionferroviaria.org.ar/app/mutual/pp3/";
  constructor(public http:HttpClient) { }

  delete(id:Number){
    const formData = new FormData();
    const idAsString = id.toString(); //convertimos la fechade tipo date a string porque el FormData no permite otro tipo(creo)
    formData.append('id',idAsString );


  return this.http.post<any>(this.baseURI + 'deleteDatos.php', formData);
}
}
