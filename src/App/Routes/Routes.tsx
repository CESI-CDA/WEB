import { Suspense, lazy } from "react";
import ROUTE_URl from "./constants";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../../pages/Home"));
const Inscription = lazy(() => import("../../pages/Insciption"));
const Connexion = lazy(() => import("../../pages/Connexion"));

type TRouteCmpt = {
  HomeCmpt?: typeof Home;
  InscriptionCmpt?: typeof Inscription;
  ConnexionCmpt?: typeof Connexion;
};
const RoutesCmpt = ({
  HomeCmpt = Home,
  InscriptionCmpt = Inscription,
  ConnexionCmpt = Connexion,
}: TRouteCmpt) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* <Route path={ROUTE_URl.HOME} element={<HomeCmpt />} /> */}
        <Route path={ROUTE_URl.HOME} element={<HomeCmpt />} />
        <Route path={ROUTE_URl.INSCRIPTION} element={<InscriptionCmpt />} />
        <Route path={ROUTE_URl.CONNEXION} element={<ConnexionCmpt />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesCmpt;
