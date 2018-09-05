// pages/bluetooth/bluetooth.js
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDeviceGot: "正在获取蓝牙设备列表"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getLocation({
      success: res => {
        console.log(res)
      },
    })
    wx.openBluetoothAdapter({
      success: res => {
        console.log(res);
        wx.showToast({
          title: '蓝牙连接成功',
        });
        setTimeout(() => {
          wx.startBluetoothDevicesDiscovery({
            allowDuplicatesKey: true,
            success: res => {
              console.log(res);
              // wx.onBluetoothDeviceFound(res => {
              //   console.log(res);
              // })
              setTimeout(() => {
                var t1 = setInterval(() => {
                    wx.getBluetoothDevices({
                      success: res => {
                        console.log(res);
                        this.setData({
                          isDeviceGot: "获取蓝牙连接列表成功"
                        });
                        let devices = res.devices,
                          targetDevice;
                        for (let i=0; i<devices.length; i++) {
                          if (devices[i].name === "Smart_guitar") {
                            this.setData({
                              isDeviceGot: "已搜索到设备，正在与设备进行连接"
                            });
                            clearInterval(t1);
                            console.log("target device Found");
                            targetDevice = devices[i];
                            break;
                          }
                        }
                        if (targetDevice != undefined) {
                          let targetDeviceId = targetDevice.deviceId;
                          wx.stopBluetoothDevicesDiscovery({
                            success: res => {
                              wx.createBLEConnection({
                                deviceId: targetDeviceId,
                                success: res => {
                                  this.setData({
                                    isDeviceGot: "与设备建立连接成功！"
                                  });
                                  wx.getBLEDeviceServices({
                                    deviceId: targetDeviceId,
                                    success: res => {
                                      console.log(res);
                                      let services = res.services;
                                      for (let i=0; i<services.length; i++) {
                                        let currentServiceId = services[i].uuid;
                                        wx.getBLEDeviceCharacteristics({
                                          deviceId: targetDeviceId,
                                          serviceId: currentServiceId,
                                          success: function(res) {
                                            console.log(res);
                                            wx.onBLECharacteristicValueChange(function (res) {
                                              console.log(res);
                                              console.log('characteristic value comed:', util.ab2hex(res.value));
                                            })
                                            if (res.characteristics[0].uuid == "00002A00-0000-1000-8000-00805F9B34FB") {
                                              wx.readBLECharacteristicValue({
                                                deviceId: targetDeviceId,
                                                serviceId: currentServiceId,
                                                characteristicId: "00002A00-0000-1000-8000-00805F9B34FB",
                                                success: function(res) {
                                                  console.log(res);
                                                },
                                              })
                                            }
                                          },
                                        })
                                      }
                                    },
                                  })
                                },
                              })
                            },
                          })
                        }
                      },
                    })
                }, 3000)
              }, 3000)
            },
            fail: res => {
              wx.showModal({
                title: '蓝牙连接失败',
                content: '请尝试打开手机蓝牙开关，并重新进入当前页面',
                showCancel: false
              })
            }
          })
        }, 3000)
      },
      fail: res => {
        wx.showModal({
          title: '蓝牙连接失败',
          content: '请尝试打开手机蓝牙开关，并重新进入当前页面',
          showCancel: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})