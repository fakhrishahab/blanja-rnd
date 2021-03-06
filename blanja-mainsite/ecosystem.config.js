module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'Blanja-Mainsite',
      script    : './server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      watch     : true,
      autorestart : false,
      interpreter : "babel-node",
      exec_mode : "cluster",
      args      : ["--presets es2015"],
      output: 'C:/Users/akhmad.fakhri/.pm2/logs/out.log',
      error: 'C:/Users/akhmad.fakhri/.pm2/logs/error.log',
	    log: 'C:/Users/akhmad.fakhri/.pm2/logs/combined.outerr.log',
      env       : {
        NODE_ENV: 'development',
        HOMEPATH : "C:/Users/akhmad.fakhri/.pm2",
        HOME : "C:/Users/akhmad.fakhri/.pm2"
      },
      env_production : {
        NODE_ENV: 'production',
        HOMEPATH : "C:/Users/akhmad.fakhri/.pm2",
        HOME : "C:/Users/akhmad.fakhri/.pm2"
      },
    }
  ]

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   },
  //   dev : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/development',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
  //     env  : {
  //       NODE_ENV: 'dev'
  //     }
  //   }
  // }
};
