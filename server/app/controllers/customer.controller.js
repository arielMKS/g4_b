const customerService = require("../services/customer.service");

const del = (req, res) => {
  // console.log("CONTROLLER DELETE", req.params.id);
  customerService
    .del(req.params.id)
    .then(response => {
      // console.log("RESPONSE IN CONTROLLER DEL");
      res.sendStatus(200);
    })
    .catch(error => {
      console.log("ERROR IN CONTROLLER DELETE");
    });
};

const post = (req, res) => {
  customerService
    .post(req.body)
    .then(response => {
      // console.log("CONTROLLER POST");
      res.sendStatus(201);
    })
    .catch(error => console.log("ERROR IN CONTROLLER POST"));
};

const update = (req, res) => {
  console.log("CONTROLLER BODY UPDATE", req.body);
  const {
    firstName,
    lastName,
    email,
    ipAddress,
    longitude,
    latitude
  } = req.body;
  const { id } = req.params;

  customerService
    .update(id, firstName, lastName, email, ipAddress, longitude, latitude)
    .then(response => {
      // console.log("CONTROLLER UPDATE RESPONSE", response);
      res.sendStatus(200); // same as res.status(200).send('OK')
    })
    .catch(error => console.log("ERROR IN CONTROLLER UPDATE"));
};

const getById = (req, res) => {
  customerService
    .getById(req.params.id)
    .then(response => {
      // console.log("RESPONSE IN CONTROLLER", response);
      return res.status(200).json(response);
    })
    .catch(error => console.log("Error in Controller"));
};

const search = (req, res) => {
  const { firstName, lastName, email, ipAddress } = req.body;

  customerService
    .search(firstName, lastName, email, ipAddress)
    .then(response => {
      console.log("RESPONSE IN CONTROLLER", response);
      res.status(201).json(response);
    })
    .catch(error => {
      console.log("Error in customer controller search");
      res.status(500).send(error); // show error msg in command line
    });
};

const getAll = (req, res) => {
  customerService
    .getAll()
    .then(response => {
      // console.log("RESPONSE IN CONTROLLER", response);
      res.status(200).json(response);
    })
    .catch(error => {
      console.log("CUSTOMER CONTROLLER ERROR!");
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
