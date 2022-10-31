/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "@testing-library/cypress/add-commands";

import { ethers } from "ethers";
import { DEFAULT_DECIMALS } from "../../lib/constants";

export interface MintTokensParams {
  tokenAddress: string;
  recipient: string;
  amount: string;
  decimals?: number;
}

Cypress.Commands.add(
  "mintTokens",
  ({
    tokenAddress,
    recipient,
    amount,
    decimals = DEFAULT_DECIMALS,
  }: MintTokensParams) => {
    return cy.task("mintTokens", {
      tokenAddress,
      recipient,
      amount: ethers.utils.parseUnits(amount, decimals),
    });
  }
);

export interface SendETHParams {
  address: string;
  amount: string;
}

Cypress.Commands.add("sendETH", ({ address, amount }: SendETHParams) => {
  return cy.task("sendETH", {
    address,
    amount,
  });
});

// Disables logging of the `fetch` command since it mostly pollutes the logs.
// https://gist.github.com/simenbrekken/3d2248f9e50c1143bf9dbe02e67f5399?permalink_comment_id=4162440#gistcomment-4162440
const origLog = Cypress.log;
// @ts-ignore
Cypress.log = (opts, ...other) => {
  if (opts.displayName === "fetch") return;

  return origLog(opts, ...other);
};

export {};

