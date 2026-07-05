const Shimmer = () => {
  // Number of skeleton cards to show
  const shimmerCardCount = 12;

  return (
    <div className="min-h-screen py-10 flex flex-col items-center bg-[#fcefe7]/50">
      <div className="w-full max-w-7xl px-4 md:px-10">
        
        {/* Skeleton Top Rated Button */}
        <div className="mb-8 flex items-center justify-start ml-2 md:ml-4">
          <div className="h-10 w-56 bg-gray-200/80 rounded-full animate-pulse shadow-sm"></div>
        </div>

        {/* Skeleton Cards Grid */}
        <div className="flex flex-wrap justify-center gap-[30px]">
          {Array.from({ length: shimmerCardCount }).map((_, index) => (
            <div 
              key={index} 
              className="flex flex-col w-[300px] h-[360px] bg-white rounded-3xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              {/* Image Skeleton */}
              <div className="w-full h-[180px] bg-gray-200/80 rounded-2xl animate-pulse mb-4"></div>
              
              {/* Content Skeleton */}
              <div className="flex flex-col gap-3 px-1">
                {/* Title */}
                <div className="h-6 w-3/4 bg-gray-200/80 rounded-lg animate-pulse"></div>
                
                {/* Cuisines */}
                <div className="h-4 w-full bg-gray-200/80 rounded-md animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200/80 rounded-md animate-pulse"></div>

                {/* Meta Details (Rating & Cost) */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/60">
                  <div className="h-5 w-[70px] bg-gray-200/80 rounded-md animate-pulse"></div>
                  <div className="h-5 w-[90px] bg-gray-200/80 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
