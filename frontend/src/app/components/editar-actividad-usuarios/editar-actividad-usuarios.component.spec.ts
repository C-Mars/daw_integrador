import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarActividadUsuariosComponent } from './editar-actividad-usuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

describe('EditarActividadUsuariosComponent', () => {
  let component: EditarActividadUsuariosComponent;
  let fixture: ComponentFixture<EditarActividadUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        DialogModule,
        CalendarModule,
        ButtonModule,
        InputTextModule
      ],
      declarations: [EditarActividadUsuariosComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarActividadUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
