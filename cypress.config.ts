import { ethers } from "ethers";
import { defineConfig } from "cypress";
import dotenv from "dotenv";
import {
  getTestnetProvider,
  startImpersonation,
  stopImpersonation,
} from "./cypress/common/provider";
import { mintTokens, sendETH } from "./cypress/common/token";
import { ETH_WHALE, WHALE_BY_TOKEN } from "./cypress/common/constants";
import { ERC20_ABI } from "./lib/abis/Token";

dotenv.config();

export default defineConfig({
  videoUploadOnPasses: false,
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false,
  e2e: {
    env: {
      TEST_MNEMONIC: process.env.TEST_MNEMONIC,
      TEST_ALCHEMY_KEY: process.env.TEST_ALCHEMY_KEY,
    },
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/integration/**/*.cy.ts",
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        async sendETH({ address, amount }) {
          await startImpersonation(ETH_WHALE);
          const whale = getTestnetProvider().getSigner(ETH_WHALE);
          await sendETH(whale, address, amount);
          await stopImpersonation(ETH_WHALE);

          return null;
        },
      });

      on("task", {
        async mintTokens({ tokenAddress, recipient, amount }) {
          const provider = getTestnetProvider();
          const whaleAddress = WHALE_BY_TOKEN[tokenAddress];
          if (whaleAddress) {
            await startImpersonation(whaleAddress);

            const signer = provider.getSigner(whaleAddress);
            const tokenContract = new ethers.Contract(
              tokenAddress,
              ERC20_ABI,
              signer
            );
            await tokenContract
              .transfer(recipient, ethers.BigNumber.from(amount))
              .then((tx: { wait: () => any }) => tx.wait());

            await stopImpersonation(whaleAddress);
          } else {
            await mintTokens(
              provider,
              tokenAddress,
              recipient,
              ethers.BigNumber.from(amount)
            );
          }
          return null;
        },
      });

      return {
        ...config,
        // Only enable Chrome.
        // Electron (the default) has issues injecting window.ethereum before pageload, so it is not viable.
        browsers: config.browsers.filter(({ name }) => name === "chrome"),
      };
    },
  },
});
