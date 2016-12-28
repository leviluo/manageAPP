var managerController = require("./controllers/managerController")

module.exports = function(router){
	router.get("/queryContractList",managerController.queryContractList,router.allowedMethods());
	
}