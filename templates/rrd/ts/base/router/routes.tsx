/* eslint-disable react-refresh/only-export-components */
// TODO: Disable this rule after the initial setup
const Home = () => <div>Home Page</div>;
const NotFound = () => <div>404 - Not Found</div>;

export const routeConfig = [
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
];
