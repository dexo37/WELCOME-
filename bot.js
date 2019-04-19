// السلام عليكم ورحمة الله وبركاته
// رجعنا لكم من جديد بكود يستعمل جسون
// هذا رح يكون اوتو رول متعدد يشتغل لأكثر من سيرفر , يمديك تحط فيه رسائل وتمسحهم او اوتو رول وتمسحه
// وبينفع مره للبوتات الي تبي تتطور وتبي تنشهر
//اول شي سوي ملف وسميه code.json
//وحط داخله {}
//انزل لكل كوماند عشان تشوف وش يسوي
//لو في اي قلتش كلم @Azoqz#0888
// او @Vampire#2516
//Made By Azoqz or known as Vampire From Codes
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: false });
const fs = require("fs");
let client = bot;
bot.codes = require("./code.json")
bot.on(`ready`, () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus("online")
});




client.on('ready', () => {
  client.user.setGame(` Welcome Bot (: `, 'https://www.twitch.tv/hi');
console.log('BOT ONLINE');
});



bot.on("guildMemberAdd", (member) => { //هذي يوم يستنى الشخص يدخل السيرفر عشان يعطيه الرتبة
  console.log(member.user.username + " Joined " + member.guild.name);
  if (bot.codes[member.guild.id] === undefined) return console.log("Use the setrole command")
  let role = bot.codes[member.guild.id].role
  let roletogive = member.guild.roles.get(`${role}`);
  if (!roletogive) return console.log(`please use ${prefix}setrole ROLEMENTION or make sure that the bot role is higher than the auto role`)
  bot.guilds.get(`${bot.codes[member.guild.id].guild}`).member(member).addRole(roletogive);
  let Hello = bot.codes[member.guild.id].message
  if (Hello === null) return;
  member.send(`${Hello}`).catch((err) => console.log(`No message to send! or ${err}`));
});
bot.on("message", async message => {
 
  let prefix = `w` //يمديك تغيره لو تبي
  let messageArray = message.content.split(" ");
  let msg = message;
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You cannot use this command , you do not have Administration**") //هذي بيخليها لو ما معه ادمنستريشن بيرسله الرسالة ذي
  if (!message.content.startsWith(prefix)) return;
 
  if (cmd === `${prefix}setrole`) { // هذا الي يحطلك الأوتو رول ويخزنه بملف جسون الي سويناه في البداية بدونه م رح يمديك تستخدم اي كوماند ثاني
    var role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
    if (!role) return message.channel.send("Please specify a role ...")
    bot.codes[message.guild.id] = {
      message: null,
      role: role.id,
      guild: message.guild.id
    }
    fs.writeFile("./code.json", JSON.stringify(bot.codes, null, 4), err => {
      console.log(err)
      message.channel.send(`Done!`)
 
    })
  }
 
  if (cmd === `${prefix}dautorole`) { //هذا يمسحلك الأوتو رول
    if (bot.codes[message.guild.id] === undefined) return message.channel.send("**There's no autorole to delete**")
    delete bot.codes[message.guild.id]
    fs.writeFile("./code.json", JSON.stringify(bot.codes, null, 4), err => {
      console.log(err)
    })
    message.channel.send("Done! autorole deleted =)")
 
  }
  if (cmd === `${prefix}currentrole`) { //هذا يعلمك وش الأوتو رول الحالي
    if (bot.codes[message.guild.id] === undefined) return message.channel.send(`**There's no current autorole use \`${prefix}setrole\` to set one! **`)
   var acode = bot.codes[message.guild.id].role;
   let myRole = message.guild.roles.get(acode);
   message.channel.send(`**Current Auto role is:** ${myRole.name}`)
 
 }
 
 
 if (cmd === `${prefix}setmessage`) { //هذا الكوماند يحطلك مسج تلقائي يجي للخاص حق الشخص الي دخل
   let azoqzmsg = args.join(" ")
   if (!azoqzmsg) return message.channel.send(`**There is no message ! But if you wish to delete the auto message please use **\`${prefix}dmessage\``)
   if (bot.codes[message.guild.id] === undefined) return message.channel.send(`**I\m Sorry but you have to use \`${prefix}setrole\` to be able to use this**`)
   bot.codes[message.guild.id].message = azoqzmsg
   fs.writeFile("./code.json", JSON.stringify(bot.codes, null, 4), err => {
     console.log(err)
 
     message.channel.send(`Done!`)
 
   })
 }
 if (cmd === `${prefix}dmessage`) { //هذا الكوماند يمسحلك الأوتو مسج
   if (bot.codes[message.guild.id] === undefined) return message.channel.send(`__**Sorry There's no message to deleted**__`)
    delete bot.codes[message.guild.id].message
    fs.writeFile("./code.json", JSON.stringify(bot.codes, null, 4), err => {
 
      message.channel.send(`Done!`)
 
    })
  }
})
 
client.login(process.env.BOT_TOKEN);
