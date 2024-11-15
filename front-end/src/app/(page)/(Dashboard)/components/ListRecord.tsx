"use client";
import * as React from "react";
import {  Card, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import useSWR from "swr";
import { getListAccount } from "@/app/apis/index-api";
import { useGetUserInfo } from "@/app/hook/useEthereum";


  const columns: GridColDef[] = [
    { 
        field: 'id',
         headerName: 'NO.',
         type: 'string',
          width: 100, 
    },
    {
      field: 'blockNumber',
      headerName: 'Block Number',
      type: 'string',
      width: 100,
    },
    {
        field: 'blockHash',
        headerName: 'Block Hash',
        headerAlign:'center',
        type: 'string',
        width: 200,
      },
    {
        field: 'action',
        headerName: 'Action',
        type: 'string',
        width: 150,
    },
    {
        field: 'data',
        headerName: 'Data',
        type: 'string',
        width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 200,
  },
  {
    field: 'nameCompany',
    headerName: 'Name Company',
    type: 'string',
    width: 200,
},
    {
        field: 'eventName',
        headerName: 'Event Block Name',
        type: 'string',
        width: 150,
    },
    {
        field: 'isLogin',
        headerName: 'IsLogin',
        type: 'string',
        width: 100,
    },
    {
        field: 'timeStamp',
        headerName: 'TimeStamp',
        type: 'string',
        width: 200,
    },

    // {
    //   field: 'contract',
    //   headerName: 'Contract Type',
    //   type: 'singleSelect',
    //   valueOptions: ['full time', 'part time', 'intern'],
    //   width: 150,
    //   headerClassName: 'bold-header',
    // },
  ];

  interface IProps {
    dataSession: IDataBlockByOneEvent[];
  }

const ListRecord =  (props: IProps) => {  
    const [rows,setRows] = React.useState<GridRowsProp>([])
    const {dataSession} =props;


    const ConvertTimeStamp = (timeStamp:number)=>{
        const date = new Date(Number(timeStamp) * 1000);
        const formattedDate = date.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
        return formattedDate
       }
       
       const dataUserAddress:IUserAddress[] = dataSession.map(item => ({
        address:item.address,
       }))
       const fetcher = async () => await useGetUserInfo(dataUserAddress);
       const { data, error, isLoading } = useSWR(
           `${process.env.NEXT_PUBLIC_API_URL}/users/getByBlock`,
           fetcher,
       );

      const CustomToolbar =()=> {
        return (
          <GridToolbarContainer>
            <Stack direction="row" sx={{alignItems:'center',justifyContent:'space-between',width: "100%"}}>
            <GridToolbar /> 
            {/* <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>    */}
            <GridToolbarQuickFilter/>
            </Stack>
          </GridToolbarContainer>
        );
      }
    

      React.useEffect(() =>{
            const dataRows: GridRowsProp = dataSession.map((item, index) => ({
                id: index+1, 
                blockNumber: item.blockNumber,
                blockHash: item.blockHash,
                action: item.action,
                data: item.data,
                eventName:item.eventName,
                isLogin:item.isLogin,
                email: data ? data[index].email : "",
                nameCompany: data ? data[index].name : "",
                timeStamp:ConvertTimeStamp(item.timeStamp),
              }));
              setRows(dataRows);
       },[dataSession,data]);


  return (

      <Card variant="outlined" sx={{ width: "100%" }}>
      <DataGrid rows={rows} columns={columns} slots={{ toolbar: CustomToolbar }} />
        </Card>
  );
};

export default ListRecord;
