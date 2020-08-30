import { Component, OnInit, OnDestroy  } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { WeatherService } from '../services/weather.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  addCityForm = new FormGroup({
    country: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    imageUrl: new FormControl("",Validators.required)
  });

  constructor(private snackBar: MatSnackBar, 
    private weatherSvc: WeatherService,
    private router: Router) { }

  ngOnInit() {
  
  }

  ngOnDestroy(){
    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addCityForm.controls[controlName].hasError(errorName);
  }

  saveCity(){
    let country = this.addCityForm.get("country").value;
    let city = this.addCityForm.get("city").value;
    let imageUrl = this.addCityForm.get("imageUrl").value;
    let cityObject = {
      city: city,
      country: country,
      imageurl: imageUrl
    }

    this.weatherSvc.addCity(cityObject);
    let snackBarRef = this.snackBar.open("City Added", "Done", {
      duration: 3000
    });
    this.router.navigate(["/"]);
  }
}
