# 🧰 Guide for server owners

Adding Chronos to your server is really easy!

1. Open your Alta Launcher.
1. Open your server group panel in the right sidebar.
1. At the bottom of the sidebar, invite **`RPGBot`** to join your server group.
1. **RPGBot** will accept your invite immediately. Click your server group icon again to refresh your members list.
1. Find **RPGBot** in your members list and click the <kbd>Make Moderator</kbd> button.
1. (optional) Place a **Spellcrafting Conduit** (`Green_Crystal_cluster_03` prefab) somewhere in town. You may skip this step, forcing players to invoke their spells in the crystal layers of the mines. Make sure players are able to stand within 10 metres of the conduit.

Our bot will connect to your server automatically and your players will now be able to use Chronos on your server.

### Who is **RPGBot**?

**RPGBot** is our bot account, and will show up in your server group members list with a `BOT` label. It's an account that allows **RPGBot** to connect to servers as a player with a moderator role, which is required to let bots send console commands.

### Why does **RPGBot** need moderator privileges?

**RPGBot** needs to have the correct privileges to enable sending console commands to your server. By default, server groups have a Moderator role that has console privileges. If **RPGBot** cannot send console commands, players will not be able to use Chronos magic.

### What sort of console commands does **RPGBot** send to my server?

Players will not be able to dictate which console commands are sent to your server. Players using Chronos can only send predefined requests to our bot, which translates the request to the actual console commands. These commands are used to **spawn** and **destroy** items on your server, but only items stored in the player's inventory are destroyed. This happens when players cast a spell that requires material components to be stored in their belt slots.

Generally speaking, players will not be able to create a high volume of items out of thin air. Chronos spells require material components, so to create new items, other items must be consumed first. This greatly reduces the rate at which players can potentially spam your server with items.

| ℹ️  | Please [create a new issue](https://github.com/ExoulsOfficial/att-chronos/issues/new) if you're having problems with players abusing the system. |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------- |
