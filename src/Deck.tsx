import React, { Component } from "react";
import axios from "axios";
import "./Deck.css";
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

type DeckData = {
  cards?: [];
  deck_id?: string;
  remaining?: number;
  success?: boolean;
};

type CardData = {
  code?: string;
  image?: string;
  name?: string;
};

type DeckProps = {};
type DeckState = {
  deck: DeckData;
  cards: CardData[];
};

class Deck extends Component<DeckProps, DeckState> {
  constructor(props: DeckProps) {
    super(props);
    this.state = {
      deck: {},
      cards: [],
    };

    this.getCard = this.getCard.bind(this);
  }

  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) throw new Error("No cards remaining!");

      let cardData = cardRes.data.cards[0];
      let newCard: CardData = {
        code: cardData.code,
        image: cardData.image,
        name: `${cardData.value} of ${cardData.suit}`,
      };

      this.setState((st) => ({
        cards: [...st.cards, newCard],
      }));
      console.log(cardRes.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}new/shuffle`);
    // console.log(response);
    this.setState({ deck: response.data });
  }

  render() {
    return (
      <div>
        <h1>Deck card component</h1>
        <button onClick={this.getCard}>New card</button>
        {this.state.cards.map((card) => {
          return <Card key={card.code} src={card.image} alt={card.name} />;
        })}
      </div>
    );
  }
}

export default Deck;
