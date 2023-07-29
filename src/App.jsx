import { useEffect, useRef, useState } from 'react';

import './App.css';

function App() {
  
  let [displayValue, updateDisplayValue] = useState('');
  let [power, updatePower] = useState(true);
  let powerRef = useRef(power);
  let powerIconStyle = {
    backgroundColor: '#980000'
  };
  let displayStyle = {
    backgroundColor: '#6b7d32'
  }
  if (power) {
    powerIconStyle = {
      backgroundColor: '#ff0000'
    };
    displayStyle = {
      backgroundColor: '#bcdc5a'
    }
  }
  
  useEffect(() => {
    const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

    document.addEventListener('keydown', (event) => {
      let selectedKey = event.key.toUpperCase();
      if(keys.includes(selectedKey) && powerRef.current) {
        playSound(selectedKey);
        updateDisplayValue(document.getElementById(selectedKey).parentElement.id.replace(/-/g, ' '));
        highlightKey(selectedKey);
      }
    });

    return () => {
      document.removeEventListener('keydown', (event) => {
        let selectedKey = event.key.toUpperCase();
        if(keys.includes(selectedKey) && powerRef.current) {
          playSound(selectedKey);
          updateDisplayValue(document.getElementById(selectedKey).parentElement.id.replace(/-/g, ' '));
          highlightKey(selectedKey);
        }
      });
    };
  }, [power]);

  const playSound = (audioId) => {
    let sound = document.getElementById(audioId);
    sound.play();
  };

  const togglePower = () => {
    let newPower = !power;
    let message = 'Power ' + (newPower ? 'ON' : 'OFF');
    updateDisplayValue(message);
    setTimeout(() => {
      updateDisplayValue('');
    }, 1000)
    updatePower(newPower);
    powerRef.current = newPower;
  }

  const keyPress = (key, message) => {
    if (power) {
      playSound(key);
      updateDisplayValue(message);
      highlightKey(key);
    }
  }

  const highlightKey = (key) => {
    let keyElement = document.getElementById(key).parentElement;
    keyElement.style.border = '5px solid #ff0000';
    setTimeout(() => {
      keyElement.style.border = '5px solid #600724';
    }, 500);
  }

  return (
    <>
      <div id="drum-machine">
        <div id="power">
          <button id="power-btn" onClick={togglePower}>
            <svg id="power-icon" fill="none" stroke="#ffffff" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={powerIconStyle}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"></path>
            </svg>
          </button>
        </div>
        <div id="drum-keys">
          <div className="drum-pad" id="heater-1" onClick={() => keyPress('Q', 'heater 1')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
              className="clip"
              id="Q"
            ></audio>
            Q
          </div>
          <div className="drum-pad" id="heater-2" onClick={() => keyPress('W', 'heater 2')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
              className="clip"
              id="W"
            ></audio>
            W
          </div>
          <div className="drum-pad" id="heater-3" onClick={() => keyPress('E', 'heater 3')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
              className="clip"
              id="E"
            ></audio>
            E
          </div>
          <div className="drum-pad" id="heater-4" onClick={() => keyPress('A', 'heater 4')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
              className="clip"
              id="A"
            ></audio>
            A
          </div>
          <div className="drum-pad" id="clap" onClick={() => keyPress('S', 'clap')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
              className="clip"
              id="S"
            ></audio>
            S
          </div>
          <div className="drum-pad" id="open-HH" onClick={() => keyPress('D', 'open HH')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
              className="clip"
              id="D"
            ></audio>
            D
          </div>
          <div className="drum-pad" id="kick-n-hat" onClick={() => keyPress('Z', 'kick n hat')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
              className="clip"
              id="Z"
            ></audio>
            Z
          </div>
          <div className="drum-pad" id="kick" onClick={() => keyPress('X', 'kick')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
              className="clip"
              id="X"
            ></audio>
            X
          </div>
          <div className="drum-pad" id="closed-HH" onClick={() => keyPress('C', 'closed HH')}>
            <audio
              src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
              className="clip"
              id="C"
            ></audio>
            C
          </div>
        </div>
        <div id="drum-controls">
          <div id="display" style={displayStyle}>{displayValue}</div>
        </div>
      </div>
    </>
  );
}

export default App;
