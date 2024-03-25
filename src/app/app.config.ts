import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';

// ESTE ARCHIVO ES IMPORTANTE SE AGREGAN LOS IMPORT QUE  VAN A USAR TODOS NUESTROS COMPONENTES
// REPLAZA EL APP.MODULE DE VERSIONES VIEJAS DE ANGULAR
// QUE SE IMPORTE ACA NO QUIERE DECIR QUE NUESTROS COMPONENTES FUNCIONEN

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),provideHttpClient(),
    HttpClient,MatTableDataSource,MatTableModule,MatDialogModule, MatDatepickerModule]
    ,
  
};