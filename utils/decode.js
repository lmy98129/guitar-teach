const decoder = (item) => {
  let keyArrayStr = item.content, length = item.length, keyArrayDvi = [],
    keyArrayDec = [], newKey = {}, time = "", key = 0;
  for (var i = 0; i < length; i++) {
    keyArrayDvi[i] = keyArrayStr.slice(i * 3, i * 3 + 3);
  }
  keyArrayDvi.forEach((val, i, arr) => {
    // 初始化变量
    time = arr[i][2];
    key = parseInt(arr[i].slice(0, 2));
    // 提取和弦、升降调，当前暂时不用
    // if (tune == "1") {
    //   newKey.tune = "b";
    // } else if (tune == "3") {
    //   newKey.tune = "#";
    // } else {
    //   newKey.tune = "&nbsp;&nbsp;";
    // }
    switch (time) {
      case "1":
        newKey.time = '1/8';
        break;
      case "2":
        newKey.time = '1/4';
        break;
      case "3":
        newKey.time = '1/2';
        break;
      case "4":
        newKey.time = '1';
        break;
    }
    // 提取编码
    if (key >= 0 && key <= 4) {
      newKey.key = 5 - key;
      newKey.style = "High";
    } else if (key >= 5 && key <= 11) {
      newKey.key = 12 - key;
      newKey.style = "Mid";
    } else if (key >= 11 && key <= 18) {
      newKey.key = 19 - key;
      newKey.style = "Low";
    } else if (key == 0) {
      newKey.key = "&nbsp;";
    }
    // 处理结果放入数组中
    keyArrayDec.push(newKey);
    // 再次清空临时对象
    newKey = {};
  })
  return [keyArrayDvi, keyArrayDec]
}

const decodePrev = (item, self) => {
  self.setData({
    title: item.title
  })
  let res = decoder(item);
  let keyArrayDec = res[1];
  // 将处理结果返回前端
  self.setData({
    keyArray: keyArrayDec,
    scrollTop: 80 * keyArrayDec.length
  });
}

const decodeEdit = (item, self) => {
  let res = decoder(item);
  let keyArray = res[1];
  self.setData({
    keyArray: keyArray
  })
  return res[0]
}

module.exports = {
  prev: decodePrev,
  edit: decodeEdit
}