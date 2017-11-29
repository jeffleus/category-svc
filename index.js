var Category = require('./Category');

var args = process.argv.slice(2);
//console.log(process.argv);

var sport = {
	SportCodeID: 'XXX', 
	description: "yo, dis an update suckah",
	inSeasonStart: "2016-11-01T12:12:12.123Z",
	inSeasonEnd: "2017-03-24T12:12:12.123Z",
	offSeasonStart: "2017-03-25T12:12:12.123Z",
	offSeasonEnd: "2017-06-30T12:12:12.123Z"
};

var id = 1;
var filter = ('1,3,5,7').split(',');
console.log("FILTER: ", filter);

Category.get(null, null).then(function(result) {
	console.log(result);
	return;
}).catch(function(err) {
	console.error(err);
	return;
}).finally(function() {
	Category.close();
	return;
});

function _logTest(id, filter) {
    console.log('ID: ', id);
    console.log('FILTER: ', filter);
};