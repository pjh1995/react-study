const React = require('react');
const {useState,useRef} = React;

const Gugudan = () => {
    
    const [num1, setNum1] = useState(Math.ceil(Math.random() * 9))
    const [num2, setNum2] = useState(Math.ceil(Math.random() * 9))
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef();

    const onSuccess = () => {
        setNum1(getNewNumber());
        setNum2(getNewNumber());
        setResult(`정답 ${value}`);
        setValue('');
    }
    
    const handleClick = (e) => {
        if(num1 * num2 == value){
            onSuccess();
        }else{
            setResult("땡");
        }
        inputRef.current.focus();
    }
    
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const getNewNumber = () => {
        return Math.ceil(Math.random() * 9)
    }

    return (
        <>
            <h2>{num1}곱하기{num2}는?</h2>
            <input ref={inputRef} type="number" value={value} onChange={handleChange}/>
            <button onClick={handleClick}>입력 완료</button>
            <h3>{result}</h3>
        </>
    );
}

module.exports = Gugudan;