<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article; // <--- CRITICAL: This line is often missing!

class ArticleController extends Controller
{
    public function index()
    {
        // Fetch all articles
        $articles = Article::all();
        return response()->json($articles);
    }

    public function show($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }
        return response()->json($article);
    }

    public function update(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['message' => 'Article not found'], 404);
        }

        // Validate that we are sending data
        $article->update($request->all());

        return response()->json([
            'message' => 'Article updated successfully',
            'data' => $article
        ]);
    }
}