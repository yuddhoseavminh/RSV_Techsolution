<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $posts = BlogPost::with(['category', 'tags', 'author'])
            ->where('status', 'published')
            ->when($request->filled('search'), fn ($query) => $query->where('title', 'like', '%'.$request->string('search').'%'))
            ->when($request->filled('category'), fn ($query) => $query->whereHas('category', fn ($category) => $category->where('slug', $request->string('category'))))
            ->when($request->filled('tag'), fn ($query) => $query->whereHas('tags', fn ($tag) => $tag->where('slug', $request->string('tag'))))
            ->latest('published_at')
            ->paginate($request->integer('per_page', 9));

        return $this->ok(BlogPostResource::collection($posts));
    }

    public function show(string $blog): JsonResponse
    {
        $post = BlogPost::with(['category', 'tags', 'author'])
            ->where('status', 'published')
            ->where(fn ($query) => $query->where('id', $blog)->orWhere('slug', $blog))
            ->firstOrFail();

        return $this->ok(new BlogPostResource($post));
    }
}
