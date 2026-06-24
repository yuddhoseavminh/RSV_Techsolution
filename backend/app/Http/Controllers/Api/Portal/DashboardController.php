<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Ticket;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use ApiResponse;

    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        return $this->ok([
            'projects' => $user->projects()->count(),
            'active_projects' => $user->projects()->whereIn('status', ['planning', 'active', 'review'])->count(),
            'open_tickets' => Ticket::where('user_id', $user->id)->whereNotIn('status', ['resolved', 'closed'])->count(),
            'unpaid_invoices' => Invoice::where('user_id', $user->id)->whereIn('status', ['draft', 'sent', 'overdue'])->count(),
            'recent_projects' => $user->projects()->latest()->take(5)->get(),
        ]);
    }
}
