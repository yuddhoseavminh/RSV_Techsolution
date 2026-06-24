<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Invoice;

class InvoiceController extends CrudController
{
    protected string $modelClass = Invoice::class;

    protected array $with = ['client', 'project', 'user', 'items'];

    protected array $searchColumns = ['invoice_number', 'status'];

    protected array $storeRules = [
        'client_id' => ['nullable', 'exists:clients,id'],
        'project_id' => ['nullable', 'exists:projects,id'],
        'user_id' => ['nullable', 'exists:users,id'],
        'invoice_number' => ['required', 'string', 'max:80', 'unique:invoices,invoice_number'],
        'status' => ['required', 'in:draft,sent,paid,overdue,cancelled'],
        'subtotal' => ['required', 'numeric', 'min:0'],
        'tax' => ['required', 'numeric', 'min:0'],
        'discount' => ['required', 'numeric', 'min:0'],
        'total' => ['required', 'numeric', 'min:0'],
        'issued_at' => ['nullable', 'date'],
        'due_at' => ['nullable', 'date'],
        'paid_at' => ['nullable', 'date'],
        'notes' => ['nullable', 'string'],
    ];
}
