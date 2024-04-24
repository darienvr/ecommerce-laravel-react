<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $data = $request->validated();
        $data['sizes'] = json_encode($request->sizes); // Convertir el array de tallas a JSON

        $imageName = null;
        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('images'), $imageName);
        }

        $product = Product::create(array_merge(
            $data,
            ['image' => $imageName]
        ));

        return new ProductResource($product);
        //return response()->json(['message' => 'Producto creado con éxito']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        
        $product = Product::find($id);
        if(!$product){
            return response()->json(['error'=>'Producto no encontrado'],404);
        }

        //return response()->json(['data'=>$product],200);
        
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();

        $imageName = $product->image;

        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();  
            $request->image->storeAs('images', $imageName);
        }

        if (isset($request->sizes)) {
            $data['sizes'] = json_encode($request->sizes); // Actualizar tallas si se proporcionan
        }

        $product->update(array_merge(
            $data,
            ['image' => $imageName]
        ));

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Producto eliminado con éxito']);
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('q');

        $products = Product::where('name', 'LIKE', "%$searchTerm%")->get();

        return ProductResource::collection($products);
    }
}
