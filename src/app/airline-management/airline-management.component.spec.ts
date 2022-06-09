import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineManagementComponent } from './airline-management.component';

describe('AirlineManagementComponent', () => {
  let component: AirlineManagementComponent;
  let fixture: ComponentFixture<AirlineManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
