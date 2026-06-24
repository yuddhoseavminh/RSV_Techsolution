<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $tickets = Ticket::with('project')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate($request->integer('per_page', 10));

        return $this->ok(TicketResource::collection($tickets));
    }

    public function store(StoreTicketRequest $request): JsonResponse
    {
        $ticket = Ticket::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
            'status' => 'open',
        ]);

        return $this->created(new TicketResource($ticket->load('project')), 'Ticket opened');
    }

    public function show(Request $request, Ticket $ticket): JsonResponse
    {
        abort_unless((int) $ticket->user_id === (int) $request->user()->id, 403);

        return $this->ok(new TicketResource($ticket->load(['project', 'replies.user'])));
    }

    public function reply(Request $request, Ticket $ticket): JsonResponse
    {
        abort_unless((int) $ticket->user_id === (int) $request->user()->id, 403);

        $data = $request->validate(['message' => ['required', 'string', 'max:5000']]);
        $ticket->replies()->create([
            'user_id' => $request->user()->id,
            'message' => $data['message'],
            'is_internal' => false,
        ]);

        return $this->created(new TicketResource($ticket->fresh(['project', 'replies.user'])), 'Reply added');
    }
}
