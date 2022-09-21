import { BrowserRouter,Routes,Route} from "react-router-dom"
import OrderDetailAdmin from "./component/orderDetailAdmin";
import CartPage from "./page/cart";
import Home from "./page/home";
import HomeAdmin from "./page/homeAdmin";
import OrderAdminPage from "./page/orderAdmin";
import OrderDetailAdminPage from "./page/orderDetailAdmin";



function App() {
  return (
     <BrowserRouter>
           <Routes>
               <Route path="/" element={<Home></Home>}></Route>
               <Route path="/cart" element={<CartPage></CartPage>}></Route>
               <Route path="/admin" element={<HomeAdmin></HomeAdmin>}></Route>
               <Route path="/admin/order" element={<OrderAdminPage></OrderAdminPage>}></Route>
               <Route path="/admin/order/:id" element={<OrderDetailAdminPage></OrderDetailAdminPage>}></Route>



           </Routes>
     </BrowserRouter>
  );
}

export default App;
