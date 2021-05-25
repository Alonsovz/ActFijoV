<h3 style="text-align:center !important; ">Reporte Fiscal</h3>

    <table style="border: 0.5px solid black;color: black;   display: inline-block; white-space: nowrap;">


        <thead style="border:0.5px solid black;">   
             <tr>
                <th style="border:black solid 0.5px; color: black !important;">Código Interno</th>
                <th style="border:black solid 0.5px; color: black !important;">Código VNR</th>
                <th style="border:black solid 0.5px;">Código Contable</th>
                <th style="border:black solid 0.5px;">Grupo</th>
                <th style="border:black solid 0.5px;">Fecha Registro</th>
                <th style="border:black solid 0.5px;">Tipo partida</th>
                <th style="border:black solid 0.5px;">Cuenta Contable</th>
                <th style="border:black solid 0.5px;">Descripción</th>
                <th style="border:black solid 0.5px;">Ubicación</th>
                <th style="border:black solid 0.5px;">Fecha Compra</th>
                <th style="border:black solid 0.5px;">N° Documento</th>
                <th style="border:black solid 0.5px;">Proveedor</th>
                <th style="border:black solid 0.5px;">Valor compra</th>
                <th style="border:black solid 0.5px;">Valor residual</th>
                <th style="border:black solid 0.5px;">Tasa de Depreciación</th>
                <th style="border:black solid 0.5px;">Vida Útil</th>
                <th style="border:black solid 0.5px;">Municipio</th>
                <th style="border:black solid 0.5px;">Depreciación acumulada</th>
                <th style="border:black solid 0.5px;">Depreciación del mes</th>
                <th style="border:black solid 0.5px;">Valor en libros</th>
            </tr>
        </thead>
        <tbody style="border:1px solid black">

        <?php $act = $activos; ?>


        @foreach($act as $q)

            <tr>
                <td style="border:black solid 0.5px">{{ $q->codigo_interno }}</td>
                <td style="border:black solid 0.5px">{{ $q->af_codigo_vnr }}</td>
                <td style="border:black solid 0.5px">{{ $q->af_codigo_contable}}</td>
                <td style="border:black solid 0.5px">{{$q->grupo}}</td>
                <td style="border:black solid 0.5px">{{ $q->fechaRegistro}}</td>
                <td style="border:black solid 0.5px">{{ $q->tipo_partida}}</td>
                <td style="border:black solid 0.5px">{{ $q->cuenta_contable}}</td>
                <td style="border:black solid 0.5px;">{{ $q->descripcion_bien}}</td>
                <td style="border:black solid 0.5px">{{ $q->ubicacion}}</td>
                <td style="border:black solid 0.5px">{{ $q->fecha_compra}}</td>
                <td style="border:black solid 0.5px">{{ $q->numero_documento}}</td>
                <td style="border:black solid 0.5px">{{ $q->proveedor}}</td>
                <td style="border:black solid 0.5px">{{ $q->valor_compra}}</td>
                <td style="border:black solid 0.5px">{{ $q->valor_residual}}</td>
                <td style="border:black solid 0.5px">{{ $q->tasa_depreciacion}}</td>
                <td style="border:black solid 0.5px">{{ $q->vida_util}}</td>  
                <td style="border:black solid 0.5px">{{ $q->municipio}}</td>
                <td style="border:black solid 0.5px">{{ $q->depreciacion_acumulada}}</td>
                <td style="border:black solid 0.5px">{{ $q->depreciacion_mes}}</td>
                <td style="border:black solid 0.5px; text-align:left !important;">{{ $q->valor_libros}}</td>
            </tr>
        @endforeach
        </tbody>

    </table>


