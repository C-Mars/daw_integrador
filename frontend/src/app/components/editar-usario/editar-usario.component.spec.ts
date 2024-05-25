import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsarioComponent } from './editar-usario.component';

describe('EditarUsarioComponent', () => {
  let component: EditarUsarioComponent;
  let fixture: ComponentFixture<EditarUsarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUsarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarUsarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
