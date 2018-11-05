# bonding-curves

Bonding Curves are a method of continous token minting / burning. They are proposed as a solution
for many problems in the blockchain space. Examples include Futarchy, fairer ICOs, and Curation
Markets.

## Testing

Clone this repository into a local directory then run `yarn` to install the remote packages, then
`yarn generate` to compile the smart contracts and create Truffle artifacts with TypeScript bindings. 
In one window run `yarn ganache` to start the development chain. In another window run `yarn test` to 
run the tests.