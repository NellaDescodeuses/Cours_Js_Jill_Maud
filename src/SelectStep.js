import React from "react";
import {PIERRE,  FEUILLE, CISEAU} from "./index";

const Button = (props) => {
    const {coup, jouer} = props;

    const imageStyle = {
        width: "100%",
        height: "auto"
    }

    const imageSrc = {
        [PIERRE]: "public/pierre.svg",
        [FEUILLE]: "public/feuille.svg",
        [CISEAU]: "public/ciseaux.svg"
    }

    const handlerClick = (e) => {
        e.stopPropagation();
        jouer(coup);
    }

    return <>
        <style jsx>{` // style jsx permet d'écrire du css classe dans du jsx (commande : npm i styled-jsx)
            button {
                border: 0;
                background-color: #FFF;
                border-radius: 242px;
                width: 224px;
                height: 224px;
                margin: 0 30px;
                }

            button:hover{
                border: 10px solid rgba(40, 24, 223, 0.1);
                width: 252px;
                height: 252px;
                margin: 0 16px;
                transition: all 0.3s;
            }
        `}
        </style>
        <button onClick={handlerClick}>
        <img style={imageStyle} src={imageSrc[coup]} />
    </button>
    </>
}

const SelectStep = (props) => {
    const jouer = props.jouer;

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }

    const titleStyle = {
        fontSize: "86.2976px",
        textTransform: "uppercase",
        color: "#2818DF",
        margin: 0,
    }

    const buttonContainerStyle = {
        display: "flex",
        height: "252px",
        alignItems: "center",

    }

    return  <div style={containerStyle}>
        <h1 style={titleStyle}>Choisis bien&nbsp;!</h1>
        <div style={buttonContainerStyle}>
            <Button jouer={jouer} coup={PIERRE} />
            <Button jouer={jouer} coup={FEUILLE} />
            <Button jouer={jouer} coup={CISEAU} />
        </div>
    </div>
}

export default SelectStep;