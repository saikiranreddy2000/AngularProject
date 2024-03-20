import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;

  beforeEach(async () => {
     TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    });
    await TestBed.compileComponents()
  
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'airline app is running!'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    expect(app.title).toEqual('airline app is running!');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    const titleElement=compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    const titleText=titleElement?.textContent?.trim();
    expect(titleText).toBeTruthy();
    expect(titleText).toEqual('airline app is running!')
  });
});
