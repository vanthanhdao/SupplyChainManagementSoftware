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
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Card, Link, Stack } from "@mui/material";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import { getAllCategory } from "@/app/apis/categories-api";
import { updateRecordProduct } from "@/app/apis/products-api";
import ExpandableCell from "./ExpandableCell";
import ExpandableCellImages from "./ExpandableCellImages";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

interface IProps {
  dataProducts: IDataProduct[];
}

export default function ListProductEdit(props: IProps) {
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [tempRows, setTempRows] = React.useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const { dataProducts } = props;

  const fetcher = async () => await getAllCategory();
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher
  );

  React.useEffect(() => {
    const dataRows: GridRowsProp = dataProducts.map((item, index) => ({
      id: index + 1,
      productId: item.ProductId,
      productName: item.ProductName,
      description: item.Description,
      price: Number(item.Price),
      specifications: item.Specifications,
      categoryId: item.CategoryId,
      categoryName: item.CategoryName,
      images: item.Images,
      isNew: false,
      active: null,
    }));
    setRows(dataRows);
  }, [dataProducts, data]);

  const EditToolbar = (props: EditToolbarProps) => {
    const { setRows, setRowModesModel } = props;

    const handleClickAddRow = () => {
      setRows((oldRows) => {
        const newId = oldRows.length + 1;
        const updatedRows = [
          ...oldRows,
          {
            id: newId,
            productId: uuidv4(),
            productName: "",
            description: "",
            price: "",
            specifications: "",
            categoryId: "",
            categoryName: "",
            images: "",
            isNew: true,
            active: null,
          },
        ];

        setRowModesModel((oldModel) => ({
          ...oldModel,
          [newId]: { mode: GridRowModes.Edit, fieldToFocus: "productName" },
        }));

        return updatedRows;
      });
    };

    const handleClickRefresh = async () => {
      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/products`, false);
      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/categories`, false);
      setTempRows([]);
    };

    const handleClickSave = async () => {
      try {
        // Handle updateRecordProduct
        console.table(tempRows);
        await updateRecordProduct(tempRows);
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
        (row) => row.productId !== findRowById?.productId
      );
      const rowDelete = {
        ...findRowById,
        active: "delete",
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
    const findCategoryNameById = data?.find(
      (item) => item.CategoryId === newRow.categoryName
    );
    const updatedRow = {
      ...newRow,
      categoryId: newRow.categoryName,
      categoryName: findCategoryNameById?.CategoryName,
    };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    const findRow = tempRows.find((row) => row.productId === newRow.productId);
    if (tempRows.length > 0 && findRow) {
      const newTempRows = tempRows.map((row) => {
        if (row.productId === newRow.productId) {
          return {
            ...row,
            productName: newRow.productName,
            description: newRow.description,
            price: newRow.price,
            images: newRow.images,
            specifications: newRow.specifications,
            categoryId: newRow.categoryName,
            categoryName: findCategoryNameById?.CategoryName,
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
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "productName",
      headerName: "Product Name",
      type: "string",
      width: 180,
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 180,
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "images",
      headerName: "Images",
      align: "center",
      width: 300,
      editable: true,
      type: "custom",
      renderCell: (params: GridRenderCellParams) => (
        <ExpandableCellImages {...params} />
      ),
    },
    {
      field: "specifications",
      headerName: "Specifications",
      width: 400,
      editable: true,
      renderCell: (params: GridRenderCellParams) => (
        <ExpandableCell {...params} />
      ),
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 180,
      editable: true,
      type: "singleSelect",
      renderCell: (params) => (
        <Box
          sx={{
            p: 3,
          }}
        >
          {params.value}
        </Box>
      ),
      valueOptions: Array.isArray(data)
        ? data.map((item) => ({
            value: item.CategoryId,
            label: item.CategoryName,
            id: item.CategoryId,
          }))
        : [],
      getOptionValue: (option: any) => option.id,
      getOptionLabel: (option: any) => option.label,
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
    <Card
      variant="outlined"
      sx={{ width: "100%", height: 1000, overflow: "auto" }}
    >
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
        getEstimatedRowHeight={() => 100}
        getRowHeight={() => "auto"}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </Card>
  );
}
