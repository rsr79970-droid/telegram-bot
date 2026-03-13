import "dotenv/config"
import { Markup, Telegraf } from "telegraf"

const BOT_TOKEN = process.env.BOT_TOKEN

if (!BOT_TOKEN) {
    console.error(
        "Error: BOT_TOKEN is not defined in the environment"
    )
    process.exit(1)
}

const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply("Quidagilardan birini tanlang: ",
        Markup.inlineKeyboard([
            [Markup.button.callback("Like", "like")],
            [Markup.button.callback("Dislike", "dislike")]
        ])
    )
})

bot.action("like", (ctx) => {
    ctx.answerCbQuery("Processing...")
    ctx.reply("Siz like bosdingiz")
})

bot.action("dislike", (ctx) => {
    ctx.answerCbQuery("Processing...")
    ctx.reply("Siz dislike bosdingiz")
})

async function starter() {
    try {
        bot.launch()
        console.log("Bot is working")
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

starter()