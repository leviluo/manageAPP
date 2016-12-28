var ffi = require("ffi");
var config = require("../configs/managerConfig")
var managerApi

function init(){
  return new Promise(function(resolve, reject){
    try{
      var api = ffi.Library('C:/qizheng/qizShared/qizManagerApi', {
                     'qma_queryContractList': //查询合约列表
                     [
                        'string', []
                     ],
                     'qma_deleteContract':    //删除合约
                     [
                        'string', [ 'string','string' ]
                     ],
                     'qma_addContract':       //增加合约
                     [
                        'string', [ 'string','string','string','string','int','int','int','int','int','double','string','string','string' ]
                     ],
                     'qma_dbInit':    //
                     [
                        'bool', [ 'string','int','string' ]
                     ],
                     'qma_checkAccountValid':    //检测账户是否可用
                     [
                        'string', [ 'string','string' ]
                     ],
                     'qma_querySettlementText':    //
                     [
                        'string', [ 'string','string' ]
                     ],
                     'qma_queryDominantContract':    //
                     [
                        'string', []
                     ],
                     'qma_getReservedAccount':    //获取预留账户
                     [
                        'string', []
                     ],
                     'qma_queryTradeToday':    //查询今日交易
                     [
                        'string', [ 'string']
                     ],
                     'qma_queryTradeHistory':    //查询历史交易
                     [
                        'string', [ 'string','string']
                     ],
                     'qma_checkRoleValid':    //检查角色是否正常(1: 风控员。 2: 管理员; 4: 交易员;);
                     [
                        'string', [ 'string','string','int']
                     ],
                     'qma_queryAccountFlag':    //查询,修改分账户标志
                     [
                        'string', [ 'string' ]
                     ],
                     'qma_setAccountFlag':    //设置分帐户标志
                     [
                        'string', [ 'string','int']
                     ],
                  });
        api.qma_dbInit(config.dbServerIP, config.dbServerPort, config.dbFlag);
        resolve(api)
      }catch(err){
        reject(err)
      }
  })
}

module.exports = {
	queryContractList: function *(next){
    managerApi = yield init();
    this.body = managerApi.qma_queryContractList()
	},
}
