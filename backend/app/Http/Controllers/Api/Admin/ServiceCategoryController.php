<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\ServiceCategory;

class ServiceCategoryController extends CrudController
{
    protected string $modelClass = ServiceCategory::class;

    protected array $searchColumns = ['name', 'slug'];

    protected array $storeRules = [
        'name' => ['required', 'string', 'max:120'],
        'slug' => ['required', 'string', 'max:140', 'unique:service_categories,slug'],
        'description' => ['nullable', 'string'],
        'sort_order' => ['nullable', 'integer'],
        'is_active' => ['boolean'],
    ];
}
