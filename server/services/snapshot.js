const { Connection, PublicKey } = require("@solana/web3.js");
const { getTokenAccountBalance } = require("./utils");

const UserModel = require("../db/User");

const connection = new Connection("https://api.mainnet-beta.solana.com");

const Bonk_MINT = new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263");

const checkUserHoldings = async () => {
  try {
    const users = await UserModel.find({});

    console.log(users);
    console.log(users[0].walletAddress);

    for (const user of users) {
      const userPubKey = new PublicKey(user.walletAddress);

      const bonkBal = await getTokenAccountBalance(
        connection,
        userPubKey,
        Bonk_MINT
      );

      if (bonkBal >= 1000000) {
        console.log(`User ${user.walletAddress} holds the required Amount`);
        try {
          user.points += 6;
          await user.save();
          console.log("User Points updated successfully");
        } catch (error) {
          console.error("Error updating user points:", error);
        }
      } else {
        console.log(
          `User ${user.walletAddress} does not hold enough BONK tokens`
        );
      }
    }
  } catch (error) {
    console.error("Error checking BONK holdings:", error);
  }
};

module.exports = { checkUserHoldings };
