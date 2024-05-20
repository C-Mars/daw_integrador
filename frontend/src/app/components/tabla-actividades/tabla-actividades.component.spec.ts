import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActividadesComponent } from './tabla-actividades.component';

describe('TablaActividadesComponent', () => {
  let component: TablaActividadesComponent;
  let fixture: ComponentFixture<TablaActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
