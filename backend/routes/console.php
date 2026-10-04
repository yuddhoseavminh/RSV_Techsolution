<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('about:rvs-techsolution', function (): void {
    $this->info('RVS Techsolution API is ready.');
});
