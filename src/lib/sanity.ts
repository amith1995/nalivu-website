import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-01",
  useCdn: true, // Use CDN for faster response times
});

const builder = (createImageUrlBuilder as any)(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getSanityData(query: string) {
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}
