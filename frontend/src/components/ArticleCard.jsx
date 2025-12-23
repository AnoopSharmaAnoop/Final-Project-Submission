import { useState, useMemo } from "react";
import parse from "html-react-parser";

const ArticleCard = ({ article, index }) => {
  const [expanded, setExpanded] = useState(false);
  // Default to Enhanced if available, otherwise Original
  const [showEnhanced, setShowEnhanced] = useState(!!article.enhanced_content);

  const hasEnhanced = !!article.enhanced_content;
  
  // --- FIX: Helper to strip <html>, <head>, <body> tags ---
  const cleanHTML = (html) => {
    if (!html) return "";
    return html
      .replace(/<!DOCTYPE html>/gi, "")       // Remove DOCTYPE
      .replace(/<html[^>]*>/gi, "")           // Remove <html> opening
      .replace(/<\/html>/gi, "")              // Remove </html> closing
      .replace(/<head>[\s\S]*?<\/head>/gi, "") // Remove <head> and everything in it
      .replace(/<body[^>]*>/gi, "")           // Remove <body> opening
      .replace(/<\/body>/gi, "");             // Remove </body> closing
  };

  // Decide which content to show & clean it
  const displayContent = showEnhanced && hasEnhanced 
    ? cleanHTML(article.enhanced_content) 
    : article.content;

  const readingTime = useMemo(() => {
    const text = displayContent || "";
    // Strip tags to count words accurately
    const words = text.replace(/<[^>]+>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  }, [displayContent]);

  const categoryColor = useMemo(() => {
    const colors = [
      "bg-blue-50 text-blue-700 border-blue-100",
      "bg-purple-50 text-purple-700 border-purple-100",
      "bg-emerald-50 text-emerald-700 border-emerald-100",
      "bg-orange-50 text-orange-700 border-orange-100"
    ];
    return colors[article.id % colors.length];
  }, [article.id]);

  return (
    <div 
      className="group relative flex flex-col bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm rounded-2xl hover:shadow-md transition-all duration-300 overflow-hidden opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70" />

      <div className="p-7 flex-1">
        <div className="flex justify-between items-center mb-5">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor}`}>
            Tech & AI
          </span>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
             {/* Show a magic icon if viewing AI content */}
            {showEnhanced && hasEnhanced && <span>✨ AI-Enhanced</span>}
            <span>• {readingTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {/* --- THE TOGGLE SWITCH --- */}
        {hasEnhanced && (
          <div className="flex bg-gray-100 p-1 rounded-lg mb-4 w-fit">
            <button
              onClick={() => setShowEnhanced(false)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${!showEnhanced ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Original
            </button>
            <button
              onClick={() => setShowEnhanced(true)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${showEnhanced ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
            >
              ✨ AI Version
            </button>
          </div>
        )}

        <div className={`text-gray-600 prose prose-sm max-w-none transition-all duration-500 ${expanded ? "" : "line-clamp-3 mask-image-fade"}`}>
          {parse(displayContent || "<p>No content available</p>")}
        </div>
      </div>

      <div className="px-7 py-5 mt-auto border-t border-gray-100 bg-gray-50/30">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 bg-white border border-gray-200 hover:border-blue-200 rounded-xl shadow-sm hover:shadow transition-all"
        >
          {expanded ? "Collapse Article" : "Read Full Article"}
        </button>
      </div>
    </div>
  );
};
export default ArticleCard;