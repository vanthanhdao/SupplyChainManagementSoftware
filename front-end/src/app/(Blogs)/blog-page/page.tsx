"use client";
import useSWR from "swr";
import AppTable from "../components/AppTable";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddFormDialog from "../components/AddFromDialog";
import Container from '@mui/material/Container';
import { rows } from "@/app/(Dashboard)/internals/data/gridData";

export default function BlogPage() {
  // Dùng useSWR để lưu data khi gọi api 1 lần duy nhất
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
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
    <Container
    id="home"
    sx={{
      py: { xs: 8, sm: 16 }
    }}
  >
     <Box sx={{ 
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"space-between"
      }} >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          BLOG PAGE
        </Typography>
        {/* <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 } }}
        > */}
            <AddFormDialog />
        {/* </Typography> */}
      </Box>
      <div className="flex min-h-screen flex-col items-center justify-between px-24">
        <AppTable blogs={data} />
      </div>
    </Container>
  );
}
