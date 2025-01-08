import axios from "axios"
import { SearchTypes } from "../types"
import { z } from 'zod'
import { useMemo, useState } from "react"


// Zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export type Weather = z.infer<typeof Weather>

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchTypes) => {
        const appId = import.meta.env.VITE_API_KEY
        setLoading(true)
        setWeather(initialState)// Cada vez que hagamos un llamado se reinicia al estado inciial
        try {
            //GET-GEOCODING PRIMER LLAMADO PARA OBTENER LAT Y LON
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const { data } = await axios(geoURL)

             // Comprobar si existe
             if(!data[0]) {
                setNotFound(true)
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            //SEGUNDO LLAMADO PARA OPTENER EL CLIMA

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            // Zod
            const { data: weatherResult } = await axios(weatherURL)
            const result = Weather.safeParse(weatherResult)
            if (result.success) {
                setWeather(result.data)
            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false) // una vez que finalice el  Spinner vuelve al estado initicial
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])
    return {
        fetchWeather,
        loading,
        notFound,
        weather,
        hasWeatherData
    }
}