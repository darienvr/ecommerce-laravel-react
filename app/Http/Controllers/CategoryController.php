<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json(['categories'=>$categories],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'category'=>'required|unique:categories|max:255'
        ]);

        $category = Category::create($validate);

        return response()->json(['message'=>'Categoria creada con éxito','category'=>$category], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);

        if(!$category){
            return response()->json(['error'=>'Categoria no encontrada'],404);
        }

        return response()->json(['category'=>$category],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $validate = $request->validate([
            'category'=>'required|unique:categories|max:255'
        ]);

        $category->update($validate);
        return response()->json(['message'=>'Categoria actualizada con éxito', 'category'=>$category],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->json(['message'=>'Categoria eliminada'], 200);

    }
}
