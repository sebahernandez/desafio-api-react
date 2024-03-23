import { useState, useEffect } from "react";
import { Api } from "./components/Api";
import { Buscador } from "./components/Buscador";
import { Paginacion } from "./components/Paginacion"; // Asegúrate de tener este componente creado
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { FiltroMagnitud } from "./components/FiltroMagnitud";

export const App = () => {
  const [sismos, setSismos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [sismosFiltrados, setSismosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sismosPorPagina] = useState(10);
  const [filtroMagnitud, setFiltroMagnitud] = useState("mayor");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let sortedSismos = [...sismos];
    if (filtroMagnitud === "mayor") {
      sortedSismos.sort((a, b) => b.properties.mag - a.properties.mag);
    } else {
      sortedSismos.sort((a, b) => a.properties.mag - b.properties.mag);
    }

    const filtrados = sortedSismos.filter((sismo) => {
      const textoEnMinuscula = terminoBusqueda.toLowerCase();
      return (
        sismo.properties.place.toLowerCase().includes(textoEnMinuscula) ||
        new Date(sismo.properties.time)
          .toLocaleString()
          .toLowerCase()
          .includes(textoEnMinuscula) ||
        sismo.geometry.coordinates[2]
          .toString()
          .toLowerCase()
          .includes(textoEnMinuscula) ||
        sismo.properties.mag.toString().toLowerCase().includes(textoEnMinuscula)
      );
    });

    setSismosFiltrados(filtrados);
    setPaginaActual(1);
  }, [terminoBusqueda, sismos, filtroMagnitud]);

  const ultimoIndiceSismo = paginaActual * sismosPorPagina;
  const primerIndiceSismo = ultimoIndiceSismo - sismosPorPagina;
  const sismosActuales = sismosFiltrados.slice(
    primerIndiceSismo,
    ultimoIndiceSismo
  );

  const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="App container mt-5">
      <h1 className="my-4">🌎 Últimos Sismos</h1>
      <div className="row">
        <div className="col">
          <Buscador onSearch={setTerminoBusqueda} />
        </div>
        <div className="col">
          <FiltroMagnitud onFiltrarMagnitud={setFiltroMagnitud} />
        </div>
      </div>

      <Api setSismos={setSismos} />
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}
      {!loading && (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th className="bg-dark text-white">Fecha Local</th>
                <th className="bg-dark text-white">Lugar</th>
                <th className="bg-dark text-white">Profundidad (km)</th>
                <th className="bg-dark text-white">Magnitud</th>
              </tr>
            </thead>
            <tbody>
              {sismosActuales.map((sismo) => (
                <tr key={sismo.id}>
                  <td className="text-danger text-center">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                  </td>
                  <td>{new Date(sismo.properties.time).toLocaleString()}</td>
                  <td>{sismo.properties.place}</td>
                  <td>{sismo.geometry.coordinates[2]}</td>
                  <td>{sismo.properties.mag}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginacion
            sismosTotales={sismosFiltrados.length}
            sismosPorPagina={sismosPorPagina}
            paginar={paginar}
            paginaActual={paginaActual}
          />
        </div>
      )}
    </div>
  );
};
