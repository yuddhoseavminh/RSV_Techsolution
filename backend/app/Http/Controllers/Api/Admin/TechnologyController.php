<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Technology;

class TechnologyController extends CrudController
{
    protected string $modelClass = Technology::class;

    protected array $searchColumns = ['name', 'category'];

    protected array $storeRules = [
        'name' => ['required', 'string', 'max:100'],
        'slug' => ['required', 'string', 'max:120', 'unique:technologies,slug'],
        'category' => ['required', 'string', 'max:80'],
        'logo_url' => ['nullable', 'url', 'max:255'],
        'is_active' => ['boolean'],
    ];
}
