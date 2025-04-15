import React from 'react'

const Data = ({ title, description, thumbnail, price }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={`${thumbnail}`} alt="" />
            <p>{price}</p>
        </div>
    )
}

export default Data