<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Upazila;
use App\Models\District;
use Illuminate\Validation\Rule;

class UpazilaController extends Controller
{
    public function index()
    {
        $upazilas = Upazila::with('district')->latest()->paginate(10);
        $districts = District::all();
        
        return Inertia::render('Settings/Upazila', [
            'upazilas' => $upazilas->items(),
            'districts' => $districts,
            'pagination' => [
                'current_page' => $upazilas->currentPage(),
                'last_page' => $upazilas->lastPage(),
                'per_page' => $upazilas->perPage(),
                'total' => $upazilas->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:upazilas,name',
            'code' => 'required|string|max:50|unique:upazilas,code',
            'district_id' => 'required|exists:districts,id',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ], [
            'name.required' => 'Upazila name is required.',
            'name.unique' => 'This upazila name already exists.',
            'code.required' => 'Upazila code is required.',
            'code.unique' => 'This upazila code already exists.',
            'district_id.required' => 'Please select a district.',
            'district_id.exists' => 'Selected district does not exist.',
        ]);

        Upazila::create($validated);
        
        return redirect()->back()->with('success', 'Upazila created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $upazila = Upazila::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('upazilas')->ignore($upazila->id)],
            'code' => ['required', 'string', 'max:50', Rule::unique('upazilas')->ignore($upazila->id)],
            'district_id' => 'required|exists:districts,id',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ], [
            'name.required' => 'Upazila name is required.',
            'name.unique' => 'This upazila name already exists.',
            'code.required' => 'Upazila code is required.',
            'code.unique' => 'This upazila code already exists.',
            'district_id.required' => 'Please select a district.',
            'district_id.exists' => 'Selected district does not exist.',
        ]);

        $upazila->update($validated);
        
        return redirect()->back()->with('success', 'Upazila updated successfully!');
    }

    public function destroy(string $id)
    {
        Upazila::findOrFail($id)->delete();
        
        return redirect()->back()->with('success', 'Upazila deleted successfully!');
    }
}
