"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNavigation = void 0;

var _react = require("react");

var _app = require("@magento/peregrine/lib/context/app");

var _catalog = require("@magento/peregrine/lib/context/catalog");

var _user = require("@magento/peregrine/lib/context/user");

var _useAwaitQuery = require("@magento/peregrine/lib/hooks/useAwaitQuery");

const ancestors = {
  CREATE_ACCOUNT: 'SIGN_IN',
  FORGOT_PASSWORD: 'SIGN_IN',
  MY_ACCOUNT: 'MENU',
  SIGN_IN: 'MENU',
  MENU: null
};

const useNavigation = props => {
  const {
    customerQuery
  } = props; // retrieve app state from context

  const [appState, {
    closeDrawer
  }] = (0, _app.useAppContext)();
  const [catalogState, {
    actions: catalogActions
  }] = (0, _catalog.useCatalogContext)();
  const [, {
    getUserDetails
  }] = (0, _user.useUserContext)();
  const fetchUserDetails = (0, _useAwaitQuery.useAwaitQuery)(customerQuery); // request data from server

  (0, _react.useEffect)(() => {
    getUserDetails({
      fetchUserDetails
    });
  }, [fetchUserDetails, getUserDetails]); // extract relevant data from app state

  const {
    drawer
  } = appState;
  const isOpen = drawer === 'nav';
  const {
    categories,
    rootCategoryId
  } = catalogState; // get local state

  const [view, setView] = (0, _react.useState)('MENU');
  const [categoryId, setCategoryId] = (0, _react.useState)(rootCategoryId); // define local variables

  const category = categories[categoryId];
  const isTopLevel = categoryId === rootCategoryId;
  const hasModal = view !== 'MENU'; // define handlers

  const handleBack = (0, _react.useCallback)(() => {
    const parent = ancestors[view];

    if (parent) {
      setView(parent);
    } else if (category && !isTopLevel) {
      setCategoryId(category.parentId);
    } else {
      closeDrawer();
    }
  }, [category, closeDrawer, isTopLevel, view]);
  const handleClose = (0, _react.useCallback)(() => {
    closeDrawer();
  }, [closeDrawer]); // create callbacks for local state

  const showCreateAccount = (0, _react.useCallback)(() => {
    setView('CREATE_ACCOUNT');
  }, [setView]);
  const showForgotPassword = (0, _react.useCallback)(() => {
    setView('FORGOT_PASSWORD');
  }, [setView]);
  const showMainMenu = (0, _react.useCallback)(() => {
    setView('MENU');
  }, [setView]);
  const showMyAccount = (0, _react.useCallback)(() => {
    setView('MY_ACCOUNT');
  }, [setView]);
  const showSignIn = (0, _react.useCallback)(() => {
    setView('SIGN_IN');
  }, [setView]);
  return {
    catalogActions,
    categories,
    categoryId,
    handleBack,
    handleClose,
    hasModal,
    isOpen,
    isTopLevel,
    setCategoryId,
    showCreateAccount,
    showForgotPassword,
    showMainMenu,
    showMyAccount,
    showSignIn,
    view
  };
};

exports.useNavigation = useNavigation;
//# sourceMappingURL=useNavigation.js.map