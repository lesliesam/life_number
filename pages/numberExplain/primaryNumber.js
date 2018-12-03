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
    var numberToExplain = JSON.parse(options.numberToExplain)
    console.log(numberToExplain)

    this.setData({
      numberToExplain: numberToExplain
    })
  },
   
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    })
    
    var self = this;
    const db = wx.cloud.database()
    db.collection('primaryNumberExplain').where({
      number: this.data.numberToExplain
    })
      .get({
        success: function (res) {
          console.log(res)
          self.setData({
            tags: res.data
          })
        },
        complete: function (res) {
          wx.hideLoading();
        }

      })
  },

  bindAdd: function (e) {
    wx.navigateTo({
      url: '../numberExplain/input?numberToExplain=' + this.data.numberToExplain,
    })
  },
})