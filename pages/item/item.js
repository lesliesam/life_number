//item.js
//获取应用实例
const app = getApp()

import numberCalculate from '../../templates/numberCalculate/numberCalculate.js'


Page({
  data: {
    lifeNumberParams: {},
    lifeNumberResults: {},
    lifeNumberCounts: new Array(),
    multipuleNumberString: '',
    lackedNumberString: '',
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

    var { params, results, numberCounts, multipuleNumberString, lackedNumberString } = numberCalculate.calculateResult(itemInfo.birthday);

    this.setData({
      lifeNumberParams: params,
      lifeNumberResults: results,
      lifeNumberCounts: numberCounts,
      multipuleNumberString: multipuleNumberString,
      lackedNumberString: lackedNumberString,
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

  ...numberCalculate,
})