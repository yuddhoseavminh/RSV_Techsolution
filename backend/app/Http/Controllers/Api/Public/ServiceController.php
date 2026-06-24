<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $services = Service::with('category')
            ->where('is_active', true)
            ->when($request->filled('category'), fn ($query) => $query->whereHas('category', fn ($category) => $category->where('slug', $request->string('category'))))
            ->orderBy('sort_order')
            ->get();

        return $this->ok(ServiceResource::collection($services));
    }

    public function show(string $service): JsonResponse
    {
        $record = Service::with('category')
            ->where('is_active', true)
            ->where(fn ($query) => $query->where('id', $service)->orWhere('slug', $service))
            ->firstOrFail();

        return $this->ok(new ServiceResource($record));
    }
}
