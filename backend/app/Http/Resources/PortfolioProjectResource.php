<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'summary' => $this->summary,
            'description' => $this->description,
            'thumbnail_url' => $this->thumbnail_url,
            'client_name' => $this->client_name,
            'industry' => $this->industry,
            'launch_date' => $this->launch_date?->toDateString(),
            'technologies' => $this->whenLoaded('technologies', fn () => $this->technologies->pluck('name')),
            'images' => $this->whenLoaded('images', fn () => $this->images->map(fn ($image) => [
                'url' => $image->image_url,
                'caption' => $image->caption,
            ])),
        ];
    }
}
