<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TableData;

class TableController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $search = $request->get('search', '');

        $query = TableData::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%");
        }

        $tableData = $query->paginate($perPage);

        return Inertia::render('Table/Index', [
            'tableData' => $tableData->items(),
            'pagination' => [
                'current_page' => $tableData->currentPage(),
                'last_page' => $tableData->lastPage(),
                'per_page' => $tableData->perPage(),
                'total' => $tableData->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'status' => 'nullable|string|max:20',
        ]);

        TableData::create($validated);

        return redirect()->route('table.index')->with('success', 'Record created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $record = TableData::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'status' => 'nullable|string|max:20',
        ]);

        $record->update($validated);

        return redirect()->route('table.index')->with('success', 'Record updated successfully!');
    }

    public function destroy(string $id)
    {
        $record = TableData::findOrFail($id);
        $record->delete();

        return redirect()->route('table.index')->with('success', 'Record deleted successfully!');
    }
}
