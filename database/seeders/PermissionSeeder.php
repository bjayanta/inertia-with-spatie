<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the JSON file
        $path = database_path('seeders/data/permissions.json');

        // Decode to array
        $permissions = collect(json_decode(file_get_contents($path), true));

        // Set max progress
        $this->command->getOutput()->progressStart($permissions->count());

        // Update or Insert
        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['name' => $permission['name'], 'menu' => $permission['menu']],
                [
                    'slug' => Str::slug($permission['name']),
                    'guard_name' => 'web',
                    'created_at' => date("Y-m-d h:i:s"),
                    'updated_at' => date("Y-m-d h:i:s")
                ]
            );
        }

        // Finish progress
        $this->command->getOutput()->progressFinish();
    }
}
