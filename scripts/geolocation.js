/**
 * 
 * @param {string} options optional value
 * @returns coords
 */
export const getLocation = function(options) {
  return new Promise( function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default getLocation