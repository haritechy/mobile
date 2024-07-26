const getKeyFromValue = (obj, value) => {
  return Object.keys(obj).find(key => obj[key] === value);
};

const deleteLocationInfo = data => {
  return {
    description: `You are about to delete ${data?.name} from your locations. This location has ${data?.productsCount} products associated with it. \n\nIf you proceed, all the location information including it is products will be purged and cannot be recovered`,
    termsText: 'I accept to delete the associated products.',
  };
};
export {getKeyFromValue, deleteLocationInfo};
