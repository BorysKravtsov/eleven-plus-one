import React from "react";
import styled from "styled-components";
import Image from "next/image";

const TableContainer = styled.div`
  margin: 20px 0;
`;

const TableHeading = styled.h2`
  font-size: 24px;
  font-family: "Kanit", sans-serif;
  font-weight: 500;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #17111d;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TableCell = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-family: "Figtree", sans-serif;
  font-weight: 500;
`;

const TableHeader = styled(TableRow)`
  background-color: #251a2e;
  font-weight: bold;
`;

const TeamLogo = styled.div`
  width: auto;
  height: auto;
  margin-right: 10px;
`;

const TeamNameCell = styled(TableCell)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 3;
`;

const TeamLogoStyle = {
  width: "16px",
  height: "16px",
};

const Table = ({ data }) => {
  return (
    <TableContainer>
      <TableHeading>League Table</TableHeading>
      <TableHeader>
        <TableCell>#</TableCell>
        <TeamNameCell>TEAM</TeamNameCell>
        <TableCell>MP</TableCell>
        <TableCell>W</TableCell>
        <TableCell>D</TableCell>
        <TableCell>L</TableCell>
        <TableCell>G</TableCell>
        <TableCell>PTS</TableCell>
      </TableHeader>
      {data.map((team, index) => (
        <TableRow key={team.team.id}>
          <TableCell>{index + 1}</TableCell>
          <TeamNameCell>
            <TeamLogo>
              <Image
                src={team.team.logo}
                alt={`${team.team.name} logo`}
                width={16}
                height={16}
                style={TeamLogoStyle}
              />
            </TeamLogo>
            {team.team.name}
          </TeamNameCell>
          <TableCell>{team.all.played}</TableCell>
          <TableCell>{team.all.win}</TableCell>
          <TableCell>{team.all.draw}</TableCell>
          <TableCell>{team.all.lose}</TableCell>
          <TableCell>{team.all.goals.for}:{team.all.goals.against}</TableCell>
          <TableCell>{team.points}</TableCell>
        </TableRow>
      ))}
    </TableContainer>
  );
};

export default Table;
