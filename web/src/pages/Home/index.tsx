import React from 'react';
import {FiLogIn} from 'react-icons/fi'
import { Link } from 'react-router-dom' 
// usado para quando quisermos trocar de tela como em um 'href'


import './styles.css'



import logo from '../../assets/logo.svg'


/*  div#page-home >> criar div com id
    div.content >> criar div com className
    <Link to="" /> === <a href="" />

*/
const Home = () => {
    return (
        <div id="page-home"> 
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                
                <main>
                    <h1>Seu Marketplace de coleta de resídios</h1>

                    <p>Ajudamos pessoas a encontrar lugares para coletar resíduos.</p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn/>
                        </span>  
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    )

}
export default Home;