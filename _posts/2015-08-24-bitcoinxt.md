---
layout: post
modal-id: 6
title: An overview and the implications of BitcoinXT
date: 2015-08-24
img: http://tuliphft.com/img/lego.jpg
alt: image-alt
comments: true
category: Bitcoin
authors: Stefan Dessens & Jasper van Gelder 
tags: [bitcoin,BitcoinXT,blockchain]
---

Recently, there has been a lot of media coverage on the drama surrounding Bitcoin XT. However, we think that actual factual coverage is lacking. In this blog, we attempt to provide an overview of the circumstances that led to the creation of Bitcoin XT, and the risks associated with a possible bitcoin fork.

The Current Debate
------------------
The original bitcoin software, called bitcoin Core, was created by Satoshi Nakamoto. Satoshi disappeared when the bitcoin community expanded, and transferred the control of the bitcoin software to a few individuals, hereafter called bitcoin core developers. The bitcoin core developers continuously worked to improved the bitcoin software, integrating changes if and only if all other developers agreed.

Recently, the developers have been unable to reach an agreement over a very important issue, bitcoin's scalability. To understand this, we first need to explain how bitcoin works. Bitcoin processes transactions by placing them in blocks. At certain intervals, a block is added to the Bitcoin blockchain. Currently, blocks have a maximum size of 1MiB, limiting the amount of transactions that can be done per block. In the past years, this has not been an issue. However, it is forecast that it will become an issue as early as 2016. The developers agree that this is a serious issue, but disagree over when it will become a problem, and how the best to tackle it.
  
> To put bitcoin transactions in perspective: Visa already handled 47.000 transactions per second(TPS) during peak time in 2013 [1](http://www.visa.com/blogarchives/us/2013/10/10/stress-test-prepares-visanet-for-the-most-wonderful-time-of-the-year/index.html), The average blocksize for August 2015 is 0.47MB, and the average TPS 1.8 [2](https://tradeblock.com/blockchain/historical/1w-f-tps-01071-blksize_per_avg-01071). This means bitcoin can only do ~3.8TPS if blocksizes remain stable, but from [2] we can also observe an increase in blocksize which means we can probably even do less TPS.  

It is important to emphasize that previous changes to bitcoin Core were the result from unanimous agreement from all developers. It is clear that the developers won't reach an agreement over bitcoin's scaling issue. As a result, a few developers have made a [fork](https://en.wikipedia.org/wiki/Fork_%28software_development%29) (a copy) of the bitcoin software that tackles the scaling issue according to what they think is the best solution. This project is called BitcoinXT. While the term 'a copy of' may sound scary, it is a standard practice in software. Bitcoin Core is not 'the real' bitcoin software, nor is XT. Anyone has the right to fork bitcoin and adjust it to their needs. As such, bitcoin Core is not 'better' than XT or vice versa, it is simply different, and you should run the sofware that represents your views.

Different Views
---------------
As noted before, the developers are unable to reach an agreement on how to scale bitcoin for future increasing transaction volumes. The developers agree that there is a problem, but not on its solution. The developers are divided into 2 camps, which we shall call 'Core' and 'XT'.

The Core developers believe that bitcoin is inherently un-scalable and want to fix the problem at it's core. There is a lot of disagreement on what the solution to bitcoin's scaling problem should be. The general agreement is that it will be fixable, and that it will be fixed next year. Or in 5 year. Or never.

The XT developers somewhat agree with the Core developers, but emphasize that the bitcoin Core developers have not fixed the problem yet, nor that there is a solution available in the foreseeable future. Bitcoin XT developers argue that the problem can be fixed -or at least temporarily- by simply increasing the blocksize.

Implications Related to the Blocksize
-------------------------------------

There can only be one bitcoin blockchain. Currently, all blocks in the blockchain are valid according to both the rules of bitcoin core and XT. There is no distinction between one 'core Bitcoin' or an 'XT Bitcoin'. As such, it would be incorrect to say that bitcoin has already forked. As soon as an block is added to the blockchain that is valid according to either bitcoin Core or bitcoin XT but invalid on the other, the blockchain will split. Without going into the details, it is safe to assume that as soon as that happens, either the Core blockchain or the XT blockchain will become completely worthless. The blockchain with the most users (meaning nodes, exchanges, merchants and miners) will take over.

This doesn't have to be a bad thing, and it already happened multiple times in history. However, it is very important that the community remains steadfast. If half of the community decides that bitcoin XT is the way to go whilst the other half chooses bitcoin Core, we are most likely going to be worse off than when we simply choose the worse option of the two.

Does this means you will be able to lose your coins? Absolutely not. When the blockchain forks, you don't know which fork will win. If you think that a chain will win and accept payment on that blockchain in bitcoins in exchange for physical goods, this payment may disappear in the future if a chain ends up losing. As long as you are not taking an action based on a transaction on the losing chain, there is no possibility to lose any coins. The terms 'Core Bitcoin' and 'XT Bitcoin' are only meaningful once the blockchain has actually forked. Until then, there is no distinction between the two. As soon as the blockchain forks, your coins will be available on both chains.

Bitcoin XT implements a mechanism that triggers the fork no earlier than January 2016, when at least 750 of the last 1000 blocks have indicated that they agree with the changes in bitcoin XT.

Other Implications Surrounding XT.
------------------

The increase of the block size is not the only change in bitcoin XT, there are other changes as well.

**Feature split**  
When the XT blockchain wins, its very likely that bitcoin Core will also update to support larger blocks. But some nodes might stick to the XT software and will accept changes from the bitcoin XT team rather than from the Core team. This may result in a split in features supported by the different nodes. Previously, features were added once all core developers agreed to the change. The existence of XT will lower the bar for new features to be added.

Besides increasing the blocksize BitcoinXT adds the following features:

**Double spend relaying:**  The implementation of this feature, broadcasts a warning to the network when a user tries to respend his Bitcoin. This allows other nodes to become aware of this and take action. 

**Support for BIP64:**  This allows a client to ask a node for a list of addresses with nonzero balance. This can be used in clients that do not wish to download the entire blockchain to provide basic wallet functionality. The returned information is not authenticated in any way.

**Refresh DNS list:**  Two new DNS seeds are re-added/added (bitnodes.io and visnumeris.com) and it has been documented who runs which. These DNS seeds are used to search for reliable nodes while booting. When booted your node will continue to use p2p node discovery.

**Anti-Dos attack improvements:**  One of the problems with bitcoin nodes is that you can easily dos them by opening a lot of connections each with a different IP. This feature intends to solve that by giving a certain priority depending on the group in which an IP belongs to. Right now, only one group is defined which gives a low priority to all connections from the Tor network. 

It has been rumoured that by definition you are on a blacklisted and there for cannot connect. This is simply not true. When, a node can no longer handle connections it will disconnect Tor connections first. This prevents attacks from the Tor network.
 
 The other problem was that an attacker could jam a node by opening a connection with the incentive to send a transaction or block but never sending it. This feature tries to solve it by reducing the time in which a connection is killed if none is delivered. 

Details can be found here: <https://bitcoinxt.software/patches.html>  

Conclusion
----------

We can conclude that the possible fork is not as depicted in the media. When it becomes clear that the vote for larger blocks is about to succeed, the Core team can simply merge the change and all your Bitcoins are safe. Afterwards, you can decide whether you want additional features such as BIP64. Both the Core and XT software will be compatible with the same blockchain.

We think it is highly unlikely that the Core team would refuse to merge the blocksize change when XT gains majority. If they decide not to do so after the 75% fork logic activates, they would be left with less than 25% of the mining power of the old network.

Author's Opinions
----------------

**BIP64**
The authors are of the opinion that this feature does not belong in the node 2 node communication, because this relies on trusting nodes. Not having to trust nodes is at the core of the bitcoin protocol.

**Jasper van Gelder**

The beauty of open source software is the fact that you are allowed to fork it and adjust it to your liking and thus, no single entity can rule over the code. This means we can and should follow the fork that best suit our needs. Bitcoin core should therefore stop worrying  about Bitcoin XT and simply develop their project to suit the users needs. If your project suits the needs of users (and you manage to communicate that) there is no reason to use someone else's project.

**Stefan Dessens**

I support the change to larger blocks, in the sense that I think that the Bitcoin Core team will not have a solution to the scaling problem ready in time. However, I think that XT is used as a cover to push other controversial changes into bitcoin. If the XT team support larger blocks, then they shouldn't include other changes into their version of bitcoin. Luckily, these changes do not affect compatibility with the Bitcoin network. So switching back to Core after the fork is possible, if you don't agree with the changes the XT team has made.