import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroUserService {
  /* ESTE SERVICIO ES EXACTAMNETE IGUAL AL DE MODIFICACION SOLO QUE LLAMA AL PHP QUE SUBE POR PRIMERA
  VEZ LOS DATOS */

  private baseURI: string = "https://seccionales.unionferroviaria.org.ar/app/mutual/pp3/";

  constructor(private http:HttpClient) { }

  registrarDatos(nombre: string, apellido: string, email: string, fecha: string) {
    //console.log('Datos recibidos:', nombre, apellido, email, fecha);
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('fecha', fecha);

    //ACLARACION ESTE HTTP. PUEDE SER GET O POST 
    return this.http.post<any>(this.baseURI + 'registrarDatos.php', formData);
  }
}
