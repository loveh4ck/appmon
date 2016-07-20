'use strict';

Java.perform(function () {
	var ContextWrapper = Java.use("android.content.ContextWrapper");

	if (ContextWrapper.openOrCreateDatabase) {
	
		// Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#openOrCreateDatabase(java.lang.String, int, android.database.sqlite.SQLiteDatabase.CursorFactory, android.database.DatabaseErrorHandler)
		ContextWrapper.openOrCreateDatabase.overloads[0].implementation = function (name, mode, factory) {
			//console.log("SQLiteDatabase Name: " + name);
			//console.log("SQLiteDatabase Mode: " + mode);
			return this.openOrCreateDatabase.overloads[0].apply(this, arguments);
		}
		
		// Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#openOrCreateDatabase(java.lang.String, int, android.database.sqlite.SQLiteDatabase.CursorFactory)
		ContextWrapper.openOrCreateDatabase.overloads[1].implementation = function (name, mode, factory, errorHandler) {
			//console.log("SQLiteDatabase Name: " + name);
			//console.log("SQLiteDatabase Mode: " + mode);
			return this.openOrCreateDatabase.overloads[0].apply(this, arguments);
		}
		
	}

	if (ContextWrapper.databaseList) {
		// Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#databaseList()
		ContextWrapper.databaseList.implementation = function () {
			var database_list = this.databaseList.call(this);
			//console.log(typeof database_list);
			return database_list;
		};
	}

	if (ContextWrapper.deleteDatabase) {
		// Ref: https://developer.android.com/reference/android/content/ContextWrapper.html#deleteDatabase(java.lang.String)
		ContextWrapper.deleteDatabase.overload("java.lang.String").implementation =  function (dbName) {
			//console.log('Delete Database: ' + dbName);
			return this.deleteDatabase.overload("java.lang.String").call(this, dbName);
		};
	}
});