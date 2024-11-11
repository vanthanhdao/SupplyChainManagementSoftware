"use client"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import useTechProductStore from '@/app/zustands/useTechProductStore';


export default function ChartUserByCountry() {
  const {images,specifications} = useTechProductStore();
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
        Technical Specifications  
        </Typography>
        <div>
      <h1>Images: {images}</h1>
      <h2>Specifications: {specifications}</h2>
    </div>
      </CardContent>
    </Card>
  );
}
