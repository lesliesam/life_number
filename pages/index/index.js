//index.js
//获取应用实例
const app = getApp()

import numberCalculate from '../../templates/numberCalculate/numberCalculate.js'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    birthday: '1981-09-27',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showResult: false,
    lifeNumberParams: {},
    lifeNumberResults: {},
    lifeNumberCounts: new Array(),
    multipuleNumberString: '',
    lackedNumberString: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (params) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    // Load the given share data
    if (params.birthday) {
      this.setData({
        birthday: params.birthday
      })
      this.showResult()
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindDateChange: function (e) {
    console.log('生日修改为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
    if (this.data.showResult) {
      this.showResult();
    }
  },
  showResult: function (e) {
    var {params, results, numberCounts, multipuleNumberString, lackedNumberString} = numberCalculate.calculateResult(this.data.birthday);

    this.setData({
      lifeNumberParams: params,
      lifeNumberResults: results,
      lifeNumberCounts: numberCounts,
      multipuleNumberString: multipuleNumberString,
      lackedNumberString: lackedNumberString,
    })

    this.setData({
      showResult: true
    })
  },

  storeResult: function (e) {
    var self = this
    const db = wx.cloud.database()
    wx.showLoading({
      title: '保存中',
    })
    db.collection('number').where({
      birthday: this.data.birthday
    })
    .get({
      success: function (res) {
        wx.hideLoading();
        if (res.data.length > 0) {
          self.confirmNAdd(res.data.length);
        } else {
          self.directAdd();
        }
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },

  directAdd: function () {
    wx.showLoading({
      title: '保存中',
    })
    const db = wx.cloud.database()
    db.collection('number').add({
      data: {
        birthday: this.data.birthday,
        createDate: new Date()
      },
      success: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '收藏成功',
          content: '提示：您可以进入我的收藏进行更多的编辑。',
          showCancel: false,
        })
      },
      fail: function (res) {
        wx.hideLoading();
      }
    })
  },

  confirmNAdd: function(count) {
    var self = this
    wx.showModal({
      title: '系统中有' + count + '人与此日期重复',
      content: '确认添加？',
      success(res) {
        if (res.confirm) {
          self.directAdd();
        }
      }
    })
  },

  onShareAppMessage: numberCalculate.onShareAppMessage,
})
