<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioProjectResource;
use App\Models\PortfolioProject;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $projects = PortfolioProject::with(['technologies', 'images'])
            ->where('is_published', true)
            ->when($request->filled('category'), fn ($query) => $query->where('category', $request->string('category')))
            ->latest()
            ->paginate($request->integer('per_page', 12));

        return $this->ok(PortfolioProjectResource::collection($projects));
    }

    public function show(string $portfolio): JsonResponse
    {
        $project = PortfolioProject::with(['client', 'technologies', 'images'])
            ->where('is_published', true)
            ->where(fn ($query) => $query->where('id', $portfolio)->orWhere('slug', $portfolio))
            ->firstOrFail();

        return $this->ok(new PortfolioProjectResource($project));
    }
}
