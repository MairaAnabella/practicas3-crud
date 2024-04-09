import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDatosComponent } from './delete-datos.component';

describe('DeleteDatosComponent', () => {
  let component: DeleteDatosComponent;
  let fixture: ComponentFixture<DeleteDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
