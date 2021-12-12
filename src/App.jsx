import React, { useState, useEffect } from "react";
import Products from "./modules/Products";
import Orders from "./modules/Orders";
import OrderDetails from "./components/OrderDetails";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { Container, List, Divider } from '@mui/material';
import Header from "./components/Header";
import Parallax from "./components/Parallax";
import GridContainer from "./components/Grid/GridContainer";
import GridItem from "./components/Grid/GridItem.js";
import ProductsListItem from "./components/ProductsListItem";
import styles from "./assets/jss/material-kit-react/views/mainView.js";
const useStyles = makeStyles(styles);

const App = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState();
  const [message, setMessage] = useState();
  const [viewOrder, setViewOrder] = useState(false);

  useEffect(() => {
    Products.index().then((data) => {
      setProducts(data);
    });
  }, []);

  const addToOrder = (product_id) => {
    if (order) {
      Orders.update(product_id, order.id).then((response) => {
        setOrder(response.order);
        setMessage(response.message);
      });
    } else {
      Orders.create(product_id, 1).then((response) => {
        setOrder(response.order);
        setMessage(response.message);
      });
    }
  };

  const productsList = products.map((product) => {
    return (
      <>
        <ProductsListItem
          product={product}
          addToOrder={addToOrder}
        />
        <Divider variant="inset" component="li" />
      </>
    );
  });

  return (
    <>
      <Header
        brand="Material Kit React"
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />
      <Parallax image={require("./assets/img/bg4.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Material Kit React.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Container maxWidth="sm" className="menuContainer">
          <h1>Slowfood</h1>
          {order && (
            <button data-cy="view-order" onClick={() => setViewOrder(!viewOrder)}>
              {viewOrder ? "Hide Order" : "View Order"}
            </button>
          )}
          <h3 data-cy="message-box">{message}</h3>
          {viewOrder ? (
            <OrderDetails order={order} />
          ) : (
            <List
              data-cy="product-list"
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {productsList}
            </List>
          )}
        </Container>
      </div>
    </>
  );
};

export default App;
