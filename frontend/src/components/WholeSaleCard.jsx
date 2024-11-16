import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function WholeSaleCard({pkg}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="70"
          image="https://www.spectrumchemical.com/media/catalog/category/chemicals_fine-chemicals-in-bulk.png"
          alt="green iguana"
        />
        <CardContent>
          <div className='flex justify-between'>
          <Typography gutterBottom variant="h5" component="div">
            {pkg.packageName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            ${pkg.price}
          </Typography>
          </div>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {pkg.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
