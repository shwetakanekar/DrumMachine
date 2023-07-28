import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

  let [displayValue, updateDisplayValue] = useState('');

  useEffect(() => {
    let drumKeys = document.getElementsByClassName('drum-pad');
    for (let drumKey of drumKeys) {
      let audioId = drumKey.innerText;
      drumKey.addEventListener('click', () => {
        playSound(audioId);
        updateDisplayValue(drumKey.id.replace(/-/g, ' '));
      });
    }

    document.addEventListener('keydown', (event) => {
      if(keys.includes(event.key.toUpperCase())) {
        playSound(event.key.toUpperCase());
        updateDisplayValue(document.getElementById(event.key.toUpperCase()).parentElement.id.replace(/-/g, ' '));
      }
    });

    return () => {
      for (let drumKey of drumKeys) {
        let audioId = drumKey.innerText;
        drumKey.removeEventListener('click', () => playSound(audioId));
      }
      document.removeEventListener('keydown', (event) => {
        if(keys.includes(event.key.toUpperCase())) {
          playSound(event.key.toUpperCase());
        }
      });
    };
  });

  const playSound = (audioId) => {
    let sound = document.getElementById(audioId);
    sound.play();
  };

  return (
    <>
      <div id="drum-machine">
        <div id="drum-keys">
          <div className="drum-pad" id="heater-1">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
              className="clip"
              id="Q"
            ></audio>
            Q
          </div>
          <div className="drum-pad" id="heater-2">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
              className="clip"
              id="W"
            ></audio>
            W
          </div>
          <div className="drum-pad" id="heater-3">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
              className="clip"
              id="E"
            ></audio>
            E
          </div>
          <div className="drum-pad" id="heater-4">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
              className="clip"
              id="A"
            ></audio>
            A
          </div>
          <div className="drum-pad" id="clap">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
              className="clip"
              id="S"
            ></audio>
            S
          </div>
          <div className="drum-pad" id="open-HH">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
              className="clip"
              id="D"
            ></audio>
            D
          </div>
          <div className="drum-pad" id="kick-n-hat">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
              className="clip"
              id="Z"
            ></audio>
            Z
          </div>
          <div className="drum-pad" id="kick">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
              className="clip"
              id="X"
            ></audio>
            X
          </div>
          <div className="drum-pad" id="closed-HH">
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
              className="clip"
              id="C"
            ></audio>
            C
          </div>
        </div>
        <div id="drum-controls">
          <div id="display">{displayValue}</div>
        </div>
      </div>
    </>
  );
}

export default App;
