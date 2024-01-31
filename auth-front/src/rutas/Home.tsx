import DefaultLayout from '../layout/DefaultLayout';
import imagen from '../imagenes/imagenportada.jpg';
import imagenrequisito from '../imagenes/imagenrequsito.jpg';
import imagenbici from '../imagenes/imagenportaderecha.png';
import '../App.css';
import imagen1 from '../imagenes/nodo.png';
import imagen2 from '../imagenes/QUOHUB.png';
import imagenparquesansebastian from '../imagenes/imagenparquesansebastian.jpg';
import imagenparquebolivar from '../imagenes/imagenparquebolivar.jpg';
import imagenparquejipiro from '../imagenes/imagenparquejipiro.jpg';
export default function Home() {
  return <>
    <DefaultLayout>
      <h1 className="titulo">ALQUILER DE BICICLETAS</h1>
      <div className="fondo-negro">
        <img className="portada" src={imagen} alt="Portada" />

        <div className="row">
          <div className="col-md-6">
            <p className="introduccion">
              Renta una bici y <span className="destacado">#QueNadaTeDetenga</span>
            </p>
            {/* Texto a la izquierda */}
            <p className='ventaja'>
              BikeRenta te ofrece servicio de alquiler de bicicletas para montaña, ruta y/o ciclo paseo en la modalidad que prefieras para disfrutar del ciclismo sin preocupaciones.

            </p>
            <br></br>
            <h3>Resumen Bicicletas:</h3>
            <table className="tabla mb-4">
              <thead>
                <tr>
                  <th>Bici para paseo urbano</th>
                  <th>Uso diario</th>
                  <th>Horario (08h00 – 19h00) / $0,30 tarjeta *Garantía / por hora alquilada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bici recreativa enduro</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $0,30 tarjeta *Garantía / por hora alquilada</td>
                </tr>
                <tr>
                  <td>Bici electrictica</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00)  / $0,30 tarjeta *Garantía  / por hora alquilada</td>
                </tr>
                <tr>
                  <td>Bici de aluminio paseo urbano</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00)  / $0,30 tarjeta *Garantía / por hora alquilada</td>
                </tr>
                <tr>
                  <td>Bici recreativa de aluminio enduro</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $0,30 tarjeta *Garantía / por hora alquilada</td>
                </tr>
                <tr>
                  <td>Bici de carbono paseo urbano</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $0,30 tarjeta *Garantía / por hora alquilada</td>
                </tr>
                <tr>
                  <td>Bici para paseo urbano</td>
                  <td>Uso diario</td>
                  <td>Horario (08h00 – 19h00) / $0,30 tarjeta *Garantía / por hora alquilada</td>
                </tr>
              </tbody>
            </table>

          </div>

          <div className="col-md-6">
            <div className="imagen-requisitos">
              <img src={imagenbici} alt="Imagen de requisitos" />
            </div>
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
            <div className="requisitos">
              <h3>Requisitos:</h3>
              <ol>
                <li>Ser mayor de 14 años</li>
                <li>Recepción de datos personales y firma</li>
                <li>Documento cédula </li>
                <li>Para uso entrega de garantía obligatoria reembolsable</li>
                <li>Contrato (Leer)</li>
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
        <div>
          <h2>Lugares de los anclajes Loja</h2>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='card'>
                <img src={imagenparquesansebastian} className='card-img-top' alt="imagen parque San Sebastian" />
                <div className='card-body'>
                  <h2 className='card-title'>Parque San Sebastian</h2>
                  <p className='card-text'>Sin duda, es uno de los elementos más atractivos de Loja. En el centro de esta plaza se levanta una torre de 32 metros de altura, en cuya cumbre se encuentra un reloj de cuatro esferas y en su base encontramos cuatro relieves que indican los hechos más sobresalientes en la historia de Loja.</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='card'>
                <img src={imagenparquebolivar} className='card-img-top' alt="imagen parque Bolivar" />
                <div className='card-body'>
                  <h2 className='card-title'>Parque Bolivar</h2>
                  <p className='card-text'>Un pequeño espacio que se abre para marcar la entrada hacia el centro desde la Avenida Universitaria, el parque Simón Bolívar es perfecto para pasear y dispersarse sin tener que alejarse mucho del centro. Es una pequeña plaza rodeada por la Iglesia y Convento de los Franciscanos.</p>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='card'>
                <img src={imagenparquejipiro} className='card-img-top' alt="imagen parque Jipiro" />
                <div className='card-body'>
                  <h2 className='card-title'>Parque Jipiro</h2>
                  <p className='card-text'>Está compuesto por más de 10 hectáreas, al realizar un recorrido por el lugar podrás encontrar varios atractivos y mucho por hacer. Una de sus principales características es su entorno natural, un lugar apto para descansar. Rodeado por los ríos Zamora y Jipiro.</p>
                </div>
              </div>
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