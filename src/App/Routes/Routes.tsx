import { Suspense, lazy } from "react";
import ROUTE_URl from "./constants";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../../pages/Home"));

type TRouteCmpt = {
  HomeCmpt?: typeof Home;
};
const RoutesCmpt = ({ HomeCmpt = Home }: TRouteCmpt) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index path={ROUTE_URl.HOME} element={<HomeCmpt />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesCmpt;
