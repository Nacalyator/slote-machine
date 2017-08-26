import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Slot(props) { //{{{
  return (
    <div className="slot">
      {props.value}
    </div>
  );
} //}}}

function Button(props) { //{{{
  return (
    <button className="luckyButton" onClick={props.onClick}>
      {"Play!"}
    </button>
  )
} //}}}

class Row extends React.Component { //{{{
  renderSlot(i) {
    return (
      <Slot
        value={this.props.slots[i]}
      />
    );
  }

  render() {
    return (
      <div className="row">
        {this.renderSlot(0)}
        {this.renderSlot(1)}
        {this.renderSlot(2)}
      </div>
    )
  }
} //}}}

class Game extends React.Component {
  constructor() { //{{{
    super();
    this.state = {
      pts: 100,
      slots: Array(3).fill(null),
      stepNumber: 0
    };
  } //}}}
  
  handleClick() { //{{{
    const slots = generateNewSlots();
    const stepNumber = this.state.stepNumber;
    const winner = calculateWinner(this.state.slots)
    const pts = this.state.pts - 1;
    this.setState({
      slots: slots,
      stepNumber: stepNumber + 1,
      pts: pts + winner.win
    })
  } //}}}

  render() { //{{{
    const pts = this.state.pts;
    const stepNumber = this.state.stepNumber;
    const score = `Your score: ${pts} pts`
    const winner = calculateWinner(this.state.slots)
    
    let status
    if (stepNumber === 0) {
      status = `You have ${pts}`;
    } else if (winner.status) {
      status = `You win ${winner.win}`;
    } else {
      status = `You lose ${winner.lose}`;
    }

    return (
      <div className="game">
        <div className="game-info">
          <div>{score}</div>
          <div>{status}</div>
        </div>
        <div className="machine">
          <Row
            slots={this.state.slots}
          />
          <Button
            onClick={() => this.handleClick()}
          />
        </div>
      </div>
    );
  } //}}}
}


// ========== Render the game {{{
ReactDOM.render(<Game />, document.getElementById('root'));
// ========== Render the game }}}

function calculateWinner(slots) { //{{{
  let res = {
    status: false,
    win: 0,
    lose: 1
  };
  if (slots[0] === slots[1] && slots[0] === slots[2]) {
    res.status = true;
    res.win = 100;
    return res;
  } else if (slots[0] === slots[1] || slots[0] === slots[2] || slots[1] === slots[2]) {
    res.status = true;
    res.win = 10;
    return res;
  } else {
    return res;
  }
} //}}}

function generateNewSlots() { //{{{
  return [randomLetter(), randomLetter(), randomLetter()];
} //}}}

function randomLetter() { //{{{
  const min = 65;
  const max = 90;
  const randomLetterCode = Math.floor(Math.random() * (max - min)) + min;
  return String.fromCharCode(randomLetterCode);
} //}}}
