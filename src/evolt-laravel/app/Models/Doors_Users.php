<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doors_Users extends Model
{
    use HasFactory;
    protected $table = 'doors_users';
    protected $fillable = ['id_door', 'id_user'];
    protected $primaryKey = 'id';
    public $incrementing = false;

    public function doors(){
        return $this->belongsTo(Door::class, 'id_door');
    }

    public function users(){
        return $this->belongsTo(User::class, 'id_user');
    }
}
