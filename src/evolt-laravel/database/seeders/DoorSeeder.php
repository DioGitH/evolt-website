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
                'door_name' => 'Door 1',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'door_name' => 'Door 2',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'door_name' => 'Door 3',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'door_name' => 'Door 4',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'door_name' => 'Door 5',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],
            [
                'door_name' => 'Door 6',
                'door_description' => 'lorem ipsum dolor sit amet',
                'door_status' => 'close',
            ],

        ];

        DB::table('doors')->insert($doors);
    }
}
