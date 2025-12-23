const Header = () => {
  return (
    <div className="text-center mb-12 opacity-0 animate-fade-in">
      <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
        Phase 3 Complete
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
        Content Dashboard
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-gray-600">
        Articles scraped from BeyondChats and served via Laravel.
      </p>
    </div>
  );
};
export default Header;