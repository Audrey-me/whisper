import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { SlMicrophone } from "react-icons/sl";
// import { API } from "aws-amplify";

export default function Translate() {
  const [playing, setPlaying] = useState(false);
  const mediaRecorder = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const mimeType = "audio/webm";

  const apiName = "realtimeaudiototextapi";
  const path = "/transcribe";
  const apiUrl = 'http://localhost:8000'

  const transcribe = (url) => {
    const myInit = {
      headers: {},
      response: true,
      body: JSON.stringify({
        fileUrl: url,
        lang: "english"
      }),
    };
    fetch(`${apiUrl}${path}`, {
      ...myInit,
      method: 'POST'
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        return new Promise((resolve, reject) => {
          resolve(streamData);
        });
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };
  const startRecording = async () => {
    let stream = await getMicrophonePermission();
    setPlaying(true);
    //create new Media recorder instance using the stream
    const media = new MediaRecorder(stream, { type: mimeType });
    //set the MediaRecorder instance to the mediaRecorder ref
    mediaRecorder.current = media;
    //invokes the start method to start the recording process
    mediaRecorder.current.start(5000);
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
      setAudioChunks([event.data]);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setPlaying(false);
    //stops the recording instance
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      transcribe(audioUrl);
      setAudioChunks([]);
    };
  };

  useEffect(() => {
    if (audioChunks.length > 0) {
      //creates a blob file from the audiochunks data
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      //creates a playable URL from the blob file.
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioChunks([]);
    }
  }, [audioChunks]);

  return (
    <div className="translate-audio">
      <div className="translate-overlay">
        <div className="traslated-words">
          <p>hello word, this is the translated words</p>
        </div>
        {audio ? <audio src={audio} controls></audio> : null}
        <div className="logic-buttons">
          <Link to="/">
            <button className="logic-btn-orange back-btn">back</button>
          </Link>
          <button
            className="logic-btn-orange"
            onClick={playing ? stopRecording : startRecording}
          >
            <SlMicrophone />
            {playing ? "Stop" : "Start"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
