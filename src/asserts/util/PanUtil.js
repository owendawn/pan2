const PanUtil={
    dateFormat: {
        format: function (date, pattern) {
            var date = date;
            if(isNaN(date.getTime())||date.getTime()===new Date(null).getTime())
                return "~";
            var defaults=[
                {key:"yyyy",value:date.getFullYear()},
                {key:"yy",value:date.getYear()},
                {key:"MM",value:date.getMonth()+1},
                {key:"dd",value:date.getDate()},
                {key:"HH",value:date.getHours()},
                {key:"mm",value:date.getMinutes()},
                {key:"ss",value:date.getSeconds()},
                {key:"SSS",value:date.getMilliseconds()},
                {key:"hh",value:function(re,key,date){
                        if(date.getHours()>12){
                            return re.replace("hh",("00"+(date.getHours()-12)).substring(2+(date.getHours()-12).toString().length-2))+" PM";
                        }else{
                            return re.replace("hh",("00"+date.getHours()).substring(2+date.getHours().toString().length-2))+" AM";
                        }
                    }}
            ];
            var returns = pattern;
            for (var i = 0; i < defaults.length; i++) {
                var it=defaults[i];
                if(pattern.indexOf(it.key)>=0){
                    if(typeof(it.value)==="function"){
                        var _f=it.value;
                        returns=_f(returns,it.key,date);
                    }else
                        returns=returns.replace(new RegExp(it.key,"g"),("00"+it.value).substring(2+it.value.toString().length-it.key.length));
                }
            }
            return returns;
        },
        parse: function (str, pattern) {
            var year = 1900,
                month = 0,
                day = 1,
                hours = 0,
                minutes = 0,
                seconds = 0,
                milliseconds=0;
            if (pattern.indexOf("yyyy") >= 0) {
                year = Number(str.substr(pattern.indexOf("yyyy"), 4));
            } else if (pattern.indexOf("yy") >= 0) {
                year = Number(str.substr(pattern.indexOf("yy"), 2))+ 100 + 1900;
            }
            if (pattern.indexOf("MM") >= 0) {
                month = Number(str.substr(pattern.indexOf("MM"), 2)) - 1;
            }
            if (pattern.indexOf("dd") >= 0) {
                day = Number(str.substr(pattern.indexOf("dd"), 2));
            }
            if (pattern.indexOf("hh") >= 0) {
                hours = Number(str.substr(pattern.indexOf("hh"), 2)) + Number(str.indexOf("AM") >= 0 ? 0 : (str.indexOf("PM") >= 0 ? 12 : 0));
            }
            if (pattern.indexOf("HH") >= 0) {
                hours = Number(str.substr(pattern.indexOf("HH"), 2));
            }
            if (pattern.indexOf("mm") >= 0) {
                minutes = Number(str.substr(pattern.indexOf("mm"), 2));
            }
            if (pattern.indexOf("ss") >= 0) {
                seconds = Number(str.substr(pattern.indexOf("ss"), 2));
            }
            if(pattern.indexOf("SSS")>=0){
                milliseconds=Number(str.substr(pattern.indexOf("SSS"),3));
            }
            var _re=new Date(year, month, day, hours, minutes, seconds,milliseconds);
            return isNaN(_re)&&"~"||_re;
        }
    },
}

export default PanUtil