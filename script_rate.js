var client = new Usergrid.Client({orgName:"chenei",appName:"sandbox"});

client.getEntity({type:"hacks", name:'chun'}, function(err, din){
  if (err) {console.log("could not log data");} 
  else {
    apigeeData = din;
    

  }
});