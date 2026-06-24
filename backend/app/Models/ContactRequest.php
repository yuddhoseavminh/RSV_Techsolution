<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContactRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service_needed',
        'message',
        'status',
        'source',
        'assigned_to',
    ];

    public function activities(): HasMany
    {
        return $this->hasMany(LeadActivity::class);
    }
}
