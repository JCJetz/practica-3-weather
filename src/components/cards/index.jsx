import { useEffect, useState } from 'react';
import logo1 from "../../assets/olassi.svg"
import logo2 from "../../assets/olasno.svg"
import Forecast from '../forecast';
import Week from '../week';
import sun from '../../assets/tiempo/sol.svg'
import rain from '../../assets/tiempo/lluvia.svg'
import mist from '../../assets/tiempo/niebla.svg'
import snow from '../../assets/tiempo/nieve.svg'
import oneCloud from '../../assets/tiempo/nube.svg'
import twoCloud from '../../assets/tiempo/dosnubes.svg'
import storm from '../../assets/tiempo/tormenta.svg'
import sunCloud from '../../assets/tiempo/nubesol.svg'
import { FormCheck } from 'react-bootstrap';
import './styles.css'
import overwritebootstrap from './styles.css';



const parseTemperature = (kelvin, type) => type === 'C'
    ? Math.round(kelvin - 273.15)
    : Math.round(((kelvin - 273.15) * 1.8) + 32);

function Cards({ geoCode , text }) {

    const [cities, setCities] = useState({})
    const [temperature, setTemperature] = useState({})
    const [weatherIcon, setWeatherIcon] = useState(null)
    const [sunriseSunset, setSunriseSunset] = useState({})
    const [cityName, setCityName] = useState('')
    const [forecastResponse, setForecast] = useState(false);

    
    // state para los resulados (params devueltos)
    const [sgResponse, setSGResponse] = useState('');
    const [surfIcon, setSurfIcon] = useState(true);
    const [pop, setPop] = useState('');

    useEffect(() => {

        const REACT_API_KEY = process.env.REACT_APP_API_KEY;
        const STORMGLASS_KEY = `${process.env.REACT_APP_STORMGLASS_KEY}`;
        const t = new Date();
        // fecha unix porque la pide la api de stormglass
        const unixstart = parseInt((t.getTime() / 1000).toFixed(0));
        // params a pasar a la api (cosas que usaremos)
        const params = 'waveHeight,waveDirection,windSpeed,windDirection,humidity,wavePeriod,waterTemperature';

        
        if (geoCode[0]) {

            fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${geoCode[0]?.lat}&lon=${geoCode[0]?.lon}&appid=${REACT_API_KEY}`)


                .then(res => res.json())
                .then(data => {
                    setCityName(data[0]);
                    console.log('reverse: ',data[0].name);
                })

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoCode[0]?.lat}&lon=${geoCode[0]?.lon}&exclude=hourly&appid=${REACT_API_KEY}`)
    
    
                .then(res => res.json())
                .then(data => {
                    setCities(data);
                    console.log('else: ',data);

                    setSunriseSunset([data.daily[0]?.sunrise,data.daily[0]?.sunset]);
                    setPop(data.daily[0]?.pop);
    
                    const { current } = data;
                    setTemperature(prev => ({
                        ...prev,
                        value: current.temp,
                        type: 'C'
                    }))
    
                    setWeatherIcon(current?.weather[0]?.icon)
                })

            fetch(`https://api.stormglass.io/v2/weather/point?lat=${geoCode[0]?.lat}&lng=${geoCode[0]?.lon}&start=${unixstart}&params=${params}`, {
                    headers: {
                    'Authorization': STORMGLASS_KEY
                    }
                }).then((response) => response.json()).then((jsonData) => {
                    // solo la primera hora (actual)
                    console.log('SGlass: ', jsonData.hours[0]);
                    setSGResponse(jsonData.hours[0]);
                    jsonData.hours[0].waveHeight ? setSurfIcon(true) : setSurfIcon(false);

                });
            
                

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${geoCode[0]?.lat}&lon=${geoCode[0]?.lon}&exclude=hourly,current,minutely,alerts&appid=${REACT_API_KEY}`)
                  .then(res => res.json())
                  .then((data => {
                      setForecast(data.daily.slice(1,7));
                      //let sixdayforecast = data?.list?.slice(1,7);
                      //console.log('Data sliced: ', data.daily.slice(1,7));
            }))

        }
    }, [geoCode])


    const getImageWeather = () => {
        switch (weatherIcon) {
            case "01d":
                return sun;
            case "01n":
                return sun;
            case "02d":
                return sunCloud;
            case "02n":
                return sunCloud;
            case "03d":
                return oneCloud;
            case "03n":
                return oneCloud;
            case "04d":
                return twoCloud;
            case "04n":
                return twoCloud;
            case "09d":
                return rain;
            case "09n":
                return rain;
            case "10d":
                return rain;
            case "10n":
                return rain;
            case "11d":
                return storm;
            case "11n":
                return storm;
            case "13d":
                return snow;
            case "13n":
                return snow;
            case "50d":
                return mist;
            case "50n":
                return mist;

            default:
                return sun;

        }
    }

    const handleChangeTemperature = (e) => {
        const value = e.target.checked;
        const type = value ? 'F' : 'C'

        setTemperature(prev => ({
            ...prev,
            type
        }))
    }

    const SurfSwitch = () => {
        console.log('Checking surfIcon: ', surfIcon);
        if (surfIcon) {
            return <img src={logo1} alt=""></img>
        } else {
            return <img src={logo2} alt=""></img>
        };
    }
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateNew  = new Date();
    const fecha = dateNew.toLocaleDateString("es-ES", options)

    const fechaMayuscula = fecha.charAt(0).toUpperCase() + fecha.slice(1);

    return (

        <>
            <div className='maincomp'>
                <div className='col tempydatos'>
                    <div style={{ marginLeft: 60, width: 558, height: 500 }}>
                        <p className='title'>{cityName.name}</p>
                        <p className='state'>({cityName.state})</p>
                        <p className='today'>{fechaMayuscula}</p>
                        <div className='weather-temperature'>

                        <img className="logoTiempo" style={{ width: 200 }} src={getImageWeather()} alt="" />

                            <div className='celsius-farenheit'>
                                <p className='grades' >{parseTemperature(temperature.value, temperature.type)}º</p>
                                <div className='d-flex text-light toggle'>
                                    <span className='me-2'>ºC</span>
                                    <FormCheck style={overwritebootstrap}
                                        type="switch"
                                        id="custom-switch"
                                        checked={temperature.type === 'F'}
                                        onChange={handleChangeTemperature}
                                    />
                                    <span className='ms-1'>ºF</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col text-center'>
                   {SurfSwitch()}
                </div>
            </div>
            <div className='cardsContainer'>
                <div className='row justify-content-center'>
                 { geoCode[0]
                    ? <Forecast cities={cities} ss={sunriseSunset} pop={pop} sgResponse={sgResponse}></Forecast>
                    : ""}
                </div>
                <p className='days-title'>PROXIMOS DIAS</p>
                <div className='next-days'>
                    <Week forecastResponse={forecastResponse}></Week>
                </div>
           
            </div>
        </>
    )
}

export default Cards;