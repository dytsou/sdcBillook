import Navbar from "./Navbar";
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <Navbar />
            <div className="w-10/12 mx-auto my-24">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;