import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffaccessComponent } from './staffaccess.component';

describe('StaffaccessComponent', () => {
  let component: StaffaccessComponent;
  let fixture: ComponentFixture<StaffaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffaccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
