import { Component, EventEmitter, Inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule, } from '@angular/material/core';
import { MatDialogRef, MatDialogContent ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ModUserService } from '../../../service/mod-user.service'; // servicio sube los datos modificados a la BD


@Component({
  selector: 'app-modif-datos',
  standalone: true,
  providers: [provideNativeDateAdapter() , { provide: MAT_DATE_FORMATS, useValue: {
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
  imports: [ MatFormFieldModule,
    MatDialogContent,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,],
  templateUrl: './modif-datos.component.html',
  styleUrl: './modif-datos.component.css'
})
export class ModifDatosComponent {
  // Declaración de un EventEmitter para emitir un evento cuando se complete la inserción de datos
  datosInsertados: EventEmitter<void> = new EventEmitter<void>();

  /* Declaracion de variables */
  id:number=0;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  fecha:any;
  
  /* constructor de la clase */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // se pasa la data del componente home
    public dialogRef: MatDialogRef<ModifDatosComponent>, // se inicia el dialog
    private modifDatos:ModUserService 
  ) {
    /* se guarda en la variables locales la info de data */
    if (data) {
      this.id=data.id;
      this.nombre= data.nombre;
      this.apellido = data.apellido;
      this.email= data.email;
      this.fecha = new Date(data.fecha);
    }
    
    //console.log('constructor', this.id)
  }

  /* este es una funcion que inicia cuando se carga el componente */
  ngOnInit() {
   // console.log('Datos recibidos en el diálogo:', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }/* funcion para cerrar el dialog(modal) */


  /* funcion que manda al servidor los datos necesacios para subir a la BD */
  modificarDatos(){
   // console.log(this.id);

   /* llamada http para enviar los datos al servidor y recibir la respuesta */
    this.modifDatos.modificarDatos(this.id,this.nombre, this.apellido, this.email, this.fecha)
    .subscribe((resp) => {
      this.onNoClick();
      // Emitir el evento de datos insertados una vez que se haya completado la inserción de datos
      // el emit() es para que al volver al home los datos modificados aparezan sin necesidad de recargar la pagina
      this.datosInsertados.emit(); 
     //console.log('Registro exitoso:', resp);
     
   }, (error) => {
     console.log('Error al registrar datos:', error);
 
   });


  }

}
