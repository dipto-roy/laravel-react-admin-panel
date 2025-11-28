<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassModel;
use Illuminate\Validation\Rule;

class ClassController extends Controller
{
    public function index()
    {
        $classes = ClassModel::latest()->paginate(10);
        
        return Inertia::render('Academic/Class', [
            'classes' => $classes->items(),
            'pagination' => [
                'current_page' => $classes->currentPage(),
                'last_page' => $classes->lastPage(),
                'per_page' => $classes->perPage(),
                'total' => $classes->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:classes,name',
            'code' => 'required|string|max:20|unique:classes,code',
            'description' => 'nullable|string|max:1000',
        ], [
            'name.required' => 'Class name is required.',
            'name.unique' => 'This class name already exists.',
            'name.max' => 'Class name cannot exceed 255 characters.',
            'code.required' => 'Class code is required.',
            'code.unique' => 'This class code already exists.',
        ]);

        ClassModel::create($validated);
        
        return redirect()->back()->with('success', 'Class created successfully!');
    }

    public function show(string $id)
    {
        $class = ClassModel::findOrFail($id);
        return response()->json($class);
    }

    public function update(Request $request, string $id)
    {
        $class = ClassModel::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('classes')->ignore($class->id)],
            'code' => ['required', 'string', 'max:20', Rule::unique('classes')->ignore($class->id)],
            'description' => 'nullable|string|max:1000',
        ], [
            'name.required' => 'Class name is required.',
            'name.unique' => 'This class name already exists.',
            'name.max' => 'Class name cannot exceed 255 characters.',
            'code.required' => 'Class code is required.',
            'code.unique' => 'This class code already exists.',
        ]);

        $class->update($validated);
        
        return redirect()->back()->with('success', 'Class updated successfully!');
    }

    public function destroy(string $id)
    {
        ClassModel::findOrFail($id)->delete();
        
        return redirect()->back()->with('success', 'Class deleted successfully!');
    }
}
