import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Card, Stack } from "@mui/material";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import { getAllCategory } from "@/app/apis/categories-api";
import { updateRecordProduct } from "@/app/apis/products-api";
import { updateRecordShipping } from "@/app/apis/shipping-api";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

interface IProps {
  dataShippings: IDataShipping[];
}

export default function ListShippingMethodEdit(props: IProps) {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [tempRows, setTempRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { dataShippings } = props;

  //   const fetcher = async () => await getAllCategory();
  //   const { data } = useSWR(
  //     `${process.env.NEXT_PUBLIC_API_URL}/categories`,
  //     fetcher
  //   );

  React.useEffect(() => {
    const dataRows: GridRowsProp = dataShippings.map((item, index) => ({
      id: index + 1,
      shippingMethodID: item.ShippingMethodID,
      shippingMethodName: item.ShippingMethodName,
      description: item.Description,
      shippingCost: item.ShippingCost,
      deliveryTimeEstimate: item.DeliveryTimeEstimate,
      maxWeight: item.MaxWeight,
      applicableRegion: item.ApplicableRegion,
      paymentMethod: item.PaymentMethod,
      active: item.Active,
      isNew: false,
      activeRow: null,
    }));
    setRows(dataRows);
  }, [dataShippings]);

  const EditToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props;

    const handleClickAddRow = () => {
      setRows((oldRows) => {
        const newId = oldRows.length + 1;
        const updatedRows = [
          ...oldRows,
          {
            id: newId,
            shippingMethodID: uuidv4(),
            shippingMethodName: "",
            description: "",
            shippingCost: "",
            deliveryTimeEstimate: "",
            maxWeight: "",
            applicableRegion: "",
            paymentMethod: "",
            active: "True",
            isNew: true,
            activeRow: null,
          },
        ];

        setRowModesModel((oldModel) => ({
          ...oldModel,
          [newId]: { mode: GridRowModes.Edit, fieldToFocus: "shippingName" },
        }));

        return updatedRows;
      });
    };

    const handleClickRefresh = async () => {
      await mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/shipping-methods`,
        false
      );
      setTempRows([]);
    };

    const handleClickSave = async () => {
      try {
        // Handle updateRecordShipping
        await updateRecordShipping(tempRows);
      } catch (error) {
        throw new Error(`HandleClickSave failed - ${error}`);
      }
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
          <Stack direction="row">
            <Box>
              <GridToolbar />
            </Box>
            <Button
              color="primary"
              sx={{ mt: 0.5, mr: 2 }}
              size="small"
              startIcon={<AddIcon />}
              onClick={handleClickAddRow}
            >
              Add
            </Button>
            <Button
              color="primary"
              sx={{ mt: 0.5, mr: 2 }}
              size="small"
              startIcon={<SaveIcon />}
              onClick={handleClickSave}
            >
              Save
            </Button>
            <Button
              color="primary"
              sx={{ mt: 0.5 }}
              size="small"
              startIcon={<RefreshIcon />}
              onClick={handleClickRefresh}
            >
              Refresh
            </Button>
          </Stack>
          <GridToolbarQuickFilter />
        </Stack>
      </GridToolbarContainer>
    );
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const findRowById = rows.find((row) => row.id === id);
    if (!findRowById) return;
    if (findRowById?.isNew) {
      const findRowDiverseId = tempRows.filter((row) => row.id !== id);
      setTempRows(findRowDiverseId);
    } else {
      const newTempRows = tempRows.filter(
        (row) => row.shippingMethodID !== findRowById?.shippingMethodID
      );
      const rowDelete = {
        ...findRowById,
        activeRow: "delete",
      };
      setTempRows(() => [...newTempRows, rowDelete]);
    }

    const newRows = rows
      .filter((row) => row.id !== id)
      .map((row, index) => ({
        ...row,
        id: index + 1,
      }));
    setRows(newRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {
      ...newRow,
    };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    const findRow = tempRows.find(
      (row) => row.shippingMethodID === newRow.shippingMethodID
    );
    if (tempRows.length > 0 && findRow) {
      const newTempRows = tempRows.map((row) => {
        if (row.shippingMethodID === newRow.shippingMethodID) {
          return {
            ...row,
            shippingMethodName: newRow.shippingMethodName,
            description: newRow.description,
            shippingCost: newRow.shippingCost,
            deliveryTimeEstimate: newRow.deliveryTimeEstimate,
            maxWeight: newRow.maxWeight,
            applicableRegion: newRow.applicableRegion,
            paymentMethod: newRow.paymentMethod,
            active: newRow.active,
          };
        }
        return row;
      });
      setTempRows(newTempRows);
    } else setTempRows((oldArray) => [...oldArray, updatedRow]);

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "NO.",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "shippingMethodName",
      headerName: "Shipping Name",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "shippingCost",
      headerName: "Shipping Cost",
      type: "number",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "deliveryTimeEstimate",
      headerName: "Delivery Time Estimate",
      width: 180,
      editable: true,
      type: "custom",
    },
    {
      field: "maxWeight",
      headerName: "Max Weight",
      width: 180,
      editable: true,
      type: "string",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "applicableRegion",
      headerName: "Applicable Region",
      width: 180,
      editable: true,
      type: "string",
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: 180,
      editable: true,
      type: "string",
    },
    {
      field: "active",
      headerName: "Active Status",
      width: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: ["True", "False"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Card>
  );
}
