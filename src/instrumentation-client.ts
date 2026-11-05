import { initBotId } from "botid/client/core";

/*
 * Vercel BotID: attaches a challenge token to the contact form's POST, which
 * `checkBotId()` in src/app/actions.ts verifies.
 *
 * A Server Action posts to the page it's on, so every page that renders
 * <Contact> must be listed here. BotID matches the pathname only, so ad
 * landings like /ai?gclid=… are covered.
 */
initBotId({
  protect: [
    { path: "/", method: "POST" },
    { path: "/ai", method: "POST" },
  ],
});
