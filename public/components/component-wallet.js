import AGModel from '/node_modules/ag-model/ag-model.js';

function getComponent(options) {
  let {socket, nodeInfo} = options;

  return {
    data: function () {
      this.accountModel = new AGModel({
        socket,
        type: 'Account',
        id: socket.authToken && socket.authToken.accountId,
        fields: [
          'cryptoWalletAddress',
          'cryptoWalletVerified',
          'cryptoWalletVerificationKey'
        ]
      });
      return {
        nodeInfo,
        account: this.accountModel.value,
        newCryptoWalletAddress: null
      };
    },
    computed: {
      walletVerificationAmount: function () {
        return Number(this.account.cryptoWalletVerificationKey) / Number(nodeInfo.cryptocurrency.unit);
      }
    },
    methods: {
      saveAccount: function () {
        this.account.cryptoWalletAddress = this.newCryptoWalletAddress;
        this.accountModel.save();
      }
    },
    watch: {
      'account.cryptoWalletAddress': function (newAddress, oldAddress) {
        this.newCryptoWalletAddress = newAddress;
      }
    },
    template: `
      <div class="component-container">
        <div class="content-body" v-if="account.cryptoWalletAddress">
          <div class="form-area">
            <label for="input-name">
              Wallet address
              <span v-if="account.cryptoWalletVerified" class="success-container">(verified)</span>
              <span v-if="!account.cryptoWalletVerified" class="error-container">(not verified)</span>
            </label>
            <div>
              <input id="input-name" type="text" class="form-control" v-model="newCryptoWalletAddress" @keydown.enter="saveAccount">
              <input type="button" value="Change wallet address" @click="saveAccount">
            </div>
          </div>
          <p v-if="account.cryptoWalletVerified">
            Note that if you change the wallet address above, you will need to go through the wallet verification process again.
          </p>
          <p v-if="!account.cryptoWalletVerified" class="error-container">
            To verify ownership of the wallet address above, you will need to make a transfer of exactly
            <span>{{walletVerificationAmount}}</span> <span>{{nodeInfo.cryptocurrency.symbol}}</span> (not counting the transaction fee) from that wallet
            to the following wallet address: <b>{{nodeInfo.nodeWalletAddress}}</b>.
            Your wallet will be verified once the transaction has been added to a block on the <span>{{nodeInfo.cryptocurrency.name}}</span> blockchain.
            Note that you will need to wait for <b>{{nodeInfo.requiredBlockConfirmations}}</b> confirmations before the funds can be used.</b>
          </p>
        </div>

        <div class="content-body" v-if="!account.cryptoWalletAddress">
          <div class="form-area">
            <label for="input-name">
              Wallet address
            </label>
            <div>
              <input id="input-name" type="text" class="form-control" v-model="newCryptoWalletAddress" @keydown.enter="saveAccount">
              <span class="success-container">
                <input type="button" value="Set wallet address" @click="saveAccount">
              </span>
            </div>
          </div>
        </div>
      </div>
    `
  };
}

export default getComponent;
