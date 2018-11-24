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
        for (var i = 0; i < res.data.length; i ++) {
          res.data[i].age = self.getAge(res.data[i].birthday)
        }

        self.setData({
          numberList: res.data
        })
        console.log(self.data.numberList)
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
