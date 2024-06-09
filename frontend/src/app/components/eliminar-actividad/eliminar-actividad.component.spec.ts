import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarActividadComponent } from './eliminar-actividad.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

describe('EliminarActividadComponent', () => {
  let component: EliminarActividadComponent;
  let fixture: ComponentFixture<EliminarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ConfirmDialogModule,
        ButtonModule
      ],
      declarations: [EliminarActividadComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
