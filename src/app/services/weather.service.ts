import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  countries = [
    { countryName: 'China', city: 'Beijing' },
    { countryName: 'India', city: 'New Delhi' },
    { countryName: 'Malaysia', city: 'Kuala Lumpur' },
    { countryName: 'Singapore', city: 'Singapore' }
  ];

  imgMapBasedCity = [
    {
      city: 'Singapore',
      imageUrl: 'assets/images/sg.png'
    },
    {
      city: 'Kuala Lumpur',
      imageUrl: `assets/images/kl.png`},
    {
      city: 'Beijing',
      imageUrl: `assets/images/beijing.png`},
    {
      city: 'New Delhi',
      imageUrl: `assets/images/newdelhi.png`}
  ];

  constructor(private httpSvc: HttpClient) { }

  getWeather(city: string, apiKey: string): Promise<any> {
    const params = new HttpParams()
      .set("q", city)
      .set("appid", apiKey);

    return this.httpSvc.get(environment.api_url, { params: params })
      .toPromise();
  }

  addCity(city: City) {
    this.countries.push({ countryName: city.country, city: city.city });
    this.countries.sort((a, b) => (a.countryName > b.countryName) ? 1 : -1);
    this.imgMapBasedCity.push({ city: city.city, imageUrl: 
      `${city.imageurl}` });
  }
}
