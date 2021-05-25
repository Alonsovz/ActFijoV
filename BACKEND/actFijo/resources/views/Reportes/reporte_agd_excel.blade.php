<h3 style="text-align:center !important; ">Reporte Fiscal</h3>

<table style="border: 0.5px solid black;color: black;">


<thead style="border:0.5px solid black;">
             <tr>
                 <th style="border:black solid 0.5px; color: black !important;">Descripcion Bien</th>
                 <th style="border:black solid 0.5px; width: 20px">Cantidad</th>
                 <th style="border:black solid 0.5px; width: 20px">Código</th>
                 <th style="border:black solid 0.5px; width: 20px">PU</th>
                 <th style="border:black solid 0.5px; width: 20px">Monto</th>
                 <th style="border:black solid 0.5px; width: 20px">N° Factura</th>
                 <th style="border:black solid 0.5px; width: 20px">Cuenta</th>
            </tr>
</thead>
<tbody style="border:1px solid black">

<?php $act = $activos_agd; ?>


@foreach($act as $q)

    <tr>
        <td style="border:black solid 0.5px">{{$q->descripcion}}</td>
        <td style="border:black solid 0.5px">{{$q->cantidad}}</td>
        <td style="border:black solid 0.5px">{{$q->codigo}}</td>
        <td style="border:black solid 0.5px">{{$q->PU}}</td>
        <td style="border:black solid 0.5px">{{$q->monto}}</td>
        <td style="border:black solid 0.5px">{{$q->numeroFactura}}</td>
        <td style="border:black solid 0.5px; text-align:left !important;">{{$q->cuenta}}</td>
    </tr>
@endforeach
</tbody>

</table>


