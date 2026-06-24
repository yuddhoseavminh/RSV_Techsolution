<?php

namespace App\Http\Controllers\Api\Portal;

use App\Http\Controllers\Controller;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $invoices = Invoice::with('project')
            ->where('user_id', $request->user()->id)
            ->latest('issued_at')
            ->paginate($request->integer('per_page', 10));

        return $this->ok(InvoiceResource::collection($invoices));
    }

    public function show(Request $request, Invoice $invoice): JsonResponse
    {
        abort_unless((int) $invoice->user_id === (int) $request->user()->id, 403);

        return $this->ok(new InvoiceResource($invoice->load(['project', 'items'])));
    }
}
