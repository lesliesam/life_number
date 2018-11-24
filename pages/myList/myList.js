//myList.js
//获取应用实例
const app = getApp()

Page({
  data: {
    numberList: [],
    sexes: ['男', '女'],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    var self = this
    const db = wx.cloud.database()
    db.collection('number').get({
      success: function (res) {
        self.setData({
          numberList: res.data
        })
        console.log(self.data.numberList)
      }
    })
  },
  editItem: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../item/item?itemInfo=' + JSON.stringify(this.data.numberList[id])
    })
  },

  bindAdd: function(e) {
    wx.switchTab({
      url: '../index/index'
    })
  }
})
