$('textarea').autosize({append: "\n"}); 

var client = new Usergrid.Client({orgName:"chenei",appName:"sandbox"});

client.getEntity({type:"hacks", name:'chun'}, function(err, din){
  if (err) {console.log("could not log data");} 
  else {
    apigeeData = din;
    

  }
});

$('textarea').keyup(function(){
    var array = $('textarea').val().split(/\n|\r/);
    var jsonString = $.toJSON( $('textarea').val().split(/\n|\r/) );
});