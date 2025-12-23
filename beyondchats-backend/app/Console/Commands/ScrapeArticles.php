<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;

class ScrapeArticles extends Command
{
    // The command you will type in terminal
    protected $signature = 'scrape:run';
    protected $description = 'Scrape oldest articles from BeyondChats';

   public function handle()
{
    $this->info("🚀 Starting Scraper...");

    // 1. Find Last Page
    $baseUrl = 'https://beyondchats.com/blogs/';
    $response = Http::get($baseUrl);
    $crawler = new Crawler($response->body());

    $lastPage = 1;
    try {
        $crawler->filter('.page-numbers, .pagination a')->each(function ($node) use (&$lastPage) {
            if (is_numeric($node->text())) {
                $val = (int)$node->text();
                if ($val > $lastPage) $lastPage = $val;
            }
        });
    } catch (\Exception $e) {}

    $this->info("Found total pages: $lastPage");

    // 2. Loop backwards to collect 5 articles
    $collected = 0;
    $target = 5;
    $currentPage = $lastPage;

    while ($collected < $target && $currentPage >= 1) {
        $url = $baseUrl . 'page/' . $currentPage . '/';
        $this->info("Scanning Page $currentPage ($url)...");

        $response = Http::get($url);
        $pageCrawler = new Crawler($response->body());

        $pageCrawler->filter('article, .post, .type-post, .blog-post')->each(function ($node) use (&$collected, $target) {
            if ($collected >= $target) return;

            try {
                $linkNode = $node->filter('h2 a, h3 a, .entry-title a, .post-title a')->first();
                if ($linkNode->count() > 0) {
                    $title = $linkNode->text();
                    $url = $linkNode->attr('href');
                    
                    $this->info("   Found: $title");
                    $this->scrapeArticleDetails($url, $title);
                    
                    $collected++;
                }
            } catch (\Exception $e) {}
        });

        // Move to previous page if we still need more
        $currentPage--;
    }

    $this->info("\n✅ Scraping Complete! Total saved: $collected");
}
    private function scrapeArticleDetails($url, $title)
    {
        // Check if already saved
        if (Article::where('url', $url)->exists()) {
            $this->warn("   -> Skipped (Already exists)");
            return;
        }

        $response = Http::get($url);
        $detailCrawler = new Crawler($response->body());

        // Extract Content
        try {
            // Common classes for WordPress content
            $content = $detailCrawler->filter('.entry-content, .post-content')->html();
        } catch (\Exception $e) {
            $content = "<p>Content extraction failed.</p>";
        }

        // Extract Author
        $author = "Unknown";
        try {
            // Common classes for author
            if ($detailCrawler->filter('.author-name')->count() > 0) {
                $author = $detailCrawler->filter('.author-name')->text();
            } elseif ($detailCrawler->filter('.post-author a')->count() > 0) {
                $author = $detailCrawler->filter('.post-author a')->text();
            }
        } catch (\Exception $e) {
            // Ignore author error
        }

        // Save to Database
        Article::create([
            'title' => $title,
            'url' => $url,
            'content' => $content,
            'author_name' => $author
        ]);

        $this->info("   -> Saved to Database");
    }
}