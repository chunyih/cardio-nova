var client = new Usergrid.Client({orgName:"chenei",appName:"sandbox"});

client.getEntity({type:"hacks", name:'chun'}, function(err, din){
  if (err) {console.log("could not log data");} 
  else {
    apigeeData = din;
    console.log("sys10DayAverage: "+apigeeData.get("sys10DayAverage"));
    
    if (apigeeData.get('sys10DayAverage') == 1) { 
      $('div.msgText').text(apigeeData.get('msgSysGain'));
      $('div.msgArea > div > span.msgIcon').addClass('glyphicon-exclamation-sign');
      $('div.msgArea').css('display', 'block');
    }

  }
});