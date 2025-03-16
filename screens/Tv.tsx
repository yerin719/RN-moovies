import React from 'react';
import {RefreshControl, ScrollView, useColorScheme} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {tvApi} from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';
import {COLORS} from '../colors';
const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery({
    queryKey: ['tv', 'today'],
    queryFn: tvApi.airingToday,
  });
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery({
    queryKey: ['tv', 'top'],
    queryFn: tvApi.topRated,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery({
    queryKey: ['tv', 'trending'],
    queryFn: tvApi.trending,
  });
  const onRefresh = () => {
    queryClient.refetchQueries({queryKey: ['tv']});
  };
  const loading = todayLoading || topLoading || trendingLoading;
  const refreshing = todayRefetching || topRefetching || trendingRefetching;
  if (loading) {
    return <Loader />;
  }
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? COLORS.dark : COLORS.light;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{paddingVertical: 30}}
      style={{backgroundColor: colors.PRIMARY}}>
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};
export default Tv;
