var client = new Usergrid.Client({orgName:"chenei",appName:"sandbox"});

client.getEntity({type:"hacks", name:'chun'}, function(err, din){
  if (err) {console.log("could not log data");} 
  else {
    apigeeData = din;
    console.log("gain24: "+apigeeData.get("gain24"));
    
    if (apigeeData.get('gain24') == 1) { 
      $('div.msgText').text(apigeeData.get('msgGain24'));
      $('div.msgArea > div > span.msgIcon').addClass('glyphicon-exclamation-sign');
      $('div.msgArea').css('display', 'block');
    }

  }
});