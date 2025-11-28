<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Department;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::all();
        return Inertia::render('Academic/Department', ['departments' => $departments]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Department::create($validated);
        return redirect()->route('department.index')->with('success', 'Department created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $department = Department::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $department->update($validated);
        return redirect()->route('department.index')->with('success', 'Department updated successfully!');
    }

    public function destroy(string $id)
    {
        Department::findOrFail($id)->delete();
        return redirect()->route('department.index')->with('success', 'Department deleted successfully!');
    }
}
