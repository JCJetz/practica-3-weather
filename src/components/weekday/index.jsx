import './styles.css'

function Weekday (props){

    console.log('desc tiempo: ', props.desc_tiempo);
    console.log('indice: ', props.indice);

    let desc_tiempo = '';
    desc_tiempo = props.desc_tiempo.weather[0].main === 'Clear' ? 'soleado' : '';
    desc_tiempo = props.desc_tiempo.weather[0].main === 'Clouds' ? 'nublado' : desc_tiempo;
    desc_tiempo = props.desc_tiempo.weather[0].main=== 'Thunderstorm' ? 'tormenta' : desc_tiempo;
    desc_tiempo = ['Drizzle','Rain'].includes(props.desc_tiempo.weather[0].main) ? 'lluvia' : desc_tiempo;
    desc_tiempo = props.desc_tiempo.weather[0].main === 'Snow' ? 'nieve' : desc_tiempo;
    desc_tiempo = props.desc_tiempo.weather[0].main === 'Atmosphere' ? 'niebla' : desc_tiempo;
    // console.log(desc_tiempo);

    let ind = props.indice+1;
    //var desc_tiempo = `${props.desc_tiempo.main}`;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + ind);
    const options = { weekday: 'long'};
    const dia = tomorrow.toLocaleDateString('es-ES', options);
    //console.log(dia);


    return(
        <>
  
            <div className='weekday'>
                <span className='day'>{dia}</span>
                <span className={desc_tiempo}></span>
                <span className='pop'>{(props.desc_tiempo.pop*100).toFixed()}%</span>
            </div>

        </>
    )
}

export default Weekday;
