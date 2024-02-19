import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
import config from "../config";
import Create from "./Create";
import Dashboard from "../Panel/Dashboard";
import Guest from "../Panel/Guest";
import Schedule from "../Panel/Schedule";
import Gallery from "../Panel/Gallery";
import Settings from "../Panel/Settings";
import Basic from "../Panel/Basic";
import UserMiddleware from "../Middleware/User";
import Invitation from "../Invitation";
import Greetings from "../Panel/Greetings";

const UserRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<GoogleOAuthProvider clientId={config.google_client_id}><Login /></GoogleOAuthProvider>} />
            <Route path="/:slug" Component={Invitation} />
            <Route path="/:slug/:code" Component={Invitation} />

            <Route path="/home" element={<UserMiddleware><Home /></UserMiddleware>} />
            <Route path="/create" element={<UserMiddleware><Create /></UserMiddleware>} />

            <Route path="/panel/:id/dashboard" element={<UserMiddleware><Dashboard /></UserMiddleware>} />
            <Route path="/panel/:id/guest" element={<UserMiddleware><Guest /></UserMiddleware>} />
            <Route path="/panel/:id/greetings" element={<UserMiddleware><Greetings /></UserMiddleware>} />
            <Route path="/panel/:id/gallery" element={<UserMiddleware><Gallery /></UserMiddleware>} />
            <Route path="/panel/:id/schedule" element={<UserMiddleware><Schedule /></UserMiddleware>} />
            <Route path="/panel/:id/settings" element={<UserMiddleware><Settings /></UserMiddleware>} />
            <Route path="/panel/:id/basic" element={<UserMiddleware><Basic /></UserMiddleware>} />
        </Routes>
    )
}

export default UserRouter;