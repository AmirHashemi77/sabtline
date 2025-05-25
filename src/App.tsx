import ThemeInit from "./components/layout/ThemeInit";
import ClientQueryProvider from "./provider/ClientQueryProvider";
import ClientSnackbarProvider from "./provider/ClientSnackbarProvider";
import ReduxProvider from "./provider/ReduxProvider";
import RoutesComponet from "./Routes/RoutesComponet";
import Header from "./components/layout/header/Header";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <ClientQueryProvider>
        <ClientSnackbarProvider>
          <ReduxProvider>
            {/*<ProtectRouteProvider>*/}
            <main className="h-[100%] min-h-screen">
              <ThemeInit />
              <Header />
              <div className="w-full mx-auto pt-14">
                <RoutesComponet />
              </div>
            </main>
            <Footer />
            {/*</ProtectRouteProvider>*/}
          </ReduxProvider>
        </ClientSnackbarProvider>
      </ClientQueryProvider>
    </BrowserRouter>
  );
}

export default App;
