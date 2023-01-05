//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { typeReq } = require('./src/controllers/ApiReq.js');
const { conn } = require('./src/db.js');
const { Type } = require("./src/db.js")

const charge = async () => {
  const db = await Type.findAll()
  if (db.length < 1) {
    const typeApi = await typeReq()
    typeApi.forEach(e => {
      Type.create({
        name: e.name
      })
    });
  }
}
// Syncing all the models at once.
const PORT = process.env.PORT || 3001
conn.sync({ force: true }).then(async () => {
  await charge()
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});
