"use client";
import * as React from "react";
import { Button, Card, Stack } from "@mui/material";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import useSWR, { mutate } from "swr";
import { getListAccount } from "@/app/apis/index-api";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useGetUserInfo } from "@/app/hook/useEthereum";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "NO.",
    type: "string",
    width: 100,
  },
  // {
  //   field: "blockNumber",
  //   headerName: "Block Number",
  //   type: "string",
  //   width: 100,
  // },
  {
    field: "blockHash",
    headerName: "Block Hash",
    headerAlign: "center",
    type: "string",
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    type: "string",
    width: 150,
  },
  {
    field: "data",
    headerName: "Data",
    type: "string",
    width: 700,
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 200,
  },
  {
    field: "nameCompany",
    headerName: "Full Name",
    type: "string",
    width: 200,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    type: "string",
    width: 150,
  },
  {
    field: "taxCode",
    headerName: "ID Card",
    type: "string",
    width: 150,
  },
  // {
  //   field: "isLogin",
  //   headerName: "IsLogin",
  //   type: "string",
  //   width: 100,
  // },
  {
    field: "timeStamp",
    headerName: "TimeStamp",
    type: "string",
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

const ListRecord = (props: IProps) => {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const { dataSession } = props;

  const ConvertTimeStamp = (timeStamp: number) => {
    const date = new Date(Number(timeStamp) * 1000);
    const formattedDate = date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDate;
  };

  const dataUserAddress: IUserAddress[] = dataSession.map((item) => ({
    address: item.address,
  }));
  const fetcher = async () => await useGetUserInfo(dataUserAddress);
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/useGetUserInfo`,
    fetcher
  );

  const CustomToolbar = () => {
    const handleClickRefresh = async () => {
      await mutate(
        `${process.env.NEXT_PUBLIC_GRPC}/useGetBlockByOneEvent`,
        false
      );
      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/useGetUserInfo`, false);
    };
    return (
      <GridToolbarContainer>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* <GridToolbar /> */}
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
          <Button
            color="primary"
            sx={{ mt: 0.5 }}
            size="small"
            startIcon={<RefreshIcon />}
            onClick={handleClickRefresh}
          >
            Refresh
          </Button>
          <GridToolbarQuickFilter />
        </Stack>
      </GridToolbarContainer>
    );
  };

  React.useEffect(() => {
    const dataRows: GridRowsProp = dataSession.map((item, index) => ({
      id: index + 1,
      blockNumber: item.blockNumber,
      blockHash: item.blockHash,
      action: item.action,
      data: item.data,
      eventName: item.eventName,
      isLogin: item.isLogin,
      email: data ? data[index].email : "",
      nameCompany: data ? data[index].nameCompany : "",
      phoneNumber: data ? data[index].phoneNumber : "",
      taxCode: data ? data[index].taxCode : "",
      timeStamp: ConvertTimeStamp(item.timeStamp),
    }));
    setRows(dataRows);
  }, [dataSession, data]);

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowHeight={() => "auto"}
        sx={{
          [`& .${gridClasses.cell}`]: {
            py: 3,
          },
        }}
        slots={{ toolbar: CustomToolbar }}
      />
    </Card>
  );
};

export default ListRecord;
