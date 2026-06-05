"use client";

import { setViewCount } from "@/redux/features/viewers/viewersSlice";
import { useIncrementViewsMutation } from "@/redux/features/viewers/viewsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Eye } from "lucide-react";
import { useEffect } from "react";

type Props = {
  /** MongoDB _id of the blog post or Q&A */
  id: string;
  /** SSR-rendered view count — shown instantly, replaced by live value */
  initialViews: number;
  /** Which backend resource to hit */
  resource: "blog-posts" | "qna";
};

export default function ViewCount({ id, initialViews, resource }: Props) {
  const dispatch = useAppDispatch();

  // Unique key per document stored in Redux
  const key = `${resource}:${id}`;

  // Read from Redux — falls back to SSR value until the API responds
  const liveCount = useAppSelector(
    (state) => state.viewers.counts[key] ?? initialViews
  );

  // RTK Query mutation — fires PATCH /:resource/:id/views
  const [incrementViews] = useIncrementViewsMutation();

  useEffect(() => {
    incrementViews({ resource, id })
      .unwrap()
      .then((res) => {
        // res is the raw successResponse envelope: { success, message, data: { views, ... } }
        const updatedViews = res?.data?.views;
        if (typeof updatedViews === "number") {
          dispatch(setViewCount({ key, count: updatedViews }));
        }
      })
      .catch(() => {
        // Silently keep SSR count on failure
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, resource]);

  return (
    <span
      className="inline-flex items-center gap-1.5"
      title={`${liveCount.toLocaleString()} বার দেখা হয়েছে`}
    >
      <Eye className="h-4 w-4" />
      {liveCount.toLocaleString("bn-BD")}
    </span>
  );
}
