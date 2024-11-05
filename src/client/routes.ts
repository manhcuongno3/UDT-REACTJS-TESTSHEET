import HomePage from "./pages/Homepage";

interface RouteConfig {
    path: string;
    element: React.FC;
}

const routes: RouteConfig[] = [
    { path: '/', element: HomePage },
];

export default routes;