import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export const Buscador = ({ onSearch }) => {
  return (
    <Form className="mb-4">
      <Form.Group>
        <Form.Label className="fw-bold">Buscar un Sismo:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Buscar por fecha, lugar, profundidad, magnitud o país..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

Buscador.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
