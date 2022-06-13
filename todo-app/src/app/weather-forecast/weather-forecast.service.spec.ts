import { WeatherForecast } from './models/weather-forecast.model';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  let weatherForecastService: WeatherForecastService;
  let backendMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    weatherForecastService = TestBed.inject(WeatherForecastService);
    backendMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    backendMock.verify();
  });

  it('should be created', () => {
    expect(weatherForecastService).toBeTruthy();
  });

  it('Should call weather-forecasts with GER method when loading weather forecasts', () => {
    weatherForecastService.getWeatherForecasts().subscribe();
    const action = () => backendMock.expectOne({
      url: 'http://localhost:8050/api/weather-forecasts',
      method: 'GET'
    });
    expect(action).not.toThrow();
  });

  it('Should return weather forecasts with expected response', () => {
    const httpResponseMock = [
      {
        "date": "2022-06-11T14:48:09",
        "temperatureC": 10,
        "sumary": "Warm",
        "temperatureF": 49
      },
      {
        "date": "2022-06-11T14:48:10",
        "temperatureC": 17,
        "summary": "Chilly",
        "temperatureF": 62
      }
    ];
    const weatherForecasts: WeatherForecast[] = [
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
      }
    ];

    weatherForecastService.getWeatherForecasts()
    .subscribe(result => {
      expect(result).toEqual(weatherForecasts);
    });

    const httpReq = backendMock.expectOne({
      url: 'http://localhost:8050/api/weather-forecasts',
      method: 'GET'
    });
  });
});
