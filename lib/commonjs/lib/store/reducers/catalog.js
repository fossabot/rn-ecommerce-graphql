"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.name = void 0;

var _reduxActions = require("redux-actions");

var _catalog = _interopRequireDefault(require("../actions/catalog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const name = 'catalog';
exports.name = name;

const fromPairs = pairs => {
  const result = {};

  for (const [key, value] of pairs) {
    result[key] = value;
  }

  return result;
};

const initialState = {
  categories: {},
  currentPage: 1,
  pageSize: 6,
  prevPageTotal: null,
  rootCategoryId: 2
};
const reducerMap = {
  [_catalog.default.updateCategories]: (state, {
    payload
  }) => {
    const {
      id
    } = payload;
    const currentCategory = state.categories[id] || {}; // if category has already been fetched, do nothing

    if (currentCategory.children) {
      return state;
    } // sort children by `position`


    const children = [...payload.children].sort((a, b) => {
      if (a.position > b.position) {
        return 1;
      } else if (a.position === b.position && a.id > b.id) {
        return 1;
      } else {
        return -1;
      }
    }); // use a Map to preserve sort order
    // since a plain object with numeric keys would lose it

    const childMap = new Map(); // merge children and add them to the Map, keyed by `id`

    for (const child of children) {
      childMap.set(child.id, { ...child,
        ...(state.categories[child.id] || {}),
        parentId: id
      });
    } // merge in the fetched child last


    return { ...state,
      categories: { ...state.categories,
        ...fromPairs(childMap),
        [id]: { ...currentCategory,
          ...payload,
          children: [...childMap.keys()],
          children_count: childMap.size
        }
      }
    };
  },
  [_catalog.default.setRootCategory]: (state, {
    payload
  }) => {
    return { ...state,
      rootCategoryId: payload
    };
  },
  [_catalog.default.setCurrentPage.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return state;
    }

    return { ...state,
      currentPage: payload
    };
  },
  [_catalog.default.setPrevPageTotal.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return state;
    }

    return { ...state,
      prevPageTotal: payload
    };
  }
};

var _default = (0, _reduxActions.handleActions)(reducerMap, initialState);

exports.default = _default;
//# sourceMappingURL=catalog.js.map