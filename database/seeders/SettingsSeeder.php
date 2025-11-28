<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\District;
use App\Models\Upazila;
use App\Models\Zone;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Districts
        $dhaka = District::create([
            'name' => 'Dhaka',
            'code' => 'DHA',
            'description' => 'Capital district of Bangladesh',
            'is_active' => true,
        ]);

        $chittagong = District::create([
            'name' => 'Chittagong',
            'code' => 'CTG',
            'description' => 'Port city and commercial hub',
            'is_active' => true,
        ]);

        $sylhet = District::create([
            'name' => 'Sylhet',
            'code' => 'SYL',
            'description' => 'Tea capital of Bangladesh',
            'is_active' => true,
        ]);

        // Create Upazilas for Dhaka
        $mirpur = Upazila::create([
            'name' => 'Mirpur',
            'code' => 'MIR',
            'district_id' => $dhaka->id,
            'description' => 'Residential and commercial area in Dhaka',
            'is_active' => true,
        ]);

        $uttara = Upazila::create([
            'name' => 'Uttara',
            'code' => 'UTT',
            'district_id' => $dhaka->id,
            'description' => 'Modern residential area in Dhaka',
            'is_active' => true,
        ]);

        $gulshan = Upazila::create([
            'name' => 'Gulshan',
            'code' => 'GUL',
            'district_id' => $dhaka->id,
            'description' => 'Diplomatic zone and upscale area',
            'is_active' => true,
        ]);

        // Create Upazilas for Chittagong
        $patenga = Upazila::create([
            'name' => 'Patenga',
            'code' => 'PAT',
            'district_id' => $chittagong->id,
            'description' => 'Beach area in Chittagong',
            'is_active' => true,
        ]);

        $nasirabad = Upazila::create([
            'name' => 'Nasirabad',
            'code' => 'NAS',
            'district_id' => $chittagong->id,
            'description' => 'Residential area in Chittagong',
            'is_active' => true,
        ]);

        // Create Zones
        Zone::create([
            'name' => 'Zone 1 - Mirpur',
            'code' => 'Z1',
            'upazila_id' => $mirpur->id,
            'description' => 'Covers Mirpur 1-6 sectors',
            'is_active' => true,
        ]);

        Zone::create([
            'name' => 'Zone 2 - Mirpur',
            'code' => 'Z2',
            'upazila_id' => $mirpur->id,
            'description' => 'Covers Mirpur 7-14 sectors',
            'is_active' => true,
        ]);

        Zone::create([
            'name' => 'Zone A - Uttara',
            'code' => 'ZA',
            'upazila_id' => $uttara->id,
            'description' => 'Covers Uttara Sector 1-9',
            'is_active' => true,
        ]);

        Zone::create([
            'name' => 'Zone B - Uttara',
            'code' => 'ZB',
            'upazila_id' => $uttara->id,
            'description' => 'Covers Uttara Sector 10-18',
            'is_active' => true,
        ]);

        Zone::create([
            'name' => 'Gulshan North',
            'code' => 'GN',
            'upazila_id' => $gulshan->id,
            'description' => 'Northern part of Gulshan',
            'is_active' => true,
        ]);

        Zone::create([
            'name' => 'Gulshan South',
            'code' => 'GS',
            'upazila_id' => $gulshan->id,
            'description' => 'Southern part of Gulshan',
            'is_active' => true,
        ]);
    }
}
