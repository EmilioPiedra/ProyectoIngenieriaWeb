import DefaultLayout from '../layout/DefaultLayout';
import imagen from '../imagenes/imagenportada.jpg';
export default function Home() {
    return <>
        <DefaultLayout>
            <h1>ALQUILER DE BICICLETAS</h1>
            <img src= {imagen}>
            
            </img>
            
            <div>
                <h1></h1>
            </div>




        </DefaultLayout>
    </>;
}