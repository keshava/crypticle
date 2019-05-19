module.exports = {
  origin: 'https://crypticle.io',
  adminEmailAddress: 'Crypticle <grosjona@yahoo.com.au>',
  services: {
    account: {
      transactionSettlementInterval: 5000,
      withdrawalProcessingInterval: 5000,
      maxTransactionSettlementsPerAccount: 100,
      blockchainAdapterPath: null,
      blockchainSync: true,
      blockchainNodeAddress: 'https://wallet.rise.vision',
      blockPollInterval: 5000,
      blockFetchLimit: 100
    },
    fiat: {
      name: 'stripe',
      apiSecretKey: 'sk_live_T6aJW8rE0mi0RaZGqNLPxeIa'
    }
  },
  mainInfo: {
    cryptocurrency: {
      name: 'Rise',
      symbol: 'RISE',
      unit: '100000000'
    },
    mainWalletAddress: '6255037810762443539R',
    requiredDepositBlockConfirmations: 102,
    requiredWithdrawalBlockConfirmations: 102,
    maxRecordDisplayAge: 2592000000
  }
};
