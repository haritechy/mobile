const locationsState = {
  deleteLocationData: [],
  deleteLocationError: null,
  listLocations: null,
  getLocationError: null,
  postLocationData: null,
  postLocationError: null,
  editLocationData: null,
  editLocationError: null,
  selectedLocation: null,
  locationSortBy: '',
  locationFilter: null,
  locationPageDetail: null,
};

function locationsReducer(state = locationsState, action) {
  switch (action.type) {
    case 'ADD_LOCATIONS_SUCCESS':
      return {
        ...state,
        postLocationData: action.payload,
        postLocationError: null,
      };
    case 'ADD_LOCATIONS_FAIL':
      return {
        ...state,
        postLocationData: null,
        postLocationError: action.error,
      };
    case 'EDIT_LOCATION_SUCCESS':
      return {
        ...state,
        editLocationData: action.payload,
        editLocationError: null,
      };
    case 'EDIT_LOCATION_FAIL':
      return {
        ...state,
        editLocationData: null,
        editLocationError: action.error,
      };
    case 'GET_LOCATIONS_SUCCESS':
      return {
        ...state,
        listLocations: action.payload?.result,
        locationPageDetail: action.payload?.pageDetail,
        locationSortBy: action.sortBy,
        locationFilter: action.filter,
        getLocationError: null,
      };
    case 'GET_LOCATIONS_FAIL':
      return {
        ...state,
        listLocations: null,
        locationPageDetail: null,
        getLocationError: action.error,
      };
    case 'DELETE_LOCATIONS_SUCCESS':
      return {
        ...state,
        deleteLocationData: action.payload,
        deleteLocationError: null,
      };
    case 'DELETE_LOCATIONS_FAIL':
      return {
        ...state,
        deleteLocationData: [],
        deleteLocationError: action.error,
      };
    case 'SELECT_LOCATION':
      return {
        ...state,
        selectedLocation: action.data,
      };
    case 'SAVE_FILTER':
      return {
        ...state,
        locationFilter: action?.filter,
      };
    case 'RESET_FILTER':
      return {
        ...state,
        locationFilter: null,
      };
    case 'CLEAR_EDIT_LOCATION':
      return {
        ...state,
        editLocationData: null,
        editLocationError: null,
      };
    case 'CLEAR_LOCATIONS_STATE':
      return {
        ...locationsState,
      };
    default:
      return state;
  }
}

export default locationsReducer;
