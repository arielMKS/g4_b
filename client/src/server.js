import axios from "axios";

export function del(id) {
  // console.log("DELETE FIRING", id);
  return axios
    .delete("/api/customers/" + id)
    .then(response => {
      console.log("RESPONSE", response);
    })
    .catch(error => console.log("ERROR IN SERVER DEL"));
}

export function post(payload) {
  return axios
    .post("/api/customers/", payload)
    .then(response => {
      console.log("RESPONSE", response);
    })
    .catch(error => console.log("ERROR IN SERVER POST"));
}

export function update(payload) {
  return axios
    .put("/api/customers/" + payload.id, payload)
    .then(response => {
      console.log("RESPONSE SERVER", response);
    })
    .catch(error => console.log("Error in server"));
}

export function getById(id) {
  return axios.get("/api/customers/" + id).then(response => {
    return response;
  });
}

export function search(payload) {
  return (
    axios
      // Accessible in mid-tier as req.body.recipient etc
      .post("/api/customers/search", payload)
      .then(response => {
        console.log("RESPONSE FROM SEARCH", response);
        return response;
      })
      .catch(error => console.log("Error in search"))
  );
}

export function getAll() {
  return axios
    .get("/api/customers")
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log("There was an error!");
    });
}
