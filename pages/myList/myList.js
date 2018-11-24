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
    wx.showLoading({
      title: '加载中',
    })
    const db = wx.cloud.database()
    db.collection('number').get({
      success: function (res) {
        wx.hideLoading();
        for (var i = 0; i < res.data.length; i ++) {
          res.data[i].age = self.getAge(res.data[i].birthday)
          res.data[i].relativeTime = new Date(res.data[i].createDate).toRelativeTime()
        }

        self.setData({
          numberList: res.data
        })
        console.log(self.data.numberList)
      },
      fail: function(res) {
        wx.hideLoading();
      }
    })
  },

  getAge: function(birthday) {
    var birth = Date.parse(birthday.replace('/-/g', "/"));
    if (birth) {
      var year = 1000 * 60 * 60 * 24 * 365;
      var now = new Date();
      var birthday = new Date(birth);
      var age = parseInt((now - birthday) / year);

      return age;
    }

    return -1;
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
