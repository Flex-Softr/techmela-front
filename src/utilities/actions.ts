"use server";
import { revalidateTag } from "next/cache";
import { TTags } from "./serverSideFetcher";

export async function refetchData(tag: TTags | TTags[]) {
  if (Array.isArray(tag)) {
    tag.forEach((t) => revalidateTag(t));
  } else {
    revalidateTag(tag);
  }
}
