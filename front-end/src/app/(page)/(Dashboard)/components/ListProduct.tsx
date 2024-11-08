import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
} from '@mui/x-data-grid';
import { Card, Stack } from '@mui/material';
import { mutate } from 'swr';
import { useGetAccessToken } from '@/app/hook/useAccessToken';
import { getAllProduct } from '@/app/apis/products-api';




interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel} = props;

  const handleClickAddRow = () => {
    setRows((oldRows) => {
      const newId = oldRows.length + 1;
      const updatedRows = [
        ...oldRows,
        {    
          id:newId,
          productId: "",
          productName: "",
          description:"",
          price: "",
          specifications: "",
          categoryId:"",
          categoryName: "",
          images:"",
        },
      ];
  
      // Đặt `setRowModesModel` bên trong để truy cập `newId`
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'productName' },
      }));
  
      return updatedRows;
    });
  };


  const handleClickRefresh = async () => {
    const newRows = await getAllProduct();
    
  };


  return (
    <GridToolbarContainer>
    <Stack direction="row" sx={{alignItems:'center',justifyContent:'space-between',width: "100%"}}>
        <Stack direction="row"  > 
            <Box >
        <GridToolbar /> 
            </Box>
        <Button color="primary"sx={{mt:0.5,mr:2}} size='small' startIcon={<AddIcon />} onClick={handleClickAddRow}>
        Add
      </Button>
      <Button color="primary" sx={{mt:0.5,mr:2}} size='small' startIcon={<SaveIcon />} >
        Save
      </Button>
      <Button color="primary" sx={{mt:0.5}} size='small' startIcon={<RefreshIcon />} onClick={handleClickRefresh}>
        Refresh
      </Button>
        </Stack>
        <GridToolbarQuickFilter/>
    </Stack>
    </GridToolbarContainer>
  );
}

interface IProps {
    dataProducts: IDataProduct[];
  }

export default function ListProduct(props: IProps) {
  const [rows,setRows] = React.useState<GridRowsProp>([])
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const {dataProducts} =props;

  React.useEffect(() =>{
  const dataRows: GridRowsProp = dataProducts.map((item, index) => ({
    id: index+1,
    productId: item.ProductId,
    productName: item.ProductName,
    description: item.Description,
    price: item.Price,
    specifications: item.Specifications,
    categoryId:item.CategoryId,
    categoryName: item.CategoryName,
    images: item.Images,
  }));
  setRows(dataRows);
},[dataProducts]);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
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
    const newRows = rows.filter((row) => row.id !== id).map((row,index) =>({
      ...row,
      id: index+1
    }))
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
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'NO.',  type: 'number', width: 100,  align: 'left',
      headerAlign: 'left',},
    { field: 'productName', headerName: 'Product Name',  type: 'string', width: 100, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'images',
      headerName: 'Images',
      width: 100,
      editable: true,
      type: 'custom',
    },
    {
      field: 'specifications',
      headerName: 'Specifications',
      width: 180,
      editable: true,
      type: 'string',
    },
    {
      field: 'categoryName',
      headerName: 'Category Name',
      width: 100,
      editable: true,
      type: 'string',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
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
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Card>
  );
}
