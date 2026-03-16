import axios from "axios"
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
            [Markup.button.callback("Ob-havo", "weather")],
            [Markup.button.callback("Valyuta kursi", "currency")]
        ])
    )
})

bot.action("weather", async (ctx) => {
    ctx.answerCbQuery("Loading...")
    const res = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=41.31&longitude=69.24&current_weather=true")
    const data = res.data.current_weather
    ctx.reply(`Ob-havo(Toshkent): \nTemperatura: ${data.temperature}C \nShamol: ${data.windspeed}`)
})

bot.action("currnecy", async (ctx) => {
    ctx.answerCbQuery("Loading...")
    ctx.reply("Quyidagi valyutani birini tanlang: ", Markup.inlineKeyboard([
        [Markup.button.callback("Dollar", "USD")],
        [Markup.button.callback("Evro", "EUR")],
        [Markup.button.callback("Rubl", "RUB")]
    ]))
})

function currency(name) {
    bot.action(name, async (ctx) => {
        ctx.answerCbQuery("Loading...")
        const res = await axios.get(`https://open.er-api.com/v6/latest/${name}`)
        const data = await res.data.rates
        ctx.reply(`${data.name.toFixed(2)}`)
    })
}

currency("USD")
currency("EUR")
currency("RUB")

async function starter() {
    try {
        bot.launch()
        console.log("Bot is working")
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

starter()