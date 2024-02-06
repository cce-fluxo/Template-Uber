import React, { useState, useEffect } from 'react';
import ScreensHeader from '../../../components/common/screensHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import CatadorCheckinHistoricFeed from '../../../components/historicFeed/feedCollection/catadorCheckinHistoricFeed';
import { useAuth } from '../../../context/auth';
import api from '../../../services/api';

const CheckinHistoricScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [checkinList, setCheckinList] = useState([]);

  function goToDetails(collect_info) {
    navigation.navigate('Collect Details', {
      itemInformation: collect_info,
    });
  }

  async function getCheckin() {
    try {
      const response = await api.get(`/users/${user.id}/historico/checkin`);
      setCheckinList(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCheckin();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreensHeader navigation={navigation} title={'Meus Check-ins'} />
      <CatadorCheckinHistoricFeed
        goToDetails={goToDetails}
        collectionList={checkinList}
      />
    </SafeAreaView>
  );
};

export default CheckinHistoricScreen;
