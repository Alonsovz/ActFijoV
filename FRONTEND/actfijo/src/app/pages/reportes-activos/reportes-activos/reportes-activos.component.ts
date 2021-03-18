import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reportes } from 'src/app/models/reportes';
import { Usuario } from 'src/app/models/usuario';
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
  formReporteAGD: FormGroup;
  cuadroMensual : Reportes[];
  modalDepreciacionMensusal = false;
  modalAGD = false;
  periodoEvaluando : string;
  tipo : string;
  user: Usuario = new Usuario();
  listOfDataCuadroFinancieroMensual: ReadonlyArray<Reportes> = [];
  listOfCurrentPageDataCuadroMensual: ReadonlyArray<Reportes> = [];
  listOfDataCuadroAGD: ReadonlyArray<Reportes> = [];

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

    this.formReporteAGD = new FormGroup({
      'fechaInicioAGD' : new FormControl('',[Validators.required]),
      'fechaFinAGD' : new FormControl('',[Validators.required]),
    });

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("usuario"));
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


  generarReporteAGD(){
    let datos : Reportes = new Reportes();
    datos = this.formReporteAGD.value;

    this.reportesService.generarReporteAGD(datos).subscribe(
      data => {
        this.listOfDataCuadroAGD = data;
        this.modalAGD = true;
      });
  }
  
  paginacionCuadroMenusal(listOfCurrentPageData: ReadonlyArray<Reportes>) {
    this.listOfCurrentPageDataCuadroMensual  = listOfCurrentPageData;

  }

  paginacionCuadroAGD(listOfCurrentPageData: ReadonlyArray<Reportes>) {
    this.listOfDataCuadroAGD  = listOfCurrentPageData;

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

  cerrarmodalAGD(){
    this.modalAGD = false;
  }
}
