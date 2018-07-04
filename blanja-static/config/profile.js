var PROFILE = {};

switch(process.env.PROFILE){
	case "production" :
		PROFILE = {
			baseUrl : "//www.blanja.com",
			resUrl : "//s.blanja.com",
			// res1Url : "//s1.blanja.com",
			res1Url: "http://localhost:3000",
			res2Url : "//s2.blanja.com",
			itemUrl : "//item.blanja.com",
			chatUrl : "//chat.blanja.com",
			tradeUrl : "//trade.blanja.com",
			memUrl : "https://member.blanja.com",
			shopUrl : "http://seller.blanja.com",
			httpsTradeUrl : "https://trade.blanja.com",
			mobileBaseUrl : "//m.blanja.com",
			mobileUrl: "http://m.blanja.com",
			serviceUrl : "http://localhost:3002",
			port : 3000
		};
	break;
	case "staging" :
		PROFILE = {
			baseUrl : "//www.blanjadev.com",
			resUrl : "//s.blanjadev.com",
			res1Url : "//s1.blanjadev.com",
			res2Url : "//s2.blanjadev.com",
			itemUrl : "//item.blanjadev.com",
			chatUrl : "//chat.blanjadev.com",
			tradeUrl : "//trade.blanjadev.com",
			memUrl : "https://member.blanjadev.com",
			shopUrl : "http://seller.blanjadev.com",
			httpsTradeUrl : "https://trade.blanjadev.com",
			mobileBaseUrl : "//m.blanjadev.com",
			mobileUrl: "http://m.blanjadev.com",
			serviceUrl : "http://localhost:3002",
			port : 3000
		};
	break;
	case "development" :
	default:
		PROFILE = {
			baseUrl : "http://localhost:8088",
			resUrl : "http://localhost:8081",
			res1Url : "http://localhost:3000",
			res2Url : "http://localhost:8081",
			itemUrl : "http://localhost:8086",
			chatUrl : "http://localhost:8085",
			tradeUrl : "http://localhost:8087",
			memUrl : "http://localhost:8082",
			shopUrl : "http://localhost:8083",
			httpsTradeUrl : "http://localhost:8087",
			mobileBaseUrl : "http://localhost:3001",
			mobileUrl: "http://localhost:8089",
			serviceUrl : "http://localhost:3002",
			port : 3000
		};
	break;
 }

export default PROFILE;