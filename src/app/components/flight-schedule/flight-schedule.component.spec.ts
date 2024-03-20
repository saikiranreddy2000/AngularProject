import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightScheduleComponent } from './flight-schedule.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('FlightScheduleComponent', () => {
  let component: FlightScheduleComponent;
  let fixture: ComponentFixture<FlightScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [FlightScheduleComponent],
      providers:[DatePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
