import React from 'react';

interface HeaderProps {
    title: string,
}
/*
 React.FC > tipagem de componente em formato de funcao
 Interface >> definir propiedades que a funcao/componente ira receber
    >caso a prop seja escrita como 'title?: string' ela será obrigatoria
*/
const Header: React.FC<HeaderProps> = (props) => { 
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header;