import './styles.css'
import { useState, useEffect } from 'react';
import Weekday from '../weekday'

function Week (props){
    console.log('FCR: ',props);
    /*
    getForecast().then((testforecast) => {
        console.log('test: ',testforecast);
        Object.values(testforecast).map((k,v) => console.log(k.main.temp));
    });
    /*/

    // Uso objeto falso de momento hasta que me desbaneen la api de openweather
    const forecastobject = [
        {main:"Clear"},{main:"Thunderstorm"},{main:"Rain"},{main:"Atmosphere"},{main:"Snow"},{main:"Clouds"}
    ]

    return(
        <>
        <div className='weekContainer'>
            <div className='weekly'>
                {Object.values(props.forecastResponse).map((value,index) => {
                return (
                    <Weekday key={index} indice={index} desc_tiempo={value}></Weekday>
                    )})};
            </div>
        </div>
        </>
    )
}

export default Week;