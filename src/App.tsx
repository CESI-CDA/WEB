import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./components/AuthProvider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <Header />
        <div className="flex-fill d-flex flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
