const { PublicKey } = require('@solana/web3.js');
const { getParsedTokenAccountsByOwner } = require('@solana/spl-token');



const getTokenAccountBalance = async (connection, ownerPublicKey, tokenMintAddress) => {

  const response = await connection.getParsedTokenAccountsByOwner(ownerPublicKey,{
    mint: tokenMintAddress,
  });

  let balance  = 0;

  response.value.forEach((accountInfo) => {
    const accountData = accountInfo.account.data.parsed.info;

    balance += parseInt(accountData.tokenAmount.amount);
  });

  return balance;
}

module.exports = {getTokenAccountBalance};