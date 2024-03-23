import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
export const FiltroMagnitud = ({ onFiltrarMagnitud }) => {
  return (
    <Form className="mb-4">
      <Form.Group>
        <Form.Label className="fw-bold">Filtrar por Magnitud:</Form.Label>
        <Form.Select onChange={(e) => onFiltrarMagnitud(e.target.value)}>
          <option value="">Selecciona un filtro</option>
          <option value="menor">Menor Magnitud</option>
          <option value="mayor">Mayor Magnitud</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

FiltroMagnitud.propTypes = {
  onFiltrarMagnitud: PropTypes.func.isRequired,
};
