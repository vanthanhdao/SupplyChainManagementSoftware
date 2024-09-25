"use client";

import useSWR from "swr";
import AppTable from "../components/AppTable";
import { Button, Typography } from "@mui/material";
import AddFormDialog from "../components/AddFromDialog";

export default function BlogPage() {
  // Dùng useSWR để lưu data khi gọi api 1 lần duy nhất
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://stgwss-8000.csb.app/blogs",
    // "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  // Dùng fetch thông thường thì mỗi lần navigate sẽ gọi lại api nhiều lần (phiền)
  // React.useEffect(() => {
  //     const fetchData = async () => {
  //         const res = await fetch("http://localhost:8000/blogs");
  //         const data = await res.json();
  //         console.log(data);
  //     }
  //     fetchData();
  // });

  return (
    <>
      <div className="flex justify-between items-center px-24 py-10">
        <Typography>BLOG PAGE</Typography>
        <AddFormDialog />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-between px-24">
        <AppTable blogs={data} />
      </div>
    </>
  );
}
