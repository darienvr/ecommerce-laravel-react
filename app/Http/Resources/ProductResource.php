<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'name' => $this->name,
            'price' => $this->price,
            'description' => $this->description,
            'image' => $this->image ? asset('images/' . $this->image) : null,
            //'image' => $this->image ? 'storage/app/public/images/' . $this->image : null,
            'sizes' => $this->sizes ? json_decode($this->sizes) : null,
        ];
    }
}
