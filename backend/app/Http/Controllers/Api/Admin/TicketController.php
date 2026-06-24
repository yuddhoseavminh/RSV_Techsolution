<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Ticket;

class TicketController extends CrudController
{
    protected string $modelClass = Ticket::class;

    protected array $with = ['user', 'assignee', 'project', 'replies.user'];

    protected array $searchColumns = ['subject', 'priority', 'status'];

    protected array $updateRules = [
        'assigned_to' => ['nullable', 'exists:users,id'],
        'subject' => ['required', 'string', 'max:180'],
        'description' => ['required', 'string'],
        'priority' => ['required', 'in:low,medium,high,urgent'],
        'status' => ['required', 'in:open,in_progress,waiting,resolved,closed'],
    ];
}
