// usar paquetes 'mysql' y 'node express'
// express: permite crear la api para el crud
const mysql = require ('mysql');
const express = require('express');
const cors = require('cors');
// variable para accceder a todo express y sus parametros 
var app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.json());
app.use(cors());

// parametros de conexion a DB 
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ragnarok"
});

// conexion o error a la base de datos
con.connect(function (err) {
  if (err){
    throw err;
  } else{
    console.log("Connected!");
  }
});

// RUTAS 
// ruta inicial 
app.get('/', function(req,res){
  res.send('Ruta inicio');
});

// Mostrar todos los dioses 
app.get('/api/gods', (req,res)=>{
  con.query('SELECT * FROM gods', (error,filas)=>{
    if(error){
      throw error;
    }else{
      res.send(filas);
    }
  });
});

// Mostrar todos los gigantes 
app.get('/api/giants', (req,res)=>{
  con.query('SELECT * FROM giants', (error,filas)=>{
    if(error){
      throw error;
    }else{
      res.send(filas);
    }
  });
});

// Mostrar un dios en especifico 
app.get('/api/god/:id', (req,res)=>{
  con.query('SELECT * FROM gods WHERE ID_God = ?', [req.params.id], (error,fila)=>{
    if(error){
      throw error;
    }else{
      res.send(fila);
    }
  });
});

// Mostrar 1 gigante en especifico 
app.get('/api/giant/:id', (req,res)=>{
  con.query('SELECT * FROM giants WHERE ID_Giant = ?', [req.params.id], (error,fila)=>{
    if(error){
      throw error;
    }else{
      res.send(fila);
    }
  });
});

// Insertar 1 dios en especifico 
app.post('/api/gods', (req,res)=>{
  let data = {name:req.body.Name, god:req.body.God, power:req.body.Power, img:req.body.img};
  let sql = "INSERT INTO gods SET ?"
  con.query(sql, data, (error,results)=>{
    if(error){
      throw error;
    }else{
      res.send(results);
    }
  });
});

// Insertar 1 dios en especifico 
app.post('/api/giants', (req,res)=>{
  let data = {name:req.body.Name, giant:req.body.Giant, power:req.body.Power, img:req.body.img};
  let sql = "INSERT INTO giants SET ?"
  con.query(sql, data, (error,results)=>{
    if(error){
      throw error;
    }else{
      res.send(results);
    }
  });
});

// Editar 1 dios
app.put('/api/god/:id', (req,res)=>{
  let id = req.params.id;
  let name = req.body.Name;
  let god = req.body.God;
  let power = req.body.Power;
  let img = req.body.img;
  let sql = "UPDATE gods SET Name = ?, God = ?, Power = ?, img = ? WHERE ID_God = ?";
  con.query(sql, [name, god, power, img, id], function(error, results){
    if(error){
      throw error;
    }else{
      res.send(results);
    }
  });
});

// Editar 1 Gigante
app.put('/api/giant/:id', (req,res)=>{
  let id = req.params.id;
  let name = req.body.Name;
  let giant = req.body.Giant;
  let power = req.body.Power;
  let img = req.body.img;
  let sql = "UPDATE giants SET Name = ?, Giant = ?, Power = ?, img = ? WHERE ID_Giant = ?";
  con.query(sql, [name, giant, power, img, id], function(error, results){
    if(error){
      throw error;
    }else{
      res.send(results);
    }
  });
});

//Eliminar 1 Dios
app.delete('/api/god/:id', (req,res)=>{
  con.query('DELETE FROM gods WHERE ID_God = ?', [req.params.id], function(error, filas){
    if(error){
      throw error;
    }else{
      res.send(filas);
    }
  });
});

//Eliminar 1 Gigante
app.delete('/api/giant/:id', (req,res)=>{
  con.query('DELETE FROM giants WHERE ID_Giant = ?', [req.params.id], function(error, filas){
    if(error){
      throw error;
    }else{
      res.send(filas);
    }
  });
});

// asignar puerto ya sea asignada o 3000
const puerto = process.env.PUERTO || 3800;

// conexion con la ruta 
app.listen(puerto, function(){
  console.log('servidor ok: '+puerto);
});