import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarActividadComponent } from './editar-actividad.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

describe('EditarActividadComponent', () => {
  let component: EditarActividadComponent;
  let fixture: ComponentFixture<EditarActividadComponent>;

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
      declarations: [EditarActividadComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
