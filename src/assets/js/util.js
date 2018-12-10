//设置字符串类型的本地缓存
function setStorage(objName, objValue) {
	var sto = window.localStorage;
	if(sto)
		sto.setItem(objName, objValue);
}
//读取字符串类型的本地缓存
function getStorage(objName) {
	var ret = '';
	var sto = window.localStorage;
	if(sto)
		ret = sto.getItem(objName);
	return ret;
}

//清除本地缓存，如没指定名称则为清空所有缓存
function clearStorage(objName) {
	var sto = window.localStorage;
	if(sto) {
		if(objName)
			sto.removeItem(objName);
		else
			sto.clear();
	}
}
//设置Json类型的本地缓存
function setStorJson(objName, json) {
	if(json)
		setStorage(objName, JSON.stringify(json));
}
//读取Json类型的本地缓存
function getStorJson(objName) {
	var ret = null;
	var str = getStorage(objName);
	if(str)
		ret = JSON.parse(str);
	return ret;
}
//获取日期  num: 0 今天  -1 昨天  -2 前天
function getDay(num, str) {
	var today = new Date();
	var nowTime = today.getTime();
	var ms = 24*3600*1000*num;
	today.setTime(parseInt(nowTime + ms));
	var oYear = today.getFullYear();
	var oMoth = (today.getMonth() + 1).toString();
	if (oMoth.length <= 1) oMoth = '0' + oMoth;
	var oDay = today.getDate().toString();
	if (oDay.length <= 1) oDay = '0' + oDay;
	return oYear + str + oMoth + str + oDay;
}
export default{
  setStorage,
  getStorage,
  clearStorage,
  setStorJson,
	getStorJson,
	getDay
}