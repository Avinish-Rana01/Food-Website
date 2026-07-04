const Shimmer = () => {
  // You can easily change this number to render more or fewer cards!
  const shimmerCardCount = 20;

  return (
    <div className="Shimmer-container">
      {/* Create an array of 20 elements and map over them */}
      {Array.from({ length: shimmerCardCount }).map((_, index) => (
        <div key={index} className="Shimmer-card">
          <div className="img-shimmer-card"></div>
          <div className="Shimmer-meta">
            <span className="Shimmer-rating"></span>
            <span className="Shimmer-cost"></span>
          </div>
        </div>
      ))}
    </div>
  );
};
  
export default Shimmer;
