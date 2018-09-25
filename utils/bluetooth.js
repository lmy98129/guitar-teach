const encode = require("./encode.js");

const bufferGenerator = (message) => {
  let byteArray = encode.str2bytes(message);
  let buffer = new ArrayBuffer(message.length);
  let dataView = new DataView(buffer);
  let index = 0;

  for (let i = 0; i < message.length; i++) {
    dataView.setUint8(i, byteArray[i]);
  }
  
  return buffer;
}

const sendMessageSingle = (message, that) => {
  let targetDeviceId = wx.getStorageSync("deviceId");
  let buffer = bufferGenerator(message);

  wx.writeBLECharacteristicValue({
    deviceId: targetDeviceId,
    serviceId: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
    characteristicId: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
    value: buffer,
    success: function (res) {
      console.log(res);
      that.setData({
        touchable: true
      })
    },
    fail: function (err) {
      console.log(err);
      that.setData({
        touchable: true
      })
    }
  })
}

const sendMessageLoop = (curPos, mode, that) => {

  let targetDeviceId = wx.getStorageSync("deviceId");
  let curArray = wx.getStorageSync("emittingArray");

  if (curPos + 1 > curArray.length) {
    that.setData({
      touchable: true
    });
    console.log("all data have been sent susccessfully.");
    return;
  }

  let message = "@TS"+curArray[curPos]+"#";
  let curTime;
  if (mode === "slow") {
    curTime = Math.pow(2, parseInt(curArray[1][2]) - 1) * 125 + 1400;
  } else {
    curTime = Math.pow(2, parseInt(curArray[curPos][2])-1)*125 + 700;
  }
  console.log(message);

  let buffer = bufferGenerator(message);

  wx.writeBLECharacteristicValue({
    deviceId: targetDeviceId,
    serviceId: "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
    characteristicId: "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
    value: buffer,
    success: function (res) {
      console.log(res);
      that.setData({
        cursorPos: curPos
      });
      setTimeout(function () { sendMessageLoop(curPos + 1, mode, that)}, curTime);
    },
    fail: function (err) {
      console.log(err);
      setTimeout(function () { sendMessageLoop(curPos, mode, that) }, curTime);
    }
  })

}

module.exports = {
  send: sendMessageSingle, 
  sendLoop: sendMessageLoop
}