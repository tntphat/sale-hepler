// import { axiosMain } from '..';
import { useEffect, useState } from 'react';
import { PATHS } from '../constants/paths';
import axios from 'axios';

const FETCH_TYPE = {
  CITIES: 'FETCH_CITIES',
  DISTRICTS: 'FETCH_DISTRICTS',
  WARDS: 'FETCH_WARD',
};

interface Location {
  value: number;
  label: string;
}

async function fetchLocationOptions(fetchType: string, locationId?: number) {
  let url: string;
  switch (fetchType) {
    case FETCH_TYPE.CITIES: {
      url = PATHS.CITIES;
      break;
    }
    case FETCH_TYPE.DISTRICTS: {
      url = `${PATHS.DISTRICTS}/${locationId}.json`;
      break;
    }
    case FETCH_TYPE.WARDS: {
      url = `${PATHS.WARDS}/${locationId}.json`;
      break;
    }
    default: {
      return [];
    }
  }

  let locations = (await axios.get(url)).data.data;
  if (locations) {
    locations = locations.map(({ id, name }: { id: number; name: string }) => {
      return { id: id, title: name };
    });
  }
  return locations;
}

export const useLocation = () => {
  const [state, setState] = useState<any>({
    cityOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedCity: null,
    selectedDistrict: null,
    selectedWard: null,
  });

  const { selectedCity, selectedDistrict } = state;
  useEffect(() => {
    const fetchCities = async () => {
      const options = await fetchLocationOptions(FETCH_TYPE.CITIES);
      setState({ ...state, cityOptions: options });
    };
    fetchCities();
  }, []);

  useEffect(() => {
    (async function () {
      if (!selectedCity) return;
      const options = await fetchLocationOptions(FETCH_TYPE.DISTRICTS, selectedCity.id);
      if (options) setState({ ...state, districtOptions: options });
    })();
    // console.log(state.districtOptions);
  }, [selectedCity]);

  useEffect(() => {
    (async function () {
      if (!selectedDistrict) return;
      const options = await fetchLocationOptions(FETCH_TYPE.WARDS, selectedDistrict.id);

      setState({ ...state, wardOptions: options });
    })();
  }, [selectedDistrict]);

  function onSelectCity(option: any) {
    console.log(option);
    if (option.id !== selectedCity?.id) {
      setState({
        ...state,
        districtOptions: [],
        wardOptions: [],
        selectedCity: option,
        selectedDistrict: null,
        selectedWard: null,
      });
    }
  }

  function onSelectDistrict(option: any) {
    if (option.id != selectedDistrict?.id) {
      setState({
        ...state,
        wardOptions: [],
        selectedDistrict: option,
        onSelectWard: null,
      });
    }
  }

  function onSelectedWard(option: any) {
    setState({ ...state, selectedWard: option });
  }

  function onSubmit(e: any) {
    e.preventDefault();
  }

  return { state, onSelectCity, onSelectDistrict, onSelectedWard, onSubmit };
};
