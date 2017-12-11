const arrayToTreeArray = function(orginArray, idStr, pidStr,  childrenStr) {
    let strArray = JSON.parse(JSON.stringify(orginArray));
    let destArray = [],
      hash = {},
      id = idStr,
      pid = pidStr,
      children = childrenStr,
      i = 0,
      j = 0,
      len = strArray.length;
    for (; i < len; i++) {
      hash[strArray[i][id]] = strArray[i];
    }
    for (; j < len; j++) {
      let aVal = strArray[j],
        hashVP = hash[aVal[pid]];
      if (hashVP) {
        !hashVP[children] && (hashVP[children] = []);
        hashVP[children].push(aVal);
      } else {
        destArray.push(aVal);
      }
    }
    return destArray;
  }

  exports.arrayToTreeArray = arrayToTreeArray
  