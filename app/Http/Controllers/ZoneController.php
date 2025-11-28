<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Zone;
use App\Models\Upazila;
use Illuminate\Validation\Rule;

class ZoneController extends Controller
{
    public function index()
    {
        $zones = Zone::with('upazila.district')->latest()->paginate(10);
        $upazilas = Upazila::with('district')->get();
        
        return Inertia::render('Settings/Zone', [
            'zones' => $zones->items(),
            'upazilas' => $upazilas,
            'pagination' => [
                'current_page' => $zones->currentPage(),
                'last_page' => $zones->lastPage(),
                'per_page' => $zones->perPage(),
                'total' => $zones->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:zones,name',
            'code' => 'required|string|max:50|unique:zones,code',
            'upazila_id' => 'nullable|exists:upazilas,id',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ], [
            'name.required' => 'Zone name is required.',
            'name.unique' => 'This zone name already exists.',
            'code.required' => 'Zone code is required.',
            'code.unique' => 'This zone code already exists.',
            'upazila_id.exists' => 'Selected upazila does not exist.',
        ]);

        Zone::create($validated);
        
        return redirect()->back()->with('success', 'Zone created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $zone = Zone::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('zones')->ignore($zone->id)],
            'code' => ['required', 'string', 'max:50', Rule::unique('zones')->ignore($zone->id)],
            'upazila_id' => 'nullable|exists:upazilas,id',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean',
        ], [
            'name.required' => 'Zone name is required.',
            'name.unique' => 'This zone name already exists.',
            'code.required' => 'Zone code is required.',
            'code.unique' => 'This zone code already exists.',
            'upazila_id.exists' => 'Selected upazila does not exist.',
        ]);

        $zone->update($validated);
        
        return redirect()->back()->with('success', 'Zone updated successfully!');
    }

    public function destroy(string $id)
    {
        Zone::findOrFail($id)->delete();
        
        return redirect()->back()->with('success', 'Zone deleted successfully!');
    }
}
