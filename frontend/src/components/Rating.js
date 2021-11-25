import React from 'react'

function Rating({value, text, color}) {
    return (
        <div>
            <span >
                <i style ={{color}} className={
                    value >= 1
                    ? 'fas fa-star'
                    : value >= 0.5
                    ? 'fas fa-star-half-alt'
                    : 'far a-star'
                }>

                </i>
            </span>
            <span>
                <i style ={{color}} className={
                    value >= 2
                    ? 'fa fa-star'
                    : value >= 1.5
                    ? 'fa fa-star-half-alt'
                    : 'far a-star'
                }>

                </i>
            </span>
            <span>
                <i style ={{color}} className={
                    value >= 3
                    ? 'fas fa-star'
                    : value >= 2.5
                    ? 'fas fa-star-half-alt'
                    : 'far a-star'
                }>

                </i>
            </span>
            <span>
                <i style ={{color}} className={
                    value >= 4
                    ? 'fas fa-star'
                    : value >= 3.5
                    ? 'fas fa-star-half-alt'
                    : 'far fa-star'
                }>

                </i>
            </span>
            <span>
                <i style ={{color}} className={
                    value == 5
                    ? 'fas fa-star'
                    : value >= 4.5
                    ? 'fas fa-star-half-alt'
                    : 'far fa-star'
                }>

                </i>
            </span>
            <span>{text && text}</span>
        </div>
    )
}

export default Rating
