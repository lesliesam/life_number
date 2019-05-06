//item.js
//获取应用实例
const app = getApp()

import numberCalculate1 from '../../templates/numberCalculate1/numberCalculate.js'
import numberCalculate2 from '../../templates/numberCalculate2/numberCalculate.js'


Page({
  data: {
    nc1_params: {},
    nc2_params: {},
    southTabStyle: 'tabItemSelected',
    northTabStyle: 'tabItemUnSelected',
    itemInfo: {},
    birthday: '',  //在分享方法中要使用到这个变量
    name: '',
    sexes: ['男', '女'],
    sexIndex: -1,
    showSaveButton: false,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    var itemInfo = JSON.parse(options.itemInfo)
    console.log(itemInfo)

    var name = itemInfo.name
    var sexIndex = itemInfo.sexIndex

    if (!name) name = null
    if (!sexIndex) sexIndex = null
    this.setData({
      itemInfo: itemInfo,
      birthday: itemInfo.birthday,
      name: name,
      sexIndex: sexIndex,
    })

    var numberCalculate1_params = numberCalculate1.calculateResult(itemInfo.birthday);
    var numberCalculate2_params = numberCalculate2.calculateResult(this.data.birthday);

    this.setData({
      nc1_params: numberCalculate1_params,
      nc2_params: numberCalculate2_params,
    })
  },

  bindNameChange: function(e) {
    this.setData({
      name: e.detail.value,
      showSaveButton: true
    })
  },

  bindSexChange: function(e) {
    this.setData({
      sexIndex: e.detail.value,
      showSaveButton: true
    })
  },

  bindSave: function(e) {
    var self = this
    wx.showLoading({
      title: '保存中',
    })
    const db = wx.cloud.database()
    db.collection('number').doc(this.data.itemInfo._id).update({
      data: {
        name: this.data.name,
        sexIndex: this.data.sexIndex,
      },
      success: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '保存完成',
          showCancel: false,
        })

        self.setData({
          showSaveButton: false
        })
      },
      fail: function(res) {
        wx.hideLoading();
      }
    })
  },

  showSouth: function () {
    this.setData({
      southTabStyle: 'tabItemSelected',
      northTabStyle: 'tabItemUnSelected',
    })
  },

  showNorth: function () {
    this.setData({
      southTabStyle: 'tabItemUnSelected',
      northTabStyle: 'tabItemSelected',
    })

    setTimeout(this.drawCanvas, 100, this.data.nc2_params.solarParams, this.data.nc2_params.lunarParams)
  },

  ...numberCalculate1,
  ...numberCalculate2,
})