<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = [
            [
                'username' => 'Provider 1',
                'email' => 'mydevone@gmail.com',
                'pin' => '134675',
                'photo_profile' => 'ho0qPHlfCi9xtgnJ2SUuGjh0PwIssQHMdAd1Icpa.png',
                'id_role' => 1
            ],
            [
                'username' => 'Admin 1',
                'email' => 'myadminone@gmail.com',
                'pin' => '192837',
                'photo_profile' => 'ho0qPHlfCi9xtgnJ2SUuGjh0PwIssQHMdAd1Icpa.png',
                'id_role' => 2
            ],
            [
                'username' => 'Linda',
                'email' => 'lindadrt2@gmail.com',
                'pin' => '666666',
                'photo_profile' => 'ho0qPHlfCi9xtgnJ2SUuGjh0PwIssQHMdAd1Icpa.png',
                'id_role' => 3
            ]
        ];

        DB::table('users')->insert($users);
    }
}
