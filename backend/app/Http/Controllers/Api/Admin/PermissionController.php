<?php

namespace App\Http\Controllers\Api\Admin;

use Spatie\Permission\Models\Permission;

class PermissionController extends CrudController
{
    protected string $modelClass = Permission::class;

    protected array $searchColumns = ['name'];
}
