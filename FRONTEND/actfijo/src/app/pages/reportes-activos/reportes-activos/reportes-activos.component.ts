import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reportes } from 'src/app/models/reportes';
import { Usuario } from 'src/app/models/usuario';
import { ReportesActivosService } from 'src/app/services/reportes-activos.service';
import { GlobalService } from 'src/app/services/global.service';
import notie from 'notie';

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
  modalDepreciacionFinanciera = false;
  modalCarga = false;
  modalAGD = false;
  periodoEvaluando : string;
  tipo : string;
  user: Usuario = new Usuario();
  listOfDataCuadroFinancieroMensual: ReadonlyArray<Reportes> = [];
  listOfCurrentPageDataCuadroMensual: ReadonlyArray<Reportes> = [];

  listOfCurrentPageData: ReadonlyArray<Reportes> = [];


  listOfDataCuadroAGD: ReadonlyArray<Reportes> = [];
  rutaFile : string;
  mesVista : string;
  anioVista : string;

  constructor(private reportesService: ReportesActivosService, private urlBackEnd: GlobalService) { 
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
    this.user = JSON.parse(localStorage.getItem("usuario_af"));
  
  }

  generarDepreciacionFiscalMensual(){
  

    var mes = this.formDepreciacionFiscalMensual.controls["mes"].value;
    var anio = this.formDepreciacionFiscalMensual.controls["anio"].value;

    if(anio <= '2020' && mes <= '11'){
      notie.alert({ 
        type: 'error', 
        text: 'El reporte debe ser procesado apartir del período 012021',
        stay: false,
        time: 5, 
        position: 'top' 
      });
    }else{
      this.modalCarga = true;
      let datos : Reportes = new Reportes();
      datos = this.formDepreciacionFiscalMensual.value;
      
      this.reportesService.getCuadroDepreciacionFiscalMensual(datos).subscribe(
        
        data => {
          this.listOfDataCuadroFinancieroMensual = data;

          this.modalDepreciacionFinanciera = true;
          this.periodoEvaluando = mes+anio;
          this.tipo =  'fiscal';
          this.modalCarga = false;
          this.rutaFile = this.urlBackEnd.getUrlBackEnd()+'exportar_excel_fiscal?mes=' + JSON.stringify(mes) +'&anio='+ JSON.stringify(anio);
        });

    }


  }




  generarDepreciacionFinancieraMensual(){
    

    var mes = this.formDepreciacionFinancieraMensual.controls["mes"].value;
    var anio = this.formDepreciacionFinancieraMensual.controls["anio"].value;

    if(anio <= '2020' && mes <= '11'){
      notie.alert({ 
        type: 'error', 
        text: 'El reporte debe ser procesado apartir del período 012021',
        stay: false,
        time: 5, 
        position: 'top' 
      });
    }else{

      this.modalCarga = true;
      let datos : Reportes = new Reportes();
      datos = this.formDepreciacionFinancieraMensual.value;

     this.reportesService.getCuadroDepreciacionFinancieraMensual(datos).subscribe(
        data => {
          this.listOfDataCuadroFinancieroMensual = data;
  
          this.modalDepreciacionFinanciera = true;
          this.periodoEvaluando = mes+anio;
          this.tipo =  'financiera';
          this.modalCarga = false;
          this.rutaFile = this.urlBackEnd.getUrlBackEnd()+'exportar_excel_financiera?mes=' + JSON.stringify(mes) +'&anio='+ JSON.stringify(anio);
        });

    }

  

      
  }


  generarReporteAGD(){
    this.modalCarga = true;
    let datos : Reportes = new Reportes();
    datos = this.formReporteAGD.value;

    var fechaInicioAGD = this.formReporteAGD.controls["fechaInicioAGD"].value;
    var fechaFinAGD = this.formReporteAGD.controls["fechaFinAGD"].value;

    this.reportesService.generarReporteAGD(datos).subscribe(
      data => {
        this.listOfDataCuadroAGD = data;
        this.modalAGD = true;
        this.modalCarga = false;
        this.rutaFile = this.urlBackEnd.getUrlBackEnd()+'reporte_agd_excel?fechaInicioAGD=' + JSON.stringify(fechaInicioAGD) +'&fechaFinAGD='+ JSON.stringify(fechaFinAGD);
      });
  }


  exportarExcelAgd(){
    let datos : Reportes = new Reportes();
    datos = this.listOfDataCuadroAGD;

    const ur =  this.urlBackEnd.getUrlBackEnd() + 'reporte_agd_excel?activos_agd=' + JSON.stringify(datos);
    window.open(ur);
  }
  

  paginacionCuadroMenusal(listOfCurrentPageData: ReadonlyArray<Reportes>) {
    this.listOfCurrentPageDataCuadroMensual  = listOfCurrentPageData;

  }

  paginacionCuadroAGD(listOfCurrentPageData: ReadonlyArray<Reportes>) {
    this.listOfCurrentPageData  = listOfCurrentPageData;
  }
  


  cerrarmodalDepreciacionFinanciera(){
    this.modalDepreciacionFinanciera = false;
  }

  cerrarmodalAGD(){
    this.modalAGD = false;
  }




}
