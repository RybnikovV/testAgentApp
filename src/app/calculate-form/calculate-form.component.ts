import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { calcTariff } from './calc-tariff'

@Component({
  selector: 'app-calculate-form',
  templateUrl: './calculate-form.component.html',
  styleUrls: ['./calculate-form.component.scss']
})
export class CalculateFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    killometers: new FormControl('', [Validators.required, Validators.pattern("^[1-9]\\d?$")]),
    age: new FormControl('', [Validators.required, Validators.pattern("^[1-9]\\d?$")]),
    baggageWeight: new FormControl('', [Validators.required, Validators.pattern("^[1-9]\\d?$")])
  });
  calculatedData: any = {
    planeTariff: [],
    traingTariff: [],
  };

  constructor() { }

  ngOnInit(): void {
  }
  
  calc() {
    const valueForm = this.form.value;

    this.calculatedData = calcTariff(valueForm);
  }
}
