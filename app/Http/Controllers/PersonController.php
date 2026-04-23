<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonRequest;
use App\Models\Person;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PersonController extends Controller
{
    public function index(): Response
    {
        $people = Person::latest()->get();

        return Inertia::render('People/Index', [
            'people' => $people,
        ]);
    }

    public function store(StorePersonRequest $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
        ]);

        Person::create($validatedData);

        return redirect()
            ->route('people.index')
            ->with('message', 'Person created successfully.');
    }
}
