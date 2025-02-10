import "./App.css";
import RandomButton from "./components/randomButton";
import RetrievalButton from "./components/RetrievalButton";
import BibleLogo from '../public/bible-svg.svg'
function App(){
  return(
  <>
    <div className="logo">
      <img src={BibleLogo} alt="Bible Logo" />
    </div>
    <h1>Bible Verse Generator</h1>
    <RandomButton/>
    <RetrievalButton/>
  </>
  )
}

export default App;