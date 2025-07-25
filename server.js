import cron from 'node-cron';
import { exec } from 'child_process';
import { sendEmail } from './src/nodemailer.js';
import dotenv from 'dotenv';
dotenv.config();

console.log(cron.getTasks());


async function main() {
    cron.schedule(process.env.TIME_TO_PULL, () => {
        console.log(`[${new Date().toISOString()}] Starting git pull…`);

        exec(`cd ${process.env.PROJECT_LOCATION} && git pull origin main`, async (err, stdout, stderr) => {
            if (err) {
                console.error('❌ Git Pull Error:', stderr);
                sendEmail(
                    '🚨 [Deploy] Git Pull FAILED',
                    `Time: ${new Date().toLocaleString()}\n\nError:\n${stderr}`
                ).catch(console.error);
                return;
            }

            console.log('✅ Git Pull Success:', stdout);
            await sendEmail('✅ [Deploy] Git Pull SUCCESS', `✅ Git berhasil di pull pada pukul Time: ${new Date().toLocaleString()}, dengan rincian : \n\n\n ${stdout}`);
        });
        console.log(cron.getTasks());
    }, {
        timezone: 'Asia/Jakarta'  // sesuaikan timezone
    });
}

main();