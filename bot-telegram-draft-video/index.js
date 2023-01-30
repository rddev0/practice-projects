require('dotenv').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  await ctx.leaveChat();
});

bot.on(message('text'), async (ctx) => {
  // Explicit usage
  await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello chat ${ctx.message.from.id}`);

  // Using context shortcut
  await ctx.reply(`Hello, message ${ctx.message.message_id}, content ${ctx.message.text}`);
  /*
  //test forward message {telegram.forwardMessage(chatId, fromChatId, messageId, [extra]) => Promise}
  await ctx.telegram.forwardMessage(process.env.ID_FORWARD_TEST, ctx.message.from.id, ctx.message.message_id).then(function(){console.log("mesage forwaded")});
  */

  /* //working code
  ctx.telegram.forwardMessage(process.env.ID_FORWARD_TEST, ctx.message.from.id, ctx.message.message_id).then(function(){console.log("mesage forwaded")});
  */
  ctx.telegram.forwardMessage(process.env.ID_FORWARD_TEST, ctx.message.from.id, ctx.message.message_id).then(function(){console.log("mesage forwaded")});

});

bot.on('callback_query', async (ctx) => {
  // Explicit usage
  await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  await ctx.answerCbQuery();
});

bot.on('inline_query', async (ctx) => {
  const result = [];
  // Explicit usage
  await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  await ctx.answerInlineQuery(result);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));