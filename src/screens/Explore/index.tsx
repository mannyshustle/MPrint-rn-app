import React from 'react';
import {ScrollView} from 'react-native';
import {SearchHeader} from './SearchHeader';
import {PopularCategories} from './PopularCategories';
import {PopularProducts} from './PopularProducts';
// import {MerchantCampaigns} from './MerchantCampaigns';
// import {RecommendedPlaces} from './RecommendedPlaces';
// import {HotDeals} from './HotDeals';
// import {HighlightTabs} from './HighlightTabs';
// import {Divider} from 'lib_components';
import {useSafeAreaScrollViewStyles} from 'lib_hooks';
import {useScrollToTop} from '@react-navigation/native';
import {Spacer} from 'lib_components';
export const Explore: React.FC = () => {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const styles = useSafeAreaScrollViewStyles(false);

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}>
      <SearchHeader />
      <PopularCategories />
      <Spacer />
      <PopularProducts />
    </ScrollView>
  );
};
