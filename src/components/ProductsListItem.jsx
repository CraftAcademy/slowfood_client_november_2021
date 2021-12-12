import React from 'react';
import { Button, ListItem, ListItemText, Typography, IconButton }
  from '@mui/material';

const ProductsListItem = ({ product, addToOrder }) => {
  return (
    <ListItem
      data-cy="product-item"
      alignItems="flex-start"
      key={product.id}
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <Button
            size="small"
            variant="contained"
            data-cy="add-to-order-button"
            onClick={() => addToOrder(product.id)}
          >
            Add to Order
          </Button>
        </IconButton>
      }
    >
      <ListItemText
        primary={`${product.name} - ${product.price} kr`}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Best dish in town!
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default ProductsListItem;
