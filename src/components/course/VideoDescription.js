import moment from "moment";
import React from "react";

const VideoDescription = ({ video }) => {
  const { title, description, createdAt } = video;
  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {moment.utc(createdAt).format("DD MMMM YYYY")}
      </h2>

      <div className="flex gap-4">
        <a
          href="#"
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          এসাইনমেন্ট
        </a>

        <a
          href="./Quiz.html"
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          কুইজে অংশগ্রহণ করুন
        </a>
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
    </div>
  );
};

export default VideoDescription;
