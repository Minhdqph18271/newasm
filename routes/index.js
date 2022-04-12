var express = require('express');
var router = express.Router();
var fs = require('fs')
const url = require('url')

//mongo
var db = 'mongodb+srv://admin:mushroomti1@cluster0.okhjs.mongodb.net/mydata?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const e = require("express");
mongoose.connect(db).catch(error =>{
  console.log("Có lỗi xảy ra")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang thêm' , message:''});
});
router.get('/sua',function (req,res) {
  console.log('Sua')
  res.render('sua',{title : 'Trang sửa', message:''});
})
// router.get('/getall',function (req,res) {
//   console.log('Xem')
//   Student.find({},function (err,data){
//     res.send()
//   })
// })


//mongo
const studentSchema = new mongoose.Schema({
  tenAnh: 'string',
  ndAnh: 'string',
  ngayH: 'string',
  linkAnh: 'string'
});
const Student = mongoose.model('students',studentSchema);
router.post('/uploads', function (req,res) {
  var tenAnh = req.body.tenAnh;
  var ndAnh = req.body.ndAnh;
  var ngayH = req.body.ngayH;
  var linkAnh = req.body.linkAnh;
  console.log(tenAnh);
  console.log(ndAnh);
  console.log(ngayH);
  console.log(linkAnh);

  const data = new Student({
    tenAnh: tenAnh,
    ndAnh: ndAnh,
    ngayH: ngayH,
    linkAnh: linkAnh
  });

  data.save(function (err) {
    if (err) return handleError(err);
    res.render('index', {
      title: 'Thêm',
      message: 'Đã thêm'
    })
    console.log('Da them')
  });
});

router.post('/uploadss', async function (req,res) {
  var tenAnh2 = req.body.tenAnh;
  var ndAnh2 = req.body.ndAnh;
  var ngayH2 = req.body.ngayH;
  var linkAnh2 = req.body.linkAnh;
  console.log(tenAnh2);
  console.log(ndAnh2);
  console.log(ngayH2);
  console.log(linkAnh2);

    res.render('sua', {
      title: 'Thêm',
      message: 'Đã sửa'
    })
    console.log('Đã sửa')

  const filter = {tenAnh: tenAnh2};
  const update = {ndAnh: ndAnh2, ngayH: ngayH2, linkAnh: linkAnh2};
  let ketqua = await Student.findOneAndUpdate(filter, update, {
    new: true
  });
});

router.get('/xem',function (req,res) {
  console.log('Xem')
  Student.find({},function (err,data){
    res.render('xem',{data: data});
  })
})

router.post('/xemchitiet', function (req, res) {
  var id = req.body.id;
  Student.findById(id, (err, data) => {
    res.render("getall", {data: data})
    // console.log(data)
    // console.log(id)
  })
})

router.get('/allMobile',function (req,res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  Student.find({}, function (err,data){
    res.send(data);
  })
});

module.exports = router;
