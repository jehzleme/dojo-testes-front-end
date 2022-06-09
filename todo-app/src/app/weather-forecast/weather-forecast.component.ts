import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, finalize } from 'rxjs';
import { objectHasPropertyWithValue } from 'src/util/filter-util';
import { WeatherForecast } from './models/weather-forecast.model';
import { WeatherForecastService } from './weather-forecast.service';

@Component({
  selector: 'todo-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  weatherForecasts: WeatherForecast[];
  loading = true;
  searchForm = new FormGroup({
    searchInput: new FormControl(''),
  });

  private _weatherForecasts: WeatherForecast[];

  constructor(private readonly weatherForecastService: WeatherForecastService) { }

  ngOnInit(): void {
    this.weatherForecastService
      .getWeatherForecasts()
      .pipe(finalize(() => this.loading = false))
      .subscribe(weatherForecasts => {
        this._weatherForecasts = weatherForecasts;
        this.weatherForecasts = weatherForecasts;
      });

    this.searchForm.controls.searchInput.valueChanges
      .pipe(debounceTime(250))
      .subscribe((term) => {
        this.weatherForecasts = this.filterWeatherForecastsByValue(term);
      });
  }

  private filterWeatherForecastsByValue(term: string | null): WeatherForecast[] {
    if (!term) {
      return this._weatherForecasts;
    }

    return this._weatherForecasts.filter(forecast => objectHasPropertyWithValue(forecast, term, 'longDate'));
  }
}
