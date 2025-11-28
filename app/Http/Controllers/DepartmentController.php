<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Department;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::latest()->paginate(10);
        
        return Inertia::render('Academic/Department', [
            'departments' => $departments->items(),
            'pagination' => [
                'current_page' => $departments->currentPage(),
                'last_page' => $departments->lastPage(),
                'per_page' => $departments->perPage(),
                'total' => $departments->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'code' => 'nullable|string|max:10|unique:departments,code',
            'description' => 'nullable|string|max:1000',
            'head_of_department' => 'nullable|string|max:255',
        ], [
            'name.required' => 'Department name is required.',
            'name.unique' => 'This department name already exists.',
            'name.max' => 'Department name cannot exceed 255 characters.',
            'code.unique' => 'This department code already exists.',
        ]);

        Department::create($validated);
        
        return redirect()->back()->with('success', 'Department created successfully!');
    }

    public function show(string $id)
    {
        $department = Department::findOrFail($id);
        return response()->json($department);
    }

    public function update(Request $request, string $id)
    {
        $department = Department::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('departments')->ignore($department->id)],
            'code' => ['nullable', 'string', 'max:10', Rule::unique('departments')->ignore($department->id)],
            'description' => 'nullable|string|max:1000',
            'head_of_department' => 'nullable|string|max:255',
        ], [
            'name.required' => 'Department name is required.',
            'name.unique' => 'This department name already exists.',
            'name.max' => 'Department name cannot exceed 255 characters.',
            'code.unique' => 'This department code already exists.',
        ]);

        $department->update($validated);
        
        return redirect()->back()->with('success', 'Department updated successfully!');
    }

    public function destroy(string $id)
    {
        Department::findOrFail($id)->delete();
        
        return redirect()->back()->with('success', 'Department deleted successfully!');
    }
}
