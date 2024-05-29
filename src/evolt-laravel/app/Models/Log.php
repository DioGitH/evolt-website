<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_log';
    protected $fillable = [
        'log_status',
        // 'log_time',
        'door_name',
        'username',
        'image_name',
    ];
}
