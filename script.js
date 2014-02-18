var weightReading; // Trigger: 3 lb weight gain in 24 hrs
var sysReading;
var diaReading;
var rateReading;
var oxyReading = 94;

var sys10DayAverage = 80;

var weightReadFrom = "2013-01-01T00:00:00+00:00";
var weightReadTo   = "2013-10-27T23:59:59+00:00";

queryData();
setInterval( queryData, 2000 );

function queryData(){
  // Weight
  $.ajax({
      url: 'https://api.validic.com/v1/users/526c298d6dedda3991000002/weight.json?access_token=41632a1a49a12e4f3fb77cc27b0c8bb82af7673a407bf4a8bed81bbb1df44b8c&+start_date='+weightReadFrom+'&end_date='+weightReadTo,
      type: 'get',
      dataType: 'json',
      success: function (data) {
      
        console.log("data.weight[0].weight(kg): "+data.weight[0].weight);
        window.weightReading = Math.round((data.weight[0].weight)*2.2).toFixed(1);
        $('span.weightInfo').text(weightReading);

        lastWeightObj = data.weight.pop();
        console.log("lastWeightObj.weight(kg): "+lastWeightObj.weight);
        window.weightLastReading = Math.round((lastWeightObj.weight)*2.2).toFixed(1);
        gain = window.weightReading - window.weightLastReading; //gain =5;
        console.log("gain(lb): "+gain);

        if ( gain > 3 ) {
          $('span.weightInfo').addClass('red');
          $('span.weightInfo').addClass('blink');
          gain24Status = 1;
        }
        else {
          $('span.weightInfo').removeClass('red');
          $('span.weightInfo').removeClass('blink');
          gain24Status = 0;
        };

        var client = new Usergrid.Client({orgName:"chenei",appName:"sandbox"});
        client.getEntity({type:"hacks", name:'chun'}, function(err, din){
          if (err) {console.log("could not log data");} 
          else {
            apigeeData = din;
            apigeeData.set("gain24", gain24Status);
            apigeeData.save();
            console.log("gain24Status: "+gain24Status);
          }
        });  
      }
  });

  // Pressure & Heart Rate
  $.ajax({
      url: 'https://api.validic.com/v1/users/526c298d6dedda3991000002/biometrics.json?access_token=41632a1a49a12e4f3fb77cc27b0c8bb82af7673a407bf4a8bed81bbb1df44b8c&start_date='+weightReadFrom+'&end_date='+weightReadTo,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        console.log(data.biometrics[0].systolic);
        console.log(data.biometrics[0].diastolic);
        console.log(data.biometrics[0].resting_heartrate);

        window.sysReading = data.biometrics[0].systolic;
        window.diaReading = data.biometrics[0].diastolic;
        window.rateReading = data.biometrics[0].resting_heartrate;
        $('span.pressureInfoS').text(sysReading);
        $('span.pressureInfoD').text(diaReading);
        $('span.rateInfo').text(rateReading);

        sysGain = window.sysReading - window.sys10DayAverage;

        if ( sysGain > 20 ) {
          $('span.pressureInfoS').addClass('red');
          $('span.pressureInfoS').addClass('blink');
          sys10DayAverageStatus = 1;
        }
        else {
          $('span.pressureInfoS').removeClass('red');
          $('span.pressureInfoS').removeClass('blink');
          sys10DayAverageStatus = 0;
        };

        var client = new Usergrid.Client({orgName:"chenei",appName:"sandbox"});
        client.getEntity({type:"hacks", name:'chun'}, function(err, din){
          if (err) {console.log("could not log data");} 
          else {
            apigeeData = din;
            apigeeData.set("sys10DayAverage", sys10DayAverageStatus);
            apigeeData.save();
            console.log("sys10DayAverageStatus: "+sys10DayAverageStatus);
          }
        }); 


      }
  });

  // Oxygen
  $('span.oxyInfo').text(oxyReading);
};



