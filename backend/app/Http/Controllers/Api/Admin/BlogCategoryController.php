<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\BlogCategory;

class BlogCategoryController extends CrudController
{
    protected string $modelClass = BlogCategory::class;

    protected array $searchColumns = ['name', 'slug'];

    protected array $storeRules = [
        'name' => ['required', 'string', 'max:120'],
        'slug' => ['required', 'string', 'max:140', 'unique:blog_categories,slug'],
        'description' => ['nullable', 'string'],
        'is_active' => ['boolean'],
    ];
}
