import HomePage from "./pages/Homepage";
import History from "./pages/CaculatorHistory";
interface RouteConfig {
    path: string;
    element: React.FC;
}

const routes: RouteConfig[] = [
    { path: '/', element: HomePage },
    { path: '/history', element: History },
];

export default routes;