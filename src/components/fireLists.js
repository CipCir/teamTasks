import db from "./firebaseInit";

var Owners = [];
var Statuses = [];
var Envs=[];
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

ListRef.doc("Envmts")
  .get()
  .then(doc => {        
    doc
      .data()
      .List.split("#")
      .forEach(LstItem => {            
        Envs.push(LstItem);
      });
  });

export default {
  ownersList: Owners,
  statusesList:Statuses,
  envsList:Envs
};
