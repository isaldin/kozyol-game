import React, { Component } from 'react'
import { Title } from 'ui-elements/form'
import { cardImage } from 'helpers/cardImage'
import { Desk, suitIsRed, suitSymbols } from 'model/Card'
import { CardItemOnTable, CardsList, CardSlot, Container } from './elements'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getCardsInDeck, getCardsOnTable, getTrump } from 'store/selectors/gameState'
import { getDeskItemCards } from 'helpers/getDeskItemCards'

const cardBack = 'https://raw.githubusercontent.com/richardschneider/cardsJS/' +
  'fe5e857c5094468c58a7cfe0a7075ad351fc7920/cards/BLUE_BACK.svg'
const cardsInDeckTotal = 36

export interface CardsOnTableProps {
  cardsOnTable: Desk
  trump: number
  cardsInDeck: number
}

export class CardsOnTableComponent extends Component<CardsOnTableProps, any> {
  render(): React.ReactElement {
    const { cardsOnTable, cardsInDeck, trump } = this.props
    const slotsCount = getDeskItemCards(cardsOnTable[0]).length
    const slots = [...Array(slotsCount).keys()]
      .map(i => cardsOnTable.map(item => getDeskItemCards(item)[i]))

    return (
      <Container>
        <Title>
            Колода: {cardsInDeck || 0}/{cardsInDeckTotal}. Козырь:
            <SuitSymbol isRed={suitIsRed[trump]}>{suitSymbols[trump]}</SuitSymbol>
        </Title>
        <CardsList>
          {slots.map((slot, i) =>
            <CardSlot key={i} cardsCount={slot.length}>{slot.map((card, j) => {
              const key = card ? card.toString() : j
              const image = card ? cardImage(card) : cardBack

              return <CardItemOnTable key={key} src={image}/>
            })}
            </CardSlot>
          )}
        </CardsList>
      </Container>
    )
  }
}

export const SuitSymbol = styled.span<{ isRed?: boolean }>`
  font-size: 24px;
  line-height: 18px;
  font-weight: bold;
  margin: 0 5px;
  display: inline-block;
  border: 1px solid #4e4e4e;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 5px;

  ${({ isRed }) => isRed && css`
    color: red;
  `}
`

export const CardsOnTable = connect(
  createSelector(
    getCardsOnTable,
    getTrump,
    getCardsInDeck,
    (cardsOnTable, trump, cardsInDeck) => ({
      cardsOnTable,
      trump,
      cardsInDeck
    })
  ),
  () => ({})
)(CardsOnTableComponent)
