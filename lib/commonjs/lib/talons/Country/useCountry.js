"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCountry = void 0;

var _client = require("@apollo/client");

const useCountry = props => {
  const {
    queries: {
      getCountriesQuery
    }
  } = props;
  const {
    data,
    error,
    loading
  } = (0, _client.useQuery)(getCountriesQuery);
  let formattedCountriesData = [{
    label: 'Loading Countries...',
    value: ''
  }];

  if (!loading && !error) {
    const {
      countries
    } = data;
    formattedCountriesData = countries.map(country => ({
      // If a country is missing the full english name just show the abbreviation.
      label: country.full_name_english || country.two_letter_abbreviation,
      value: country.two_letter_abbreviation
    }));
    formattedCountriesData.sort((a, b) => a.label < b.label ? -1 : 1);
  }

  return {
    countries: formattedCountriesData,
    loading
  };
};

exports.useCountry = useCountry;
//# sourceMappingURL=useCountry.js.map