/// <reference types="cypress" />

import { ethers } from "ethers";

export function visitPage(
  page: string,
  signer: ethers.Signer | null,
  options = {}
): Cypress.Chainable<Cypress.AUTWindow> {
  // @ts-ignore
  return cy.visit(`${page}`, { signer, ...options });
}
