<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TableData;

class TableDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sampleData = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'phone' => '+1234567890',
                'status' => 'Active',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'phone' => '+1234567891',
                'status' => 'Active',
            ],
            [
                'name' => 'Michael Johnson',
                'email' => 'michael.j@example.com',
                'phone' => '+1234567892',
                'status' => 'Inactive',
            ],
            [
                'name' => 'Emily Davis',
                'email' => 'emily.davis@example.com',
                'phone' => '+1234567893',
                'status' => 'Active',
            ],
            [
                'name' => 'David Wilson',
                'email' => 'david.wilson@example.com',
                'phone' => '+1234567894',
                'status' => 'Active',
            ],
            [
                'name' => 'Sarah Brown',
                'email' => 'sarah.brown@example.com',
                'phone' => '+1234567895',
                'status' => 'Inactive',
            ],
            [
                'name' => 'James Taylor',
                'email' => 'james.taylor@example.com',
                'phone' => '+1234567896',
                'status' => 'Active',
            ],
            [
                'name' => 'Linda Anderson',
                'email' => 'linda.anderson@example.com',
                'phone' => '+1234567897',
                'status' => 'Active',
            ],
            [
                'name' => 'Robert Martinez',
                'email' => 'robert.m@example.com',
                'phone' => '+1234567898',
                'status' => 'Active',
            ],
            [
                'name' => 'Patricia Garcia',
                'email' => 'patricia.garcia@example.com',
                'phone' => '+1234567899',
                'status' => 'Inactive',
            ],
            [
                'name' => 'Christopher Lee',
                'email' => 'chris.lee@example.com',
                'phone' => '+1234567800',
                'status' => 'Active',
            ],
            [
                'name' => 'Jennifer White',
                'email' => 'jennifer.white@example.com',
                'phone' => '+1234567801',
                'status' => 'Active',
            ],
            [
                'name' => 'Daniel Harris',
                'email' => 'daniel.harris@example.com',
                'phone' => '+1234567802',
                'status' => 'Active',
            ],
            [
                'name' => 'Nancy Clark',
                'email' => 'nancy.clark@example.com',
                'phone' => '+1234567803',
                'status' => 'Inactive',
            ],
            [
                'name' => 'Matthew Lewis',
                'email' => 'matthew.lewis@example.com',
                'phone' => '+1234567804',
                'status' => 'Active',
            ],
        ];

        foreach ($sampleData as $data) {
            TableData::create($data);
        }
    }
}
