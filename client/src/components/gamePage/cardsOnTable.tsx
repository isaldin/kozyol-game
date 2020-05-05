import React, { Component } from 'react';
import { Title } from 'ui-elements/form';
import { cardImage } from 'helpers/cardImage';
import { Cards, Desk, suitSymbols } from 'model/Card';
import { CardItem, CardsList, CardSlot, Container } from './elements';

export interface CardsOnTableProps {
  cards: Desk
  trump: number
}

export class CardsOnTable extends Component<CardsOnTableProps, any> {
  render(): React.ReactElement {
    const slots: Cards[] = []

    if (this.props.cards.length > 0) {
      const first = this.props.cards[0]
      const firstUserId = parseInt(Object.keys(first)[0])
      const firstCards = first[firstUserId]
      const slotsCount = firstCards.length

      for (let i = 0; i < slotsCount; i++) {
        this.props.cards.forEach(item => {
          const userId = parseInt(Object.keys(item)[0])
          const cards = item[userId]

          slots[i] = slots[i] || []

          if (cards[i]) {
            slots[i].push(cards[i])
          }
        })
      }
    }

    return (
      <Container>
        <Title>Карты на столе (козырь: {suitSymbols[this.props.trump]})</Title>
        <CardsList>
          {slots.map((slot, i) => <CardSlot key={i}>{slot.map(card =>
            <CardItem key={card.toString()} src={cardImage(card)}/>
          )}</CardSlot>)}
        </CardsList>
      </Container>
    )
  }
}
