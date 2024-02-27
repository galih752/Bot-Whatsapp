const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
	console.log(message.body);
    console.log(await (await message.getContact()).getFormattedNumber())
});


client.on('message', async (message) => {
    const [action, tanggal, waktu, tempat, pakaian, note] = message.body.split(';');
	if (action.trim() =='!info') {
		await message.reply(`🔊🔊
Assalamualaikum warahmatullahi wa barakatuh,
Selamat pagi, Salam Pramuka! 
Diberitahukan kepada seluruh anggota untuk hadir pada:

📆 Hari/tanggal : ${tanggal}
⏰ Waktu : ${waktu}
📍 Tempat : ${tempat}
👔 Pakaian : ${pakaian}

📝 Catatan : ${note}

Demikian pengumuman ini saya sampaikan saya harap seluruh anggota dapat hadir pada kegiatan tersebut di atas, Terimakasih.

Created by ${await (await message.getContact()).getFormattedNumber()}`);
	}
});
 

client.initialize();