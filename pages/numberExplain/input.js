//获取应用实例
const app = getApp()


Page({
  data: {
    numberToExplain: '',
    tags: [],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    
  },

  bindAdd: function (e) {
    var self = this
    wx.showLoading({
      title: '保存中',
    })
    const db = wx.cloud.database()
    db.collection('primaryNumberExplain').add({
      data: {
        number: this.data.numberToExplain,
        explain: '一条测试信息',
        isPositive: true,
      },
      complete: function (e) {
        wx.hideLoading();
      }
    })
  },
})