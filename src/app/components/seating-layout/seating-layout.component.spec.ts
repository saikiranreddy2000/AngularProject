import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingLayoutComponent } from './seating-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('SeatingLayoutComponent', () => {
  let component: SeatingLayoutComponent;
  let fixture: ComponentFixture<SeatingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
      declarations: [ SeatingLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
