import DefaultLayout from '../layout/DefaultLayout';
import imagen from '../imagenes/imagenportada.jpg';
import imagenrequisito from '../imagenes/imagenrequsito.jpg';
import '../App.css';
export default function Home() {
  return <>
    <DefaultLayout>
      <div className="fondo-negro">
        <h1 className="titulo">ALQUILER DE BICICLETAS</h1>
        <img className="portada" src={imagen} alt="Portada" />
        <p className="introduccion">
          Renta una bici y <span className="destacado">#QueNadaTeDetenga</span>
        </p>
        <div className="row">
          <div className="col-md-6">
            {/* Texto a la izquierda */}
            <p className='texto'>
              BikeRenta te ofrece servicio de alquiler de bicicletas para montaña, ruta y/o ciclo paseo en la modalidad que prefieras para disfrutar del ciclismo sin preocupaciones.
            </p>
          </div>
          <div className="col-md-6">
            {/* Tabla a la derecha */}
            <table className="tabla mb-4">
              <thead>
                <tr>
                  <th>Bici para paseo urbano</th>
                  <th>Uso diario</th>
                  <th>Horario (08h00 – 19h00) / $25 efectivo / $28 tarjeta *Garantía $30</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bici recreativa enduro</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $25 efectivo / $28 tarjeta *Garantía $30</td>
                </tr>
                <tr>
                  <td>Bici electrictica</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $25 efectivo / $28 tarjeta *Garantía $30</td>
                </tr>
                <tr>
                  <td>Bici de aluminio paseo urbano</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $25 efectivo / $28 tarjeta *Garantía $30</td>
                </tr>
                <tr>
                  <td>Bici recreativa de aluminio enduro</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $25 efectivo / $28 tarjeta *Garantía $30</td>
                </tr>
                <tr>
                  <td>Bici de carbono paseo urbano</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $25 efectivo / $28 tarjeta *Garantía $30</td>
                </tr>
                <tr>
                  <td>Bici para paseo urbano</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $25 efectivo / $28 tarjeta *Garantía $30</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <div className="requisitos">
              <h3>Requisitos:</h3>
              <ul>
                <li>-Ser mayor de edad</li>
                <li>-Recepción de datos personales y firma</li>
                <li>-Documento cédula y licencia de conducir *Entregar en la tienda</li>
                <li>-Para uso entrega de garantía obligatoria reembolsable</li>
                <li>-Contrato (Leer)</li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="imagen-requisitos">
              <img src={imagenrequisito} alt="Imagen de requisitos" />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  </>;
}