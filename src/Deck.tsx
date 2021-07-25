import React, { Component } from "react";
import axios from "axios";

type DeckProps = {};
type DeckState = {
  deckId: string;
  cards: object[];
};

class Deck extends Component<DeckProps, DeckState> {
  constructor(props: DeckProps) {
    super(props);
    this.state = {
      deckId: "",
      cards: [],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {}

  async componentDidMount() {
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle"
    );
    console.log(response);
  }
  render() {
    return (
      <div>
        <h1>Deck card component</h1>
        <button onClick={this.handleClick}>New card</button>
      </div>
    );
  }
}

export default Deck;
