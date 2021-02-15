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
            margin-bottom: 0px;
            margin-top: 0px;
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
    </style>
</head>
<body>

<div style=" font-family: Tahoma, Helvetica, Arial">
    <div>
        <img style="" src="C:\xampp\htdocs\COMANDA\public\images\edesal1.png" alt="">
    </div>

    <div style="margin-top: 5px; ">
        <b style="margin-left: 150px;font-size: 14px;">EMPRESA DISTRIBUIDORA ELECTRICA SALVADOREÑA</b>
    </div>

    <div style="margin-top: 10px; ">
        <b style="margin-left: 275px;font-size: 14px;">Activos Fijos</b>
    </div>

    <div style="margin-top: 10px; ">
        <b style="margin-left: 225px;font-size: 14px;">SOLICITUD DE BAJA DE ACTIVO</b>
    </div>

    <div style="margin-top: 20px; ">
        <b style="font-size: 10px;">Fecha: </b> <small style="font-size: 10px"><?php $fecha=date_create($a->fecha); echo date('d/m/Y'); ?></small>
    </div>

    <div style="margin-top: 5px"><b style="font-size: 10px">Por este medio solicito la baja de los siguientes activos:</b></div>

    <div style="margin-top: 5px">
        <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial">
            <thead>
            <tr>

                <th style="width:160px">Activo</th>
                <th style="width:10px">Marca</th>
                <th style="width:10px">Modelo</th>
                <th style="width:10px">Color</th>
                <th style="width:10px">Cantidad</th>

            </tr>
            </thead>

            <tbody>

                <tr>

                    <td>{{$a->tipo_activo}}</td>
                    <td>{{$a->marca}}</td>
                    <td>{{$a->modelo}}</td>
                    <td>{{$a->color}}</td>
                    <td class="cantidad">1</td>
                </tr>

            </tbody>
            <tfoot>
            <tr>

                <td></td>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td class="total"><b style="font-size: 10px">1</b></td>
            </tr>
            </tfoot>

        </table>
    </div>

    <div style="margin-top: 5px">


        <div id=div1 style="margin-top: 0px">
            <b style="font-size: 10px;">Dependencia origen:</b>
            <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; margin-top: 15px; margin-bottom: 20px">
                <thead>

                </thead>

                <tbody>


                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Se encontraba asignado a:</b></td>
                    <td><b style="font-size: 10px">{{$a->nombre}} {{$a->apellido}}</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Agencia:</b></td>
                    <td><b style="font-size: 10px">{{$a->agencia}}</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Centro de Costos:</b></td>
                    <td><b style="font-size: 10px">{{$a->centrocosto}}</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Bodega:</b></td>
                    <td><b style="font-size: 10px">{{$a->bodega}}</b></td>
                </tr>

                </tbody>
                <tfoot>


                </tfoot>

            </table>
        </div>


        <b style="font-size: 10px; margin-top: 5px">Dependencia destino:</b>
        <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; margin-top: 15px; margin-bottom: 20px">
            <thead>

            </thead>

            <tbody>

            @if($a->motivobaja=='Robo' || $a->motivobaja=='Extravio')

                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Responsable</b></td>
                    <td><b style="font-size: 10px">N/A</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Departamento:</b></td>
                    <td><b style="font-size: 10px">N/A</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Agencia:</b></td>
                    <td><b style="font-size: 10px">N/A</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Area:</b></td>
                    <td><b style="font-size: 10px">N/A</b></td>
                </tr>
            @else
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Responsable</b></td>
                    <td><b style="font-size: 10px">JUAN CARLOS SALAZAR</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Departamento:</b></td>
                    <td><b style="font-size: 10px">Bodega</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Agencia:</b></td>
                    <td><b style="font-size: 10px">Ciudad Versailles</b></td>
                </tr>
                <tr>
                    <td style="width: 300px"><b style="font-size: 10px">Area:</b></td>
                    <td><b style="font-size: 10px">Bodega</b></td>
                </tr>
            @endif

            </tbody>
            <tfoot>


            </tfoot>

        </table>

        <b style="font-size: 10px; margin-top: 5px">Justificación para baja de Activo:</b>
        <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; margin-top: 15px; margin-bottom: 20px">
            <thead>

            </thead>

            <tbody>

            <tr style="width: 400px; height: 20px;">
                <td style="width: 600px;height: 20px"><b style="font-size: 10px">{{$a->justificacionbaja}}</b></td>
            </tr>


            </tbody>
            <tfoot>
            </tfoot>

        </table>

        <div style="width: 800px; margin-top: 0px">
            <b style="font-size: 10px">Firmas y Sellos</b>

            <table class="minimalistBlack" style="margin-top: 5px;width: 725px;" >

                <tbody>
                <tr >
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">Nombre y firma de quien solicita la baja</b></td>
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">Recibido por</b></td>
                </tr>
                <tr>
                    <td style="height: 25px;" colspan="2"></td>
                    <td style="height: 25px;" colspan="2"></td>
                </tr>
                <tr >
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">Nombre y firma de quien autoriza la baja</b></td>
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">V.B Administración y Finanzas</b></td>
                </tr>
                <tr >
                    <td style="height: 25px;" colspan="2"></td>
                    <td style="height: 25px;" colspan="2"></td>
                </tr>
                <tr >
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">Recibido contabilidad para la baja de activo</b></td>
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px"></b></td>
                </tr>
                <tr >
                    <td style="height: 25px;" colspan="2"></td>
                    <td style="height: 25px;" colspan="2"></td>
                </tr>


                </tbody>
            </table>
        </div>

        <b style="margin-left: 300px; font-size: 10px;margin-top: 0px;position: absolute">Solo presentar original</b>


    </div>


</div>





</body>
</html>