<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        return $this->ok(ProjectResource::collection(
            $request->user()->projects()->with('client')->latest()->paginate($request->integer('per_page', 10))
        ));
    }

    public function show(Request $request, Project $project): JsonResponse
    {
        abort_unless($request->user()->projects()->whereKey($project->id)->exists(), 403);

        return $this->ok(new ProjectResource($project->load('client')));
    }
}
