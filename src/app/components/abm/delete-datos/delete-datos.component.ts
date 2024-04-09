import { Component, EventEmitter, Inject, inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteService } from '../../../service/delete.service';
@Component({
  selector: 'app-delete-datos',
  standalone: true,
  imports: [MatDialogContent, MatDialogModule],
  templateUrl: './delete-datos.component.html',
  styleUrl: './delete-datos.component.css',
})
export class DeleteDatosComponent {
  id:number=0;
  datosEliminados: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<DeleteDatosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deleteService: DeleteService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete() {
    this.deleteService.delete(this.data).subscribe((resp:any)=>{
      this.onNoClick();
      this.datosEliminados.emit();
    })
  }
}
