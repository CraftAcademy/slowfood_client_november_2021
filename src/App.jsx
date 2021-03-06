import React, { useState, useEffect } from "react";
import Products from "./modules/Products";
import Orders from "./modules/Orders";
import OrderDetails from "./components/OrderDetails";

const App = () => {
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
      <div key={product.id}>
        {product.name} - {`${product.price} kr `}
        <button
          data-cy="add-to-order-button"
          onClick={() => addToOrder(product.id)}
        >
          Add to Order
        </button>
      </div>
    );
  });

  return (
    <>
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
        <div data-cy="product-list">{productsList}</div>
      )}
    </>
  );
};

export default App;
