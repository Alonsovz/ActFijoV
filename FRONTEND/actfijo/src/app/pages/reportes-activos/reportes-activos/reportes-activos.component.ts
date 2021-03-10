import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reportes } from 'src/app/models/reportes';
import { ReportesActivosService } from 'src/app/services/reportes-activos.service';

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
  cuadroMensual : Reportes[];
  modalDepreciacionMensusal = false;
  periodoEvaluando : string;
  tipo : string;

  listOfDataCuadroFinancieroMensual: ReadonlyArray<Reportes> = [];
  listOfCurrentPageDataCuadroMensual: ReadonlyArray<Reportes> = [];

  constructor(private reportesService: ReportesActivosService) { 
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

  generarDepreciacionFiscalMensual(){
    let datos : Reportes = new Reportes();
    datos = this.formDepreciacionFiscalMensual.value;

    var mes = this.formDepreciacionFiscalMensual.controls["mes"].value;
    var anio = this.formDepreciacionFiscalMensual.controls["anio"].value;


    this.reportesService.getCuadroDepreciacionFiscalMensual(datos).subscribe(
      data => {
        this.listOfDataCuadroFinancieroMensual = data;

        this.modalDepreciacionMensusal = true;
        this.periodoEvaluando = mes+anio;
        this.tipo =  'fiscal';
      });
  }


  generarDepreciacionFiscalAnual(){

  }


  generarDepreciacionFinancieraMensual(){
    let datos : Reportes = new Reportes();
    datos = this.formDepreciacionFinancieraMensual.value;

    var mes = this.formDepreciacionFinancieraMensual.controls["mes"].value;
    var anio = this.formDepreciacionFinancieraMensual.controls["anio"].value;


    this.reportesService.getCuadroDepreciacionFinancieraMensual(datos).subscribe(
      data => {
        this.listOfDataCuadroFinancieroMensual = data;

        this.modalDepreciacionMensusal = true;
        this.periodoEvaluando = mes+anio;
        this.tipo =  'financiera';
      });
  }

  
  paginacionCuadroMenusal(listOfCurrentPageData: ReadonlyArray<Reportes>) {
    this.listOfCurrentPageDataCuadroMensual  = listOfCurrentPageData;

  }

  texto: any;
  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }

  generarDepreciacionFinancieraAnual(){
    
  }


  cerrarmodalDepreciacionMensusal(){
    this.modalDepreciacionMensusal = false;
  }

}
