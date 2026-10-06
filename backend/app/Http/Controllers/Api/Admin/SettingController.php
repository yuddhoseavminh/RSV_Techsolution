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
        return $this->storeBrandFile($request, 'logo', 'company', 'logo', 'Logo');
    }

    public function uploadFavicon(Request $request): JsonResponse
    {
        return $this->storeBrandFile($request, 'favicon', 'seo', 'favicon', 'Favicon');
    }

    /**
     * Shared store-and-save for the brand files (logo, favicon): validate,
     * put the file on the public disk, and persist its URL as a setting so
     * `GET /settings` hands it back to the site.
     */
    private function storeBrandFile(
        Request $request,
        string $field,
        string $group,
        string $key,
        string $label
    ): JsonResponse {
        $request->validate([
            $field => ['required', 'file', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:5120'],
        ]);

        $path = $request->file($field)->store('settings', 'public');
        $url = config('app.url') . '/storage/' . $path;

        Setting::updateOrCreate(
            ['group' => $group, 'key' => $key],
            ['value' => $url]
        );

        return $this->ok([
            'url' => $url,
            'path' => $path,
        ], $label . ' uploaded successfully');
    }
}
