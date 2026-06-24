<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('about:kt-solution', function (): void {
    $this->info('KT Solution API is ready.');
});
