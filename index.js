const botConfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Riverdale", {
    type: "WATCHING"
  });
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") {
    message.channel.send("You can only use this bot in a server <@" + message.author.id + ">!");
    console.log(message.author.username + " used the bot in DMs.");
    return;
  }

  let prefix = botConfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}role`) {
    let memberToChange = message.member;

    if (args.length === 0) {
      console.log(message.author.username + " used the role command, didn't specify a role.");
      return message.channel.send("<@" + message.author.id + '> \n\n**Usage:** -role [Role Name]');
    }

    if (args[0].toLowerCase() === "bughead".toLowerCase()) {
      if (message.member.roles.find("name", "Team Bughead 💕")) {
        return message.channel.send("You already have that role <@" + message.author.id + ">!");
        console.log(message.author.username + " used the role command, tried to give themselves the bughead role but they already had it.");
      } else if (!(message.member.roles.find("name", "Team Bughead 💕"))) {
          memberToChange.addRole('487140028758360074');
          return message.channel.send("You have been given the **Team Bughead 💕** role, <@" + message.author.id + ">!");
          console.log(message.author.username + " used the role command, gave themselves the bughead role.");
      }
    }

    if (args[0].toLowerCase() === "varchie".toLowerCase()) {
        if (message.member.roles.find("name", "Team Varchie 👑🖤")) {
          return message.channel.send("You already have that role <@" + message.author.id + ">!");
          console.log(message.author.username + " used the role command, tried to give themselves the varchie role but they already had it.");
        } else if (!(message.member.roles.find("name", "Team Varchie 👑🖤"))) {
          memberToChange.addRole('487140096592576512');
          return message.channel.send("You have been given the **Team Varchie 👑🖤** role, <@" + message.author.id + ">!");
          console.log(message.author.username + " used the role command, gave themselves the bughead role.");
        }
      }

      if (args[0].toLowerCase() === "list".toLowerCase()) {
        message.channel.send("<@" + message.author.id + ">");
        let icon = bot.user.displayAvatarURL;
        let availableroles = new Discord.RichEmbed()
        .setTitle("Available Roles:")
        .setDescription("_Note: More roles added soon!_")
        .setThumbnail(icon)
        .setColor("#551A8B")
        .addField("1)", "Bughead")
        .addField("2)", "Varchie")
        return message.channel.send(availableroles);
      }

    }
});

bot.login(process.env.BOT_TOKEN);
