<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ClassModel;

class ClassController extends Controller
{
    public function index()
    {
        $classes = ClassModel::all();
        return Inertia::render('Academic/Class', ['classes' => $classes]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        ClassModel::create($validated);
        return redirect()->route('class.index')->with('success', 'Class created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $class = ClassModel::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $class->update($validated);
        return redirect()->route('class.index')->with('success', 'Class updated successfully!');
    }

    public function destroy(string $id)
    {
        ClassModel::findOrFail($id)->delete();
        return redirect()->route('class.index')->with('success', 'Class deleted successfully!');
    }
}
