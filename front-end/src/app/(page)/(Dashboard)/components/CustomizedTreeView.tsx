"use client"
import * as React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import useDetailOrderStore from '@/app/zustands/useDetailOrderStore';




export default function CustomizedTreeView() {
  const {selectedRows} = useDetailOrderStore();

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Details Order
        </Typography>
          {selectedRows?.map((item,index)=>(
            <div key={index}>
      <h1>Product Name: {item.productName}</h1>
      <h2>Category Name: {item.categoryName}</h2>
      <h2>Price: {item.price}</h2>
      <h2>Quantity: </h2>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
