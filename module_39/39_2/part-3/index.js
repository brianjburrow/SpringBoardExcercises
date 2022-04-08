const VoteTag = (props)=>{
    if (props.age >= 18){
        return <p>"Please go vote"</p>
    } else {
        return <h3>"You must be 18"</h3>
    }  
}

const Person = (props)=>{
    return (<div>
        <h1>{props.name}</h1>
        <VoteTag age={props.age}/>
    </div>
    )
}

const App = ()=>{
    return (<div>
        <Person name="Brian" age={32}/>
        <Person name="Daisy" age={6}/>
    </div>)
}

ReactDOM.render(<App />, document.getElementById('root'));

