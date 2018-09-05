const inputKey = (keyArrayEnc, self, e) => {
  // 初始化音符JSON对象newKey、音符编码字符串newKeyStr、乐谱数组newKeyArray、音符数值keyNum
  let newKey = {}, newKeyStr = "", newKeyArray = new Array();
  let keyNum = parseInt(e.target.dataset.key), cursorPos = self.data.cursorPos;
  newKeyArray = self.data.keyArray;
  // 判断输入按键类型
  if (e.target.dataset.key != "space" && e.target.dataset.key != "del") {
    // 先处理界面中的显示格式
    newKey.key = keyNum;
    newKey.style = self.data.style;
    newKey.time = self.data.scoreTime;
    // 判断高低中音
    switch (self.data.style) {
      case "Finger":
        // 暂时忽略“指弹”
        return;
        break;
      // 不再忽略低音mi
      // case "Low": 
      //   if (keyNum < 3) {
      //     // 低音mi以下自动忽略
      //     return;
      //   }
      //   break;
      case "High":
        if (keyNum >= 6) {
          // 高音so以上自动忽略
          return;
        }
    }
    // 判断和弦、升降调，当前暂时不判断升降调
    // switch(self.data.tune) {
    //   case "Chord":
    //     // 暂时忽略和弦
    //     return;
    //     break;
    //   case "Up": 
    //     newKey.tune = "#"
    //     break;
    //   case "Down":
    //     newKey.tune = "b"
    //     break;
    //   default:
    //     newKey.tune = "&nbsp;&nbsp;"
    // }
    // 再处理需要保存的字符串数组
    // 判断高低中音
    switch (self.data.style) {
      case "Finger":
        // 暂时忽略“指弹”
        return;
        break;
      case "Low":
        // 处理编码
        newKeyStr = newKeyStr + (19 - keyNum).toString();
        break;
      case "Mid":
        // 处理编码
        if (keyNum <= 2) {
          newKeyStr = newKeyStr + (12 - keyNum).toString();
        } else {
          newKeyStr = newKeyStr + "0" + (12 - keyNum).toString();
        }
        break;
      case "High":
        if (keyNum >= 6) {
          // 高音so以上自动忽略
          return;
        } else {
          // 处理编码
          newKeyStr = newKeyStr + "0" + (5 - keyNum).toString();
        }
    }

    // 判断和弦、升降调，当前暂时不判断升降调
    // switch(self.data.tune) {
    //   case "Down": 
    //     newKeyStr = newKeyStr + "1";
    //     break;
    //   case "Normal":
    //     newKeyStr = newKeyStr + "2";
    //     break;
    //   case "Up": 
    //     newKeyStr = newKeyStr + "3";
    //     break;
    //   case "Chord":
    //     // 暂时忽略和弦
    //     break;
    // }
    // 判断时值
    switch (self.data.scoreTime) {
      case "1/8":
        newKeyStr = newKeyStr + "1";
        break;
      case "1/4":
        newKeyStr = newKeyStr + "2";
        break;
      case "1/2":
        newKeyStr = newKeyStr + "3";
        break;
      case "1":
        newKeyStr = newKeyStr + "4";
        break;
    }
    keyArrayEnc.splice(cursorPos+1, 0, newKeyStr);
    newKeyArray.splice(cursorPos+1, 0, newKey);
    self.setData({
      cursorPos: cursorPos + 1
    })
    // keyArrayEnc.push(newKeyStr);
    // newKeyArray.push(newKey);
  } else if (e.target.dataset.key == "space") {
    // 输入空格，自动用最新一个音符进行重复
    newKeyStr = keyArrayEnc[keyArrayEnc.length - 1];
    newKey = newKeyArray[newKeyArray.length - 1];
    keyArrayEnc.splice(cursorPos+1, 0, newKeyStr);
    newKeyArray.splice(cursorPos+1, 0, newKey);
    self.setData({
      cursorPos: cursorPos + 1
    })
    // keyArrayEnc.push(newKeyStr);
    // newKeyArray.push(newKey);
  } else if (e.target.dataset.key == "del") {
    // 删除音符
    keyArrayEnc.splice(cursorPos, 1);
    newKeyArray.splice(cursorPos, 1);
    // newKeyArray.pop();
    // keyArrayEnc.pop();
  }
  if (self.data.cursorPos >= keyArrayEnc.length) {
    self.setData({
      cursorPos: keyArrayEnc.length - 1
    })
  }
  // 将乐谱处理结果返回
  self.setData({
    keyArray: newKeyArray,
    scrollTop: 80 * newKeyArray.length
  });
  return keyArrayEnc;
}

module.exports = {
  inputKey: inputKey
}