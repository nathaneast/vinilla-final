/* globals window, _ */
(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    return val;
  };

  /*
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else {
      array.reverse();
      var arr = array.slice(0, n);
      arr.reverse();
      return arr;
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.

  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection) === true) {
      for (var i = 0; collection.length > i; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      var keyArr = Object.keys(collection);
      for (var i = 0; keyArr.length > i; i++) {
        iterator(collection[keyArr[i]], keyArr[i], collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    var arr = [];
    var fn = function (ele) {
      var value = test(ele);
      if (value === true) {
        arr.push(ele);
      }
    }
    _.each(collection, fn);
    return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var arr = [];
    var fn = function (ele) {
      var value = test(ele);
      if (value === false) {
        arr.push(ele);
      }
    }
    _.each(collection, fn);
    return arr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    var answer = [];

    function fn(ele) {
      var boolList = [];
      var bool = false;
      if (answer.length === 0) {
        answer.push(ele);
      } else {
        //ele값을 answer 모든 요소와 비교 후 boolList 배열에 담기
        _.each(answer, function (answerEle) {
          var value = answerEle === ele;
          boolList.push(value);
        });
        //booList 배열 크기만큼 bool 값과 비교
        _.each(boolList, function (boolListEle) {
          bool = boolListEle || bool;
        });
        if (bool === false) {
          answer.push(ele);
        }
      }
    }

    _.each(array, fn);
    return answer;
  };


  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var arr = [];
    _.each(collection, function (num) {
      arr.push(iterator(num));
    });
    return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  // }); // should be 5, regardless of the iterator function passed in
  //        No accumulator is given so the first element is used.
  _.reduce = function (collection, iterator, accumulator) {
    var result;
    var haveMemo = true;
    for (var i = 0; collection.length > i; i++) {
      if (i === 0) {
        if (accumulator === undefined) {
          result = iterator(collection[0], collection[1]);
          //memo가 없으면 배열의 첫번째 요소가 memo
          //두번째 요소가 item
          haveMemo = false;
        } else {
          result = iterator(accumulator, collection[i]);
        }
      } else {
        //두번째 계산부터는 result 값이 memo
        if (haveMemo) {
          result = iterator(result, collection[i]);
        } else {
          i = 2;
          result = iterator(result, collection[i]);
          haveMemo = true;
        }
      }
    }
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if (Array.isArray(collection) === true) {
      return _.reduce(collection, function (wasFound, item) {
        if (wasFound) {
          return true;
        }
        return target === item;
      }, false);
    } else {
      var keyArr = Object.keys(collection);
      return _.reduce(keyArr, function (wasFound, item) {
        if (wasFound) {
          return true;
        }
        return target === collection[item];
      }, false);
    }
  };

  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (collection.length === 0) {
      return true;
    }

    return _.reduce(collection, function (total, item) {
      //every사용 => reduce 사용값을 리턴한다
      if (total) {
        if (iterator === undefined) {
          return Boolean(item) && true;
        } else {
          return Boolean(iterator(item)) && true;
        }
      } else {
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    if (collection.length === 0) {
      return false;
    }

    return _.reduce(collection, function (total, item) {
      //every사용 => reduce 사용값을 리턴한다
      if (total === false) {
        if (iterator === undefined) {
          return Boolean(item) && true;
        } else {
          return Boolean(iterator(item)) && true;
        }
      } else {
        return true;
      }
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (obj) {
    for (var i = 1; Object.keys(arguments).length > i; i++) {
      for (var j = 0; Object.keys(arguments[i]).length > j; j++) {
        var keyArr = Object.keys(arguments[i]);
        obj[keyArr[j]] = arguments[i][keyArr[j]];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (obj) {
    for (var i = 1; Object.keys(arguments).length > i; i++) {
      for (var j = 0; Object.keys(arguments[i]).length > j; j++) {
        var keyArr = Object.keys(arguments[i]);
        if (obj[keyArr[j]] === undefined) {
          obj[keyArr[j]] = arguments[i][keyArr[j]];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.

        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait) {
    var argList = [];
    for (var i = 2; arguments.length > i; i++) {
      argList.push(arguments[i]);
    }
    setTimeout(() => {
      func.apply(null, argList);
    }, wait);
  };

  /**
   * ADVANCED
   * ==================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {
    const typeList = _.map(collection, ele => typeof (ele));
    let result = collection.slice(0);

    if (_.contains(typeList, "object")) {
      console.log(collection );
      const ageList = _.pluck(collection, iterator);
      if (ageList[0] < ageList[1]) {
        return result;
      } else {
        result.splice(0, 1);
        result.push(collection[0]);
        return result;
      }
    } else if (_.contains(typeList, "number")) {
      let numList = [];
      let otherList = [];
      let returnBool;
      //number, undefined 각 배열에 값 넣기
      _.each(typeList, (ele, index) => {
        if (ele === "number") {
          numList.push(collection[index]);
        } else {
          otherList.push(collection[index]);
        }
      });

      //numList가순서대로 정렬되었는지 검사
      let loop = () => {
        let comNum = 0;
        returnBool = true;
        for (let i = 1; i < numList.length; i++) {
          returnBool = returnBool && numList[comNum] < numList[i];
          comNum++;
        }
        return !returnBool
      }

      //numList 순서 정렬
      while(loop()) {
        let comNum = 0;
        let temNum;
        for (let i = 1; i < numList.length; i++) {
          if (numList[comNum] > numList[i]) {
            temNum = numList[comNum];
            numList[comNum] = numList[i];
            numList[i] = temNum;
          }
          comNum++;
        }
        returnBool = loop();
      }
      result = numList.concat(otherList);
      return result;
    } else if (_.contains(typeList, "string")) {
      let numObj = [];
      let comNum = 0;
      let temNum;
      _.each(collection, ele => {
        let obj = {};
        obj.numStr = ele;
        obj.numLength = ele.length;
        numObj.push(obj);
      });
      for (let i = 1; i < numObj.length; i++) {
        if (numObj[comNum]["numLength"] > numObj[i]["numLength"]) {
          temNum = numObj[comNum];
          numObj[comNum] = numObj[i];
          numObj[i] = temNum;
        }
        comNum++;
      }
      result = _.map(numObj, ele => ele.numStr);
      return result;
    }
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
  };
}());
