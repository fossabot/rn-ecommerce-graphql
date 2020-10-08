"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePagination = void 0;

var _react = require("react");

const usePagination = props => {
  const {
    currentPage,
    setPage,
    totalPages,
    tileBuffer = 2
  } = props;
  const getLeadTile = (0, _react.useCallback)((currentPage, totalPages) => {
    const selectedTile = currentPage;
    const leftBound = 1 + tileBuffer;
    const rightBound = totalPages - tileBuffer;
    let leadTile = selectedTile - tileBuffer;

    if (selectedTile < leftBound) {
      leadTile = 1;
    } else if (selectedTile > rightBound) {
      leadTile = Math.max(totalPages - tileBuffer * 2, 1);
    }

    return leadTile;
  }, [tileBuffer]);
  const handleLeftSkip = (0, _react.useCallback)(() => {
    const leadTile = getLeadTile(currentPage, totalPages);
    const leftSkip = Math.max(1, leadTile - (tileBuffer + 1));
    setPage(leftSkip);
  }, [currentPage, getLeadTile, setPage, totalPages, tileBuffer]);
  const handleRightSkip = (0, _react.useCallback)(() => {
    const leadTile = getLeadTile(currentPage, totalPages);
    const rightSkip = Math.min(totalPages, leadTile + tileBuffer * 2 + (tileBuffer + 1));
    setPage(rightSkip);
  }, [currentPage, getLeadTile, setPage, totalPages, tileBuffer]);
  const handleNavBack = (0, _react.useCallback)(() => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  }, [currentPage, setPage]);
  const handleNavForward = (0, _react.useCallback)(() => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  }, [currentPage, setPage, totalPages]);
  const isActiveLeft = currentPage !== 1;
  const isActiveRight = currentPage !== totalPages;
  const tiles = (0, _react.useMemo)(() => {
    const tiles = [];
    const visibleBuffer = Math.min(tileBuffer * 2, totalPages - 1);
    const leadTile = getLeadTile(currentPage, totalPages);

    for (let i = leadTile; i <= leadTile + visibleBuffer; i++) {
      const tile = i;
      tiles.push(tile);
    }

    return tiles;
  }, [currentPage, getLeadTile, totalPages, tileBuffer]);
  return {
    handleLeftSkip,
    handleRightSkip,
    handleNavBack,
    handleNavForward,
    isActiveLeft,
    isActiveRight,
    tiles
  };
};

exports.usePagination = usePagination;
//# sourceMappingURL=usePagination.js.map