import {
  INIT_BLOCK,
  ACCOUNTS,
  TOKEN_ADDRESSES,
  ETH_WHALE,
} from "../common/constants";
import { visitPage } from "../common";
import { forkNetwork, getWallet } from "../common/provider";
import { ethers } from "ethers";
import { DEFAULT_DECIMALS } from "../../lib/constants";
import { ethersToBn } from "../../lib/bignumber";

describe("Index Page", () => {
  beforeEach(function () {
    forkNetwork(INIT_BLOCK);
    cy.wrap(getWallet(ACCOUNTS.JEFF))
      .as("jeff")
      .then((jeff) => jeff.getAddress())
      .as("jeffAddress")
      .then((jeffAddress) => {
        cy.mintTokens({
          tokenAddress: TOKEN_ADDRESSES.DAI,
          recipient: jeffAddress,
          amount: "1000",
        });
      });
  });

  function addPKFromWallet(wallet: ReturnType<typeof getWallet>) {
    cy.findByRole("textbox").type(wallet.privateKey);
    cy.findByRole("button", { name: /submit/i }).click();
  }

  it("should accept private keys", function () {
    visitPage("/", this.jeff).then(async () => {
      addPKFromWallet(this.jeff);
      cy.findByText(this.jeffAddress).should("exist");
    });
  });

  it("should show balances of added tokens", function () {
    visitPage("/", this.jeff).then(async () => {
      addPKFromWallet(this.jeff);
      cy.findByRole("textbox", { name: /token address/i }).type(
        TOKEN_ADDRESSES.DAI
      );
      cy.findByRole("button", { name: /Add/i }).click();
      cy.findByText(TOKEN_ADDRESSES.DAI).should("exist");

      cy.findByRole("textbox", { name: /token address/i })
        .clear()
        .type(TOKEN_ADDRESSES.USDC);
      cy.findByRole("button", { name: /Add/i }).click();
      cy.findByText(TOKEN_ADDRESSES.USDC).should("exist");
      cy.mintTokens({
        tokenAddress: TOKEN_ADDRESSES.USDC,
        recipient: this.jeffAddress,
        amount: "666",
      }).then(() => {
        cy.contains("666");
      });
    });
  });

  it("should allow users to send tokens and show a transfer history", function () {
    const dai = new ethers.Contract(
      TOKEN_ADDRESSES.DAI,
      ["function balanceOf(address) external view returns (uint256)"],
      this.jeff
    );

    visitPage("/", this.jeff).then(async () => {
      addPKFromWallet(this.jeff);
      cy.findByRole("textbox", { name: /token address/i }).type(
        TOKEN_ADDRESSES.DAI
      );
      cy.findByRole("button", { name: /Add/i }).click();

      cy.findByRole("tab", { name: /transfer/i }).click();
      cy.findByTestId("transfer-token-input-label")
        .should("exist")
        .click()
        .type(TOKEN_ADDRESSES.DAI);
      cy.findByLabelText(/recipient/i)
        .click()
        .type(ETH_WHALE);

      const transferredAmount = "3";
      cy.findByLabelText(/amount/i)
        .click()
        .type(transferredAmount)
        .then(async () => {
          const daiBalPre = await dai.balanceOf(this.jeffAddress);
          cy.findByRole("button", { name: /transfer/i }).click();

          cy.findByRole("tab", { name: /history/i }).click();
          cy.findAllByRole("row")
            .should("not.have.length", 0)
            .then(async () => {
              const daiBalPos = await dai.balanceOf(this.jeffAddress);
              const diff = ethersToBn(
                daiBalPre.sub(daiBalPos),
                DEFAULT_DECIMALS
              );
              expect(diff.toString()).to.be.equal(transferredAmount);
            });
        });
    });
  });

  it("should allow users to use TUSD", function () {
    const tiny = new ethers.Contract(
      TOKEN_ADDRESSES.TUSD,
      ["function balanceOf(address) external view returns (uint256)"],
      this.jeff
    );

    cy.mintTokens({
      tokenAddress: TOKEN_ADDRESSES.TUSD,
      recipient: this.jeffAddress,
      amount: "10",
    });

    visitPage("/", this.jeff).then(async () => {
      addPKFromWallet(this.jeff);
      cy.findByRole("textbox", { name: /token address/i }).type(
        TOKEN_ADDRESSES.TUSD
      );
      cy.findByRole("button", { name: /Add/i }).click();
      cy.findByText(TOKEN_ADDRESSES.TUSD)
        .should("exist")
        .then(async () => {
          const balance = await tiny.balanceOf(this.jeffAddress);
          expect(balance.toString()).to.be.equal("10000000000000000000");
        });
    });
  });
});
