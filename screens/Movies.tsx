import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  useColorScheme,
  View,
  ListRenderItem,
} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import HMedia from '../components/HMedia';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import {MovieResponse, moviesApi} from '../api';
import {COLORS} from '../colors';
import {Movie} from '../api';

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const ListTitle = styled.Text<{isDark: boolean}>`
  color: ${props => (props.isDark ? 'white' : props.theme.textColor)};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingContainer = styled.View`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: moviesApi.nowPlaying,
  });

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>({
    queryKey: ['movies', 'upcoming'],
    queryFn: moviesApi.upcoming,
  });

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>({
    queryKey: ['movies', 'trending'],
    queryFn: moviesApi.trending,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({queryKey: ['movies']});
    setRefreshing(false);
  };
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? COLORS.dark : COLORS.light;

  const renderVMedia: ListRenderItem<Movie> = ({item}) => (
    <VMedia
      posterPath={item.poster_path || ''}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia: ListRenderItem<Movie> = ({item}) => (
    <HMedia
      posterPath={item.poster_path || ''}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList<Movie>
      style={{backgroundColor: colors.PRIMARY}}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: '100%',
              height: SCREEN_HEIGHT / 4,
            }}>
            {nowPlayingData?.results.map(movie => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ''}
                posterPath={movie.poster_path || ''}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle isDark={isDark}>Trending Movies</ListTitle>
            <TrendingContainer>
              <FlatList<Movie>
                data={trendingData?.results || []}
                horizontal
                keyExtractor={(item: Movie) => item.id + ''}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 30}}
                ItemSeparatorComponent={() => <View style={{width: 30}} />}
                renderItem={renderVMedia}
              />
            </TrendingContainer>
          </ListContainer>
          <ComingSoonTitle isDark={isDark}>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData?.results || []}
      keyExtractor={(item: Movie) => item.id + ''}
      ItemSeparatorComponent={() => <View style={{height: 20}} />}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
