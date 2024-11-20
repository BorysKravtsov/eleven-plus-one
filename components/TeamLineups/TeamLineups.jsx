import React, { useState, useEffect } from "react";
import styled from "styled-components";


const SquadsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 auto;
  max-width: 500px;
`;
const TeamColumn = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
`;



const TeamTitle = styled.h3`
  font-size: 18px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const PlayerList = styled.ul`
  list-style: none;
  padding: 0;
  &.away-squad, &.away-substitutes {
    text-align: right;
  }
`;

const PlayerItem = styled.li`
  list-style: none;
  margin: 5px 0;
  font-size: 14px;
  font-family: "Figtree", sans-serif;
`;

const TeamSquads = ({ homeSquad, awaySquad, homeSubstitutes, awaySubstitutes, homeCoach, awayCoach }) => {
  return (
    <SquadsContainer>
      <TeamTitle>Starting XI</TeamTitle>
      <TeamColumn>
        <PlayerList>
          {homeSquad.map((player, index) => (
            <PlayerItem key={index}>{player}</PlayerItem>
          ))}
        </PlayerList>
        <PlayerList className="away-squad">
          {awaySquad.map((player, index) => (
            <PlayerItem key={index}>{player}</PlayerItem>
          ))}
        </PlayerList>
      </TeamColumn>
      <TeamTitle>Substitutes</TeamTitle>
      <TeamColumn>
        <PlayerList>
          {homeSubstitutes.map((player, index) => (
            <PlayerItem key={index}>{player}</PlayerItem>
          ))}
        </PlayerList>
        <PlayerList className="away-substitutes">
          {awaySubstitutes.map((player, index) => (
            <PlayerItem key={index}>{player}</PlayerItem>
          ))}
        </PlayerList>
      </TeamColumn>
      <TeamTitle>Coaches</TeamTitle>
      <TeamColumn>
        <PlayerItem>{homeCoach}</PlayerItem>
        <PlayerItem className="away-coach">{awayCoach}</PlayerItem>
      </TeamColumn>
    </SquadsContainer>
  );
};

export default TeamSquads;
