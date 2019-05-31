webApp.factory('objectUtil', function (baseUtil) {
	//check is valid object
    function isValidObjects(obj1, obj2) {
        return (obj1 == null && obj2 == undefined) || (obj1 == undefined && obj2 == null) || (obj1 == null && obj2 == null) || (obj1 == undefined && obj2 == undefined);
    };
    
    //check is same object
    function isSameObjects(hashObject1, hashObject2) {
        var flag = true;
        if (!$.isEmptyObject(hashObject1) && !$.isEmptyObject(hashObject2)) {
            for (key in hashObject1) {
                if (!isValidObjects(hashObject1[key], hashObject2[key]) && hashObject1[key] !== hashObject2[key]) {
                    flag = false;
                    break;
                }
            }
        } else {
            flag = false;
        }
        return flag;
    };

    //check length of collection object
    function checkCollectionLength(obj) {
        if (obj == null || obj == undefined) {
            return 0;
        }
        if (angular.isObject(obj)) {
            return Object.keys(obj).length;
        }
        else if (angular.isArray(obj)) {
            return obj.length;
        }
        return obj.length;
    }
    
    function isSameObject(obj1,obj2){
    	for(k in obj1){
    		
    	}
    }
    
    function containObject(arrayObject,obj){
    	if(isValidObjects(arrayObject,obj))
    	for (var i = 0; i < arrayObject.length; i++){
    		
    	}
    }
    
	function addObject(arrayObject,obj,uniqueID){
		console.log("add method coll")
		var isExist=false;
		for (var i = 0; i < arrayObject.length; i++){
			if(arrayObject[i][uniqueID]==obj[uniqueID]){
				isExist=true
			}
		}
		if(!isExist){
			arrayObject.push(obj);
		}
		return arrayObject;
	}
	
	function deleteObject(arrayObject,obj,uniqueID){
		for (var i = 0; i < arrayObject.length; i++){
			if(arrayObject[i][uniqueID]==obj[uniqueID]){
				 arrayObject.splice(i,1);
			}
		}
		return arrayObject;
	}
	
	function updateObject(arrayObject,obj,uniqueID){
		for (var i = 0; i < arrayObject.length; i++){
			if(arrayObject[i][uniqueID]==obj[uniqueID]){
				 mergeHash(arrayObject[i],obj)
			}
		}
		return arrayObject;
	}
	
	function getObject(arrayObject,uniqueID){
		if(isValidObjects(arrayObject,uniqueID)){
			for (var i = 0; i < arrayObject.length; i++){
				if(arrayObject[i][uniqueID]==obj[uniqueID]){
					return obj;
				}
			}
	    }
		return null;
	}
	
	 //Sort the array of object on the basis of specific key
     function sortObject(objectArr, key, isDesc) {
        objectArr = objectArr.sort(function (obj1, obj2) {
            return baseUtil.notUndefinedOrNull(isDesc) && isDesc === true ?(baseUtil.compare(obj2[key], obj1[key])) : (baseUtil.compare(obj1[key], obj2[key]));
        });
        return objectArr;
     }
     
     //copy object from given object
     function copyObject(obj) {
         return JSON.parse(JSON.stringify(obj));
     }
     
     
     function activeArray(arrObj) {
         if (arrObj === undefined || arrObj == null) {
             return;
         }
         resArr = [];
         for (var i in arrObj) {
             if (arrObj[i].isActive)
                 resArr.push(arrObj[i]);
         }
         return resArr;
     }
     
     //check eqauls both object
     function objectEquals(x, y) {
         'use strict';

         if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
         // after this just checking type of one would be enough
         if (x.constructor !== y.constructor) { return false; }
         // if they are functions, they should exactly refer to same one (because of closures)
         if (x instanceof Function) { return x === y; }
         // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
         if (x instanceof RegExp) { return x === y; }
         if (x === y || x.valueOf() === y.valueOf()) { return true; }
         if (Array.isArray(x) && x.length !== y.length) { return false; }

         // if they are dates, they must had equal valueOf
         if (x instanceof Date) { return false; }

         // if they are strictly equal, they both need to be object at least
         if (!(x instanceof Object)) { return false; }
         if (!(y instanceof Object)) { return false; }

         // recursive object equality check
         var p = Object.keys(x);
         return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
             p.every(function (i) { return objectEquals(x[i], y[i]); });
     }
     
     
   //method to convert hashmap of objects into the array of objects
     function getArrayOfObjectFromHash(objectHash) {
         var arrayOfObject = [];
         for (var key in objectHash) {
             if (objectHash.hasOwnProperty(key)) {
                 arrayOfObject.push(objectHash[key]);
             }
         }
         return arrayOfObject;
     };

     function getArrayOfObjectFromArrayOfHash(objectArray, hashKey) {
         var arrayOfObject = [];
         for (var i = 0; i < objectArray.length; i++) {
             if (objectArray[i][hashKey] !== undefined) {
                 arrayOfObject.push(objectArray[i][hashKey]);
             }
         }
         return arrayOfObject;
     };
     


     function getSingleKeyArrayFromObjects(arrayObject, keyName) {
         var arrayList = [];
         for (var i = 0; i < arrayObject.length; i++) {
             if (arrayObject[i][keyName] !== 'undefined') {
                 arrayList.push(arrayObject[i][keyName]);
             }
         }

         return arrayList;
     }


     
     // method to convert array of Objects into map of objects with key being the property of the object which would be unique
     function getHashFromArrayOfObjects(arrayObject, keyName) {
         if (arrayObject == undefined) {return {keyName: []}}
         ;
         var object = {};
         for (var i = 0; i < arrayObject.length; i++) {
             if (arrayObject[i][keyName] !== 'undefined') {
                 object[arrayObject[i][keyName]] = arrayObject[i];
             }
         }
         return object;
     };

     function getHashFromArrayOfObjectsOnInnerKey(arrayObject, outerKey, innerKey) {
         var object = {};
         for (var i = 0; i < arrayObject.length; i++) {
             if (arrayObject[i][outerKey] !== 'undefined' && arrayObject[i][outerKey][innerKey] !== 'undefined') {
                 object[arrayObject[i][outerKey][innerKey]] = arrayObject[i];
             }
         }
         return object;
     };
    
     function getHashFromArrayOfArrayObjects(object, arrayObject, keyName, arrayName) {
         for (var i = 0; i < arrayObject.length; i++) {
             if (arrayObject[i][keyName] !== 'undefined') {
                 object[arrayObject[i][keyName]] = arrayObject[i];
                 if (arrayName != null) {
                     getHashFromArrayOfArrayObjects(object, arrayObject[i][arrayName], keyName, arrayName);
                 }
             }
         }
     };
     function getHashFromTwoLevelArray(arrayObject, relArrayName, relKey) {
         var returnHash = {};
         for (var i = 0; i < arrayObject.length; i++) {
             if (arrayObject[i] !== undefined && arrayObject[i][relArrayName] != undefined) {
                 for (var j = 0; j < arrayObject[i][relArrayName].length; j++) {
                     if (arrayObject[i][relArrayName][j][relKey] != undefined) {
                         returnHash[arrayObject[i][relArrayName][j][relKey]] = arrayObject[i][relArrayName][j];
                     }
                 }
             }
         }
         return returnHash;
     };
     function getHashFromTwoLevelHash(arrayObject, keyName, relArrayName, relKey) {
         var returnHash = {};
         for (var key in arrayObject) {
             if (arrayObject[key] !== undefined) {
                 for (var i in arrayObject[key]) {
                     for (var j in arrayObject[key][i][relArrayName]) {
                         if (arrayObject[key][i][relArrayName][j][relKey] != undefined) {
                             returnHash[arrayObject[key][i][relArrayName][j][relKey]] = arrayObject[key][i][relArrayName][j];
                         }
                     }
                 }
             }
         }
         return returnHash;
     };
     function getHashFromArrayOfObjectsWithRel(arrayObject, keyName, relArrayName, relKey) {
         for (var i = 0; i < arrayObject.length; i++) {
             if (arrayObject[i][relArrayName] !== undefined) {
                 arrayObject[i][relArrayName + 'Map'] = getHashFromArrayOfObjects(arrayObject[i][relArrayName], relKey);
             }
         }
         return getHashFromArrayOfObjects(arrayObject, keyName);
     };

     function getHashFromArrayOfObjectsRd(arrayObjects, keyName) {
         var hash = {};
         var array = {};
         for (var i = 0; i < arrayObjects.length; i++) {
             var key = arrayObjects[i][keyName];
             if (hash[key] !== undefined) {
                 hash[key].push(arrayObjects[i]);
             } else {
                 array = [];
                 hash[key] = array;
                 hash[key].push(arrayObjects[i]);
             }
         }
         return hash;
     };

     function getHashFromArrayToggle(objOrArr, isArray) {
         if (isArray) {
             var log = {};
             angular.forEach(objOrArr, function (value, key) {
                 this[key] = value;
             }, log);
             return log
         } else {
             var log = [];
             angular.forEach(objOrArr, function (value, key) {
                 this.push(key + ': ' + value);
             }, log);
         }
     }
   

     function getSingleKeyArrayFromObjects(arrayObject, keyName) {
         var arrayList = [];
         for (var i = 0; i < arrayObject.length; i++) {
             if (arrayObject[i][keyName] !== 'undefined') {
                 arrayList.push(arrayObject[i][keyName]);
             }
         }

         return arrayList;
     }

     function mergeHash(destination, src) {
         for (var key in src) {
             if (Array.isArray(src[key])) {
                 if (destination[key] === undefined) {
                     destination[key] = [];
                 }
                 destination[key] = destination[key].concat(src[key]);
             }
             else {
                 destination[key] = src[key];
             }
         } //end of for loop
         return destination;
     }

     function getIndexWithTwoKeys(array, firstKey, firstValue, secondKey, secondVal) {
         for (var i = 0; i < array.length; i++) {
             if ((array[i][firstKey] === firstValue) && (array[i][secondKey] === secondVal)) {
                 return i;
             }
         }
         return -1;
     }

     function getIndexIfObjWithAttr(array, attr, value) {
         for (var i = 0; i < array.length; i++) {
             if (array[i][attr] === value) {
                 return i;
             }
         }
         return -1;
     }
   
    
     return {
    	 addObject								:		addObject,
    	 updateObject							:		updateObject,
    	 deleteObject							:		deleteObject,
    	 getObject								:		getObject,
    	 sortObject								:		sortObject,
    	 copyObject								:		copyObject,
    	 isSameObjects							:		isSameObjects,
    	 objectEquals							:       objectEquals,
    	 activeArray							:		activeArray,
    	 checkCollectionLength					: 		checkCollectionLength,
    	 isValidObjects							:		isValidObjects,
    	 mergeHash								:		mergeHash,
    	 getArrayOfObjectFromHash				:		getArrayOfObjectFromHash,
    	 getArrayOfObjectFromArrayOfHash		:       getArrayOfObjectFromArrayOfHash,
    	 getSingleKeyArrayFromObjects			:		getSingleKeyArrayFromObjects,
    	 getHashFromArrayOfObjects				:		getHashFromArrayOfObjects,
    	 getHashFromArrayOfObjectsOnInnerKey	:		getHashFromArrayOfObjectsOnInnerKey,
    	 getHashFromArrayOfArrayObjects			:		getHashFromArrayOfArrayObjects,
    	 getHashFromTwoLevelArray				:		getHashFromTwoLevelArray,
    	 getHashFromTwoLevelHash				:		getHashFromTwoLevelHash,
    	 getHashFromArrayOfObjectsWithRel		:		getHashFromArrayOfObjectsWithRel,
    	 getHashFromArrayOfObjectsRd			:		getHashFromArrayOfObjectsRd,
    	 getHashFromArrayToggle					:		getHashFromArrayToggle,
    	 getSingleKeyArrayFromObjects			:       getSingleKeyArrayFromObjects,
    	 getIndexWithTwoKeys					:		getIndexWithTwoKeys,
    	 getIndexIfObjWithAttr					:		getIndexIfObjWithAttr
     }
});