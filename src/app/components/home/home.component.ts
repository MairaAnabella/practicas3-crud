import { Component, EventEmitter, OnInit, Output,AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common'; // PARA USAR NgFot, NgIf, NgSwitch --> https://angular.dev/guide/directives
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { TableConfig } from '../../models/table.config.model';
import { TableAction } from '../../models/table.action.model';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
/* TODOS LOS DE ARRIBA SON IMPORT DE ANGULAR MATERIAL */

import { InsertDatosComponent } from '../abm/insert-datos/insert-datos.component';//ESTOS DOS SON LOS COMPONETES MODAL
import { ModifDatosComponent } from '../abm/modif-datos/modif-datos.component'; // UMO DE INSERT Y OTRO DE MODIF
import { DeleteDatosComponent } from '../abm/delete-datos/delete-datos.component';

// NO PUEDEN FALTAR SI NO ES IMPOSIBLE HACER USO DE LOS MISMOS

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgIf,MatTableModule,MatFormFieldModule, MatInputModule,MatSortModule, MatPaginatorModule],
  // ESTE IMPORT ES MUY IMPORTANTE SI NO SE PONEN ACA LOS NOMBRES DE LO QUE INICIAMOS ARRIBA NO VA ANDAR
  //VA DAR ERRO IGUAL
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

//EL ONiNIT DE LA CLASE ES PORQUE USAMOS UNA CARGA NI BIEN INICIA
export class HomeComponent implements OnInit {
    //private baseURI = 'http://localhost/proyecto-crud/'; /* esta es la url del servidor */
    private baseURI = 'https://crudpp3.000webhostapp.com/';
 
  datos:MatTableDataSource<any>;// SE DEFINE LOS DATOS DE LA TABLA
  defineColumnas:string[]=['nombre','apellido','email','fecha'];// SE DEFINE LAS COLUMNAS
  mostrarTabla:boolean=false;
  tableConfig: TableConfig | undefined;
  tableCofig:TableConfig={
  isPaginable:true
  }
  @Output() action:EventEmitter<TableAction>=new  EventEmitter(); // ESTO ES EL EVENTO QUE PERMITE RECARGAR LOSDATOS SIN F5
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;/* ESTO DOS NO FUNCIONAN SON PARA EL PAGINADOR*/ 
  
  constructor(private http:HttpClient,public dialog: MatDialog){
      this.datos = new MatTableDataSource<any>(); // SE INSTACIA EL OBJETO MATTABLE
  }

//ABRE EL DIALOG DE INSERT
  openDialog(): void {
    const dialogRef = this.dialog.open(InsertDatosComponent);// LE PASAMOS EL COMPONENTE QUE DEBE ABRIR

     // Suscribirse al evento de datos insertados emitido por el diálogo
     dialogRef.componentInstance.datosInsertados.subscribe(() => {
      // Cuando se emite el evento de datos insertados, volver a cargar los datos de la tabla
      this.solicitarDatos();// SOLICITAMOS DATOS A LA BD
    });
  
  }
  

  
// ESTE METODO CARGA NI BIEN INICIA LA PAGINA TRAE LOS DATOS DE LA BD
  ngOnInit(): void {
      this.solicitarDatos();
  }


 //ESTA FUNCION TRAE LOS DATOS MEDIANTE GET DE LA BASE DE DATOS LLAMANDO AL ARCHIVO PHP 
  solicitarDatos() {
    this.http.get<any[]>(this.baseURI + 'visualizarDatos.php')
      .subscribe((resp) => {
        if (resp && resp.length > 0) {
          this.datos.data = resp; // GUARDAMOS EN NUESTRA VARIABLE LA RESPUESTA LA TRAE EN ARRAY ASOCIATIVO
        } else {
          console.log('No se encontraron datos.');
        }
      }, (error) => {
        console.log('Error al obtener datos:', error);
      });
  }

  // ACA SE CREA LA COLUMNA ACCIONES
  setConfig(config: TableConfig) {
    this.tableConfig = config;

   
    if (this.tableConfig.showActions) {
      this.defineColumnas.push('acciones');
    }
  }


  // ESTE ABRE EL COMPONENTE DE EDITAR
OnEdit(row:any){
  //this.action.emit({action:TABLE_ACTION.EDIT,row});
  const dialogRef = this.dialog.open(ModifDatosComponent, {
    data: row // Pasar los datos a través de la opción 'data'
  });
  dialogRef.componentInstance.datosInsertados.subscribe(() => {
    // Cuando se emite el evento de datos insertados, volver a cargar los datos de la tabla
    this.solicitarDatos();
  });
 

  //console.log(row, 'editar')

}


// ESTA FUNCION  PUEDEN USAR PARA ELIMINAR LOS DATOS 
/* LE RECOMIENDO USEN ALGUN ALERT QUE SOLO DIGA ESTA SEGURO QUE QUIERE ELIMINAR Y DENTRO DE ESTA FUNCION HAGAN
EL LLAMADO AL PHP QUE BORRA MAS SENCILLO O CREAN UN COMPONENTE ELIMINAR  */
onDelete(id:any){
  const dialogRef = this.dialog.open(DeleteDatosComponent, {
    data: id // Pasar los datos a través de la opción 'data'
  });
  dialogRef.componentInstance.datosEliminados.subscribe(() => {
    // Cuando se emite el evento de datos insertados, volver a cargar los datos de la tabla
    this.solicitarDatos();
  });


}


// ESTE METODO SE LLAMA CUANDO YA SE CARGARON LAS VISTAS DEL COMPOENENTE 
ngAfterViewInit() {
  this.datos.paginator = this.paginator;
  this.datos.sort = this.sort;
  this.paginator.pageSize = 10;
}
  

// ESTA FUNCION CONTROLA  EL FILTRO
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datos.filter = filterValue.trim().toLowerCase();
    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
    console.log(this.datos.filter)
    console.log(event)
  }

}
