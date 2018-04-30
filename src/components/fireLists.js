import db from "./firebaseInit";

var Owners = [];
var Statuses = [];
const ListRef = db.collection("DropDowns");

ListRef.doc("Owners")
  .get()
  .then(doc => {        
    doc
      .data()
      .List.split("#")
      .forEach(LstItem => {            
        Owners.push(LstItem);
      });
  });

ListRef.doc("Statuses")
  .get()
  .then(doc => {
    //console.log(doc.data().List.split("#"))
    doc
      .data()
      .List.split("#")
      .forEach(LstItem => {
        //console.log(user)
        Statuses.push(LstItem);
      });
  });

export default {
  ownersList: Owners,
  statusesList:Statuses
};
