import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActividadesUsuarioComponent } from './tabla-actividades-usuario.component';

describe('TablaActividadesUsuarioComponent', () => {
  let component: TablaActividadesUsuarioComponent;
  let fixture: ComponentFixture<TablaActividadesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaActividadesUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaActividadesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
