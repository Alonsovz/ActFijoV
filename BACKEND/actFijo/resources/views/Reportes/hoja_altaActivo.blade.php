<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title></title>
    <style>

        body{
            margin-bottom: 0;
            margin-top: 0;
        }



        table.minimalistBlack {
            border: 1px solid #000000;
            width: 100%;
            text-align: left;
            border-collapse: collapse;
        }
        table.minimalistBlack td, table.minimalistBlack th {
            border: 1px solid #000000;
            padding: 5px 4px;
        }
        table.minimalistBlack tbody td {
            font-size: 10px;
        }
        table.minimalistBlack thead {
            background: #CFCFCF;
            background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            border-bottom: 1px solid #000000;
        }
        table.minimalistBlack thead th {
            font-size: 10px;
            font-weight: bold;
            color: #000000;
            text-align: left;
        }
        .total{
            background: #CFCFCF;
            background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
            border-bottom: 1px solid #000000;
        }
        table.minimalistBlack tfoot {
            font-size: 10px;
            font-weight: bold;
            color: #000000;
            border-top: 1px solid #000000;
        }
        table.minimalistBlack tfoot td {
            font-size: 10px;
        }
        #container div {  }

        #div3 { width:200px; float:right }
        #div1, #div2,#div4 { width:500px;  }
    </style>
</head>
<body>

<div style=" font-family: Tahoma, Helvetica, Arial">
    <div style="position: absolute; margin-top: 0px">
    <img style="" src="C:\xampp\htdocs\actfijo\backend\actfijo\public\images\edesal1.png" alt="">
    </div>

    <div style="margin-top: 0px; ">
        <b style="margin-left: 200px;font-size: 14px;">EMPRESA DISTRIBUIDORA ELECTRICA SALVADOREÑA, S.A DE C.V</b>
    </div>
    <div style="margin-top: 5px; ">
        <b style="margin-left: 325px;font-size: 14px;">(PRE-005-Oct/18-Ver 5.0)</b>
    </div>
    <div style="margin-top: 5px; ">
        <b style="margin-left: 350px;font-size: 14px;">Hoja de activo fijo</b>
    </div>
      
            <div style="position: relative; bottom: 20px;  ">

                <div style="float: left">
                    <b style="font-size: 10px;">Fecha: </b> <small style="font-size: 10px"><?php echo date('d/m/Y'); ?></small>
                </div>

            </div>
            <br><br>
            <div style="margin-top: 5px"><b style="font-size: 10px">Por este medio solicito la inclusión de los siguientes activos:</b></div>

            <div style="margin-top: 3px">
                <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial">
                    <thead>
                    <tr>
                        <th style="width:150px">Cod VNR</th>
                        <th style="width:150px">Cod Conta</th>
                        <th style="width:150px">Activo</th>
                        <th style="width:10px">Marca</th>
                        <th style="width:10px">Modelo</th>
                    </tr>
                    </thead>

                    <tbody>
                    @foreach($activo as $act)
                        <tr>
                            <td style="font-size: 8px">{{$act->af_codigo_vnr}}</td>
                            <td style="font-size: 8px">{{$act->af_codigo_contable}}</td>
                            <td style="font-size: 8px">{{$act->descripcion_bien}}</td>
                            <td style="font-size: 8px">{{$act->nombre_marca}}</td>
                            <td style="font-size: 8px">{{$act->nombre_modelo}}</td>
                        </tr>
                    @endforeach
                    </tbody>
                  

                </table>
            </div>
          

            <div id=container style="margin-top: 0px">
                <div id=div3>
                    <b style="font-size: 10px;">Justificación para compra de activo:</b>
                    <p style="font-family: Tahoma, Helvetica, Arial; font-size: 10px; height: 296px; margin-top: 14px; border: solid 1px black; padding: 2px">
                      </p>
                </div>
                <div id=div1 style="margin-top: 0px">
                <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; margin-top: 15px; margin-bottom: 20px">
                     
                        <tbody>


                        <tr>
                            <td style="width: 300px"><b style="font-size: 10px">Documento:</b></td>
                            <td>{{$act->descTipoDoc}}</td>
                        </tr>
                        <tr>
                            <td style="width: 300px"><b style="font-size: 10px">N ° Doc:</b></td>
                            <td>{{$act->numero_documento}}</td>
                        </tr>
                    


                        </tbody>
                        <tfoot>
                        </tfoot>

                    </table>
                </div>
                <div id=div1 style="margin-top: 0px">
                    <b style="font-size: 10px;">Dependencia destino:</b>
                    <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; margin-top: 15px; margin-bottom: 20px">
                        <thead>

                        </thead>

                        <tbody>


                        <tr>
                            <td style="width: 300px"><b style="font-size: 10px">Para asignarse a:</b></td>
                            <td><b style="font-size: 10px">{{$act->nombreUs}} {{$act->apellidoUs}}</b></td>
                        </tr>
                        <tr>
                            <td style="width: 300px"><b style="font-size: 10px">Ubicado en:</b></td>
                            <td><b style="font-size: 10px">{{$act->bodega}}</b></td>
                        </tr>
                        <tr>
                            <td style="width: 300px"><b style="font-size: 10px">Centro de Costos:</b></td>
                            <td><b style="font-size: 10px">{{$act->cc}}</b></td>
                        </tr>>
                    


                        </tbody>
                        <tfoot>
                        </tfoot>

                    </table>
                </div>
                <div id=div2 style="margin-top: 0px">
                    <b style="font-size: 10px;">Geograficamente se ubicará en:</b>
                    <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; margin-top: 15px; margin-bottom: 20px">
                        <thead>

                        </thead>

                        <tbody>

                        <tr>
                            <td style="width: 300px"><b style="font-size: 10px">Departamento:</b></td>
                            <td><b style="font-size: 10px">{{$act->DepName}}</b></td>
                        </tr>
                        <tr>
                            <td style="width: 300px"><b style="font-size: 10px">Municipio:</b></td>
                            <td><b style="font-size: 10px">{{$act->MunName}}</b></td>
                        </tr>
                        </tbody>
                        <tfoot>

                        </tfoot>

                    </table>
                </div>
                
            </div>



            <div>

                <div style="width: 800px">
                    <b style="font-size: 10px">Nombre y firmas:</b>


                    <table class="minimalistBlack" style="margin-top: 5px;width: 725px;" >

                        <tbody>
                        <tr >
                            <td colspan="2" style="width: 150px"><b style="font-size: 10px">Nombre y firma de quien solicita</b></td>
                            <td colspan="2" style="width: 150px"><b style="font-size: 10px">Nombre y firma de quien entrega</b></td>
                        </tr>
                        <tr>
                            <td style="height: 25px;" colspan="2">{{$act->nombreUs}} {{$act->apellidoUs}}</td>
                            <td style="height: 25px;" colspan="2">

                            </td>
                        </tr>
                       


                        </tbody>
                    </table>
                </div>

            </div>

   
</div>


<div id="container" style="margin-top: 5px">
    <div style="margin-left:255px; font-family: Tahoma, Helvetica, Arial; font-size: 10px ">
        <b>Solo presentar original</b>
    </div>

    <div style=" margin-left: 404px; width: 20px;  font-family: Tahoma, Helvetica, Arial; font-size: 10px ">
        <table class="minimalistBlack" style="width: 25px; margin-bottom: -10px" >

            <tbody>
            <tr >
                <td colspan="2" style="width: 150px"><b style="font-size: 9px; margin-left: 90px">Recibido por Contabilidad</b></td>
            </tr>
            <tr >
                <td style="height: 10px" ></td>
                <td style="height: 10px" ></td>
            </tr>
            <tr >
                <td  style="width: 150px"><b style="font-size: 9px">Nombre</b></td>
                <td style="width: 150px"><b style="font-size: 9px">Firma</b></td>
            </tr>

            </tbody>
        </table>
    </div>
</div>




</body>
</html>