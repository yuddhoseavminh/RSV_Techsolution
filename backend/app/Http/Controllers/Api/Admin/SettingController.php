<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse
    {
        return $this->ok(
            Setting::all()
                ->groupBy('group')
                ->map(fn ($items) => $items->pluck('value', 'key'))
        );
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'settings' => ['required', 'array'],
            'settings.*.*' => ['nullable'],
        ]);

        foreach ($data['settings'] as $group => $settings) {
            foreach ($settings as $key => $value) {
                Setting::updateOrCreate(
                    ['group' => $group, 'key' => $key],
                    ['value' => $value]
                );
            }
        }

        return $this->ok(null, 'Settings updated');
    }

    public function uploadLogo(Request $request): JsonResponse
    {
        $request->validate([
            'logo' => ['required', 'file', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:5120'],
        ]);

        $path = $request->file('logo')->store('settings', 'public');
        $url = config('app.url') . '/storage/' . $path;

        Setting::updateOrCreate(
            ['group' => 'company', 'key' => 'logo'],
            ['value' => $url]
        );

        return $this->ok([
            'url' => $url,
            'path' => $path,
        ], 'Logo uploaded successfully');
    }
}
