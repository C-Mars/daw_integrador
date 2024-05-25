import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaAdminComponent } from './auditoria-admin.component';

describe('AuditoriaAdminComponent', () => {
  let component: AuditoriaAdminComponent;
  let fixture: ComponentFixture<AuditoriaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditoriaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuditoriaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
