<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\District;
use Illuminate\Validation\Rule;

class DistrictController extends Controller
{
    public function index()
    {
        $districts = District::withCount('upazilas')->latest()->paginate(10);
        
        return Inertia::render('Settings/District', [
            'districts' => $districts->items(),
            'pagination' => [
                'current_page' => $districts->currentPage(),
                'last_page' => $districts->lastPage(),
                'per_page' => $districts->perPage(),
                'total' => $districts->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:districts,name',
            'code' => 'required|string|max:50|unique:districts,code',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ], [
            'name.required' => 'District name is required.',
            'name.unique' => 'This district name already exists.',
            'code.required' => 'District code is required.',
            'code.unique' => 'This district code already exists.',
        ]);

        District::create($validated);
        
        return redirect()->back()->with('success', 'District created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $district = District::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('districts')->ignore($district->id)],
            'code' => ['required', 'string', 'max:50', Rule::unique('districts')->ignore($district->id)],
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ], [
            'name.required' => 'District name is required.',
            'name.unique' => 'This district name already exists.',
            'code.required' => 'District code is required.',
            'code.unique' => 'This district code already exists.',
        ]);

        $district->update($validated);
        
        return redirect()->back()->with('success', 'District updated successfully!');
    }

    public function destroy(string $id)
    {
        District::findOrFail($id)->delete();
        
        return redirect()->back()->with('success', 'District deleted successfully!');
    }
}
