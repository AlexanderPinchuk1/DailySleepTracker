import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Statistics from "./views/Statistics";
import GlobalStyle from "./globalStyles"

const AppRoutes = [
    {
        index: true,
        element: <>
            <GlobalStyle />
            <Home />
        </>
    },
    {
        path: '/login',
        element: <>
            <GlobalStyle />
            <Login /></>
    },
    {
        path: '/register',
        element: <>
            <GlobalStyle />
            <Register />
        </>
    },
    {
        path: '/statistics',
        element: <>
            <GlobalStyle $light />
            <Statistics />
        </>
    }
];

export default AppRoutes;
