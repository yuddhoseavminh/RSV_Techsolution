<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Tag;

class TagController extends CrudController
{
    protected string $modelClass = Tag::class;

    protected array $searchColumns = ['name', 'slug'];

    protected array $storeRules = [
        'name' => ['required', 'string', 'max:80'],
        'slug' => ['required', 'string', 'max:100', 'unique:tags,slug'],
    ];
}
