import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import {SlMicrophone} from "react-icons/sl";


export default function Home() {
  return (
    <>
    <section className="container">
      <div className="image-container">
        <img src="/images/man-woman-talking2.png" alt="man and woman"/>
      </div>
      <div className="content-container">
          <h2>Transcribe Now!!</h2>
          <p className='description'>Experience the power of real-time audio-to-text translation at your 
            fingertips. With TranscribeNow, you can effortlessly convert spoken words into accurate, written text in an instant. Whether you're in a meeting, having a conversation, or conducting interviews, 
            our app enables you to capture every word and never miss a crucial detail.</p>
          {/* <p>An app that aims to break the language barrier in communication and improves quality and easier communication</p> */}
          <p>Click the icon to get started</p>
          <Link to="/translate-audio"><button><SlMicrophone/> Get Started</button></Link>
      </div>

      
    </section>

    </>
  )
}
