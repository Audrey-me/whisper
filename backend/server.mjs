import express from "express";
import cors from "cors";
import fetch from 'node-fetch';
import { pipeline } from "@xenova/transformers";
import wavefile from "wavefile";
import multer from 'multer';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

app.post("/transcribe", upload.single('content'), async (req, res) => {
  try {
    console.log(req.file)
    fs.writeFileSync('blob.webm', req.file.buffer)
    // const { audioUrl } = req.body;
    // const response = await fetch(audioUrl);
    // const arrayBuffer = await response.arrayBuffer();
    // const buffer = Buffer.from(req.file.buffer);

    // Read .wav file and convert it to required format
    // const wav = new wavefile.WaveFile(req.file.buffer);
    // wav.fromBuffer(req.file.buffer);
    // wav.toBitDepth('32f'); // Pipeline expects input as a Float32Array
    // wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000
    // const audioData = wav.getSamples();
    // const monoAudioData = Array.isArray(audioData) ? audioData[0] : audioData;

    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
    const output = await transcriber(req.file.buffer);

    // res.send({ message: 'ok' })
    res.json({ text: output.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during transcription." });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
