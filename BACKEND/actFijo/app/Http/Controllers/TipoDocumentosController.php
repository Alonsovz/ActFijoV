<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;

class TipoDocumentosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $listado = DB::connection('comanda')->table('af_tipos_documento')->where('estado','=',1)->get();
      return response()->json($listado);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $insertar = DB::connection('comanda')->table('af_tipos_documento')
       ->insert([
            'descripcion_tipo_documento' => $request['descripcion_tipo_documento'],
            'siglas' => $request['siglas'],
            'estado' => 1,
       ]);

        return response()->json($insertar);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $editar = DB::connection('comanda')->table('af_tipos_documento')->where('codigo_tipo_documento', '=', $request['codigo_tipo_documento'])
        ->update([
            'descripcion_tipo_documento' => $request['descripcion_tipo_documento'],
            'siglas' => $request['siglas']
        ]);

        return response()->json($editar);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $editar = DB::connection('comanda')->table('af_tipos_documento')->where('codigo_tipo_documento', '=', $request['codigo_tipo_documento'])
        ->update([
            'estado' => 2
        ]);

        return response()->json($editar);
    }
}
