import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModUserService {
  private baseURI = 'http://localhost/proyecto-crud/'; /* esta es la url del servidor */

  //el httpClient es la '''libreria''' para enviar los datos al servidor
  constructor(private http:HttpClient) { }

  modificarDatos(id:number,nombre: string, apellido: string, email: string, fecha: string) {
    //console.log('Datos recibidos:', nombre, apellido, email, fecha,id);
    const formData = new FormData(); //crea un array asociativo clave:valor
    const idAsString = id.toString(); //convertimos la fechade tipo date a string porque el FormData no permite otro tipo(creo)
    formData.append('id',idAsString ); //el append() agrega al final el dato
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('fecha', fecha);


//finalmente se '''conecta''' con el archivo php especifico y se pasa el array
    return this.http.post<any>(this.baseURI + 'modifDatos.php ', formData); 
  }


}
