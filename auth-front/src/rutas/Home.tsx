import DefaultLayout from '../layout/DefaultLayout';
import imagen from '../imagenes/imagenportada.jpg';
import imagenrequisito from '../imagenes/imagenrequsito.jpg';
import '../App.css';
import imagen1 from '../imagenes/nodo.png';
import imagen2 from '../imagenes/QUOHUB.png';
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
            <p className='ventaja'>
              BikeRenta te ofrece servicio de alquiler de bicicletas para montaña, ruta y/o ciclo paseo en la modalidad que prefieras para disfrutar del ciclismo sin preocupaciones.

            </p>
            <br></br>
            <p className='ventaja'>
            <h3>Ventajas de utilizar bicicleta:</h3>
            <ol>
  <li><strong>Salud Cardiovascular:</strong> Andar en bicicleta mejora la salud cardiovascular al fortalecer el corazón y mejorar la circulación sanguínea, reduciendo el riesgo de enfermedades cardíacas.</li><br></br>
  <li><strong>Ejercicio de Bajo Impacto:</strong> Es una forma de ejercicio de bajo impacto que disminuye la presión sobre las articulaciones, siendo amigable para personas de todas las edades y niveles de condición física.</li><br></br>
  <li><strong>Sostenibilidad Ambiental:</strong> Contribuye a la sostenibilidad ambiental al ser una forma de transporte libre de emisiones, reduciendo la contaminación del aire y disminuyendo la huella de carbono.</li><br></br>
  <li><strong>Bienestar Mental:</strong> Andar en bicicleta libera endorfinas, mejorando el estado de ánimo y reduciendo el estrés, la ansiedad y la depresión.</li><br></br>
</ol>
              
            </p>
          </div>
          
          <div className="col-md-6">
          <h3>Resumen Bicicletas:</h3>
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
              <ol>
                <li>-Ser mayor de edad</li>
                <li>-Recepción de datos personales y firma</li>
                <li>-Documento cédula y licencia de conducir *Entregar en la tienda</li>
                <li>-Para uso entrega de garantía obligatoria reembolsable</li>
                <li>-Contrato (Leer)</li>
              </ol>
            </div>
          </div>
          <div className="col-md-6">
            <div className="imagen-requisitos">
              <img src={imagenrequisito} alt="Imagen de requisitos" />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='frase'>
              <p>¡Descubre los puntos de anclaje para bicicletas en nuestra ciudad amigable con las dos ruedas! Estos anclajes están estratégicamente ubicados para hacer tu viaje en bicicleta aún más conveniente.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mi-div">
      <img src={imagen1} alt="Imagen 1" />
      <img src={imagen2} alt="Imagen 2" />
    </div>
      <footer id='footerhome'>
  <div className="text-center">
    <p>Dirección: Mexico y Curazao Centro de Negocios Quo Hub. Loja-Ecuador</p>
    <p>(07) 2102999 | info@electritelecom.com</p>
    <p>BikeRental@2023</p>
  </div>
</footer>

    </DefaultLayout>  
  </>;
}