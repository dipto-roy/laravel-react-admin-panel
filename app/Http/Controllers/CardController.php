<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Card;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        
        // Fetch cards with pagination
        $students = Card::paginate($perPage);

        return Inertia::render('Card/Index', [
            'students' => $students->items(),
            'pagination' => [
                'current_page' => $students->currentPage(),
                'last_page' => $students->lastPage(),
                'per_page' => $students->perPage(),
                'total' => $students->total(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:cards,email',
            'phone' => 'required|string|max:20',
            'dob' => 'nullable|date',
            'gender' => 'nullable|string|max:10',
            'department' => 'nullable|string|max:100',
            'proficiency' => 'nullable|string|max:100',
            'destination' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:500',
            'sscGpa' => 'nullable|numeric|between:0,5',
            'hscGpa' => 'nullable|numeric|between:0,5',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/cards'), $imageName);
            $validated['image'] = 'uploads/cards/' . $imageName;
        }

        Card::create($validated);

        return redirect()->route('card.index')->with('success', 'Card created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $card = Card::findOrFail($id);

        return Inertia::render('Card/Show', [
            'card' => $card,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $card = Card::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:cards,email,' . $id,
            'phone' => 'required|string|max:20',
            'dob' => 'nullable|date',
            'gender' => 'nullable|string|max:10',
            'department' => 'nullable|string|max:100',
            'proficiency' => 'nullable|string|max:100',
            'destination' => 'nullable|string|max:100',
            'address' => 'nullable|string|max:500',
            'sscGpa' => 'nullable|numeric|between:0,5',
            'hscGpa' => 'nullable|numeric|between:0,5',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($card->image && file_exists(public_path($card->image))) {
                unlink(public_path($card->image));
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('uploads/cards'), $imageName);
            $validated['image'] = 'uploads/cards/' . $imageName;
        }

        $card->update($validated);

        return redirect()->route('card.index')->with('success', 'Card updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $card = Card::findOrFail($id);
        
        // Delete image if exists
        if ($card->image && file_exists(public_path($card->image))) {
            unlink(public_path($card->image));
        }
        
        $card->delete();

        return redirect()->route('card.index')->with('success', 'Card deleted successfully!');
    }
}
