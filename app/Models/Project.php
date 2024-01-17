<?php

namespace App\Models;

use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'budget',
        'start_at',
        'end_at',
        'properties',
        'description',
        'id_default',
        'status',
    ];

    /**
     * Write code on Method
     *
     * @var array|string[]
     */
    protected array $dates = ['start_at', 'end_at', 'created_at', 'updated_at'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'budget' => 'float',
        'properties' => 'array',
        'id_default' => 'boolean',
        'status' => StatusEnum::class
    ];

}
