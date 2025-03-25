import React from "react";
import "./SkeletonLoader.css";

export default function SkeletonLoader({ count = 5 }) {
  return (
    <div className="skeleton-loader">
      {Array.from({ length: count }, (_, i) => (
        <Container key={i} />
      ))}
    </div>
  );
}

const Container = React.memo(() => (
  <div className="loader-container">
    <div className="wrapper-cell">
      <div className="loader_image animated-background"></div>
      <div className="loader_text">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="loader_text-line animated-background"></div>
        ))}
      </div>
    </div>
  </div>
));
