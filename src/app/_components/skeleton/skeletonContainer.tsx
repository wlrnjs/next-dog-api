import React from 'react';
import SkeletonItem from "@/app/_components/skeleton/skeletonItem";
import style from "./skeletonContainer.module.css";

const SkeletonContainer = () => {
  return (
    <div className={style.container}>
      {Array.from({ length: 18 }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  );
};

export default SkeletonContainer;