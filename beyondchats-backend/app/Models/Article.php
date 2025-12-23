<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // IMPORTANT: 'enhanced_content' must be in this list!
    protected $fillable = [
        'title', 
        'content', 
        'url', 
        'author_name', 
        'enhanced_content' 
    ];
}