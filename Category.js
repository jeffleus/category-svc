'use strict';
var Sequelize = require('sequelize');
var Config = require('./Config')();
var sequelize = new Sequelize('FS_VATECH', Config.username, Config.password, {
	host: 'callsheet-mysql.cn6x6nhayn9c.us-west-2.rds.amazonaws.com',
	port: 3306,
    pool: {
        max: 10,
        min: 1,
        idle: 100
    }
});

var Category = sequelize.define('category', {
  CateogryID: { 
	  type: Sequelize.INTEGER, 
	  primaryKey: true, 
      autoincrement: true, 
	  field: 'CategoryID' 
  }, 
  name: { type: Sequelize.STRING, field: 'Name' }, 
  description: { type: Sequelize.STRING, field: 'Description' }
}, {
	tableName: 'Categories'
});

var moduleName = "CATEGORY:";

module.exports.get = function(id,filter) {
    if (!id) return list(filter);
    console.log(moduleName, 'calling getSingle with id: ' + id);
    return sequelize.sync().then(function() {
        return Category.findById(id).then(function(category) {
            console.info(moduleName, 'category record found');
            return {
                count: (category)?1:0,
                categories: [ (category)?category.dataValues:null ]
            };
        })
    });
}

function list(filter) {
    console.log(moduleName, 'calling getAll because no id provided');
	return sequelize.sync().then(function() {
        if (filter) {
            var filterOption = {
                where: {
                    CategoryID: filter 
                } 
            };
            return Category.findAndCountAll(filterOption);
        } else return Category.findAndCountAll();
    }).then(function(result) {
		//return Athlete.findAndCountAll().then(function(result) {
        var categories = [];
        result.rows.forEach(function(categoryRow) {
            categories.push(categoryRow.dataValues);
        });
        return {
            count: result.count,
            categories: categories
        };
	});
}

module.exports.create = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'create a new category using JSON provided');
		console.error('need to add json validation to category creation');
		var categoryJson = json;//JSON.parse(json);
		return Category.create(json).then(function(category) {
			console.info('category successfully created');
			return category;
		});
	});
};

module.exports.update = function(json) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'update a single category using JSON provided');
		console.error('need to add json validation to category update');
		var ath = json;//JSON.parse(json);
		return Category.update(
			json,
			{ where: { CategoryID: json.CategoryID } }
		).then(function(result) {
			console.info(moduleName, 'category successfully updated');
			return result;
		});
	});
};

module.exports.delete = function(id) {
	return sequelize.sync().then(function() {
		console.info(moduleName, 'delete a category by id');
		return Category.destroy({ where: { CategoryID: id } }).then(function(count) {
			console.info(moduleName, '(' + count.toString() + ') categories successfully deleted');
			return count;
		});
	});
};

module.exports.close = function() {
	sequelize.close();
};