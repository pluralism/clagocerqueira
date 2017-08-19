let fs = require('fs');
let request = require('request');
let es = require('elasticsearch');

let client = new es.Client({
  host: 'localhost:9200'
});


function callback(error, response) {
    if (error) {
        console.log(error);
    }
}

function indexData(filename, indexname, type) {
  fs.readFile(filename, {encoding: 'utf-8'}, function(err, data) {
    data = JSON.parse(data);
    let bulk_request = [];
    for(var i = 0; i < data.length; i++) {
      let obj = data[i];
      let objFinal = {
        id: obj._id.$oid,
        name: obj.name,
        objects: obj.objects
      };
      bulk_request.push({index: {_index: indexname, _type: type, _id: objFinal.id}});
      bulk_request.push(objFinal);
    }

    let insertData = function() {
      client.bulk({
        body: bulk_request.slice(0, 1000)
      }, callback);
    }

    bulk_request = bulk_request.slice(0, 1000);
    console.log(bulk_request.length);

    if(bulk_request.length > 0) {
      setTimeout(insertData, 1000);
    } else {
      console.log('Inserted all records!')
    }
  });
}



function indexDataParishesPresidents(filename, indexname, type) {
  fs.readFile(filename, {encoding: 'utf-8'}, function(err, data) {
    data = JSON.parse(data);
    let bulk_request = [];
    for(var i = 0; i < data.length; i++) {
      let obj = data[i];
      let objFinal = {
        id: obj._id.$oid,
        name: obj.name,
        objects: obj.dates.objects
      };
      // Add an extra field for parishes presidents
      objFinal.objects.objects_data.extra = obj.dates.name;

      bulk_request.push({index: {_index: indexname, _type: type, _id: objFinal.id}});
      bulk_request.push(objFinal);
    }

    let insertData = function() {
      client.bulk({
        body: bulk_request.slice(0, 1000)
      }, callback);
    }

    bulk_request = bulk_request.slice(0, 1000);
    console.log(bulk_request.length);

    if(bulk_request.length > 0) {
      setTimeout(insertData, 1000);
    } else {
      console.log('Inserted all records!')
    }
  });
}




//indexData('./associations.json', 'associations', 'association');
//indexData('./festivities.json', 'festivites', 'festivity');
//indexData('./authors.json', 'authors', 'author');
//indexData('./city_council.json', 'city_councils', 'city_council');
//indexData('./nature.json', 'nature', 'nature');
//indexData('./press.json', 'press', 'press');
//indexData('./presidents.json', 'presidents', 'president');
//indexData('./councilmen.json', 'councilmen', 'councilman');
//indexData('./personalities.json', 'personalities', 'personality');
indexDataParishesPresidents('./parishes_presidents_2.json', 'parishes_presidents', 'parishes_president');
