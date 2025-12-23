const ArticleSkeleton = ({ index }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-4 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="h-7 w-3/4 bg-gray-200 rounded"></div>
      <div className="space-y-2 pt-2">
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
export default ArticleSkeleton;