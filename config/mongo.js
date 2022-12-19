const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err, res) => {
    if(!err){
      console.log("👌 Conexión a la base de datos exitosa");
    } else {
      console.log("🔒 Error en la conexión a la base de datos");
    }
  });
};

module.exports = dbConnect;
