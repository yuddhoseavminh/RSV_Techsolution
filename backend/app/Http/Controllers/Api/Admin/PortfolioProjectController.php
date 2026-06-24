<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\PortfolioProject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class PortfolioProjectController extends CrudController
{
    protected string $modelClass = PortfolioProject::class;

    protected array $with = ['client', 'technologies', 'images'];

    protected array $searchColumns = ['title', 'category', 'client_name', 'industry'];

    protected array $storeRules = [
        'client_id' => ['nullable', 'exists:clients,id'],
        'title' => ['required', 'string', 'max:180'],
        'slug' => ['required', 'string', 'max:200', 'unique:portfolio_projects,slug'],
        'category' => ['required', 'in:Website,Mobile App,POS,Inventory,ERP'],
        'summary' => ['required', 'string', 'max:300'],
        'description' => ['required', 'string'],
        'thumbnail_url' => ['nullable', 'url', 'max:255'],
        'client_name' => ['nullable', 'string', 'max:160'],
        'industry' => ['nullable', 'string', 'max:120'],
        'launch_date' => ['nullable', 'date'],
        'is_featured' => ['boolean'],
        'is_published' => ['boolean'],
        'technology_ids' => ['array'],
        'technology_ids.*' => ['integer', 'exists:technologies,id'],
    ];

    protected function afterSave(Model $model, Request $request): void
    {
        if ($request->has('technology_ids')) {
            $model->technologies()->sync($request->input('technology_ids', []));
        }
    }
}
