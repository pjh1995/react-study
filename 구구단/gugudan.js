class Gugudan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num1:0,
            num2:0,
            result:"",
            value:''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.init();
    }

    init = () =>{
        this.setState({
            num1:this.getNewNumber(),
            num2:this.getNewNumber(),
        })
    }

    onSuccess = () => {
        this.setState((prevState)=>({
            num1:this.getNewNumber(),
            num2:this.getNewNumber(),
            result:`정답 ${prevState.value}`,
            value:''
        }))
    }

    input;
    
    handleClick = (e) => {
        const {num1,num2,value} = this.state;
        if(num1 * num2 == value){
            this.onSuccess();
        }else{
            this.setState({
                result : "땡"
            })
        }
        this.input.focus();
    }
    getNewNumber = () => {
        return Math.ceil(Math.random() * 9)
    }
    render() {
        const {num1,num2,value,result} = this.state;
        return (
            <div>
                <h2>{num1}곱하기{num2}는?</h2>
                <input ref={(c) => {this.input = c;}} type="number" value={value} onChange={(e) => this.setState({value:e.target.value})}/>
                <button onClick={this.handleClick}>입력 완료</button>
                <h3>{result}</h3>
            </div>
        );
    };
}