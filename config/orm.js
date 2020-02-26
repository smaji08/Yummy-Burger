var connection = require("../config/connection");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
    return arr.toString();
}  
  
var orm = {
    // all: function(tableInput, col, cb) {
    //   var queryString = "SELECT *, ";

    //   queryString += "count(IF(NOT ";
    //   queryString += col.toString();
    //   queryString += ",1,NULL)) OVER() toEat, ";
    //   queryString += "count(IF(";
    //   queryString += col.toString();
    //   queryString += ",1,NULL)) OVER() ate ";
    //   queryString += "FROM " + tableInput + ";";
    //   console.log(queryString);
    //   connection.query(queryString, function(err, result) {
    //     if (err) throw err
    //     cb(result)
    //   });
    // },  
    // SELECT *, (SELECT count(IF(NOT devoured,1,NULL)) FROM Burgers ) toEat, 
    // (SELECT count(IF(devoured,1,NULL))  FROM Burgers ) ate  FROM Burgers;
    all: function(tableInput, col, cb) {
      var queryString = "SELECT *, ";

      queryString += "(SELECT count(IF(NOT ";
      queryString += col.toString();
      queryString += ",1,NULL)) FROM " +tableInput + ") toEat, "
      queryString += "(SELECT count(IF(";
      queryString += col.toString();
      queryString += ",1,NULL)) FROM " +tableInput + ") ate "
      queryString += "FROM " + tableInput + ";";
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) throw err
        cb(result)
      });
    },  

    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString)
  
      connection.query(queryString, vals, function(err, result) {
        if (err) throw err
        cb(result)
      });
    },

    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString)
      connection.query(queryString, function(err, result) {
        if (err) throw err
        cb(result)
      });
    },

    delete: function(table, condition, cb){
      var queryString = "DELETE FROM " + table

      queryString += " WHERE "
      queryString += condition

      console.log(queryString)
      connection.query(queryString, function(err, result){
        if (err) throw err
        cb(result)
      })
    }
}

module.exports = orm;