import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Notification from './components/UI/Notification';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // method 2 if you move actions into redux
  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);

  useEffect(() => {
    // this approach allows the set up in the component, I have also moved it into the cart-slice

    // const sendCartData = async() => {
    //   dispatch(uiActions.showNotification({ 
    //     status: 'pending',
    //     title: 'Sending',
    //     message: 'Sending cart data...'
    //     })
    //   );
    //   const response = await fetch('https://redux-backend-ba488-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
    //     // put overrides existing data where as post adds in a list
    //     method: 'PUT',
    //     body: JSON.stringify(cart)
    //   });
    //   if(!response.ok) {
    //     throw new Error('Sending cart data failed.')
    //   }

    //   dispatch(uiActions.showNotification({ 
    //     status: 'success',
    //     title: 'Success!',
    //     message: 'Sent cart data successfully!'
    //     })
    //   );
    // };

    // // prevents sendCartData executing on page load
    if(isInitial) {
      isInitial = false;
      return;
    };

    if(cart.changed) {
      dispatch(sendCartData(cart));
    };

    // sendCartData().catch(error => {
    //   dispatch(uiActions.showNotification({
    //     status: 'error',
    //     title: 'Error',
    //     message: 'Sending cart data failed.'
    //   }))
    // });
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification 
        status={notification.status} 
        title={notification.title} 
        message={notification.message} 
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
