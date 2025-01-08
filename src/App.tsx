import style from "./App.module.css"
import Form from "./components/Form/Form"
import Spinner from "./components/Spinner/Spinner"
import WeatherDetails from "./components/weatherDetails/WeatherDetails"
import useWeather from "./hooks/useWeather"
import Alert from "./components/Alert/Alert"


function App() {

  const { weather, loading, notFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={style.title}>Buscador de clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetails weather={weather} />}
        {notFound && <Alert>Ciudad No Encontrada</Alert>}

      </div>
    </>
  )
}

export default App
