module.exports = function(app,fs,Post){


  app.get('/',function(req,res){
    var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
    console.log(ip+"가 연결 시도함"+new Date());
    fs.appendFile("log.txt",ip+"  "+new Date()+"\r\n",'utf-8',function(e){
      if(e)console.log(e);
    })
    var postdb = new Post();
    postdb.name="Log";
    postdb.email=new Date();
    postdb.message=ip;

    postdb.save(function(err){
      if(err){
        console.error(err);
        return;
      }
      console.log("Db에 메세지 저장");
    });
    res.render('index.html')
  })
  app.post('/',function(req,res){

    fs.appendFile("message.txt","이름:"+req.body.name+" 이메일:"+req.body.email+"\r\n"
    +req.body.message+"\r\n"+new Date()+"\r\n",'utf-8',function(e){
      if(e)console.log(e);
      else console.log("good text");

    });

    var postdb = new Post();
    postdb.name=req.body.name;
    postdb.email=req.body.email;
    postdb.message=req.body.message+"|"+new Date();

    postdb.save(function(err){
      if(err){
        console.error(err);
        return;
      }
      console.log("Db에 메세지 저장");
    });


    // console.log(req.body.email);
    // var mailoptions={
    //   from :req.body.name+'<'+req.body.email+'>',
    //   to:'ehddnjs0728@gmail.com',
    //   subject:'웹 서버 문의사항  ',
    //   text:req.body.message+'\n from - '+req.body.email
    // }
    // smtp.sendMail(mailoptions,function(err,res){
    //   if(err)console.log(err);
    //   else console.log('send mail');
    //
    // })
  res.redirect('/');
});

  app.post('/test',function(req,res){

        req.body.name;
        console.log(req.body.name);
  });

  app.get('/ehddnjs0728/private/:code',function(req,res){
    if(req.params.code==1)res.send('hi');
    else res.send('bye');
  });

}
