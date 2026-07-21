import React from "react";
import { POSTIT_COLORS, getRotation } from "../constants/colors";

export default function PostItSkeleton({ count = 1, startIndex = 0 }) {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, index) => {
        const itemIndex = startIndex + index;
        const color = POSTIT_COLORS[itemIndex % POSTIT_COLORS.length];
        const rotation = getRotation(itemIndex);

        return (
          <div
            key={index}
            className="cardo sm:w-[200px] w-[150px] sm:h-[200px] h-[150px] animate-pulse"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div
              className="inside sm:h-[200px] h-[150px] relative sm:w-[200px] w-[150px] shadow-xl px-3 pt-3 flex flex-col justify-between rounded-sm"
              style={{ backgroundColor: color }}
            >

            </div>
          </div>
        );
      })}
    </>
  );
}
