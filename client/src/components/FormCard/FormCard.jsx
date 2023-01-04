import React from 'react'
import colors from "../../assets/typeColors"
import missigNo from "../../assets/images/MissingNo.png"
import s from "./FormCard.module.css"

const FormCard = ({ name, hp, image, types, attack, defense, speed, height, weight, handleDelete }) => {

    const health = hp ? hp : "???"
    const imageregex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g

    const accurateStats = (model) => {
        const leftModel = model.toString().slice(0, -1)
        const rightModel = model.toString().slice(-1)
        return `${leftModel ? leftModel : 0}.${rightModel}`
     }

    return (
        <div className={s.back}>
            <div className={s.statsBorder}>
                <div className={s.statsBar}>
                    <div className={s.topStats}>
                        <h1>{name ? name : "???"} </h1>
                        <h1> Lv.???</h1>
                    </div>
                    <div>
                        <div className={s.hpBar}>
                            <div className={s.hpContainer}>
                                <h1>HP</h1>
                                <div className={s.healthContainer}>
                                    <div style={{userSelect: "none"}}>-</div>
                                </div>
                            </div>
                        </div>
                        <div className={s.hpNumber}>
                            <h3>{`${health}/ ${health}`}</h3>
                        </div>
                    </div>
                </div>
                <div className={s.center}>
                    <div className={s.stats}>
                        <div>
                            <h2>ATTACK</h2>
                            <h2>DEFENSE</h2>
                            <h2>SPEED</h2>
                            <h2>HEIGHT</h2>
                            <h2>WEIGHT</h2>
                            <h2>TYPES</h2>
                        </div>
                        <div>
                            <h2>{attack? attack : "???"}</h2>
                            <h2>{defense? defense : "???"}</h2>
                            <h2>{speed? speed : "???"}</h2>
                            <h2>{weight? `${accurateStats(weight)}kg` : "???"}</h2>
                            <h2>{height? `${accurateStats(height)}m` : "???"}</h2>
                            <h2 style={{ margin: "5px 0px" }}>{types.map(t =>
                                <span key={t} style={{ backgroundColor: `#${colors[t]}` }} className={s.type}>
                                    <button name='types' value={t} onClick={(e) => handleDelete(e)} className={s.delete}>X</button> {/* pasarle la referencia al input porque no funca la X */}
                                    {t}
                                </span>
                            )}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.imageContainer}>
                <img src={!image.match(imageregex) ? missigNo : image} alt="PlaceholderImage" />
            </div>
        </div>
    )
}

export default FormCard