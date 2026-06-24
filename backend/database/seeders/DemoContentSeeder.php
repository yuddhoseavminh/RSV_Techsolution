<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\Client;
use App\Models\Invoice;
use App\Models\PortfolioProject;
use App\Models\Project;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\Setting;
use App\Models\Tag;
use App\Models\Technology;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoContentSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@ktsolution.local'],
            ['name' => 'KT Admin', 'password' => 'password', 'status' => 'active']
        );
        $admin->syncRoles(['admin']);

        $clientUser = User::firstOrCreate(
            ['email' => 'client@example.com'],
            ['name' => 'Demo Client', 'company' => 'Acme Retail', 'password' => 'password', 'status' => 'active']
        );
        $clientUser->syncRoles(['client']);

        $client = Client::firstOrCreate(
            ['email' => 'client@example.com'],
            ['name' => 'Acme Retail', 'contact_name' => 'Demo Client', 'industry' => 'Retail', 'status' => 'active']
        );

        $category = ServiceCategory::firstOrCreate(
            ['slug' => 'software-solutions'],
            ['name' => 'Software Solutions', 'description' => 'Business systems designed for growth.', 'sort_order' => 1]
        );

        $services = [
            ['Web Development', 'web-development', 'Modern websites and web applications for fast-growing companies.', ['Next.js', 'Laravel', 'Tailwind CSS']],
            ['Mobile App Development', 'mobile-app-development', 'iOS and Android applications with reliable API integrations.', ['React Native', 'Flutter', 'Laravel API']],
            ['POS System', 'pos-system', 'Point-of-sale systems for retail, restaurants, and service businesses.', ['Laravel', 'MySQL', 'Thermal printers']],
            ['Inventory System', 'inventory-system', 'Stock control, purchasing, reporting, and warehouse workflows.', ['Laravel', 'MySQL', 'Barcode']],
            ['ERP System', 'erp-system', 'Integrated business operations for finance, HR, sales, and operations.', ['Laravel', 'MySQL', 'REST APIs']],
            ['School Management System', 'school-management-system', 'Student, teacher, attendance, billing, and academic workflows.', ['Laravel', 'Next.js', 'MySQL']],
        ];

        foreach ($services as [$name, $slug, $summary, $technologies]) {
            Service::firstOrCreate(
                ['slug' => $slug],
                [
                    'service_category_id' => $category->id,
                    'name' => $name,
                    'icon' => 'Code2',
                    'summary' => $summary,
                    'description' => $summary.' KT Solution plans, designs, builds, deploys, and supports the full product lifecycle.',
                    'benefits' => ['Scalable architecture', 'Clean user experience', 'Actionable reporting', 'Long-term support'],
                    'technologies' => $technologies,
                    'is_featured' => true,
                    'is_active' => true,
                ]
            );
        }

        foreach (['Laravel', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Flutter', 'AWS'] as $technology) {
            Technology::firstOrCreate(
                ['slug' => str($technology)->slug()->toString()],
                ['name' => $technology, 'category' => in_array($technology, ['Laravel', 'MySQL', 'AWS'], true) ? 'Backend' : 'Frontend']
            );
        }

        $portfolio = PortfolioProject::firstOrCreate(
            ['slug' => 'retail-pos-suite'],
            [
                'client_id' => $client->id,
                'title' => 'Retail POS Suite',
                'category' => 'POS',
                'summary' => 'A complete POS and inventory platform for multi-branch retail operations.',
                'description' => 'KT Solution delivered sales, inventory, barcode, purchasing, and management reporting workflows.',
                'client_name' => 'Acme Retail',
                'industry' => 'Retail',
                'launch_date' => now()->subMonths(4),
                'is_featured' => true,
                'is_published' => true,
            ]
        );
        $portfolio->technologies()->sync(Technology::whereIn('name', ['Laravel', 'Next.js', 'MySQL'])->pluck('id'));

        $project = Project::firstOrCreate(
            ['code' => 'KTS-1001'],
            [
                'client_id' => $client->id,
                'name' => 'Acme Retail POS Rollout',
                'description' => 'Implementation and rollout of POS, inventory, and reporting modules.',
                'type' => 'POS',
                'status' => 'active',
                'priority' => 'high',
                'budget' => 12000,
                'start_date' => now()->subMonth(),
                'due_date' => now()->addMonths(2),
                'progress' => 62,
            ]
        );
        $project->users()->sync([$clientUser->id => ['role' => 'client']]);

        Invoice::firstOrCreate(
            ['invoice_number' => 'INV-2026-0001'],
            [
                'client_id' => $client->id,
                'project_id' => $project->id,
                'user_id' => $clientUser->id,
                'status' => 'sent',
                'subtotal' => 3500,
                'tax' => 0,
                'discount' => 0,
                'total' => 3500,
                'issued_at' => now(),
                'due_at' => now()->addDays(14),
            ]
        );

        Ticket::firstOrCreate(
            ['subject' => 'Need cashier role access'],
            [
                'user_id' => $clientUser->id,
                'project_id' => $project->id,
                'description' => 'Please enable cashier permissions for the new branch team.',
                'priority' => 'medium',
                'status' => 'open',
            ]
        );

        $blogCategory = BlogCategory::firstOrCreate(['slug' => 'digital-transformation'], ['name' => 'Digital Transformation']);
        $tag = Tag::firstOrCreate(['slug' => 'business-software'], ['name' => 'Business Software']);
        $post = BlogPost::firstOrCreate(
            ['slug' => 'choosing-custom-business-software'],
            [
                'blog_category_id' => $blogCategory->id,
                'author_id' => $admin->id,
                'title' => 'Choosing Custom Business Software That Scales',
                'excerpt' => 'A practical guide to planning software that supports growth and reduces manual work.',
                'content' => '<p>Successful systems start with clear workflows, measurable outcomes, and a maintainable technical foundation.</p>',
                'status' => 'published',
                'published_at' => now(),
            ]
        );
        $post->tags()->sync([$tag->id]);

        $settings = [
            'company' => [
                'name' => 'KT Solution',
                'email' => 'hello@ktsolution.com',
                'phone' => '+855 12 345 678',
                'address' => 'Phnom Penh, Cambodia',
            ],
            'seo' => [
                'title' => 'KT Solution - Smart Digital Solutions',
                'description' => 'Custom software, web applications, mobile apps, and enterprise systems built for growth.',
            ],
            'social' => [
                'facebook' => 'https://facebook.com/ktsolution',
                'linkedin' => 'https://linkedin.com/company/ktsolution',
            ],
        ];

        foreach ($settings as $group => $items) {
            foreach ($items as $key => $value) {
                Setting::updateOrCreate(['group' => $group, 'key' => $key], ['value' => $value]);
            }
        }
    }
}
