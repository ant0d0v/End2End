import { test as setup} from '@playwright/test';
const authFile = "./data/auth/user.json";

setup('authenticate', async ({  request}) => {
  await request.post('https://accounts.dev.swisscows.com/login?returnUrl=/', {
    data: {
      'email': process.env.USERNAME,
      'password' :	process.env.PASSWORD,
    }
  });
  await request.storageState({ path: authFile });
});