import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import UserNav from "./components/UserNav/UserNav";

export function User() {
  return (
    <div className="d-flex flex-fill p-20">
        <UserNav/>
            <div className="d-flex flex-column flex-fill">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}