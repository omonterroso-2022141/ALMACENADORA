import { Agenda } from "./Pages/Agenda/Agenda.jsx"
import { Auth } from "./Pages/Auth/Auth.jsx"
import { Dashboard } from "./Pages/Dashboard/Dashboard.jsx"
import { UserEdit } from "./components/UserEdit.jsx"

export const routes = [
    {path: '', element: <Auth/>},
    {path: '/auth', element: <Auth/>},
    {path: '/agenda', element: <Agenda />},
    {path: '/editUser', element: <UserEdit />},
    {path: '/*', element: <Dashboard/>}
]
