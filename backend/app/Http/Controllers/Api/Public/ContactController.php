<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Resources\ContactRequestResource;
use App\Models\ContactRequest;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    use ApiResponse;

    public function __invoke(StoreContactRequest $request): JsonResponse
    {
        $contact = ContactRequest::create([
            ...$request->validated(),
            'status' => 'new',
            'source' => $request->input('source', 'website'),
        ]);

        return $this->created(new ContactRequestResource($contact), 'Contact request received');
    }
}
