//获取应用实例
const app = getApp()


Page({
  data: {
    title: '',
    numberToExplain: '',
    publicTags: [],
    privateTags: [],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({
      title: options.title,
      numberToExplain: options.numberToExplain
    })
  },
   
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    })
    this.loadPublicTags()
    this.loadPrivateTags()
  },

  bindAdd: function (e) {
    wx.navigateTo({
      url: '../numberExplain/input?numberToExplain=' + this.data.numberToExplain,
    })
  },

  loadPublicTags() {
    var self = this;
    const db = wx.cloud.database()
    db.collection('PNE_public').where({
      number: this.data.numberToExplain.toString(),
    })
      .get({
        success: function (res) {
          console.log(res)
          self.setData({
            publicTags: res.data
          })
        },
        complete: function (res) {
          wx.hideLoading();
        }
      })
  },

  loadPrivateTags() {
    var self = this;
    const db = wx.cloud.database()
    db.collection('PNE_private').where({
      number: this.data.numberToExplain.toString(),
    })
      .get({
        success: function (res) {
          console.log(res)
          self.setData({
            privateTags: res.data
          })
        },
        complete: function (res) {
          wx.hideLoading();
        }
      })
  }
})