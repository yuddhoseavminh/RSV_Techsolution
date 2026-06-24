<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Client;

class ClientController extends CrudController
{
    protected string $modelClass = Client::class;

    protected array $searchColumns = ['name', 'contact_name', 'email', 'industry'];

    protected array $storeRules = [
        'name' => ['required', 'string', 'max:160'],
        'contact_name' => ['nullable', 'string', 'max:120'],
        'email' => ['nullable', 'email', 'max:190'],
        'phone' => ['nullable', 'string', 'max:40'],
        'website' => ['nullable', 'url', 'max:190'],
        'industry' => ['nullable', 'string', 'max:120'],
        'address' => ['nullable', 'string', 'max:500'],
        'status' => ['required', 'in:lead,active,inactive'],
    ];
}
