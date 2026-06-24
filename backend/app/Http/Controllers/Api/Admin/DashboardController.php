<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactRequest;
use App\Models\Invoice;
use App\Models\Project;
use App\Models\Ticket;
use App\Models\User;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    use ApiResponse;

    public function __invoke(): JsonResponse
    {
        return $this->ok([
            'cards' => [
                'total_users' => User::count(),
                'total_projects' => Project::count(),
                'revenue' => Invoice::where('status', 'paid')->sum('total'),
                'pending_tickets' => Ticket::whereNotIn('status', ['resolved', 'closed'])->count(),
                'new_contacts' => ContactRequest::where('status', 'new')->count(),
            ],
            'projects_by_status' => Project::query()->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status'),
            'tickets_by_priority' => Ticket::query()->selectRaw('priority, count(*) as total')->groupBy('priority')->pluck('total', 'priority'),
            'monthly_revenue' => Invoice::query()
                ->selectRaw("date_format(paid_at, '%Y-%m') as month, sum(total) as total")
                ->where('status', 'paid')
                ->whereNotNull('paid_at')
                ->groupBy('month')
                ->orderBy('month')
                ->take(12)
                ->pluck('total', 'month'),
        ]);
    }
}
