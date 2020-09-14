import React, {useEffect , useState} from 'react';
import './App.css';
import useFetch from "./components/useFetch";
// import Hello from "./components/Hello";

function App() {
  
const [values, setValues] = useState({
  firstName:"",
  email:"",
  password:""
});
// const [showHello, setShowHello]= useState(true);

//We will learn that useeffect (depends on State change as well as component mount) is used to for useEffect fn be called lesser by adding an array of dependency and do cleanup after loading of components
// By default useEffect depends on all the states value changes but we can add an array of dependecies to call useEffect only on change of specific value in a state/ ex: [values.password, values.firstName]
// or complete state like [values] so that useffect is not called on change of other states
// useEffect is used to replace the old way of componentDidMount and ComponentDidUnmount
// dependacy [] means dependacy is none that call useEffect only when it mounts wheras dependancy not mentioned means depends on all states
// cleanup fn is return function of useeffect, and is called when a conponent is unmounted or old value of a state is cleaned which happens everytime we set a new value to a state
// useEffect is triggered when state of anything in app changes, component is mounted and unmounted(clean up fn calleld), and when event listeners(mouseOver) are called inside useEffect
// Till now all was basic now lets learn some use cases and make regular apps using it 
// 1. Events
// 2. Having multiple useEffect on a component and they fireoff in order
// 3. Fetch from an API url along 
// 4. to change data when API url changes
// 5. useeffect can be called infinite times if we mistakly call a dependency to be changed in useeffect fn
// 6. Local Storage localStorage.setItem('itemname', itemvalue); and localStorage.getItem(itemName);

// useEffect(() => {
//      console.log("render");
//      return () => {
//       console.log("unmount");
//      };     
//   }, [values.password, values.firstName]);

  // useEffect(() => {
  //   function onMouseOver(e){
  //     console.log(e);
  //   }
  //   window.addEventListener("mouseover",onMouseOver);
  //   console.log("mounted");
  //   //control will stay here until component is unmounted and keep listening for event
  //   return ()=> {
  //     window.removeEventListener("mouseover",onMouseOver);
  //   };
  // },[]);

  // useEffect(() => {
  //     console.log("useEffect 2 called");      
  //   return () => {
  //     console.log("unmounted");
  //    }
  // },[]);

  const [count, setCount]= useState(() => JSON.parse(localStorage.getItem("count")));
  const {data, loading}=  useFetch('http://numberapi.com/'+count+'/trivia/');
  
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  },[count]);

  function changeValues(event){
    const {name ,value}= event.target;
    setValues((prevValues) => {
      return({
        ...prevValues,[name]:value    
      }) });
    };  
  
  return (
    <div className="App">
      <header>
      <h1>Learn Useeffect</h1>
      </header>
      <div> {loading ? <h4>"data is loading"</h4> : <h4>{data}</h4> } </div>
      <button onClick={() => setCount(count+1)}>Increase</button>
      <button onClick={() => setCount(count-1)}>Decrease</button>
      {/* <button onClick={ () => setShowHello(!showHello)} >Toggle</button>
      {showHello && <Hello />} */}
        <input type="text" placeholder="firstName" name="firstName" value={values.firstName} onChange={changeValues} /> 
        <input type="text" placeholder="email" name="email" value={values.email} onChange={changeValues} />
        <input type="text" placeholder="password" name="password" value={values.password} onChange={changeValues} />
    </div>
  );
} 

export default App;
