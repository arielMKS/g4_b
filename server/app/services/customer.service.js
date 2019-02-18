const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");

const fs = require("fs");
// var data = fs.readFileSync("./customers.json");
// var customers = JSON.parse(data);

const del = id => {
  console.log("CUSTOMER SERVICE", id);
  return mssql.executeProc("Customers_Delete", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
  });
};

const post = payload => {
  // console.log("SERVICE", payload);
  return mssql.executeProc("Customers_Insert", sqlRequest => {
    sqlRequest.addParameter("Email", TYPES.NVarChar, payload.email, {
      length: 225
    });
    sqlRequest.addParameter("FirstName", TYPES.NVarChar, payload.firstName, {
      length: 30
    });
    sqlRequest.addParameter("LastName", TYPES.NVarChar, payload.lastName, {
      length: 50
    });
    sqlRequest.addParameter("Ip", TYPES.NVarChar, payload.ipAddress, {
      length: 15
    });
    sqlRequest.addParameter("Latitude", TYPES.Float, payload.latitude);
    sqlRequest.addParameter("Longitude", TYPES.Float, payload.longitude);
  });
};

const update = (
  id,
  firstName,
  lastName,
  email,
  ipAddress,
  longitude,
  latitude
) => {
  console.log("SERVICE  UPDATE", id, firstName, lastName);

  return mssql.executeProc("Customers_Update", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
    sqlRequest.addParameter("FirstName", TYPES.NVarChar, firstName, {
      length: 30
    });
    sqlRequest.addParameter("LastName", TYPES.NVarChar, lastName, {
      length: 50
    });
    sqlRequest.addParameter("Email", TYPES.NVarChar, email, { length: 225 });
    sqlRequest.addParameter("Ip", TYPES.NVarChar, ipAddress, {
      length: 15
    });
    sqlRequest.addParameter("Longitude", TYPES.Float, longitude);
    sqlRequest.addParameter("Latitude", TYPES.Float, latitude);
  });
};

const getById = id => {
  return mssql
    .executeProc("Customers_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
    })
    .then(response => {
      // console.log("RESPONSE SERVICE", response.resultSets[0]);
      const convertToCamel = toCamel(response.resultSets[0]);
      return convertToCamel;
    });
};

const search = (firstName, lastName, email, ipAddress) => {
  // console.log("SERVICE");
  return mssql
    .executeProc("Customers_SelectByEmail", sqlRequest => {
      sqlRequest.addParameter("Email", TYPES.NVarChar, email, { length: 225 });
      sqlRequest.addParameter("Ip", TYPES.NVarChar, ipAddress, { length: 15 });
    })
    .then(response => {
      // console.log("RESPONSE IN SERVICE", response.resultSets[0]);
      const convertToCamel = toCamel(response.resultSets[0]);
      return convertToCamel || [];
    })
    .catch(error => {
      // console.log("ERROR IN SERVICE");
      return [];
    });
};

const getAll = () => {
  return mssql.executeProc("Customers_SelectAll").then(response => {
    // console.log("RESPONSE SERVICE", response);
    const convertToCamel = toCamel(response.resultSets[0]);
    return convertToCamel;
  });
};

module.exports = {
  del,
  post,
  update,
  getById,
  search,
  getAll
};
