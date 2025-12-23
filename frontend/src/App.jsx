import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar"; // Import the new SearchBar
import ArticleCard from "./components/ArticleCard";
import ArticleSkeleton from "./components/ArticleSkeleton";
import EmptyState from "./components/EmptyState";

const API_URL = "http://127.0.0.1:8000/api/articles";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data.data ? response.data.data : response.data;
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Modern Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-purple-100/40 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-teal-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Header />
        
        {/* Add the Search Bar here 
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />*/}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <ArticleSkeleton key={index} index={index} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex items-center justify-between mb-8 px-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <p className="text-sm font-medium text-gray-500">
                Found <span className="text-gray-900">{filteredArticles.length}</span> results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </>
        )}

        <footer className="mt-12 text-center text-sm text-gray-400 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <p>© 2025 AI Dashboard • Built with Laravel & React</p>
        </footer>
      </div>
    </div>
  );
};

export default App;