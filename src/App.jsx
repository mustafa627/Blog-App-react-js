import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { Bounce, ToastContainer } from "react-toastify";
import Blogs from "./pages/Blogs";
import Private from "./Routes/Private";
import Auth from "./Routes/AuthRoute";
import Myblogs from "./pages/Myblogs";
import CreateBlogs from "./pages/CreateBlogs";
import NotFound from "./pages/NotFound";
import EditBlog from "./pages/EditBlog";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoutes from "./Routes/Adminroutes";
import AllUsers from "./pages/admin/AllUsers";
import AllData from "./pages/admin/AllData";
import DashboardLayoutBasic from "./CMP/AdminLayout";
function App() {
  return (
    <>
      <Routes>
        {/* Auth Route */}
        <Route element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* private routes */}
        <Route element={<Private />}>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myblogs" element={<Myblogs />} />
          <Route path="/createblogs" element={<CreateBlogs />} />
          <Route path="/updateblogs/:id" element={<EditBlog />} />
          <Route path="*" element={<NotFound />} />
        </Route>

       
      <Route element={<AdminRoutes />}>
          <Route  path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/users" element={<AllUsers />} />
          <Route path="/dashboard/admin/alldata" element={<AllData />} /> 
        <Route path="*" element={<NotFound />} />
      </Route>
   
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
