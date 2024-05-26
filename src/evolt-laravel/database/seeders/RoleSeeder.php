<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['role_name' => 'Developer'],
            ['role_name' => 'Admin'],
            ['role_name' => 'Regular User'],
        ];

        DB::table('roles')->insert($roles);
    }
}
