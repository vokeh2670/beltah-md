const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEh6emo3cUVwL2Q5cFlBMGwxZEpRSTZTczFoLzdNNGtodjRyTVc2MWswTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWl4WTV4WHhxZmhBTVBmMjFlR0tIVCt2OUM0S1BnVS9MVFgyTkpTb2hpQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpR1hORFQwWWlIcDZ2M0ZOZVg2NVlQbld0clp2WG9DUXErdVlMNUs4azBvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TDhLZXpTSnFHeVJvanYzallxZmd5Y05UYmF1bzBNUkpxQUpYSmlTK0hNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9KcjAvSE5mVy83T3h2Q0YwQXlLdjQvV0MzaHkyelhTdEFlRVpqQmc1bEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFuOURHSSs0WDdKbnlSS05iS05FcHZaY0hCSjdLT2hGV0gyVGxWbmlzd1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUl6eWszZ2tnU1NrOEUrcTFXWENnTVd5ZFNZalFuVUJha2VucFlhVlRVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1Fvck1JMTdGenJjTkVtSjdudkdSSjhsTnJqY1piSmpPZGF2TGRsSzlHST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtZTm1QbzNjRkpGcWt0NzRiTFFja0Qxa2pPTmh1R3N3cTkyWFhGTDc3ejlJSTUzb1BUcmlrOGlYbTRaQ3AyK3NVa0NlMGxhWXErRVovZHE2Q1pqMGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTksImFkdlNlY3JldEtleSI6ImlmbkhNcXJiNUgwdDBLL0g2azVlT2wrYzE1UXJMbWhaMzhqSHZsMVlDL1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjdoR2wzWXBwUkZxUTVGNVBPM3NCb2ciLCJwaG9uZUlkIjoiMmQ2NmRkZDktMjQ0YS00MjM0LTgwN2UtOTMyOWI2MDVjM2RlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxEZHpYbWVyaDc1M014enkraDc0U1l6bzVIaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkcllBSHJlRlFCcFBHQzVVN3B3Nlllbk96U2c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV1BQQVI0Mk4iLCJtZSI6eyJpZCI6IjI1NDcxMzk3Mjc1Mzo4MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBzLd2zLdpzLduzLdzzLcgbc2bZM2bIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPRFE5WXNCRUtURHlyTUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJQdTdjV1l4WjBGTnZ4aFBaS0pGRytGY0FGeXRacWdHdEkvZTdXRjVSY0ZBPSIsImFjY291bnRTaWduYXR1cmUiOiJNSGxaRnFSY2dGUVhxNUtjUlpEenV2L1JyQVFqa2lkdkc5N0NsQUUwdUpkeEJHZXJ0b25ldkgrQmZQa1RzSHBvOU9LMHlUWjI4MDZzWUFqdGk4L0JBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMmplanRkRWJ1UzJOVGZ1VnBYWlNUVXV5QnJFM0lWS0lMRmRJcXpiNHp3Y2VNMHhrQ2FvYjVUK0ZFZnIwVEExbHNuellabEdiQUEzVVEydTA1YjhTZ1E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTM5NzI3NTM6ODBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVDd1M0ZtTVdkQlRiOFlUMlNpUlJ2aFhBQmNyV2FvQnJTUDN1MWhlVVhCUSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODc4ODUyOH0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "‌🇦‌𝐕🄸𝐍🅢 ‌🇲‌‌🇩‌",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "‌🇦‌𝐕🄸𝐍🅢 ‌",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || '‌🇦‌𝐕🄸𝐍🅢 ‌🇲‌‌🇩‌',
    URL : process.env.BOT_MENU_LINKS || https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
