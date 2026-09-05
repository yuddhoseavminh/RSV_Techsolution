<?php

use App\Http\Controllers\Api\Admin\BlogCategoryController;
use App\Http\Controllers\Api\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Api\Admin\ClientController;
use App\Http\Controllers\Api\Admin\ContactRequestController as AdminContactRequestController;
use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\Admin\InvoiceController as AdminInvoiceController;
use App\Http\Controllers\Api\Admin\PermissionController;
use App\Http\Controllers\Api\Admin\PortfolioProjectController as AdminPortfolioProjectController;
use App\Http\Controllers\Api\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Api\Admin\RoleController;
use App\Http\Controllers\Api\Admin\ServiceCategoryController;
use App\Http\Controllers\Api\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Api\Admin\SettingController;
use App\Http\Controllers\Api\Admin\TagController;
use App\Http\Controllers\Api\Admin\TechnologyController;
use App\Http\Controllers\Api\Admin\TicketController as AdminTicketController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Portal\DashboardController as PortalDashboardController;
use App\Http\Controllers\Api\Portal\InvoiceController as PortalInvoiceController;
use App\Http\Controllers\Api\Portal\ProfileController;
use App\Http\Controllers\Api\Portal\ProjectController as PortalProjectController;
use App\Http\Controllers\Api\Portal\TicketController as PortalTicketController;
use App\Http\Controllers\Api\Public\BlogController;
use App\Http\Controllers\Api\Public\ContactController;
use App\Http\Controllers\Api\Public\HomeController;
use App\Http\Controllers\Api\Public\PortfolioController;
use App\Http\Controllers\Api\Public\ServiceController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    // Health check endpoint
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toISOString(),
            'services' => [
                'database' => DB::connection()->getPdo() ? 'connected' : 'disconnected',
                'cache' => Cache::store('redis')->getStore() ? 'connected' : 'disconnected',
            ],
        ]);
    });

    Route::get('/home', HomeController::class);
    Route::apiResource('/services', ServiceController::class)->only(['index', 'show']);
    Route::apiResource('/portfolio', PortfolioController::class)->only(['index', 'show']);
    Route::apiResource('/blog', BlogController::class)->only(['index', 'show']);
    Route::post('/contact-requests', ContactController::class);

    Route::prefix('auth')->group(function (): void {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);

        Route::middleware('auth:sanctum')->group(function (): void {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    });

    Route::middleware('auth:sanctum')->group(function (): void {
        Route::prefix('portal')->group(function (): void {
            Route::get('/dashboard', PortalDashboardController::class);
            Route::apiResource('/projects', PortalProjectController::class)->only(['index', 'show'])->names('portal.projects');
            Route::apiResource('/invoices', PortalInvoiceController::class)->only(['index', 'show'])->names('portal.invoices');
            Route::get('/profile', [ProfileController::class, 'show']);
            Route::put('/profile', [ProfileController::class, 'update']);
            Route::apiResource('/tickets', PortalTicketController::class)->only(['index', 'store', 'show'])->names('portal.tickets');
            Route::post('/tickets/{ticket}/replies', [PortalTicketController::class, 'reply']);
        });

        Route::middleware('role:admin|manager')->prefix('admin')->group(function (): void {
            Route::get('/dashboard', AdminDashboardController::class);
            Route::apiResource('/users', UserController::class);
            Route::apiResource('/roles', RoleController::class);
            Route::apiResource('/permissions', PermissionController::class)->only(['index', 'show']);
            Route::apiResource('/clients', ClientController::class);
            Route::apiResource('/projects', AdminProjectController::class)->names('admin.projects');
            Route::apiResource('/service-categories', ServiceCategoryController::class);
            Route::apiResource('/services', AdminServiceController::class)->names('admin.services');
            Route::apiResource('/technologies', TechnologyController::class);
            Route::apiResource('/portfolio-projects', AdminPortfolioProjectController::class);
            Route::apiResource('/blog-categories', BlogCategoryController::class);
            Route::apiResource('/blog-posts', AdminBlogPostController::class);
            Route::apiResource('/tags', TagController::class);
            Route::apiResource('/contact-requests', AdminContactRequestController::class)->only(['index', 'show', 'update', 'destroy']);
            Route::apiResource('/tickets', AdminTicketController::class)->only(['index', 'show', 'update', 'destroy'])->names('admin.tickets');
            Route::apiResource('/invoices', AdminInvoiceController::class)->names('admin.invoices');
            Route::get('/settings', [SettingController::class, 'index']);
            Route::put('/settings', [SettingController::class, 'update']);
        });
    });
});
