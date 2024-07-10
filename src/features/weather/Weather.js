import { useSelector,useDispatch } from "react-redux";
import { useEffect  } from  "react";
import { selectWeather, isWeatherLoading, isWeatherFailed,fetchWeather } from "./weatherSlice";

export default function Weather() {
    const dispatch = useDispatch();
    const weather = useSelector(selectWeather);
    const isLoading = useSelector(isWeatherLoading);
    const isFailed = useSelector(isWeatherFailed);

    useEffect(() => {
        dispatch(fetchWeather());
    },[]);

    let weatherWidget = "";
    if (isFailed) {
        weatherWidget = <h2>Failed to load weather data.</h2>;
    } else if (isLoading) {
        weatherWidget  = <h2>Loading weather...</h2>;
    }else{
        weatherWidget  = <h2>{JSON.stringify(weather)}</h2>
    }

    return (
        <div>
            { weatherWidget }
        </div>
    );
}