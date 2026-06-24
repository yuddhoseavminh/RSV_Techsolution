<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Support\ApiResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

abstract class CrudController extends Controller
{
    use ApiResponse;

    protected string $modelClass;

    protected array $with = [];

    protected array $searchColumns = [];

    protected array $storeRules = [];

    protected array $updateRules = [];

    public function index(Request $request): JsonResponse
    {
        $class = $this->modelClass;
        $query = $class::query()->with($this->with);

        if ($request->filled('search') && $this->searchColumns !== []) {
            $search = '%'.$request->string('search').'%';
            $query->where(function ($builder) use ($search): void {
                foreach ($this->searchColumns as $column) {
                    $builder->orWhere($column, 'like', $search);
                }
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        return $this->ok($query->latest()->paginate($request->integer('per_page', 15)));
    }

    public function store(Request $request): JsonResponse
    {
        $class = $this->modelClass;
        $model = $class::create($request->validate($this->storeRules));
        $this->afterSave($model, $request);

        return $this->created($model->fresh($this->with), 'Record created');
    }

    public function show(int|string $id): JsonResponse
    {
        $class = $this->modelClass;

        return $this->ok($class::with($this->with)->findOrFail($id));
    }

    public function update(Request $request, int|string $id): JsonResponse
    {
        $class = $this->modelClass;
        $model = $class::findOrFail($id);
        $model->update($request->validate($this->updateRules ?: $this->storeRules));
        $this->afterSave($model, $request);

        return $this->ok($model->fresh($this->with), 'Record updated');
    }

    public function destroy(int|string $id): JsonResponse
    {
        $class = $this->modelClass;
        $class::findOrFail($id)->delete();

        return $this->ok(null, 'Record deleted');
    }

    protected function afterSave(Model $model, Request $request): void
    {
        //
    }
}
