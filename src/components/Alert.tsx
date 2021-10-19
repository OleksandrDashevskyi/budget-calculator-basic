import React from 'react';

type alertProps = {
    type: string,
    text: string
}

export const Alert: React.FC<alertProps> = ({type, text})  => {
    return (
        <div className={`alert alert-${type}`}>
            {text}
        </div>
    )
}