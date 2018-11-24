Date.prototype.toRelativeTime = (function () {

  var _ = function (options) {
    var opts = processOptions(options);

    var now = opts.now || new Date();
    var texts = opts.texts || TEXTS;
    var delta = now - this;
    var future = (delta <= 0);
    delta = Math.abs(delta);

    // special cases controlled by options
    if (delta <= opts.nowThreshold) {
      return future ? texts.right_now : texts.just_now;
    }
    if (opts.smartDays && delta <= 6 * MS_IN_DAY) {
      return toSmartDays(this, now, texts);
    }

    var units = null;
    for (var key in CONVERSIONS) {
      if (delta < CONVERSIONS[key])
        break;
      units = key; // keeps track of the selected key over the iteration
      delta = delta / CONVERSIONS[key];
    }

    // pluralize a unit when the difference is greater than 1.
    delta = Math.floor(delta);
    units = texts.pluralize(delta, units);
    return [delta, units, future ? texts.from_now : texts.ago].join("");
  };

  var processOptions = function (arg) {
    if (!arg) arg = 0;
    if (typeof arg === 'string') {
      arg = parseInt(arg, 10);
    }
    if (typeof arg === 'number') {
      if (isNaN(arg)) arg = 0;
      return { nowThreshold: arg };
    }
    return arg;
  };

  var toSmartDays = function (date, now, texts) {
    var day;
    var weekday = date.getDay(),
      dayDiff = weekday - now.getDay();
    if (dayDiff == 0) day = texts.today;
    else if (dayDiff == -1) day = texts.yesterday;
    else if (dayDiff == 1 && date > now)
      day = texts.tomorrow;
    else day = texts.days[weekday];
    return day + " " + texts.at + " " + date.toLocaleTimeString();
  };

  var CONVERSIONS = {
    毫秒: 1, // ms    -> ms
    秒: 1000,   // ms    -> sec
    分钟: 60,     // sec   -> min
    小时: 60,     // min   -> hour
    天: 24,     // hour  -> day
    月: 30,     // day   -> month (roughly)
    年: 12      // month -> year
  };

  var MS_IN_DAY = (CONVERSIONS.millisecond * CONVERSIONS.second * CONVERSIONS.minute * CONVERSIONS.hour * CONVERSIONS.day);

  var WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  var TEXTS = {
    today: '今天',
    yesterday: '昨天',
    tomorrow: '明天',
    at: 'at',
    from_now: 'from now',
    ago: '前',
    right_now: '刚刚',
    just_now: '刚刚',
    days: WEEKDAYS,
    pluralize: function (val, text) {
      return text;
    }
  };
  return _;
})();



/*
 * Wraps up a common pattern used with this plugin whereby you take a String
 * representation of a Date, and want back a date object.
 */
Date.fromString = function (str) {
  return new Date(Date.parse(str));
};