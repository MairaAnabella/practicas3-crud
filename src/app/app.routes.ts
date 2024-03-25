import { Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { InsertDatosComponent } from './components/abm/insert-datos/insert-datos.component';


//ESTE ES EL ARCHIVO DE RUTEO CUANDO TENES MAS DE UNA PAGINA
//EN ESTE EJEMPLO NO SE USA PORQUE USAMOS MODALES(DIALOG)
export const routes: Routes = [
    {
        path:'',
       component:HomeComponent
    } ,

   
     {
        path:'datos',
       component:InsertDatosComponent
    } , 


];
