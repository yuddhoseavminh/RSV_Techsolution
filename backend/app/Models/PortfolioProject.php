<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PortfolioProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'title',
        'slug',
        'category',
        'summary',
        'description',
        'thumbnail_url',
        'client_name',
        'industry',
        'launch_date',
        'is_featured',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'launch_date' => 'date',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function technologies(): BelongsToMany
    {
        return $this->belongsToMany(Technology::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(PortfolioProjectImage::class);
    }
}
