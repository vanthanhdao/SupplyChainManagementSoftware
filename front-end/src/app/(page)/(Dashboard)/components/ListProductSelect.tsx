import * as React from 'react';
import { DataGrid, GridColDef, GridEventListener, GridRowsProp, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarQuickFilter,GridRowSelectionModel  } from '@mui/x-data-grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { Card, Stack } from '@mui/material';
import useTechProductStore from '@/app/zustands/useTechProductStore';
import useDetailOrderStore from '@/app/zustands/useDetailOrderStore';



interface IProps {
    dataProducts: IDataProduct[];
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'NO.',  type: 'number', width: 50,  align: 'left',
      headerAlign: 'left',},
    { field: 'productName', headerName: 'Product Name',  type: 'string', width: 100, editable: true },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      width: 150,
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
      field: 'categoryName',
      headerName: 'Category Name',
      width: 150,
      editable: true,
      type: 'string',
    }
  ];


export default function ListProductSelect(props: IProps) {
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);
  const [rows,setRows] = React.useState<GridRowsProp>([])
  const {dataProducts} =props;
  const {setTechProductState} = useTechProductStore();
  const {setSelectedRowState} = useDetailOrderStore();

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


  const CustomToolbar =()=> {
    return (
      <GridToolbarContainer>
        <Stack direction="row" sx={{alignItems:'center',justifyContent:'space-between',width: "100%"}}>
        <FormControlLabel
          label=""
          control={
            <Switch
              checked={checkboxSelection}
              onChange={(event) => setCheckboxSelection(event.target.checked)}
            />
          }
        />
        <GridToolbarColumnsButton/>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarQuickFilter/>
        </Stack>
      </GridToolbarContainer>
    );
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) =>{
    setTechProductState(params.row.images,params.row.specifications)  
  };


  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    // Filter the rows based on selected row ids
    const newFilteredRows = rows.filter((item) =>
        selectionModel.includes(item.id)
      );
      const newSelectesRow: DetailOrder[] = newFilteredRows.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
      }));
      setSelectedRowState(newSelectesRow)
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          slots={{
            toolbar: CustomToolbar,
          }}
          onRowClick={handleRowClick}
          onRowSelectionModelChange={handleSelectionChange}
        />
    </Card>
  );
}