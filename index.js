	const Discord = require('discord.js');

	const client = new Discord.Client();

	var prefix = "=";

	client.login(process.env.D3SP3);

	client.on("ready", () => {
		console.log("Bot connected");
		client.user.setGame("faire des CDI");
    });
    
    client.on('message', message => {

        if(message.content === prefix + "Hey"){
            message.reply("tu es moche va-t-en !");
            console.log("Un utilisateur a effectué la commande de message");
        }

        if(message.content === prefix + "aide"){
            var help_embed = new Discord.RichEmbed()
            .setTitle("Vous avez ouvert mon menu d'aide")
            .setThumbnail(message.guild.avatarURL) 
            .setDescription("Tout d'abord sachez que je suis un bot de Modération!")
            .setColor("#69ea38")
            .addField("=aide", "Affiche ce pannel avec toutes les commandes disponibles")
            .addField("=hey", "Je te répondrai de manière très romantique ou pas")
            .addField("=statistiques", "Vous saurez davantage de chose sur vous après !")
            .addField("=info", "Vous donne tout ce que vous devez savoir sur moi")
            .setFooter("Ce bot a été créé par iFKilleur#8181")
            message.channel.sendMessage(help_embed);
            console.log("Un utilisateur a effectué la commande d'aide")
        }

        if(message.content === prefix + "info") {
            var info_embed = new Discord.RichEmbed()
            .setColor("#b7fc00")
            .setTitle("Tu verras ici toutes les informations liées à moi !")
            .addField(":robot: Nom :", `${client.user.tag}`, true)
            .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
            .addField(":id:", `${client.user.id}`)
            .addField("Nombre de membres", message.guild.members.size)
            .addField("Nombre de catégories et de salons", message.guild.channels.size)
            .setFooter("Ce bot a été créé par iFKilleur#8181")
            message.channel.sendMessage(info_embed)
            console.log("Un utilisateur a fait la commande d'information")
        }
        
        if(message.content.startsWith(prefix + "kick")) {
            if(message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas les permissions requises pour faire ceci !")

            if(message.mentions.users.size === 0) {
                return message.channel.send("Vous venez de mentionner un utilisateur valide !");
            }

            var kick = message.guild.member(message.mentions.users.first());
            if(!kick) {
                return message.channel.send("Je ne sais pas si cet utilisateur existe !");
            }

            if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
                return message.channel.send("Je n'ai pas la permission de kick cet utilisateur !");
            }

            kick.kick().then(member => {
                message.channel.send(`${member.user.username} a été kick par ${message.author.username}`)
                console.log(`${message.author.username} a kick quelqu'un !`)
            });
        }

        if(message.content.startsWith(prefix + "ban")) {
            if(message.guild.member(messag.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas les permissions requises pour faire ceci !")

            if(message.mentions.users.siza === 0) {
                return message.channel.send("Vous devez mentionner un utilisateur valide !");
            }

            var ban = message.guild.member(message.mentions.users.first());
            if (!ban) {
                return message.channel.send("Je ne sais pas quel utilisateur est visé !");
            }

            if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
                return message.channel.send("Je n'ai pas la permission de ban cet utilisateur !");
            }
            ban.ban().then(member => {
                message.channel.send(`${member.user.username} a été ban par ${message.author.username} !`)
                console.log(`${message.author.username} a ban quelqu'un !`)
            });
        }

        if(message.content.startsWith(prefix + "purge")) {
            if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas les permissions requises pour effectuer cette commande !");

            let args = message.content.split(" ").slice(1);

            if(!args[0]) return message.channel.send("Tu dois préciser le nombre de message que tu veux supprimer !")
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`${args[0]} a/ont été supprimé(s) !`)
                console.log(`${message.author.username} a clear des messages !`)
            });
        }

        if(message.content.startsWith(prefix + "mute")) {
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas les permissions requises pour faire ça !");

            if(message.mentions.users.size === 0) {
                return message.channel.send("Vous devez mentionner un utilisateur valide !");
            }

            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.channel.send("Je ne sais pas quel utilisateur est visé !");
            }

            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission d'unmute cet utilisateur");
            message.channel.overwritePermissions(mute, { SEND_MESSAGE: false}).then(member => {
                message.channel.send(`${mute.user.username} a été mute par ${message.author.username}`);
                console.log(`${message.author.username} a mute quelqu'un !`)
            });
        } 

        if(message.content.startsWith(prefix + "unmute")) {
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas les permissions requises pour faire ça !")

            if(message.mentions.users.size === 0) {
                return message.channel.send("Vous devez mentionner un utilisateur !");
            }

            var mute = message.guild.member(message.mentions.users.first());
            if(!mute) {
                return message.channel.send("Je ne sais pas quel utilisateur est visé !");
            }

            if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission d'unmute cet utilisateur");
            message.channel.overwritePermissions(mute, { SEND_MESSAGE: true}).then(member => {
                message.channel.send(`${mute.user.username} a été unmute par ${message.author.username}`)
                console.log(`${message.author.username} a unmute quelqu'un !`)
            });
        } 

        if (!message.content.startsWith(prefix)) return;

        var args = message.content.substring(prefix.length).split(" ");

        switch (args[0].toLowerCase()) {
            case "statistiques":

            var userCreateDate = message.author.createdAt.toString().split(" ");
            var msgauthor = message.author.id;

            var stats_embed = new Discord.RichEmbed()
            .setTitle(`Statistique de l'utilisateur : ${message.author.username}`)
            .setColor("#b7fc00")
            .addField(`ID de l'utilisateur :id:`, msgauthor, true)
            .addField("Date de création du compte", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
            .setThumbnail(message.author.avatarURL)
            .setFooter("Ce bot a été créé par iFKilleur#8181")
            message.reply("Tu viens de recevoir tes statistiques en privé !")
            message.author.send({embed: stats_embed});
            console.log("Un utilisateur a fait la commande de statistiques")
            break;
        }
    }); 
