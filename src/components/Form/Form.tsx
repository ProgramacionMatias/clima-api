import { countries } from "../../data/countries";
import  { ChangeEvent, FormEvent, useState } from "react";
import style from './Form.module.css'
import type { SearchTypes } from '../../types'
import Alert from '../Alert/Alert'

type FormProps = {
    fetchWeather: (search: SearchTypes) => Promise<void>
}
export default function Form({fetchWeather}: FormProps) {

    const [search, setSearch] = useState<SearchTypes>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(Object.values(search).includes('')){
            setAlert('Todos los campos son obligatorios')
            return
        }

        fetchWeather(search)
    }
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            {alert && <Alert>{alert}</Alert>}
            <div className={style.field}>
                <label htmlFor="city">Ciudad Local:</label>
                <input id="city" type="text" name="city" placeholder="Ciudad" value={search.city} onChange={handleChange} />
            </div>
            <div className={style.field}>
                <label htmlFor="country">Pais:</label>
                <select onChange={handleChange} value={search.country} name="country" id="country">
                    <option value="">-- Seleccione un Pais --</option>
                    {countries.map(country => (
                        <option
                            key={country.code}
                            value={country.code}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input className={style.submit} type="submit" value='Consultar Clima' />
        </form>
    )
}
