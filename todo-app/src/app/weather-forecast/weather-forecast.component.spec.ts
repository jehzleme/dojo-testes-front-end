import { HttpTestingController } from '@angular/common/http/testing';
import { WeatherForecastService } from './weather-forecast.service';
import { WeatherForecastModule } from './weather-forecast.module';
import { AppModule } from './../app.module';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { WeatherForecastComponent } from './weather-forecast.component';
import { WeatherForecast } from './models/weather-forecast.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

fdescribe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let weatherForecastServiceMock: WeatherForecastService;
  let backendMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        WeatherForecastModule
      ],
      declarations: [ WeatherForecastComponent ]
    })
    .compileComponents();

    backendMock = TestBed.inject(HttpTestingController);

    //weatherForecastServiceMock = TestBed.inject(WeatherForecastService);
    //spyOn(weatherForecastServiceMock, 'getWeatherForecasts').and.returnValue(of(weatherForecasts));

    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    backendMock
    .expectOne({
      url: 'http://localhost:8050/api/weather-forecasts',
      method: 'GET'
    })
    .flush(weatherForecastsMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load weather forecasts when is initialized', () => {
    const table: HTMLTableElement = fixture.debugElement.query(By.css('nz-table table')).nativeElement;
    expect(table.rows.length).toBe(4);

    const header = table.rows.item(0);
    expect(header?.cells?.item(0)?.innerHTML).toBe('Date');
    expect(header?.cells?.item(1)?.innerHTML).toBe('Summary');
    expect(header?.cells?.item(2)?.innerHTML).toBe('Temperature Cº');
    expect(header?.cells?.item(3)?.innerHTML).toBe('temperature Fº');

    const row1 = table.rows.item(1);
    expect(row1?.cells?.item(0)?.innerHTML).toBe('June 11, 2022');
    expect(row1?.cells?.item(1)?.innerHTML).toBe('Warm');
    expect(row1?.cells?.item(2)?.innerHTML).toBe('🥶 10 Cº');
    expect(row1?.cells?.item(3)?.innerHTML).toBe('49 Fº');

    const row2 = table.rows.item(1);
    expect(row2?.cells?.item(0)?.innerHTML).toBe('June 11, 2022');
    expect(row2?.cells?.item(1)?.innerHTML).toBe('Warm');
    expect(row2?.cells?.item(2)?.innerHTML).toBe('🥶 10 Cº');
    expect(row2?.cells?.item(3)?.innerHTML).toBe('49 Fº');
  });

  it('Should filter rendered data by Date when user type in input', fakeAsync(() => {
    component.searchForm.controls.searchInput.setValue('12');
    tick(500);
    fixture.detectChanges();


    const table: HTMLTableElement = fixture.debugElement.query(By.css('nz-table table')).nativeElement;
    expect(table.rows.length).toBe(4);
  }));

  const weatherForecastsMock: WeatherForecast[] = [
    {
      date: new Date('2022-06-11T14:48:09'),
      temperatureC: 10,
      summary: 'Warm',
      temperatureF: 49
    },
    {
      date: new Date('2022-06-11T14:48:10'),
      temperatureC: 17,
      summary: 'Warm',
      temperatureF: 62
    },
    {
      date: new Date('2022-06-12T14:48:09'),
      temperatureC: 10,
      summary: 'Warm',
      temperatureF: 49
    },
    {
      date: new Date('2022-06-11T14:48:10'),
      temperatureC: 17,
      summary: 'Warm',
      temperatureF: 62
    }
  ];
});
