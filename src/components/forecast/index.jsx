import './styles.css'
import sunrise from "../../assets/Icon_amanecer.svg"
import sunset from "../../assets/Icon_atardecer.svg"
import humidity from "../../assets/Icon_humidity.svg"
import uptide from "../../assets/Icon_marea_alta.svg"
import bottide from "../../assets/Icon_marea_baja.svg"
import wind from "../../assets/Icon_viento.svg"
import period from "../../assets/Icon_wave_period.svg"
import direction from "../../assets/Icon_wave_direction.svg"
import height from "../../assets/Icon_wave_height.svg"
import windDir from "../../assets/Icon_wind_direction.svg"
import rain from "../../assets/Icon_lluvia.svg"

const randomEnergy = Math.floor(Math.random() * (100 - 1) + 1);

function Forecast({cities, ss, sgResponse}) {

    //console.log('cities: ',cities);

    // función convertir grados a puntos cardinales
    function degreesToCoordinates(degrees) {
        // Define array of directions
        const directions = ['Norte', 'Nordeste', 'Este', 'Sureste', 'Sur', 'Sudoeste', 'Oeste', 'Noroeste'];
        // Split into the 8 directions
        degrees = degrees * 8 / 360;
        // round to nearest integer.
        degrees = Math.round(degrees, 0);
        // Ensure it's within 0-7
        degrees = (degrees + 8) % 8

        return directions[degrees];
    }

    function UnixTimetoHoursandMins(t) {

        var date = new Date(t * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    }

    console.log('sunrise/sunset: ', UnixTimetoHoursandMins(ss[1]));

    return (
        
        <div className='main'>
            <div className='container_single'>
                <p>ALTURA OLA</p>
                <img src={height} alt="" />
                <p style={{ fontSize: 70 }}> {sgResponse?.waveHeight?.sg}</p>
            </div> 
            <div className='container_single'>
                <p>PERIODO OLA</p>
                <img src={period} alt="" />
                <div className='container-prob'>
                    <p style={{ fontSize: 80, display: 'flex', alignItems: 'flex-end' }}>{sgResponse?.wavePeriod?.sg}</p>
                    <p style={{ fontSize: 40, marginBottom: 30 }}>seg</p>
                </div>    
            </div>
            <div className='container_single'>
                <p>TEMPERATURA AGUA</p>
                <span className="watertemp"></span>
                <div className='container-prob'>
                    <p style={{ fontSize: 80, display: 'flex', alignItems: 'flex-end' }}>{sgResponse?.waterTemperature?.sg.toFixed(0)}</p>
                    <p style={{ fontSize: 40, marginBottom: 60 }}> º</p>
                </div>
            </div>
            <div className='container_single'>
                <p>DIRECCIÓN OLA</p>
                <img src={direction} alt="" />
                <div className='container-prob'>
                    <p style={{ fontSize: 50, lineHeight: 2.4 }}>{degreesToCoordinates(sgResponse?.waveDirection?.sg)}</p>
                </div>
                
            </div>
            <div className='container_single'>
                <p>VIENTO</p>
                <img src={wind} alt="" />
                <p style={{ fontSize: 60 }}>{cities?.current?.wind_speed}</p>
            </div>
            <div className='container_double'>
                <div className='sub-container' >
                    <div className='text'>
                        <p style={{ margin: 0 }}>MAREA</p>
                        <p>BAJA</p>
                    </div>
                    <img src={bottide} alt="" />
                    <div>
                        <p style={{ fontSize: 40, margin: 0 }}>8:30</p>
                        <p style={{ fontSize: 24 }}>20:12</p>
                    </div>
                </div>
                <div className='sub-container'>
                    <div className='text'>
                        <p style={{ margin: 0 }}>MAREA</p>
                        <p>ALTA</p>
                    </div>
                    <img src={uptide} alt="" />
                    <div>
                        <p style={{ fontSize: 40, margin: 0 }}>7:23</p>
                        <p style={{ fontSize: 24 }}>9:29</p>
                    </div>
                </div>
            </div>
            <div className='container_single'>
                <p>DIRECCION VIENTO</p>
                <img src={windDir} alt="" />
                <p style={{ fontSize: 50 }}>{degreesToCoordinates(sgResponse?.windDirection?.sg)}</p>
            </div>
            <div className='container_single'>
                <p>HUMEDAD</p>
                <img src={humidity} alt="" />
                <div className='container-prob'>
                    <p style={{ fontSize: 80, display: 'flex', alignItems: 'flex-end' }}>{cities?.current?.humidity}</p>
                    <p style={{ fontSize: 40, marginBottom: 30 }}>%</p>
                </div>    
            </div>
            <div className='container_double'>
                <div className='sub-container'>
                    <p>AMANECER</p>
                    <img src={sunrise} alt="" />
                    { cities ? <p style={{ fontSize: 80 }}>{UnixTimetoHoursandMins(ss[0])}</p>: "00:00"}
                </div>
                <div className='sub-container'>
                    <p>ATARDECER</p>
                    <img src={sunset} alt="" />
                    { cities ? <p style={{ fontSize: 80 }}>{UnixTimetoHoursandMins(ss[1])}</p>: "00:00"}
                </div>
            </div>
            <div className='container_single'>
                <p>PROBABILIDAD</p>
                <img src={rain} alt="" />
                <div className='container-prob'>
                    <p style={{ fontSize: 80, display: 'flex', alignItems: 'flex-end' }}>{randomEnergy}</p>
                    <p style={{ fontSize: 40, marginBottom: 30 }}>%</p>
                </div>
            </div>
        </div>
    )
}

export default Forecast;