import React, {useState} from 'react'
import QRCode from 'qrcode.react';


export default function TextForm(props) {
    // const [text, setText] = useState('');
    const [qrCodeValue, setQRCodeValue] = useState('');
    const [extractedEmails, setExtractedEmails] = useState([]);

    
    const handleExtractEmails = () => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const emails = text.match(emailRegex) || [];
        setExtractedEmails(emails);
        props.showAlert(`Extracted ${emails.length} email addresses`, 'info');
    };

    const handleGenerateQRCode = () => {
        setQRCodeValue(text);
        props.showAlert("QR Code generated!", "success");
    };

    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = ()=>{ 
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = ()=>{ 
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event)=>{
        setText(event.target.value) 
    }

    // Credits: A
    const handleCopy = () => {
        navigator.clipboard.writeText(text); 
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Speaking text","success");
      }

    // Credits: Coding Wala
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    const handleReverseText = () => {
        const reversedText = text.split('').reverse().join('');
        setText(reversedText);
        props.showAlert("Text reversed!", "success");
    }

    const handleCapitalizeWords = () => {
        const capitalizedText = text.replace(/\b\w/g, (char) => char.toUpperCase());
        setText(capitalizedText);
        props.showAlert("Each word capitalized!", "success");
    }

    const handleSpeechToText = () => {
        const recognition = new window.webkitSpeechRecognition(); // For Webkit browsers
        // Configure recognition settings if needed
    
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
        };
    
        recognition.onend = () => {
            // Handle end of speech recognition
        };
    
        recognition.start();
    };

    const [text, setText] = useState(''); 
    
    return (
        <>
        <div className="container"> 
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3"> 
                <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
            </div>
            <button className="btn mx-2 my-3" onClick={handleUpClick}>Convert to Uppercase</button>
            <button className="btn mx-2 my-2" onClick={handleLoClick}>Convert to Lowercase</button>
            <button className="btn mx-2 my-2" onClick={handleClearClick}>Clear Text</button>
            <button className="btn mx-2 my-2" onClick={handleCopy}>Copy Text</button>
            <button className="btn mx-2 my-2" onClick={handleSpeak} >Text to Speech</button>
            <button className="btn mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button className="btn mx-2 my-2" onClick={handleReverseText}>Reverse Text</button>
            <button className="btn mx-2 my-2" onClick={handleCapitalizeWords}>Capitalize Each Word</button>
            <button className="btn mx-2 my-2" onClick={handleGenerateQRCode}>Generate QR Code</button>
            <button className="btn mx-2 my-2" onClick={handleExtractEmails}>Extract Email Addresses</button>
            <button className="btn mx-2 my-2" onClick={handleSpeechToText}>Speech-to-Text</button>
        </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>Your text summary</h2>
            <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length>0?text:"Nothing to preview!"}</p>   
        </div>
        
        <div className="container my-3">
                <h2>QR Code</h2>
                {qrCodeValue && <QRCode value={qrCodeValue} />}
        </div>

        <div className="container my-3">
                <h2>Extracted Email Addresses</h2>
                <ul>
                    {extractedEmails.map((email, index) => (
                        <li key={index}>{email}</li>
                    ))}
                </ul>
        </div>
        </>
    )
}
