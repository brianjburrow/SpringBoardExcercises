const Tweet = (props) => {
    return(
    <div>
        <h1>{props.username}</h1>
        <h2>{props.name}</h2>
        <p>{props.message}</p>
        <small>{props.date}</small>
    </div>
    )
};
const App = ()=>{
    return (
        <div>
            <Tweet username="brianjburrow" name="Brian" message="Hello there" date="Tuesday"/>
            <Tweet username="brianjburrow" name="Brian" message="How are you" date="Wednesday"/>
            <Tweet username="brianjburrow" name="Brian" message="Bye" date="Fridany"/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"));