import {Navigate, Outlet } from "react-router-dom";
import Login from "./Login/Login";
const useAuth = () => {
    const user = { loggedIn :true};
    return user && user.loggedIn;

};
const ProtectedRoutes =() =>{
    const isAuth = useAuth();
    return isAuth ? <Outlet /> :<Navigate to="/" />
};
export default ProtectedRoutes;