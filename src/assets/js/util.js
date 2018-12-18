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
const formatShortDate = time => {
  const date = new Date(parseFloat(time));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('/');
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatPrice(x) {
	var f = parseFloat(x);  
	if (isNaN(f)) {  
			return;  
	}  
	f = Math.round(x*100)/100;  
	return f;  
}
function forInTime(arr,index){
	for(let i=0,j=arr.length;i<j;i++){
		arr[i][index] = formatShortDate(arr[i][index]);
	}
}
function forInSelName(arr,index){
	for(let i=0,j=arr.length;i<j;i++){
		let b = arr[i][index].split(',');
		arr[i][index] = b.join("<br>");
	}
}
function forInPrice(arr,index){
	for(let i=0,j=arr.length;i<j;i++){
		arr[i][index] = "￥"+formatPrice(arr[i][index]);
	}
}
function forInStatus(arr,index){
	for(let i=0,j=arr.length;i<j;i++){
		switch (arr[i][index]) {
			case "0":
			arr[i].statusName = "未审核"
				break;
			case "1":
			arr[i].statusName = "未选中"
				break;
			case "2":
			arr[i].statusName = "已选中"
				break;
			case "3":
			arr[i].statusName = "已下架"
				break;
			case "4":
			arr[i].statusName = "未通过"
				break;
			case "5":
			arr[i].statusName = "已审核"
				break;
			default:
				break;
		}
	}
}
//下架商品
function soldOut(that,id){
	return new Promise((resolve, reject) => {
		that.$confirm('此操作将下架该商品, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error'
		}).then(() => {
			that.$api.changeStatus({
				ids:id,
				status:3
			}).then(res => {
				if(res.code == 0){
					resolve();
					that.$message({
						type: 'success',
						message: '下架成功!'
					});
				}
				
			})
			
		}).catch(() => {
			reject();
			that.$message({
				type: 'info',
				message: '已取消下架'
			});          
		});
	})
	
}
//通过商品
function pass(that,id){
	return new Promise((resolve, reject) => {
		that.$confirm('此操作将审核通过该商品, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error'
		}).then(() => {
			that.$api.changeStatus({
				ids:id,
				status:1
			}).then(res => {
				if(res.code == 0){
					resolve();
					that.$message({
						type: 'success',
						message: '通过审核!'
					});
				}
				
			})
			
		}).catch(() => {
			reject();
			that.$message({
				type: 'info',
				message: '已取消'
			});          
		});
	})
	
}
//拒绝通过商品
function turnDown(that,id){
	return new Promise((resolve, reject) => {
		that.$confirm('此操作将拒绝通过该商品, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'error'
		}).then(() => {
			that.$api.changeStatus({
				ids:id,
				status:4
			}).then(res => {
				if(res.code == 0){
					resolve();
					that.$message({
						type: 'success',
						message: '已拒绝!'
					});
				}
				
			})
			
		}).catch(() => {
			reject();
			that.$message({
				type: 'info',
				message: '已取消'
			});          
		});
	})
	
}
// 验证手机号
function isValidMobile(n) {
  return n ? /^\+((?!(86|1|81|65))[0-9]\d{7,}|(1)[0-9]{10}|(81)[0-9]{11}|(65)[0-9]{8})$/.test(n) ? !0 : /^(13[0-9]|15[012356789]|17[01235678]|18[0-9]|14[579]|19[89]|166)[0-9]{8}$/.test(n) ? !0 : !1 : !1
}
// 验证码
function settime(time,countdown) {
  var _time = time;
  var _countdown = countdown;
  if (_time == 0) {
    countdown("重新获取",true);
    _time = time;  
    return false;  
  } else {
    countdown("重新获取（"+_time+"）",false);
    _time--; 
  }  
  setTimeout(function() {  
    settime(_time,_countdown);  
  },1000);  
}
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};
export default{
  setStorage,
  getStorage,
  clearStorage,
  setStorJson,
	getStorJson,
	getDay,
	formatShortDate,
	forInTime,
	forInSelName,
	forInStatus,
	formatPrice,
	forInPrice,
	soldOut,
	pass,
	turnDown,
	isValidMobile,
	settime
}