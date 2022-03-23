import React,{useState} from 'react';
import PropTypes from "prop-types";

export default function TextForm(props) {

  const [Text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [ToFind, TextFound] = useState();
  const [isRemoved, Removed] = useState(false);

  async function copyTextToClipboard(text){
    if('clipboard' in navigator){
      return await navigator.clipboard.writeText(text);
    }else{
      return document.execCommand('copy',true,text);
    }
  }

  const handleCopyClick = ()=>{
    copyTextToClipboard(Text).then(()=>{
        setIsCopied(true);
        setTimeout(()=>{
          setIsCopied(false);
        },1500);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleUpClick = ()=>{
      //console.log("Convert to upper case button was clicked !");
      let val = Text.toUpperCase();
      setText(val);
      val.length > 0 ? props.showAlert("Converted To UpperCase !", "success") : props.showAlert("Nothing to Convert !", "warning");
  }

  const handleChange = (event)=>{
    //console.log("Handling the change !");
    setText(event.target.value);
  }

  const handleLoClick = ()=>{
      let lo = Text.toLowerCase();
      setText(lo);
      lo.length > 0 ? props.showAlert("Converted To LowerCase !", "success") : props.showAlert("Nothing to Convert !", "warning");
  }

  const handleClear = ()=>{
    let cl = "";
    setText(cl);
  }

  const handleFind = ()=>{
    console.log("hello");
  }

  const handleExtraSpaces = ()=>{
    let newText = Text.split(/[ ]+/);
    setText(newText.join(" "));
    Removed(true);
    setTimeout(() => {
        Removed(false);
    },1000);
  }

  return (
    <>
        <div className = "container">
          <h1 className={`my-3 text-${props.mode === 'light' ? 'dark':'light'}`}>{props.heading}</h1>
          <div className="mb-3">
          <textarea className={`form-control text-${props.mode === 'light' ? 'dark':'light'}`} value={Text} onChange = {handleChange} id="myBox" rows="6" style = {{backgroundColor : props.mode === 'dark' ? 'grey':'white'}} placeholder = "Enter text Here !"></textarea>
          </div>
          <button disabled = {Text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to UpperCase</button>
          <button disabled = {Text.length === 0} className="btn btn-primary mx-2 my-2" onClick = {handleLoClick}>Convert to LowerCase</button>
          <button disabled = {Text.length === 0} className="btn btn-primary mx-2 my-2" onClick = {handleClear}>Clear Text</button>
          <button disabled = {Text.length === 0} className="btn btn-primary mx-2 my-2" onClick = {handleCopyClick}><span>{isCopied ? 'Copied!' : 'Copy Text'}</span></button>
          <button disabled = {Text.length === 0} className="btn btn-primary mx-2 my-2" onClick = {handleExtraSpaces}><span>{isRemoved ? 'Removed!' : 'Remove Extra Spaces'}</span></button>
        </div>
        <div className="container my-3">
          <h2 className={`my-3 text-${props.mode === 'light' ? 'dark':'light'}`}>Your Text Summary !</h2>
          <p className={`my-3 text-${props.mode === 'light' ? 'dark':'light'}`}>{Text.split(" ").filter((element)=>{return element.length !== 0}).length} words and {Text.length} characters !</p>
          <p className={`my-3 text-${props.mode === 'light' ? 'dark':'light'}`}>{Text.length > 0 ? 0.008 * Text.split(" ").filter((element)=>{return element.length !== 0}).length : 0} Minutes Read !</p>
          <h2 className={`my-3 text-${props.mode === 'light' ? 'dark':'light'}`}>Preview</h2>
          <p className={`my-3 text-${props.mode === 'light' ? 'dark':'light'}`}>{Text.length > 0 ? Text : 'Nothing To Preview !'}</p>
          <h2 className={`my-3 text-${props.mode === 'light' ? 'dark':'light'}`}>Find and Replace</h2>
          <form className="row g-3">
            <div className="col-auto">
              <input type="password" className="form-control" id="inputPassword2" placeholder="Enter the Word !"/>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary mb-3" onClick={handleFind}>Find !</button>
            </div>
          </form>
          </div>
    </>
  )
}
TextForm.propTypes = {heading:PropTypes.string}
