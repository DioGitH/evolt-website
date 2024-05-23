<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DoorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doors = [
            [
                'id' => 1,
                'door_name' => 'Door 1',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'id' => 2,
                'door_name' => 'Door 2',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'id' => 3,
                'door_name' => 'Door 3',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'id' => 4,
                'door_name' => 'Door 4',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],

        ];

        DB::table('doors')->insert($doors);
    }
}
