<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\CreateRequest;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Roles/Index', [
            'roles' => RoleResource::collection(Role::all())
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Roles/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateRequest $request
     * @return RedirectResponse
     */
    public function store(CreateRequest $request): RedirectResponse
    {
        Role::create($request->validated());
        return to_route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $data = [];
        $givenPermissions = [];

        $role = Role::findById($id)->loadMissing('permissions');
        $permissions = Permission::all();

        foreach ($permissions as $permission) {
            foreach ($role->permissions as $rolePermission) {
                if ($rolePermission->id === $permission->id) {
                    $givenPermissions[] = $rolePermission->id;
                }
            }

            $key = Str::slug($permission->menu);
            $data[$key][] = new PermissionResource($permission);
        }

        return Inertia::render('Admin/Roles/Edit', [
            'role' => new RoleResource($role),
            'permissions' => $data,
            'givenPermissions' => $givenPermissions
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CreateRequest $request, string $id)
    {
        $role = Role::findById($id);
        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $role = Role::findById($id);
        $role->delete();

        return back();
    }
}
