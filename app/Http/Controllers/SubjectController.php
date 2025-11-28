<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Subject;
use Illuminate\Validation\Rule;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::latest()->paginate(10);
        $departments = \App\Models\Department::all();
        
        return Inertia::render('Academic/Subject', [
            'subjects' => $subjects->items(),
            'departments' => $departments,
            'pagination' => [
                'current_page' => $subjects->currentPage(),
                'last_page' => $subjects->lastPage(),
                'per_page' => $subjects->perPage(),
                'total' => $subjects->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:subjects,name',
            'code' => 'nullable|string|max:50|unique:subjects,code',
            'description' => 'nullable|string|max:1000',
            'department_id' => 'nullable|exists:departments,id',
            'credits' => 'nullable|numeric|min:0|max:10',
        ], [
            'name.required' => 'Subject name is required.',
            'name.unique' => 'This subject name already exists.',
            'code.unique' => 'This subject code already exists.',
            'code.max' => 'Subject code cannot exceed 50 characters.',
            'department_id.exists' => 'Selected department does not exist.',
            'credits.numeric' => 'Credits must be a number.',
        ]);

        Subject::create($validated);
        
        return redirect()->back()->with('success', 'Subject created successfully!');
    }

    public function show(string $id)
    {
        $subject = Subject::findOrFail($id);
        return response()->json($subject);
    }

    public function update(Request $request, string $id)
    {
        $subject = Subject::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('subjects')->ignore($subject->id)],
            'code' => ['nullable', 'string', 'max:50', Rule::unique('subjects')->ignore($subject->id)],
            'description' => 'nullable|string|max:1000',
            'department_id' => 'nullable|exists:departments,id',
            'credits' => 'nullable|numeric|min:0|max:10',
        ], [
            'name.required' => 'Subject name is required.',
            'name.unique' => 'This subject name already exists.',
            'code.unique' => 'This subject code already exists.',
            'code.max' => 'Subject code cannot exceed 50 characters.',
            'department_id.exists' => 'Selected department does not exist.',
            'credits.numeric' => 'Credits must be a number.',
        ]);

        $subject->update($validated);
        
        return redirect()->back()->with('success', 'Subject updated successfully!');
    }

    public function destroy(string $id)
    {
        Subject::findOrFail($id)->delete();
        
        return redirect()->back()->with('success', 'Subject deleted successfully!');
    }
}
