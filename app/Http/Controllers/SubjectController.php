<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Subject;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::all();
        return Inertia::render('Academic/Subject', ['subjects' => $subjects]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'nullable|string|max:50',
        ]);

        Subject::create($validated);
        return redirect()->route('subject.index')->with('success', 'Subject created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $subject = Subject::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'nullable|string|max:50',
        ]);

        $subject->update($validated);
        return redirect()->route('subject.index')->with('success', 'Subject updated successfully!');
    }

    public function destroy(string $id)
    {
        Subject::findOrFail($id)->delete();
        return redirect()->route('subject.index')->with('success', 'Subject deleted successfully!');
    }
}
