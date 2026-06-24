<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends CrudController
{
    protected string $modelClass = User::class;

    protected array $with = ['roles'];

    protected array $searchColumns = ['name', 'email', 'company'];

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:40'],
            'company' => ['nullable', 'string', 'max:160'],
            'status' => ['required', 'in:active,inactive,suspended'],
            'password' => ['required', 'confirmed', Password::defaults()],
            'roles' => ['array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        $roles = $data['roles'] ?? [];
        unset($data['roles']);

        $user = User::create($data);
        $user->syncRoles($roles);

        return $this->created($user->fresh('roles'), 'User created');
    }

    public function update(Request $request, int|string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:190', Rule::unique('users', 'email')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:40'],
            'company' => ['nullable', 'string', 'max:160'],
            'status' => ['required', 'in:active,inactive,suspended'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'roles' => ['array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        $roles = $data['roles'] ?? [];
        unset($data['roles']);

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $user->update($data);
        $user->syncRoles($roles);

        return $this->ok($user->fresh('roles'), 'User updated');
    }
}
