import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routeConfig } from "./routes.tsx";

// TODO: Add AppRouter to the main application entry point
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  </BrowserRouter>
);
