import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActividadesUsuariosComponent } from './tabla-actividades-usuarios.component';

describe('TablaActividadesUsuariosComponent', () => {
  let component: TablaActividadesUsuariosComponent;
  let fixture: ComponentFixture<TablaActividadesUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaActividadesUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaActividadesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});