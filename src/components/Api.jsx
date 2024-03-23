import { useEffect } from "react";
import PropTypes from "prop-types";

export const Api = ({ setSismos }) => {
  useEffect(() => {
    const fetchSismos = async () => {
      const url =
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSismos(data.features);
      } catch (error) {
        console.error("Error al obtener la información de la API:", error);
      }
    };

    fetchSismos();
  }, [setSismos]);

  return null;
};

Api.propTypes = {
  setSismos: PropTypes.func.isRequired,
};
