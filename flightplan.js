var plan = require("flightplan");

var appName = "casino";
var username = "deploy";
var startFile = "";

var tmpDir = appName + "-" + new Date().getTime();

// configuration
// plan.target('staging', [
//   {
//     host: '104.131.93.214',
//     username: username,
//     agent: process.env.SSH_AUTH_SOCK
//   }
// ]);

plan.target("production", [
  {
    host: "172.105.107.119",
    username: "deploy",
    agent: process.env.SSH_AUTH_SOCK,
  },
  //add in another server if you have more than one
  // {
  //   host: '104.131.93.216',
  //   username: username,
  //   agent: process.env.SSH_AUTH_SOCK
  // }
]);

// run commands on localhost
plan.local(function (local) {
  // uncomment these if you need to run a build on your machine first
  // local.log('Run build');
  // local.exec('gulp build');
  local.log("Copy files to remote hosts");
  var filesToCopy = local.exec("git ls-files", { silent: true });
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, "/tmp/" + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function (remote) {
  remote.log("Move folder to root");
  remote.sudo("cp -R /tmp/" + tmpDir + " ~", { user: username });
  remote.rm("-rf /tmp/" + tmpDir);

  // remote.log('Install dependencies');
  // remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});
  var version = remote.prompt("What is the version?");
  remote.log("Casino version " + version);
  // remote.log('Reload application');
  remote.log("Update previous version");
  remote.sudo("ln -snf ~/" + tmpDir + " ~/" + appName, { user: username });
  remote.sudo(
    "cd ~/" + appName + " && " + "docker build -t casino:" + version + " .",
    { user: username }
  );
  remote.sudo(
    "docker stop casino_container && docker rm casino_container && docker run --name casino_container --restart=always -d -p 80:3000 casino:" +
      version,
    { user: username }
  );
  // remote.exec('cd ~/'+ appName  + '&&' + 'forever start index.js', {failsafe: true});
  // remote.exec('cd ~/'+ appName  + '&&' + 'forever stop index.js');
});
