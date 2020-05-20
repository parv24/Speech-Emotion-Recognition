const tf = require('@tensorflow/tfjs')
const cors=require('cors');
const express=require('express');
const app=express();
let pred_emotion="?";
let actual_emotion;
let userfilename= "?";
const emotions2={
  '01':'Neutral',
  '02':'Calm',
  '03':'Happy',
  '04':'Sad',
  '05':'Angry',
  '06':'Fearful',
  '07':'Disgust',
  '08':'Surprised'
}
const emotions={
  0:'Neutral',
  1:'Calm',
  2:'Happy',
  3:'Sad',
  4:'Angry',
  5:'Fearful',
  6:'Disgust',
  7:'Surprised'
};
var flag=false;
var path="";
upload=require('express-fileupload');
app.use(upload());
app.use(cors());
app.use(express.static("public"));
app.set('view engine','ejs');
let model;
(async function()
{
  const path = "model/model.json"
model=  await tf.loadLayersModel('http://localhost:8080/model/model.json');
})();
app.post("/",function(req,res)
{
  if(req.files)
  {
    var file=req.files.audio,
    filename=file.name;
    userfilename=filename;
    actual_emotion=emotions2[filename.split("-")[2]];
    path="/uploads/"+filename;
    file.mv("./public/uploads/"+filename,function(err)
  {
    if(err)
    {
      console.log(err)
      res.send("error occured")
    }
    else
    {
      var spawn = require("child_process").spawn;
      const mfccPath="C:/Users/Dell/Desktop/webD/major/public/uploads/"+filename;
      var pythonProcess = spawn('python',["./mfcc.py", mfccPath]);
      pythonProcess.stdout.on('data', function(data){
      var pdata=data.toString();
      var res = pdata.split("/");
      var feature=[]
      for(var j=0;j<res.length;j++)
      {
        feature.push(parseFloat(res[j]));
      }
      const prediction = model.predict(tf.tensor(feature, [1,40,1,1]));
      const tensorData = prediction.dataSync();
      const arr = Array.from(tensorData);
      var max = arr[0];
      var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    pred_emotion=emotions[maxIndex];
    console.log("actual: "+actual_emotion);
      console.log("prediction:  "+pred_emotion);
})
      flag=true;
      res.redirect("/");
    }
  })
  }
})
app.get("/",function(req,res)
{
  res.render("list",{listTitle:"Speech Emotion Recognition",userfilename:userfilename,audioSource:path,flag:flag,pred_emotion:pred_emotion,actual_emotion:actual_emotion});
})
app.listen(3000,function()
{
  console.log("server started at port 3000");
})
