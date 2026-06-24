<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\ContactRequest;

class ContactRequestController extends CrudController
{
    protected string $modelClass = ContactRequest::class;

    protected array $searchColumns = ['name', 'email', 'company', 'service_needed', 'status'];

    protected array $updateRules = [
        'name' => ['required', 'string', 'max:120'],
        'email' => ['required', 'email', 'max:190'],
        'phone' => ['nullable', 'string', 'max:40'],
        'company' => ['nullable', 'string', 'max:160'],
        'service_needed' => ['required', 'string', 'max:120'],
        'message' => ['required', 'string'],
        'status' => ['required', 'in:new,contacted,qualified,won,lost'],
        'source' => ['nullable', 'string', 'max:80'],
        'assigned_to' => ['nullable', 'exists:users,id'],
    ];
}
