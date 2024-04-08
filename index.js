import openai from "./config/open-ai.js";
import readLineSync from "readline-sync";
import colors from "colors";

async function main() {
  // welcome message
  console.log(colors.bold.green("welcome to the chatbot program !"));
  console.log(colors.bold.green("you can start the chat with the bot !"));

  // store history
  const chatHistory = [];

  while (true) {
    // Get User input calue
    const userInput = readLineSync.question(colors.yellow("You:"));

    try {
      const messages = chatHistory.map((role, content) => ({ role, content }));
      messages.push({ role: "user", content: userInput });

      // calling openai function
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: userInput }],
        model: "gpt-3.5-turbo",
      });

      // api chatgpt response
      const textResponse = completion.choices[0].message.content;

      // exiting the chat
      if (userInput.toLowerCase() === "exit") {
        console.log(readLineSync.question(colors.green("Bot:" + textResponse)));
        return;
      }
      // showing chatgpt response
      console.log(readLineSync.question(colors.green("Bot:" + textResponse)));
      // updating history
      chatHistory.push({ role: "user", userInput });
      chatHistory.push({ role: "assistant", textResponse });
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
