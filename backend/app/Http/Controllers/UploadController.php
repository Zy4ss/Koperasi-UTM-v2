<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|image|max:5120',
        ]);

        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            $file = $request->file('file');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();

            $uploadDir = base_path('public/upload/gallery');
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $file->move($uploadDir, $filename);

            return response()->json([
                'url' => 'upload/gallery/' . $filename,
            ]);
        }

        return response()->json(['message' => 'Gagal mengupload file'], 400);
    }
}
