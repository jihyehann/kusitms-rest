const Database = require("@replit/database");
const db = new Database();

const writeView = function(req, res){
  res.render('write.ejs');
}

 const listView = async function(req, res){
  var keyList = [];
  var dataArr = [];
  await db.list().then(keys => {
    keyList = keys;
  });

  for(let element of keyList){
    await db.get(element).then(value =>{
      dataArr.push(value);
    });
  }

  console.log(dataArr);
  res.render('list.ejs', { posts : dataArr });
}

 const addPost = function(req, res){
  var key = req.body.name;
  var mydata = {
    name : req.body.name,
    title: req.body.title,
    content: req.body.content
  }

  if(key == "") {
    res.status(400).send('name 오류');
  } else {
    db.set(key, mydata).then(() => {});
    res.status(200).send('데이터 전송 완료');
  }

}

const deletePost = function(req, res){
  db.delete(req.body.name).then(() => {
    res.status(200).send('삭제 완료');
  });
}

const getPost = function(req, res) {
  db.get(req.params.key).then(value => {
    if(value == null) {
      res.status(400).send('데이터 없음');
    } else {
      res.status(200).send(value);
    }
  });
}

module.exports = {
  writeView, listView, addPost, deletePost, getPost
}