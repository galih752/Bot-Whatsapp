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
    
    console.log('Bot is activated!');
    
    const yourPhoneNumber = '08882037076';
    client.sendMessage(yourPhoneNumber, 'Bot telah diaktifkan!');
});

client.on('message', async (message) => {
	console.log(message.body);
    console.log(await (await message.getContact()).getFormattedNumber())
});


// Informasi Kumpul atau Pertemuan 
client.on('message', async (message) => {
    const [action, tanggal, waktu, tempat, pakaian, note, kegiatan] = message.body.split(';');
	if (action.trim() =='!info') {

        const currentHour = new Date().getHours();
        
        // Menentukan salam berdasarkan waktu
        let greeting = '';
        if (currentHour < 12) {
            greeting = 'Selamat pagi';
        } else if (currentHour < 18) {
            greeting = 'Selamat siang';
        } else {
            greeting = 'Selamat sore';
        }

		await message.reply(`🔊🔊
Assalamualaikum warahmatullahi wabarakatuh,
${greeting}, Salam Pramuka! 
Diberitahukan kepada seluruh anggota Dewan Kerja Ranting Padalarang diwajibkan hadir pada:

📆 Hari/tanggal : ${tanggal}
⏰ Waktu : ${waktu}
📍 Tempat : ${tempat}
👔 Pakaian : ${pakaian}

📝 Catatan : ${note}

Demikian pengumuman ini saya sampaikan saya harap seluruh anggota dapat hadir pada kegiatan tersebut di atas, sesuai dengan waktu yang telah di tentukan, Terimakasih.

Created by ${await (await message.getContact()).getFormattedNumber()}`);
	}
    else if (action.trim() =='!warning') {
        const currentHour = new Date().getHours();
        
        // Menentukan salam berdasarkan waktu
        let greeting = '';
        if (currentHour < 12) {
            greeting = 'Selamat pagi';
        } else if (currentHour < 18) {
            greeting = 'Selamat siang';
        } else {
            greeting = 'Selamat sore';
        }

        await message.reply(`🔊🔊
Assalamualaikum warahmatullahi wabarakatuh,
${greeting}, Salam Pramuka! 
Mengingatkan kembali kepada seluruh anggota Dewan Kerja Ranting Padalarang diwajibkan hadir pada:

📆 Hari/tanggal : ${tanggal}
⏰ Waktu : ${waktu}
📍 Tempat : ${tempat}
👔 Pakaian : ${pakaian}

📝 Catatan : ${note}

Demikian pengumuman ini saya sampaikan saya harap seluruh anggota dapat hadir pada kegiatan tersebut di atas, sesuai dengan waktu yang telah di tentukan, Terimakasih.

Created by ${await (await message.getContact()).getFormattedNumber()}`);
    }
    else if (action.trim() =='!list') {
        await message.reply(`List kehadiran kegiatan ${kegiatan} :
1.
2.
3.
4.
5.
dst.

List tidak hadir - alasan :
1.
2.
3.
4.
5.
dst.

created by ${await (await message.getContact()).getFormattedNumber()}`);
    }
});
client.initialize();