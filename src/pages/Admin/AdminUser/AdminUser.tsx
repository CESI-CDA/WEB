import { yupResolver } from "@hookform/resolvers/yup";
import { IUser } from "interfaces";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./AdminUser.module.scss";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminUserNav from "./components/AdminUserNav/AdminUserNav";

export function AdminUser() {
  return (
    <div className="d-flex flex-column flex-fill">
      <div className="flex-fill d-flex flex-column">
        <AdminUserNav />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
