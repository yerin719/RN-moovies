import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import {useColorScheme} from 'react-native';

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text<{isDark: boolean}>`
  color: ${props => (props.isDark ? 'white' : props.theme.textColor)};
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text<{isDark: boolean}>`
  color: ${props => (props.isDark ? 'white' : props.theme.textColor)};
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text<{isDark: boolean}>`
  color: ${props => (props.isDark ? 'white' : props.theme.textColor)};
  font-weight: 600;
  margin-top: 7px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <HMovie>
      <Poster path={posterPath} />
      <HColumn>
        <Title isDark={isDark}>
          {originalTitle.length > 30
            ? `${originalTitle.slice(0, 30)}...`
            : originalTitle}
        </Title>
        {releaseDate ? (
          <Release isDark={isDark}>
            {new Date(releaseDate).toLocaleDateString('ko', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Release>
        ) : null}
        {voteAverage ? <Votes votes={voteAverage} /> : null}
        <Overview isDark={isDark}>
          {overview !== '' && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;
