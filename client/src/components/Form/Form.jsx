import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTypes } from '../../redux/actions'
import FormCard from '../FormCard/FormCard'
import background from "../../assets/images/formback.png"
import brendan from "../../assets/images/Brendan.png"
import useForm from "./useForm"
import s from "./Form.module.css"

const initialState = {
    image: "",
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: []
}

const Form = () => {

    const validation = (input) => {
        let errors = {}
        const onlyLetters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g

        if (!input.name) errors.name = "Must have a name"
        else if (input.name.length > 20) errors.name = "Name must be less than 20 characters"
        else if (!input.name.match(onlyLetters)) errors.name = "Name must only contain letters"

        if (!input.hp) errors.hp = "Must have a base HP"
        else if (Number(input.hp) < 1) errors.hp = "Must be higher than 0"
        else if (Number(input.hp) > 9999) errors.hp = "Must be less than 9999"

        if (!input.attack) errors.attack = "Must have a base attack"
        else if (Number(input.attack) < 1) errors.attack = "Must be higher than 0"
        else if (Number(input.attack) > 9999) errors.attack = "Must be less than 9999"

        if (!input.defense) errors.defense = "Must have a base defense"
        else if (Number(input.defense) < 1) errors.defense = "Must be higher than 0"
        else if (Number(input.defense) > 9999) errors.defense = "Must be less than 9999"

        if (!input.speed) errors.speed = "Must have a base speed"
        else if (Number(input.speed) < 1) errors.speed = "Must be higher than 0"
        else if (Number(input.speed) > 9999) errors.speed = "Must be less than 9999"

        if (!input.height) errors.height = "Must have a base height"
        else if (Number(input.height) < 1) errors.height = "Must be highter than 0"
        else if (Number(input.height) < 10 && input.height.slice(0, 1) !== "0") errors.height = "Must contain a 0 at the beggining"
        else if (Number(input.height) > 9999) errors.height = "Height must be less than 999.9m"

        if (!input.weight) errors.weight = "Must have a base weight"
        else if (Number(input.weight) < 1) errors.weight = "Must be highter than 0"
        else if (Number(input.weight) < 10 && input.weight.slice(0, 1) !== "0") errors.weight = "Must contain a 0 at the beggining"
        else if (Number(input.weight) > 9999) errors.weight = "Weight must be less than 999.9kg"

        if (!input.types.length) errors.types = "Must have at least one type"
        else if (input.types.length > 2) errors.types = "Cannot have more than 2 types"

        return errors
    }

    const {
        errors,
        input,
        handleInput,
        handleSelector,
        handleDelete,
        handleSubmit
    } = useForm(initialState, validation)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])

    const allTypes = useSelector(state => state.allTypes)

    return (
        <div className={s.container}>
            <div className={s.leftContainer}>

                {/* Arriba */}
                <div className={s.battleUp}>
                    <img src={background} alt="alt" className={s.battleBackground} />
                    <FormCard
                        name={input.name}
                        hp={input.hp}
                        image={input.image}
                        types={input.types}
                        attack={input.attack}
                        defense={input.defense}
                        speed={input.speed}
                        height={input.height}
                        weight={input.weight}
                        handleDelete={handleDelete}
                    />
                    <div className={s.trainerBack}>
                        <img src={brendan} alt="trainer" />
                    </div>
                </div>
                {/* Arriba */}

                {/* TextBox */}
                <div>
                    <div className={s.grayBorder}>
                        <div className={s.redBorder}>
                            <div className={s.textBox}>{`A wild ${input.name ? input.name : "???"} appeared!`}</div>
                        </div>
                    </div>
                </div>
                {/* TextBox */}

            </div>
            <div className={s.rightContainer}>
                <form onSubmit={e => handleSubmit(e)} className={s.form}>
                    <div className={s.subForm}>
                        <div className={s.row}>
                            <div className={s.label}>
                                <label>name</label>
                                <input name="name" type="text" value={input.name} onChange={e => handleInput(e)} placeholder="EJ: Panes" maxLength="21" />
                                {errors.name && <p>{errors.name}</p>}
                            </div>
                            <div className={s.label}>
                                <label>image</label>
                                <input name="image" type="text" value={input.image} onChange={e => handleInput(e)} placeholder="URL" />
                            </div>
                        </div>
                        <div className={s.row}>
                            <div className={s.label}>
                                <label>hp</label>
                                <input name="hp" type="number" value={input.hp} onChange={e => handleInput(e)} placeholder="HP"/>
                                {errors.hp && <p>{errors.hp}</p>}
                            </div>
                            <div className={s.label}>
                                <label>attack</label>
                                <input name="attack" type="number" value={input.attack} onChange={e => handleInput(e)} placeholder="ATTACK"/>
                                {errors.attack && <p>{errors.attack}</p>}
                            </div>
                        </div>
                        <div className={s.row}>
                            <div className={s.label}>
                                <label>defense</label>
                                <input name="defense" type="number" value={input.defense} onChange={e => handleInput(e)} placeholder="DEFESNSE"/>
                                {errors.defense && <p>{errors.defense}</p>}
                            </div>
                            <div className={s.label}>
                                <label>speed</label>
                                <input name="speed" type="number" value={input.speed} onChange={e => handleInput(e)} placeholder="SPEED"/>
                                {errors.speed && <p>{errors.speed}</p>}
                            </div>
                        </div>
                        <div className={s.row}>
                            <div className={s.label}>
                                <label>height</label>
                                <input name="height" type="number" value={input.height} onChange={e => handleInput(e)} placeholder="12 => 1.2m"/>
                                {errors.height && <p>{errors.height}</p>}
                            </div>
                            <div className={s.label}>
                                <label>weight</label>
                                <input name="weight" type="number" value={input.weight} onChange={e => handleInput(e)} placeholder="23 => 2.3kg"/>
                                {errors.weight && <p>{errors.weight}</p>}
                            </div>
                        </div>
                        <div className={s.selectContainer}>
                            <select name="types" onChange={e => handleSelector(e)}>
                                <option hidden>SELECT A TYPE</option>
                                {allTypes.length && allTypes.map(e =>
                                    <option key={e.id} value={e.name}>
                                        {e.name}
                                    </option>
                                )}
                            </select>
                            {errors.types && <p>{errors.types}</p>}
                        </div>
                        <div className={s.footer}>
                            <Link to="/home">
                                <button>RUN</button>
                            </Link>
                            <button type='submit'>CATCH</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form