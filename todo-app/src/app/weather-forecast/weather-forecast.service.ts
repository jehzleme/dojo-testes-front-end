import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherForecast } from './models/weather-forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private readonly httpClient: HttpClient) { }

  getWeatherForecasts(): Observable<WeatherForecast[]> {
    return this.httpClient.get<WeatherForecast[]>(`${environment.api}/weather-forecasts`);
  }
}
