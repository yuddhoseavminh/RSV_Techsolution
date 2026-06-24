<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact_name',
        'email',
        'phone',
        'website',
        'industry',
        'address',
        'status',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function portfolioProjects(): HasMany
    {
        return $this->hasMany(PortfolioProject::class);
    }
}
