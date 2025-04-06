// Mock data for crypto projects
export const mockProjects = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    description:
      "The original cryptocurrency and the largest by market capitalization. A decentralized digital currency without a central bank.",
    category: "layer1",
    price: 65432.1,
    priceChange24h: 2.5,
    marketCap: 1250000000000,
    marketCapChange: 2.3,
    volume24h: 28500000000,
    volumeChange: -3.2,
    circulatingSupply: 19500000,
    maxSupply: 21000000,
    allTimeHigh: 69000,
    riskLevel: "low",
    riskScore: 2.5,
    rating: 4.8,
    technicalRisk: 2,
    tokenomicsScore: 9,
    teamScore: 8,
    communityScore: 9,
    aiSummary:
      "Bitcoin remains the most established cryptocurrency with strong network effects and institutional adoption. Its fixed supply cap and first-mover advantage provide significant value proposition. Technical risks are minimal due to its battle-tested security, though regulatory concerns exist in some jurisdictions. Overall, Bitcoin presents a relatively low-risk profile compared to other cryptocurrencies.",
    team: [
      {
        name: "Satoshi Nakamoto",
        role: "Creator",
        bio: "Anonymous creator of Bitcoin and author of the Bitcoin whitepaper.",
        linkedin: null,
      },
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    description:
      "A decentralized platform that enables smart contracts and dApps. The second-largest cryptocurrency by market cap.",
    category: "layer1",
    price: 3456.78,
    priceChange24h: 1.8,
    marketCap: 420000000000,
    marketCapChange: 1.5,
    volume24h: 15600000000,
    volumeChange: -2.1,
    circulatingSupply: 120000000,
    maxSupply: 0,
    allTimeHigh: 4800,
    riskLevel: "low",
    riskScore: 3.2,
    rating: 4.7,
    technicalRisk: 3,
    tokenomicsScore: 7,
    teamScore: 9,
    communityScore: 8,
    aiSummary:
      "Ethereum continues to dominate the smart contract platform space with the largest developer ecosystem and DApp adoption. The successful transition to Proof of Stake has reduced environmental concerns and improved scalability. While facing competition from alternative L1s, Ethereum's network effects and continuous development provide strong fundamentals. The lack of a supply cap introduces some inflation risk, but EIP-1559 has created deflationary pressure.",
    team: [
      {
        name: "Vitalik Buterin",
        role: "Co-founder",
        bio: "Russian-Canadian programmer and writer who co-founded Ethereum.",
        linkedin: "https://www.linkedin.com/in/vitalik-buterin-267a7450/",
      },
      {
        name: "Joseph Lubin",
        role: "Co-founder",
        bio: "Founder of ConsenSys, a blockchain software company focused on Ethereum.",
        linkedin: "https://www.linkedin.com/in/joseph-lubin-48406489/",
      },
    ],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    description: "A high-performance blockchain supporting smart contracts with fast transaction speeds and low fees.",
    category: "layer1",
    price: 145.32,
    priceChange24h: 4.2,
    marketCap: 62000000000,
    marketCapChange: 3.8,
    volume24h: 3200000000,
    volumeChange: 5.6,
    circulatingSupply: 430000000,
    maxSupply: 0,
    allTimeHigh: 260,
    riskLevel: "medium",
    riskScore: 5.4,
    rating: 4.2,
    technicalRisk: 6,
    tokenomicsScore: 5,
    teamScore: 7,
    communityScore: 8,
    aiSummary:
      "Solana offers impressive performance metrics with high throughput and low transaction costs, making it attractive for DeFi and NFT applications. However, the network has experienced several outages in the past, raising concerns about reliability. The tokenomics model includes high inflation and significant token allocation to insiders. While technical improvements have enhanced stability, Solana presents a moderate risk profile with strong growth potential but ongoing technical challenges.",
    team: [
      {
        name: "Anatoly Yakovenko",
        role: "Co-founder",
        bio: "Former Qualcomm engineer who developed the Proof of History consensus mechanism that powers Solana.",
        linkedin: "https://www.linkedin.com/in/anatolyyakovenko/",
      },
      {
        name: "Raj Gokal",
        role: "Co-founder",
        bio: "COO of Solana Labs with background in venture capital and product management.",
        linkedin: "https://www.linkedin.com/in/rajgokal/",
      },
    ],
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI",
    description: "A leading decentralized exchange protocol that enables automated trading of tokens on Ethereum.",
    category: "defi",
    price: 8.76,
    priceChange24h: -1.2,
    marketCap: 6500000000,
    marketCapChange: -1.5,
    volume24h: 120000000,
    volumeChange: -8.3,
    circulatingSupply: 750000000,
    maxSupply: 1000000000,
    allTimeHigh: 44.92,
    riskLevel: "medium",
    riskScore: 4.8,
    rating: 4.3,
    technicalRisk: 4,
    tokenomicsScore: 6,
    teamScore: 8,
    communityScore: 7,
    aiSummary:
      "Uniswap remains the leading decentralized exchange by volume and has successfully launched multiple protocol versions with improved capital efficiency. The governance token (UNI) provides voting rights but limited direct value accrual from protocol fees. Competition from other DEXs and potential regulatory scrutiny of DeFi protocols present moderate risks. The team has demonstrated consistent execution and innovation in the space.",
    team: [
      {
        name: "Hayden Adams",
        role: "Founder",
        bio: "Created Uniswap in 2018 after being inspired by Vitalik Buterin's posts on automated market makers.",
        linkedin: "https://www.linkedin.com/in/haydenadams/",
      },
    ],
  },
  {
    id: "aave",
    name: "Aave",
    symbol: "AAVE",
    description:
      "A decentralized lending protocol that allows users to lend and borrow cryptocurrencies without intermediaries.",
    category: "defi",
    price: 98.45,
    priceChange24h: -0.8,
    marketCap: 1400000000,
    marketCapChange: -1.1,
    volume24h: 85000000,
    volumeChange: -4.2,
    circulatingSupply: 14000000,
    maxSupply: 16000000,
    allTimeHigh: 661.69,
    riskLevel: "medium",
    riskScore: 5.1,
    rating: 4.1,
    technicalRisk: 5,
    tokenomicsScore: 7,
    teamScore: 8,
    communityScore: 6,
    aiSummary:
      "Aave has established itself as one of the leading lending protocols in DeFi with a strong security track record and multi-chain deployment. The protocol has implemented robust risk management features and survived market downturns without major incidents. The AAVE token provides governance rights and acts as a security module, creating utility. Regulatory uncertainty around DeFi lending presents the most significant risk, while smart contract risk is mitigated through multiple audits and formal verification.",
    team: [
      {
        name: "Stani Kulechov",
        role: "Founder & CEO",
        bio: "Finnish programmer who founded Aave (originally ETHLend) in 2017.",
        linkedin: "https://www.linkedin.com/in/stani-kulechov/",
      },
    ],
  },
  {
    id: "axie-infinity",
    name: "Axie Infinity",
    symbol: "AXS",
    description: "A blockchain-based game where players collect, breed, and battle fantasy creatures called Axies.",
    category: "gaming",
    price: 6.23,
    priceChange24h: -3.5,
    marketCap: 850000000,
    marketCapChange: -3.8,
    volume24h: 45000000,
    volumeChange: -12.4,
    circulatingSupply: 135000000,
    maxSupply: 270000000,
    allTimeHigh: 164.9,
    riskLevel: "high",
    riskScore: 7.8,
    rating: 3.5,
    technicalRisk: 6,
    tokenomicsScore: 4,
    teamScore: 6,
    communityScore: 5,
    aiSummary:
      "Axie Infinity pioneered the play-to-earn gaming model but has faced significant challenges maintaining player engagement and economic sustainability. The game experienced a major security breach in 2022 with the Ronin bridge hack, though funds were eventually recovered. Token value is highly dependent on continued user growth and gameplay innovation. The team has been working on improving the game mechanics and launching new titles, but competition in the blockchain gaming space is intense. This project presents a high-risk profile with potential for volatility.",
    team: [
      {
        name: "Trung Nguyen",
        role: "Co-founder & CEO",
        bio: "Vietnamese entrepreneur who co-founded Sky Mavis and Axie Infinity.",
        linkedin: "https://www.linkedin.com/in/trung-nguyen-75353944/",
      },
    ],
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK",
    description: "A decentralized oracle network that provides real-world data to smart contracts on the blockchain.",
    category: "defi",
    price: 14.87,
    priceChange24h: 1.2,
    marketCap: 8700000000,
    marketCapChange: 0.9,
    volume24h: 320000000,
    volumeChange: 2.3,
    circulatingSupply: 580000000,
    maxSupply: 1000000000,
    allTimeHigh: 52.7,
    riskLevel: "medium",
    riskScore: 4.2,
    rating: 4.5,
    technicalRisk: 4,
    tokenomicsScore: 6,
    teamScore: 9,
    communityScore: 8,
    aiSummary:
      "Chainlink has established itself as the dominant oracle solution in the blockchain space, providing critical off-chain data to numerous DeFi protocols and other applications. The team has consistently delivered on their roadmap and secured partnerships with major enterprises and blockchains. Token economics remain a concern as the utility of LINK for network security is still evolving. Competition from alternative oracle solutions exists but has not significantly impacted Chainlink's market leadership. Overall, the project presents a moderate risk profile with strong fundamentals.",
    team: [
      {
        name: "Sergey Nazarov",
        role: "Co-founder",
        bio: "Entrepreneur who co-founded Chainlink and has been working on smart contracts since 2014.",
        linkedin: "https://www.linkedin.com/in/sergeynazarov/",
      },
    ],
  },
  {
    id: "polygon",
    name: "Polygon",
    symbol: "MATIC",
    description: "A Layer 2 scaling solution for Ethereum that enables faster and cheaper transactions.",
    category: "layer2",
    price: 0.58,
    priceChange24h: 2.8,
    marketCap: 5600000000,
    marketCapChange: 2.5,
    volume24h: 280000000,
    volumeChange: 4.1,
    circulatingSupply: 9700000000,
    maxSupply: 10000000000,
    allTimeHigh: 2.92,
    riskLevel: "medium",
    riskScore: 4.5,
    rating: 4.4,
    technicalRisk: 5,
    tokenomicsScore: 6,
    teamScore: 8,
    communityScore: 7,
    aiSummary:
      "Polygon has successfully positioned itself as a leading Ethereum scaling solution with a comprehensive strategy that includes multiple scaling technologies. The ecosystem has attracted numerous applications and users seeking lower transaction costs. The project faces competition from other L2 solutions and potential changes to Ethereum's scalability could impact its value proposition. The team has demonstrated strong execution and strategic vision through acquisitions and technology development. Token utility is tied to network security and governance, with most of the supply already in circulation.",
    team: [
      {
        name: "Sandeep Nailwal",
        role: "Co-founder",
        bio: "Indian entrepreneur who co-founded Polygon (formerly Matic Network).",
        linkedin: "https://www.linkedin.com/in/sandeep-nailwal-60709a33/",
      },
    ],
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    symbol: "ARB",
    description:
      "An Ethereum Layer 2 scaling solution that uses optimistic rollups to increase throughput and reduce fees.",
    category: "layer2",
    price: 1.12,
    priceChange24h: 3.4,
    marketCap: 3200000000,
    marketCapChange: 3.1,
    volume24h: 210000000,
    volumeChange: 5.2,
    circulatingSupply: 2800000000,
    maxSupply: 10000000000,
    allTimeHigh: 1.88,
    riskLevel: "medium",
    riskScore: 5.2,
    rating: 4.0,
    technicalRisk: 6,
    tokenomicsScore: 5,
    teamScore: 7,
    communityScore: 6,
    aiSummary:
      "Arbitrum has gained significant traction as an Ethereum L2 solution with strong TVL and growing ecosystem of applications. The optimistic rollup technology provides good security guarantees while significantly reducing transaction costs. The relatively recent token launch included a substantial allocation to the foundation and investors, creating potential selling pressure. Technical risks include the reliance on fraud proofs and the centralized sequencer in the current implementation. Competition from other L2 solutions and potential Ethereum upgrades represent medium-term challenges.",
    team: [
      {
        name: "Steven Goldfeder",
        role: "Co-founder",
        bio: "Co-founder of Offchain Labs, the company behind Arbitrum.",
        linkedin: "https://www.linkedin.com/in/steven-goldfeder-ph-d-9ba26539/",
      },
    ],
  },
  {
    id: "decentraland",
    name: "Decentraland",
    symbol: "MANA",
    description:
      "A virtual reality platform powered by Ethereum where users can create, experience, and monetize content and applications.",
    category: "nft",
    price: 0.42,
    priceChange24h: -2.1,
    marketCap: 780000000,
    marketCapChange: -2.3,
    volume24h: 65000000,
    volumeChange: -8.7,
    circulatingSupply: 1850000000,
    maxSupply: 2190000000,
    allTimeHigh: 5.9,
    riskLevel: "high",
    riskScore: 6.8,
    rating: 3.6,
    technicalRisk: 5,
    tokenomicsScore: 4,
    teamScore: 6,
    communityScore: 5,
    aiSummary:
      "Decentraland was an early entrant in the blockchain-based metaverse space but has struggled with user adoption and engagement. The platform offers ownership of virtual land and assets through NFTs, with MANA serving as the ecosystem currency. User metrics have not shown sustained growth, raising questions about long-term viability. The project faces significant competition from both traditional gaming platforms and other blockchain metaverse projects. Technical development has been steady but not revolutionary. This project presents a high-risk profile with significant dependence on broader metaverse adoption trends.",
    team: [
      {
        name: "Esteban Ordano",
        role: "Co-founder",
        bio: "Technical co-founder of Decentraland with background in Bitcoin and Ethereum development.",
        linkedin: "https://www.linkedin.com/in/eordano/",
      },
    ],
  },
]

// Mock data for reviews
export const mockReviews = [
  {
    id: "review1",
    projectId: "bitcoin",
    author: "CryptoExpert",
    date: "2025-02-15",
    rating: 5,
    content:
      "Bitcoin remains the gold standard of cryptocurrencies. Its security, decentralization, and network effects are unmatched. While it may not have the programmability of newer chains, its reliability and brand recognition make it an essential part of any crypto portfolio.",
    likes: 24,
    dislikes: 2,
  },
  {
    id: "review2",
    projectId: "bitcoin",
    author: "BlockchainDev",
    date: "2025-02-10",
    rating: 4,
    content:
      "Solid fundamentals and the strongest security model in crypto. The only reason I'm not giving 5 stars is the environmental impact of PoW, though I understand the security tradeoffs. Still the safest bet in the crypto space.",
    likes: 18,
    dislikes: 3,
  },
  {
    id: "review3",
    projectId: "ethereum",
    author: "DeFiWhale",
    date: "2025-02-18",
    rating: 5,
    content:
      "Ethereum's transition to PoS has been a game-changer. The ecosystem of dApps, DeFi protocols, and developer tools is unmatched. Gas fees can still be high during peak times, but L2 solutions are helping. The most robust smart contract platform by far.",
    likes: 32,
    dislikes: 1,
  },
  {
    id: "review4",
    projectId: "ethereum",
    author: "TokenTrader",
    date: "2025-02-05",
    rating: 4,
    content:
      "Ethereum has the strongest developer community and most mature ecosystem. The merge was executed flawlessly, which gives me confidence in the team's ability to deliver on the roadmap. My only concern is the increasing centralization of validators.",
    likes: 15,
    dislikes: 2,
  },
  {
    id: "review5",
    projectId: "solana",
    author: "SpeedSeeker",
    date: "2025-02-12",
    rating: 4,
    content:
      "Solana's speed and low transaction costs are impressive. The ecosystem has grown significantly, especially in DeFi and NFTs. Network stability has improved, but there's still work to be done. The developer experience is excellent.",
    likes: 12,
    dislikes: 3,
  },
  {
    id: "review6",
    projectId: "solana",
    author: "CryptoSkeptic",
    date: "2025-01-30",
    rating: 3,
    content:
      "Fast and cheap transactions, but at what cost? The network has had multiple outages, and the hardware requirements for validators are high, leading to centralization concerns. The ecosystem is growing, but reliability needs to improve.",
    likes: 8,
    dislikes: 5,
  },
  {
    id: "review7",
    projectId: "uniswap",
    author: "DeFiDegen",
    date: "2025-02-08",
    rating: 5,
    content:
      "Uniswap is the gold standard for DEXs. The interface is intuitive, and the concentrated liquidity in v3 has been a game-changer for LPs. The team consistently innovates while maintaining security. Essential infrastructure for the Ethereum ecosystem.",
    likes: 20,
    dislikes: 1,
  },
  {
    id: "review8",
    projectId: "aave",
    author: "YieldFarmer",
    date: "2025-02-14",
    rating: 4,
    content:
      "Aave has proven itself as a reliable lending protocol with a strong security track record. The multi-chain deployment and range of supported assets make it versatile. Governance is active, and the safety module provides additional security. Rates could be more competitive.",
    likes: 14,
    dislikes: 2,
  },
  {
    id: "review9",
    projectId: "axie-infinity",
    author: "GameFiEnthusiast",
    date: "2025-01-25",
    rating: 2,
    content:
      "Axie was revolutionary when it launched, but the gameplay is shallow, and the economy has struggled to remain sustainable. The Ronin hack was a major security failure. The team is trying to improve with Origin and other updates, but they're playing catch-up to newer GameFi projects.",
    likes: 9,
    dislikes: 4,
  },
  {
    id: "review10",
    projectId: "chainlink",
    author: "OracleObserver",
    date: "2025-02-16",
    rating: 5,
    content:
      "Chainlink is critical infrastructure for the entire DeFi ecosystem. The team has consistently delivered on their roadmap and secured impressive partnerships. The CCIP launch expands their capabilities beyond just price feeds. A must-have for any serious blockchain project.",
    likes: 22,
    dislikes: 0,
  },
]

// Function to generate mock chart data
export function generateChartData(projectId: string, timeframe: string) {
  const data = []
  const today = new Date()
  let days = 30

  switch (timeframe) {
    case "7d":
      days = 7
      break
    case "30d":
      days = 30
      break
    case "90d":
      days = 90
      break
    case "1y":
      days = 365
      break
    default:
      days = 30
  }

  // Find the project to get its current price
  const project = mockProjects.find((p) => p.id === projectId)
  const currentPrice = project ? project.price : 100

  // Generate random price data with a trend
  let price = currentPrice * 0.7 // Start at 70% of current price
  const volatility = project
    ? project.riskLevel === "low"
      ? 0.01
      : project.riskLevel === "medium"
        ? 0.02
        : 0.04
    : 0.02

  const trend = 0.002 // Slight upward trend

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    // Random walk with trend
    const change = (Math.random() - 0.5) * volatility * price + trend * price
    price += change

    // Ensure price doesn't go negative
    price = Math.max(price, 0.01)

    // Generate volume data (roughly correlated with price changes)
    const volumeBase = project ? project.volume24h / 30 : 10000000
    const volume = volumeBase * (0.5 + Math.random())

    data.push({
      date: date.toISOString(),
      price: Number.parseFloat(price.toFixed(2)),
      volume: Math.round(volume),
    })
  }

  return data
}

// Mock data for saved projects
export const mockSavedProjects = [
  {
    id: "saved1",
    userId: "user123",
    projectId: "bitcoin",
    savedAt: "2025-03-10T12:00:00Z",
  },
  {
    id: "saved2",
    userId: "user123",
    projectId: "ethereum",
    savedAt: "2025-03-09T14:30:00Z",
  },
  {
    id: "saved3",
    userId: "user123",
    projectId: "solana",
    savedAt: "2025-03-05T09:15:00Z",
  },
]

// Mock data for user reviews
export const mockUserReviews = [
  {
    id: "userreview1",
    userId: "user123",
    projectId: "bitcoin",
    rating: 5,
    content: "The most reliable cryptocurrency with the strongest security model.",
    createdAt: "2025-03-01T10:30:00Z",
  },
  {
    id: "userreview2",
    userId: "user123",
    projectId: "ethereum",
    rating: 4,
    content: "Great platform for smart contracts but gas fees can be high during peak times.",
    createdAt: "2025-02-15T16:45:00Z",
  },
]

// Mock data for submitted projects
export const mockSubmittedProjects = [
  {
    id: "submission1",
    userId: "user123",
    name: "MyToken",
    symbol: "MTK",
    category: "defi",
    description: "A new DeFi protocol focusing on yield optimization.",
    status: "pending",
    submittedAt: "2025-03-12T11:20:00Z",
  },
  {
    id: "submission2",
    userId: "user123",
    name: "GameChain",
    symbol: "GMC",
    category: "gaming",
    description: "Blockchain gaming platform with play-to-earn mechanics.",
    status: "approved",
    submittedAt: "2025-02-28T09:10:00Z",
  },
]

