import React from 'react';
import './App.scss';

const musicOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const musicTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

const activeStyle = {
  backgroundColor: "white",
  height: "72px",
  "margin-top": "3px",
  boxShadow: "0 3px white",

};

const inactiveStyle = {
  backgroundColor: "silver",
  boxShadow: "3px 3px  black"
};

class DrumPad extends React.Component {
  state = {
    padStyle: inactiveStyle
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  };
  activatePad = () => {
    this.state.padStyle === activeStyle
      ? this.setState({
        padStyle: inactiveStyle
      })
      : this.setState({
        padStyle: activeStyle
      });
  };

  playSound = e => {
    if (!this.props.isOn) {
      this.props.setDisplayText("Turn the machine ON");
      return;
    }
    const sound = document.getElementById(this.props.keyTrigger);
    //kad se klikne uvek pocinje od pocetka, ovako moze da se spamuje inace nece da krene zvuk ponovo dok se ne zavrsi
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.setDisplayText(this.props.clipId);
  };

  render() {
    return (
      <div
        id={this.props.clipId}
        onClick={this.playSound}
        className="drum-pad"
        style={this.state.padStyle}
      >
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.clip}
        ></audio>
        {this.props.keyTrigger}
      </div>
    );
  }
}

function Display(props) {
  const onSwitch = {
    color: "#00ff00",
    textShadow: "0 0 10px #00ff00"
  }
  return (
    <div className="displayDiv">
      <h1>Drum machine</h1>
      <label className="switchbutton">
        <input
          type="checkbox"
          checked={props.isOn}
          onChange={props.switchButton}
        />
        <i style={props.isOn ? onSwitch : null} className="material-icons" >power_settings_new</i>
      </label>
      <p id="display">{props.showText}</p>
      {/* checked property checks if isMusicOne is true, then first is checked else second is checked !false === true */}
      <form className="musicSelect">

        <label for="musicOne">
          <input
            type="radio"
            name="music-select"
            value="musicOne"
            id="musicOne"
            checked={props.isMusicOne}
            onChange={props.changeMusic}
          />
          <span style={ props.isMusicOne? {background:'#7bc74d'} :{color:'#7bc74d'}} className="musicOne">Music 1</span>
        </label>

        <label for="musicTwo">
        <input
            type="radio"
            name="music-select"
            value="musicTwo"
            id="musicTwo"
            checked={!props.isMusicOne}
            onChange={props.changeMusic}
          />
          <span style={ !props.isMusicOne? {background:'#7bc74d'} :{color:'#7bc74d'}} className="musicTwo">Music 2</span>
        </label>
      </form>
    </div>
  );
}

class App extends React.Component {
  state = {
    displayText: " ",
    isMusicOne: true,
    isOn: true
  };

  switchButton = () => {
    this.setDisplayText("");
    this.setState({
      isOn: !this.state.isOn
    });
  };

  changeMusic = () => {
    this.setState({
      isMusicOne: !this.state.isMusicOne
    });
  };

  setDisplayText = text => {
    this.setState({
      displayText: text
    });
  };
  render() {
    //check if we need to use first or second music tracks
    let playList = this.state.isMusicOne ? musicOne : musicTwo;
    return (
      <div id="drum-machine" className="App">
        <Display
          showText={this.state.displayText}
          changeMusic={this.changeMusic}
          isMusicOne={this.state.isMusicOne}
          isOn={this.state.isOn}
          switchButton={this.switchButton}
        />
        <div className="padBank">
          {
            //if power is Off removes url from sound so it stops if its playing
            this.state.isOn ?
              playList.map(sound => {
                return (
                  <DrumPad
                    clipId={sound.id}
                    keyTrigger={sound.keyTrigger}
                    keyCode={sound.keyCode}
                    clip={sound.url}
                    key={sound.keyCode}
                    setDisplayText={this.setDisplayText}
                    isOn={this.state.isOn}
                  />
                );
              }) :
              playList.map(sound => {
                return (
                  <DrumPad
                    clipId={sound.id}
                    keyTrigger={sound.keyTrigger}
                    keyCode={sound.keyCode}
                    clip=""
                    key={sound.keyCode}
                    setDisplayText={this.setDisplayText}
                    isOn={this.state.isOn}
                  />
                );
              })
          }
        </div>
      </div>
    );
  }
}


export default App;
