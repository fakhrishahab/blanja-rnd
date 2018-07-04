function defineEnv(req, res, next){
	var PROFILE = {};

	switch(process.env.NODE_ENV){
	case "production" :
		PROFILE = {
			mainsiteUrl : 'http://localhost:3001',
			staticUrl : 'https://s1.blanja.com',
			serviceUrl : 'http://localhost:3002',
			// grpcServer : '10.11.17.34:10001'
			grpcServer : '10.10.99.75:10001'
		};
	break;
	case "staging" :
		PROFILE = {
			mainsiteUrl : 'http://localhost:3001',
			staticUrl : 'http://s1.blanjadev.com',
			serviceUrl : 'http://localhost:3002',
			// grpcServer : '10.11.17.34:10001'
			grpcServer : '10.10.99.75:10001'
		};
	break;
	case "development" :
	default:
		PROFILE = {
			mainsiteUrl : 'http://localhost:3001',
			staticUrl : 'http://localhost:3000',
			serviceUrl : 'http://localhost:3002',
			// grpcServer : '10.11.17.34:10001'
			grpcServer : '10.11.17.38:10001'
		};
	break;
	}

	res.locals.profile = PROFILE;
	
	next();
}

export default defineEnv;