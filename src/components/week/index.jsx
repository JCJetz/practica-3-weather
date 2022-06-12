import './styles.css'
import Weekday from '../weekday'

function Week (props){
    console.log('FCR por props: ',props);

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