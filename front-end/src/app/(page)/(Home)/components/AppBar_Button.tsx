import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDeleteEth,deployContract, useGetBlockByAllEvent, useGetBlockByOneEvent } from "@/app/hook/useEthereum";


const AppBar_Button = () => {

    const router = useRouter();
    
    return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Button  onClick={deployContract} variant="text" color="info" size="small">
        Deploy Smart Contract
       </Button>
       <Button
         variant="text"
         color="info"
         size="small"
         onClick={useDeleteEth}
       >
         Delete Eth
       </Button>
       <Button variant="text" onClick={()=>useGetBlockByAllEvent()} color="info" size="small">
        View Blocks All Event
       </Button>
       <Button variant="text" color="info" onClick={()=>useGetBlockByOneEvent("StoreUserSignUp")} size="small">
       View Blocks Users Event
       </Button>
       <Button
         variant="text"
         color="info"
         size="small"
         sx={{ minWidth: 0 }}
         // onClick={useGetBlockByHash}
         onClick={()=>useGetBlockByOneEvent("StoreUserSession")}
       >
          View Blocks UserSession Event
       </Button>
       </Box>
    )
  };

  export default AppBar_Button;