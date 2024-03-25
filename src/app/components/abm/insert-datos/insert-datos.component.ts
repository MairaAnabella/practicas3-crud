import { Component, EventEmitter, Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef, MatDialogContent ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { RegistroUserService } from '../../../service/registro-user.service'; // IMPORTA EL SERVICIO 

@Component({
  selector: 'app-insert-datos',
  standalone: true,
  
  providers: [provideNativeDateAdapter() , { provide: MAT_DATE_FORMATS, useValue: {// ESTO SON PATRONES DE DISEÑO
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MM YYYY',
    },
  },
},],
  imports: [
    MatFormFieldModule,
    MatDialogContent,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    
   
  ],
  templateUrl: './insert-datos.component.html',
  styleUrl: './insert-datos.component.css',
})



export class InsertDatosComponent {
   // Declaración de un EventEmitter para emitir un evento cuando se complete la inserción de datos
   datosInsertados: EventEmitter<void> = new EventEmitter<void>();
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  fecha=new Date();
  fechaString = this.fecha.toString();
  constructor(
    public http: HttpClient,
    public dialogRef: MatDialogRef<InsertDatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private registrarDatos:RegistroUserService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  registrar() {

    this.registrarDatos.registrarDatos(this.nombre, this.apellido, this.email, this.fechaString)
      .subscribe((resp) => {
        this.onNoClick();
         // Emitir el evento de datos insertados una vez que se haya completado la inserción de datos
         this.datosInsertados.emit();
        //console.log('Registro exitoso:', resp);
        
      }, (error) => {
        console.log('Error al registrar datos:', error);
    
      });
  }
}
