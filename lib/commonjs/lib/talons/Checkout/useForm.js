"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForm = void 0;

var _client = require("@apollo/client");

const useForm = props => {
  const {
    countriesQuery
  } = props;
  const {
    loading: isLoadingCountries,
    error: countriesError,
    data: countriesData
  } = (0, _client.useQuery)(countriesQuery);
  const {
    countries
  } = countriesData || {};
  return {
    countries,
    hasError: !!countriesError,
    isLoading: !!isLoadingCountries
  };
};

exports.useForm = useForm;
//# sourceMappingURL=useForm.js.map