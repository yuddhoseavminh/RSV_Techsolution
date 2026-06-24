<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ProjectController extends CrudController
{
    protected string $modelClass = Project::class;

    protected array $with = ['client', 'users'];

    protected array $searchColumns = ['name', 'code', 'type', 'status'];

    protected array $storeRules = [
        'client_id' => ['nullable', 'exists:clients,id'],
        'name' => ['required', 'string', 'max:180'],
        'code' => ['nullable', 'string', 'max:40'],
        'description' => ['nullable', 'string'],
        'type' => ['required', 'string', 'max:80'],
        'status' => ['required', 'in:planning,active,review,completed,on_hold,cancelled'],
        'priority' => ['required', 'in:low,medium,high,urgent'],
        'budget' => ['nullable', 'numeric', 'min:0'],
        'start_date' => ['nullable', 'date'],
        'due_date' => ['nullable', 'date'],
        'completed_at' => ['nullable', 'date'],
        'progress' => ['required', 'integer', 'min:0', 'max:100'],
        'user_ids' => ['array'],
        'user_ids.*' => ['integer', 'exists:users,id'],
    ];

    protected function afterSave(Model $model, Request $request): void
    {
        if ($request->has('user_ids')) {
            $model->users()->sync($request->input('user_ids', []));
        }
    }
}
