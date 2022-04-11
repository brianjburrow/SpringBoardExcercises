import "./Pokecard.css";
import Col from 'react-bootstrap/Col'

const Pokecard = (props)=>{
    return (<Col xs={{span:3, offset:1}} md={{span:3, offset:1}} lg={{span:3, offset:1}} className='Pokecard'>
        <h4 className='Pokecard-header'>{props.name}</h4>
        <img className='Pokecard-image' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`}/>
        <p className='Pokecard-type'>{props.type}</p>
    </Col>)
}

export default Pokecard;