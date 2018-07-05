function env(req, res, next){
	var PROFILE = {};

	switch(process.env.NODE_ENV){
	case "production" :
		PROFILE = {
			mainsiteUrl : 'http://localhost:3001',
			staticUrl : 'https://s1.blanja.com',
			serviceUrl : 'http://localhost:3002'
		};
	break;
	case "staging" :
		PROFILE = {
			mainsiteUrl : 'http://localhost:3001',
			staticUrl : 'http://s1.blanjadev.com',
			serviceUrl : 'http://localhost:3002'
		};
	break;
	case "development" :
	default:
		PROFILE = {
			mainsiteUrl : 'http://localhost:3001',
			staticUrl : 'http://localhost:3000',
			serviceUrl : 'http://localhost:3002'
			// staticUrl : 'http://10.10.24.37:3000',
			// serviceUrl : 'http://10.10.24.37:3002'
		};
	break;
	}

	res.locals.profile = PROFILE;
	
	next();
}

module.exports = env;