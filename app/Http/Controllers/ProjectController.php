<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\CreateRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $projects = Project::query()->where('is_default', 0);

        if (request()->status) {
            $projects->where('status', request()->status);
        } else {
            $projects->whereIn('status', ['Pending', 'Active']);
        }

        $projects = $projects->get();

        return Inertia::render('Project/Index', [
            'projects' => ProjectResource::collection($projects)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateRequest $request): RedirectResponse
    {
        Project::create([
            'name' => $request->name,
            'budget' => $request->budget,
            'start_at' => $request->start_at,
            'end_at' => $request->end_at,
            'properties' => $request->properties,
            'description' => $request->description,
        ]);

        return to_route('projects.index');
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();
        return back();
    }
}
