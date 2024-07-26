const homeState = {
  listCharts: null,
};

function chartReducer(state = homeState, action) {
  switch (action.type) {
    case 'GET_CHARTS':
      return {
        ...state,
        listCharts: action.payload?.result,
      };
    default:
      return state;
  }
}

export default chartReducer;
