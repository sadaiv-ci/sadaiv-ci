## Sadaiv CI

Backup your opensource contributions on to the decentralize network.

### About the project

Sadaiv CI allows developers to integrate continuous integration (CI) that automatically backsup their project repo on to the decentralized Filecoin Storage.

### Backstory 

Today, most of the developer communities and organizations (including DAOs) uses GitHub to host their projects. GitHub is a centralized organization providing a limited support for web3 native values and hence the data could be lost.

To resolve, this issue there are tons of other projects built on web3 stack that provides a alternative UI and architecture to host projects. But guess what people still don't use them.

Because the features, and comfort GitHub (or web2 solutions) provides is uncomparable to the new immature emerging solutions. 

Hence, we thought to create a continuous integration to store the projects on GitHub to decentralized network like Filecoin using Web3.Storage. This basically backsup the project on to the decentralized network every time a new commit is pushed to the branch. 

Therefore, with Sadaiv CI developers can work with the comfort of web2 solutions like GitHub yet ensured about the ownership of their project and contributions.

### Setting up

#### STEP 1: Setup Repository Secrets

- Use web3.storage to generate a new API token for storing files
- Add this API token as your repository's GitHub secret. Use the key as WEB3_STORAGE_TOKEN
- You are all done.

#### STEP 2: Add this code to your workflow
Adding workflow.yml file will allow you to integrate the sadaiv CI directly into your project without installing anything locally.
```yaml
name: Sadaiv CI
on: [push]
jobs:
  production-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install -g sadaiv
      - run: sadaiv backup ${{ secrets.WEB3_STORAGE_TOKEN }} ${{ github.repository_owner }} ${{ github.repository }} ${{ github.ref_name }} ${{ github.event.head_commit.committer.email }} ${{ github.event.head_commit.message }}
```

### About smart contract

Deployed on Polygon Mumbai Testnet: **0x4D81b6650134493F5833a499eD44c0B94415EE48**
