<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'subject' => $this->subject,
            'description' => $this->description,
            'priority' => $this->priority,
            'status' => $this->status,
            'project' => $this->whenLoaded('project', fn () => $this->project?->name),
            'replies' => $this->whenLoaded('replies', fn () => $this->replies->map(fn ($reply) => [
                'id' => $reply->id,
                'message' => $reply->message,
                'user' => $reply->user?->name,
                'is_internal' => $reply->is_internal,
                'created_at' => $reply->created_at?->toIso8601String(),
            ])),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
