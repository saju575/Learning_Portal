import React from "react";
import style from "./PlayerLoader.module.css";

const PlayerLoader = () => {
  return (
    <div className={style.videoPlayerContainer}>
      <div className={style.videoPlayerSkeleton}></div>
      <div className={style.videoDescriptionSkeleton}>
        <div className={style.videoTitleSkeleton}></div>
        <div className={style.videoAuthorSkeleton}></div>
        <div className={style.videoDescriptionTextSkeleton}></div>
        <div className={style.videoDescriptionTextSkeleton}></div>
        <div className={style.videoDescriptionTextSkeleton}></div>
        <div className={style.videoDescriptionTextSkeleton}></div>
      </div>
    </div>
  );
};

export default PlayerLoader;
