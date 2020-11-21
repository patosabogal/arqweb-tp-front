import axios from "axios";
const ENDPOINT = "users";
const addNewLocation = async (ownerId, name, description, capacity, center) => {
  await axios.post(
    `${ENDPOINT}/${ownerId}/locations`,
    {
      ownerId,
      name,
      Description: description,
      capacity,
      geolocation: { latitude: center[0], longitude: center[1] }
    },
    { withCredentials: true }
  );
};
const getLocations = async userId => {
  const { data } = await axios.get(`${ENDPOINT}/${userId}/locations`, {
    withCredentials: true
  });
  console.log(data);
  return data;
  //axios.post(ENDPOINT, { userId, locationId });
};
const checkIn = async (userId, locationId) => {
  const { data } = await axios.post(
    `${ENDPOINT}/checkin`,
    {
      userid: userId,
      locationid: locationId
    },
    { withCredentials: true }
  );
  return data;
};
const getCheckedIn = async userId => {
  const { data } = await axios.get(`${ENDPOINT}/${userId}/checkedin`, {
    withCredentials: true
  });
  console.log(data);
  return data.checkedInStatus;
};
const getHealthStatus = async userId => {
  const { data } = await axios.get(`${ENDPOINT}/${userId}/status`, {
    withCredentials: true
  });
  return data.healthyStatus;
};
const checkOut = async userId => {
  const { data } = await axios.post(
    `${ENDPOINT}/checkout`,
    {
      userid: userId
    },
    { withCredentials: true }
  );
  return data;
};
const reportTest = async (userId, result, date) => {
  const { data } = await axios.post(
    `${ENDPOINT}/${userId}/testcovid${result}`,
    {
      date: date
    },
    { withCredentials: true }
  );
  return data;
};

export {
  addNewLocation,
  getLocations,
  getCheckedIn,
  getHealthStatus,
  checkIn,
  checkOut,
  reportTest
};
