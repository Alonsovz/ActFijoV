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
        #div1, #div2,#div4 {  }
    </style>
</head>
<body>

<div style=" font-family: Tahoma, Helvetica, Arial">
    <div>
        <!--<img style="" src="C:\xampp\htdocs\COMANDA\public\images\edesal1.png" alt="">-->
    </div>

    <div style="margin-top: 14px; ">
        <b style="margin-left: 125px;font-size: 14px;">EMPRESA DISTRIBUIDORA ELECTRICA SALVADOREÑA</b>
    </div>

    <div style="margin-top: 5px; ">
        <b style="margin-left: 200px;font-size: 14px;">Departamento de Contabilidad / Activos Fijos</b>
    </div>
    <div style="margin-top: 5px; ">
        <b style="margin-left: 225px;font-size: 14px;">(PRE-004-Abr/18-Ver 4.2)</b>
    </div>
    <div style="margin-top: 5px; ">
        <b style="margin-left: 175px;font-size: 14px;">Formato para movimiento de activo fijo</b>
    </div>

    <div style="position: relative; bottom: 20px;  ">

        <div style="float: left">
            <table class="minimalistBlack" style="width: 10px;" >

                <tbody>
                <tr>
                    <td  style="width: 75px"><b style="font-size: 9px; ">Fecha</b></td>
                    <td  style="width: 120px"><b style="font-size: 9px; ">{{date('d/m/Y H:i')}}</b></td>
                </tr>
                <tr>
                    <td  style="width: 75px"><b style="font-size: 9px; ">Codigo</b></td>
                    <td  style="width: 120px"><b style="font-size: 9px; "></b></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div style="position: relative; margin:0; margin-left: 450px">
            <table class="minimalistBlack" style="width: 10px;" >

                <tbody>
                <tr>
                    <td  style="width: 75px"><b style="font-size: 9px; ">Factura No.</b></td>
                    <td  style="width: 120px"><b style="font-size: 9px; "></b></td>
                </tr>
                <tr>
                    <td  style="width: 75px"><b style="font-size: 9px; ">Cta. Contable</b></td>
                    <td  style="width: 120px"><b style="font-size: 9px; "></b></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div style="margin-top: 3px"><b style="font-size: 10px">Información basica de los activos fijos:</b></div>

    <div style="margin-top: 3px">
        <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial">
            <thead>
            <tr>

                <th style="width:150px">Insumo</th>
                <th style="width:10px">Marca</th>
                <th style="width:10px">Modelo</th>
                <th style="width:10px">Otras espec</th>
                <th style="width:5px">Cant</th>



            </tr>
            </thead>

            <tbody>

            <tr>

                <td style="font-size: 8px">{{$traslado->activo}}</td>
                <td style="font-size: 8px">{{$traslado->marca}}</td>
                <td style="font-size: 8px">{{$traslado->modelo}}</td>
                <td style="font-size: 8px"></td>
                <td style="font-size: 8px" class="cantidad">1</td>
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

    <div id=container style="margin-top: 0px">
        <div id=div1 style="margin-top: 0px; position: absolute;margin-left: 450px">
            <b style="font-size: 10px;">Dependencia Destino:</b>
            <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; margin-top: 0px; width: 125px; margin-bottom: 20px">
                <thead>

                </thead>

                <tbody>


                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Nuevo responsable:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$traslado->nombredestino}} {{$traslado->apellidodestino}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Agencia destino:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$traslado->agencia}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">CC destino:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$traslado->centro_costo_destino}}</b></td>
                </tr>
                </tbody>
                <tfoot>
                </tfoot>

            </table>
        </div>
        <div id=div1 style="margin-top: 0px;">
            <b style="font-size: 10px;">Dependencia Origen:</b>
            <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; width: 125px; margin-top: 0px; margin-bottom: 20px">
                <thead>

                </thead>

                <tbody>


                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Responsable actual:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$act->nombre}} {{$act->apellido}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Agencia actual:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$act->agencia}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">CC actual:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$act->centro_costo}}</b></td>
                </tr>
                </tbody>
                <tfoot>
                </tfoot>

            </table>
        </div>

        <div id=div1 style="margin-top: -20px; position: absolute;margin-left: 450px">
            <b style="font-size: 10px;">Ubicacion geografica destino:</b>
            <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; width: 125px; margin-top: 0px; margin-bottom: 20px">
                <thead>

                </thead>

                <tbody>


                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Departamento:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$traslado->departamento}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Municipio:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$traslado->municipio}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Referencia:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">N/A</b></td>
                </tr>
                </tbody>
                <tfoot>
                </tfoot>

            </table>
        </div>
        <div id=div1 style="margin-top: 0px;">
            <b style="font-size: 10px;">Ubicacion geografica anterior:</b>
            <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; width: 125px; margin-top: 0px; margin-bottom: 20px">
                <thead>

                </thead>

                <tbody>


                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Departamento:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$act->departamento}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Municipio:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">{{$act->municipio}}</b></td>
                </tr>
                <tr>
                    <td style="width: 125px"><b style="font-size: 10px">Referencia:</b></td>
                    <td style="width: 125px"><b style="font-size: 10px">N/A</b></td>
                </tr>
                </tbody>
                <tfoot>
                </tfoot>

            </table>
        </div>

        <div id=div1 style="margin-top: 0px; position: absolute;margin-left: 450px">
            <b style="font-size: 10px;">Finalidad anterior del activo:</b>
            <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; width: 125px; margin-top: 2px; margin-bottom: 20px">
                <thead>

                </thead>

                <tbody>


                <tr>
                    <td style="width: 150px"><b style="font-size: 10px">Funcion de comercializacion</b></td>

                </tr>


                </tbody>
                <tfoot>
                </tfoot>

            </table>
        </div>
        <div id=div1 style="">
            <b style="font-size: 10px;">Finalidad actual del activo:</b>
            <table class="minimalistBlack" style="font-family: Tahoma, Helvetica, Arial; width: 125px; margin-top: 2px; margin-bottom: 20px">
                <thead>
                </thead>
                <tbody>
                <tr>
                    <td style="width: 150px"><b style="font-size: 10px">Funcion de comercializacion</b></td>

                </tr>

                </tbody>
                <tfoot>
                </tfoot>

            </table>
        </div>

    </div>



    <div style="margin-top: -10px; padding: 0" >

        <b style="font-size: 10px;">Motivo del traslado:</b>
        <p style="margin-top: 2px; border:solid 1px black; height: 25px; font-size: 10px">{{$traslado->observaciones}}</p>

        <div style="width: 800px">
            <b style="font-size: 10px">Firmas y Sellos:</b>


            <table class="minimalistBlack" style="margin-top: 5px;width: 725px;" >

                <tbody>
                <tr >
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">Nombre y firma dependencia origen(Entrega)</b></td>
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">Nombre y firma dependencia destino(Recibe)</b></td>
                </tr>
                <tr>
                    <td style="height: 25px;" colspan="2"></td>
                    <td style="height: 25px;" colspan="2"></td>
                </tr>
                <tr >
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">Nombre y firma de quien autoriza el traslado</b></td>
                    <td colspan="2" style="width: 150px"><b style="font-size: 10px">V.B Contabilidad</b></td>
                </tr>
                <tr >
                    <td style="height: 25px;" colspan="2"></td>
                    <td style="height: 25px;" colspan="2"></td>
                </tr>


                </tbody>
            </table>
        </div>

    </div>


</div>


<div id="container" style="margin-top: 5px">
    <div style="margin-left:300px; font-family: Tahoma, Helvetica, Arial; font-size: 10px ">
        <b>Solo presentar original</b>
    </div>


</div>

<div style="margin-top: 25px; font-size: 9px;font-family: Verdana, Arial, sans-serif;border: dotted black 1px; padding: 10px">
    <strong style="margin-left: 300px">Clausula de compromiso.</strong>
    <p style="text-align: justify">
        Como representante de EDESAL por el cargo en funcion declaro que los activos relacionados en el presente documento estan bajo mi responsabilidad, po lo cual les dare
        un uso adecuado al desempeño de mis funciones y a la destinación institucional prvista para cada uno de ellos. En consecuencia, seran asumidos por mi el daño o la perdida
        de los mismos debidos a mi negligencia o incumplimiento de los instructivos relacionados con uso y conservacion.
        Me comprometo a informar oportunamente al departamento de contabilidad sobre cualquier desplazamiento, traslado temporal o definitivo de dichos activos mediante la tramitacion
        de los formatos respectivos, y sobre cualquier situación que ponga en inminente riesgo los bienes relacionados. Dado que la omisión de estas disposiciones es considerada
        como falta grave por EDESAL, S.A DE C.V, asumo las consecuencias economicas que conlleven el daño total, parcial o la perdida de los bienes mencionados si ocurren por mi
        negligencia o incumplimiento de los intructivos correspondientes, y en tal evento autorizo a EDESAL, S.A DE C.V  a efectuar el descuento correspondiente al valor de reposición
        del bien afectado, deduciendolo de mis salarios, prestaciones sociales o eventuales indemnizaciones a mi favor.
    </p>
</div>




</body>
</html>