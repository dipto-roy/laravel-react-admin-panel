<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Validation\Rule;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::latest()->paginate(10);

        return Inertia::render('Academic/Course', [
            'courses' => $courses->items(),
            'pagination' => [
                'current_page' => $courses->currentPage(),
                'last_page' => $courses->lastPage(),
                'per_page' => $courses->perPage(),
                'total' => $courses->total(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:courses,name',
            'description' => 'nullable|string|max:1000',
            'duration' => 'required|string|max:100',
            'fee' => 'required|numeric|min:0',
        ], [
            'name.required' => 'Course name is required.',
            'name.unique' => 'This course name already exists.',
            'duration.required' => 'Course duration is required.',
            'fee.required' => 'Course fee is required.',
            'fee.numeric' => 'Course fee must be a number.',
            'fee.min' => 'Course fee cannot be negative.',
        ]);

        Course::create($validated);

        return redirect()->back()->with('success', 'Course created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $course = Course::findOrFail($id);

        return Inertia::render('Academic/CourseShow', [
            'course' => $course,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('courses')->ignore($course->id)],
            'description' => 'nullable|string|max:1000',
            'duration' => 'required|string|max:100',
            'fee' => 'required|numeric|min:0',
        ], [
            'name.required' => 'Course name is required.',
            'name.unique' => 'This course name already exists.',
            'duration.required' => 'Course duration is required.',
            'fee.required' => 'Course fee is required.',
            'fee.numeric' => 'Course fee must be a number.',
            'fee.min' => 'Course fee cannot be negative.',
        ]);

        $course->update($validated);

        return redirect()->back()->with('success', 'Course updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return redirect()->back()->with('success', 'Course deleted successfully!');
    }
}
