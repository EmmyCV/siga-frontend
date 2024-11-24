import Horario from "./components/Horario";
import InformacionEstudiantil from "./components/InformacionEstudiantil";
import InformacionAcademica from "./components/InformacionAcademica";

const routes = [
    { path: "/horario", component: Horario },
    { path: "/informacion-estudiantil", component: InformacionEstudiantil },
    { path: "/informacion-academica", component: InformacionAcademica },
];

export default routes;
