import React, { Component } from "react";
import "./Card.css";

type CardProps = {
  src?: string;
  alt?: string;
};

class Card extends Component<CardProps> {
  render() {
    return <img src={this.props.src} alt={this.props.alt} />;
  }
}

export default Card;
