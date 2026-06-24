<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Http\Resources\PortfolioProjectResource;
use App\Http\Resources\ServiceResource;
use App\Models\BlogPost;
use App\Models\PortfolioProject;
use App\Models\Project;
use App\Models\Service;
use App\Models\Technology;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    use ApiResponse;

    public function __invoke(): JsonResponse
    {
        return $this->ok([
            'stats' => [
                'clients' => User::role('client')->count(),
                'projects' => Project::count(),
                'delivered' => Project::where('status', 'completed')->count(),
                'technologies' => Technology::where('is_active', true)->count(),
            ],
            'services' => ServiceResource::collection(
                Service::with('category')->where('is_active', true)->where('is_featured', true)->orderBy('sort_order')->take(6)->get()
            ),
            'featured_projects' => PortfolioProjectResource::collection(
                PortfolioProject::with(['technologies', 'images'])->where('is_published', true)->where('is_featured', true)->latest()->take(6)->get()
            ),
            'latest_news' => BlogPostResource::collection(
                BlogPost::with(['category', 'tags', 'author'])->where('status', 'published')->latest('published_at')->take(3)->get()
            ),
        ]);
    }
}
