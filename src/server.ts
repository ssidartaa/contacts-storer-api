import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config"


(async () => {
  await AppDataSource.initialize().then(()=>{
    console.log("Executando Database");
  }).catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("Executando Servidor");
  });
})();
