<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class BlogPostController extends CrudController
{
    protected string $modelClass = BlogPost::class;

    protected array $with = ['category', 'tags', 'author'];

    protected array $searchColumns = ['title', 'excerpt', 'status'];

    protected array $storeRules = [
        'blog_category_id' => ['nullable', 'exists:blog_categories,id'],
        'author_id' => ['nullable', 'exists:users,id'],
        'title' => ['required', 'string', 'max:180'],
        'slug' => ['required', 'string', 'max:200', 'unique:blog_posts,slug'],
        'excerpt' => ['required', 'string', 'max:300'],
        'content' => ['required', 'string'],
        'cover_image_url' => ['nullable', 'url', 'max:255'],
        'seo_title' => ['nullable', 'string', 'max:180'],
        'seo_description' => ['nullable', 'string', 'max:255'],
        'status' => ['required', 'in:draft,published,archived'],
        'published_at' => ['nullable', 'date'],
        'tag_ids' => ['array'],
        'tag_ids.*' => ['integer', 'exists:tags,id'],
    ];

    protected function afterSave(Model $model, Request $request): void
    {
        if ($request->has('tag_ids')) {
            $model->tags()->sync($request->input('tag_ids', []));
        }
    }
}
