import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reportes-activos',
  templateUrl: './reportes-activos.component.html',
  styleUrls: ['./reportes-activos.component.scss']
})
export class ReportesActivosComponent implements OnInit {
  formDepreciacionFiscalMensual : FormGroup;
  formDepreciacionFinancieraMensual: FormGroup;
  formDepreciacionFiscalAnual: FormGroup;
  formDepreciacionFinancieraAnual: FormGroup;
  constructor() { 
    this.formDepreciacionFiscalMensual = new FormGroup({
      'mes' : new FormControl('',[Validators.required]),
      'anio' : new FormControl('',[Validators.required]),
    });

    this.formDepreciacionFinancieraMensual = new FormGroup({
      'mes' : new FormControl('',[Validators.required]),
      'anio' : new FormControl('',[Validators.required]),
    });


    this.formDepreciacionFiscalAnual = new FormGroup({
      'anio' : new FormControl('',[Validators.required]),
    });

    this.formDepreciacionFinancieraAnual = new FormGroup({
      'anio' : new FormControl('',[Validators.required]),
    });


  }

  ngOnInit(): void {
  }

}
