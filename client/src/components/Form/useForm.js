import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createPokemon } from "../../redux/actions"

const useForm = (InitialState, validation) => {
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState(InitialState)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelector = (e) => {
        if (input[e.target.name].includes(e.target.value)) alert("Duplicate type")
        else {
            setInput({
                ...input,
                [e.target.name]: [...input[e.target.name],
                e.target.value]
            })
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            [e.target.name]: input[e.target.name].filter(t => t !== e.target.value)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validated = validation(input)
        if (Object.keys(validated).length > 0) setErrors(validated)
        else {
            dispatch(createPokemon(input))
            setInput(InitialState)
            history.push("/home")
            history.go(0)
            alert("Processing your data...")
        }
    }

    return {
        errors,
        input,
        handleInput,
        handleSelector,
        handleDelete,
        handleSubmit
    }
}

export default useForm