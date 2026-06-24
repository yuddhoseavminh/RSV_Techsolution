<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'users.view',
            'users.manage',
            'roles.manage',
            'projects.manage',
            'services.manage',
            'portfolio.manage',
            'blog.manage',
            'contacts.manage',
            'tickets.manage',
            'invoices.manage',
            'settings.manage',
            'portal.access',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $manager = Role::firstOrCreate(['name' => 'manager', 'guard_name' => 'web']);
        $client = Role::firstOrCreate(['name' => 'client', 'guard_name' => 'web']);

        $admin->syncPermissions($permissions);
        $manager->syncPermissions([
            'users.view',
            'projects.manage',
            'services.manage',
            'portfolio.manage',
            'blog.manage',
            'contacts.manage',
            'tickets.manage',
            'invoices.manage',
        ]);
        $client->syncPermissions(['portal.access']);
    }
}
