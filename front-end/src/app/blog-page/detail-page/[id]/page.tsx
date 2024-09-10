"use client";
import { useParams } from "next/navigation";
import useSWR, { mutate } from "swr";

export default function DetailPage() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const params = useParams();
  console.log(params.id);
  const { data, error, isLoading } = useSWR(
    `https://g6gzvn-8000.csb.app/blogs/${params.id}`,
    // "http://localhost:8000/blogs",
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Title: {data.title}</h1>
      <h1>Content: {data.content}</h1>
      <h1>Author: {data.author}</h1>
    </div>
  );
}
