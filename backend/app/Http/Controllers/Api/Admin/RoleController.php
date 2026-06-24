<?php

namespace App\Http\Controllers\Api\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends CrudController
{
    protected string $modelClass = Role::class;

    protected array $with = ['permissions'];

    protected array $searchColumns = ['name'];

    protected array $storeRules = [
        'name' => ['required', 'string', 'max:120', 'unique:roles,name'],
        'guard_name' => ['nullable', 'string', 'max:80'],
        'permissions' => ['array'],
        'permissions.*' => ['string', 'exists:permissions,name'],
    ];

    protected array $updateRules = [
        'name' => ['required', 'string', 'max:120'],
        'guard_name' => ['nullable', 'string', 'max:80'],
        'permissions' => ['array'],
        'permissions.*' => ['string', 'exists:permissions,name'],
    ];

    protected function afterSave(Model $model, Request $request): void
    {
        if ($request->has('permissions')) {
            $model->syncPermissions($request->input('permissions', []));
        }
    }
}
