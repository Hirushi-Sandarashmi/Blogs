<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogPostController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::with('user')->paginate(10);
        return response()->json($blogPosts);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $blogPost = new BlogPost();
        $blogPost->title = $request->title;
        $blogPost->content = $request->content;
        $blogPost->image = $request->image;
        $blogPost->author = auth()->user()->id;
        $blogPost->pdate = now();

        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $filename = time() . '.' . $image->getClientOriginalExtension();
        //     $path = $image->storeAs('public/images', $filename);
        //     $blogPost->image = $filename;
        // }

        $blogPost->save();

        return response()->json($blogPost, 201);
    }

    public function show($id)
    {
        $blogPost = BlogPost::with('user')->findOrFail($id);
        return response()->json($blogPost);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $blogPost = BlogPost::findOrFail($id);
        $blogPost->title = $request->title;
        $blogPost->content = $request->content;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $path = $image->storeAs('public/images', $filename);
            $blogPost->image = $filename;
        }

        $blogPost->save();

        return response()->json($blogPost);
    }

    public function destroy($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        $blogPost->delete();

        return response()->json(null, 204);
    }

    public function destroyAny($id)
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }
}