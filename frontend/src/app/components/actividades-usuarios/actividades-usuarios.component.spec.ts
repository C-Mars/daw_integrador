import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesUsuariosComponent } from './actividades-usuarios.component';

describe('ActividadesUsuariosComponent', () => {
  let component: ActividadesUsuariosComponent;
  let fixture: ComponentFixture<ActividadesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActividadesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
