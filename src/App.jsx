import AppRoutes from "./routes/AppRoutes";
import { Toaster } from 'react-hot-toast';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
   useEffect(() => {

    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });

  }, []);
  return(
    <>
     <Toaster
          position="top-center"
          reverseOrder={false}
          />
    <AppRoutes />
    </>
  );
}

export default App;