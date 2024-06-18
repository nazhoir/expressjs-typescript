import { networkInterfaces } from 'os';
import { env } from '@/utils/env';
import app from './app';

/*
  ===============================================================
  Importing the port set on the .env, if the port number is not set on .env or the port is being used by another server
  running on the local macchine we are asking the app to use 3000 as the port number 
  ===============================================================
*/
const PORT = env.APP_PORT || 3000;
app.listen(PORT, () => {
  let ip = '127.0.0.1';
  const nets = networkInterfaces();
  if (nets.Ethernet?.length! > 0) {
    ip = nets.Ethernet![0].address;
  }

  console.log(`
======================================
     _______ __  ________ ________
    /  ____/(__)/  __   //  __   /
   /  /___ ___ /  /_/  //  /_/  /
  /  ____//  //  _____//     __/
 /  /    /  //  /     /  /\\  \\
/__/    /__//__/     /__/  \\__\\
======================================

Running on :
local = http://0.0.0.0:${PORT}
public = http://${ip}:${PORT}
`);
});
