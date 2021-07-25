import React, { Component } from "react";
import axios from "axios";
import "./Deck.css";

type DeckProps = {};
type DeckState = {
  deckId: string;
  cards: { cards: { image: string }[] }[];
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

  async handleClick() {
    if (this.state.deckId) {
      const card = await axios.get(
        `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
      );
      console.log(card);

      this.setState((st) => ({ cards: [...st.cards, card.data] }));
    }
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle"
    );
    // console.log(response);
    this.setState({ deckId: response.data.deck_id });
  }
  render() {
    return (
      <div>
        <h1>Deck card component</h1>
        <button onClick={this.handleClick}>New card</button>
        {this.state.cards.map((data, i) => (
          <img key={i} src={data.cards[0].image} />
        ))}
      </div>
    );
  }
}

export default Deck;
