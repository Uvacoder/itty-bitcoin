declare namespace Cypress {
  type MintTokensParams = import("./commands").MintTokensParams;
  type SendETHParams = import("./commands").SendETHParams;

  interface Chainable<Subject = any> {
    /**
     * Custom command to mint tokens for a given address.
     *
     * @example
     * cy.mintTokens({
     *   tokenName: "WETH",
     *   recipient: this.aliceAddress,
     *   amount: "100",
     * });
     */
    mintTokens(args: MintTokensParams): Chainable<Subject>;

    /**
     * Custom command to send eth to a given address.
     *
     * @example
     * cy.sendETH({
     *   address: this.aliceAddress,
     *   amount: "100",
     * });
     */
    sendETH(args: SendETHParams): Chainable<Subject>;
  }
}
