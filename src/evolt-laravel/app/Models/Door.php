<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Door extends Model
{
    use HasFactory;
    protected $table = 'doors';
    public $timestamps = false;
    protected $primaryKey = 'id_door';

    protected $fillable = [
        'door_name',
        'door_description',
        'door_status',
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'doors_users', 'id_door', 'id_user');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($door) {
            $door->users()->detach();
        });
    }
}
