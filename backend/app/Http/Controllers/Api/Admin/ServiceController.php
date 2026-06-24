<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Service;

class ServiceController extends CrudController
{
    protected string $modelClass = Service::class;

    protected array $with = ['category'];

    protected array $searchColumns = ['name', 'slug', 'summary'];

    protected array $storeRules = [
        'service_category_id' => ['nullable', 'exists:service_categories,id'],
        'name' => ['required', 'string', 'max:140'],
        'slug' => ['required', 'string', 'max:160', 'unique:services,slug'],
        'icon' => ['nullable', 'string', 'max:80'],
        'summary' => ['required', 'string', 'max:300'],
        'description' => ['required', 'string'],
        'benefits' => ['array'],
        'technologies' => ['array'],
        'sort_order' => ['nullable', 'integer'],
        'is_featured' => ['boolean'],
        'is_active' => ['boolean'],
    ];
}
