const mockOffers = [
  {
    id: "offer_001",
    title: "Magnet Miner",
    description: "Complete this game offer by reaching the required milestone (Level 10).",
    image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "android",
    reward: 22887500,
    currency: "TOKENS",
    estimatedTime: "15–30 min",
    status: "available",
    provider: "AdGem",
    requirements: [
      "New users only",
      "Install through this link",
      "Complete Level 10 within 7 days"
    ],
    terms: "You must be a new user of this app to be eligible for the reward. Using VPNs or emulators will result in a ban.",
    createdAt: "2023-10-01T12:00:00Z"
  },
  {
    id: "offer_002",
    title: "Ghost Tower",
    description: "Defend the tower from endless ghosts and reach level 25.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "ios",
    reward: 6508300,
    currency: "TOKENS",
    estimatedTime: "2-3 days",
    status: "available",
    provider: "RevU",
    requirements: [
      "New users only",
      "Reach level 25"
    ],
    terms: "Standard terms apply.",
    createdAt: "2023-10-02T12:00:00Z"
  },
  {
    id: "offer_003",
    title: "Farm Craze",
    description: "Build the ultimate farm and harvest your first crop of golden wheat.",
    image: "https://images.unsplash.com/photo-1592982537447-6f296cb34ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "android",
    reward: 176995,
    currency: "TOKENS",
    estimatedTime: "5 min",
    status: "available",
    provider: "AdGateMedia",
    requirements: [
      "Download and open",
      "Play for 3 minutes"
    ],
    terms: "Must be a new user.",
    createdAt: "2023-10-05T12:00:00Z"
  },
  {
    id: "offer_004",
    title: "Snake Slide",
    description: "Navigate the tricky mazes in Snake Slide. Finish World 1 to earn.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "both",
    reward: 114720,
    currency: "TOKENS",
    estimatedTime: "1 hour",
    status: "available",
    provider: "OfferToro",
    requirements: [
      "Complete World 1"
    ],
    terms: "No VPNs.",
    createdAt: "2023-09-28T12:00:00Z"
  },
  {
    id: "offer_005",
    title: "Path Popper",
    description: "Pop the bubbles to clear the path. Fun and relaxing puzzle game.",
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "ios",
    reward: 810888,
    currency: "TOKENS",
    estimatedTime: "2 hours",
    status: "available",
    provider: "Lootably",
    requirements: [
      "Pop 1000 bubbles"
    ],
    terms: "New users only.",
    createdAt: "2023-10-10T12:00:00Z"
  },
  {
    id: "offer_006",
    title: "Crypto Survey",
    description: "Answer a short survey about your cryptocurrency habits.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "both",
    reward: 550000,
    currency: "TOKENS",
    estimatedTime: "10 min",
    status: "available",
    provider: "CPALead",
    requirements: [
      "Complete the survey with honest answers"
    ],
    terms: "Inconsistent answers will result in a chargeback.",
    createdAt: "2023-10-12T12:00:00Z"
  },
  {
    id: "offer_007",
    title: "Slots Winner",
    description: "Spin to win in this exciting slots game. Reach Level 50.",
    image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "android",
    reward: 12500000,
    currency: "TOKENS",
    estimatedTime: "4-5 days",
    status: "available",
    provider: "AdGem",
    requirements: [
      "Reach level 50"
    ],
    terms: "Valid for new users only.",
    createdAt: "2023-09-15T12:00:00Z"
  },
  {
    id: "offer_008",
    title: "Finance App Trial",
    description: "Sign up for a free 7-day trial of our premium finance tracker.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    platform: "both",
    reward: 1500000,
    currency: "TOKENS",
    estimatedTime: "5 min",
    status: "available",
    provider: "RevU",
    requirements: [
      "Register an account",
      "Start free trial"
    ],
    terms: "Must input valid information.",
    createdAt: "2023-10-14T12:00:00Z"
  }
];

export const fetchOffers = async (options = {}) => {
  const { os = 'all', sort = 'reward', page = 1, limit = 20 } = options;
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));

  let filteredOffers = [...mockOffers];

  // 1. Filter by OS
  if (os !== 'all') {
    filteredOffers = filteredOffers.filter(
      offer => offer.platform === os || offer.platform === 'both'
    );
  }

  // 2. Sort
  filteredOffers.sort((a, b) => {
    if (sort === 'reward' || sort === 'highest') {
      return b.reward - a.reward;
    }
    if (sort === 'lowest') {
      return a.reward - b.reward;
    }
    if (sort === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sort === 'popular') {
      // Mock popularity by generating a deterministic pseudo-random score based on ID
      const scoreA = parseInt(a.id.split('_')[1], 10) % 3;
      const scoreB = parseInt(b.id.split('_')[1], 10) % 3;
      return scoreB - scoreA;
    }
    return 0;
  });

  // 3. Paginate
  const startIndex = (page - 1) * limit;
  const paginatedOffers = filteredOffers.slice(startIndex, startIndex + limit);

  return {
    success: true,
    data: {
      offers: paginatedOffers,
      total: filteredOffers.length,
    }
  };
};

export const startOffer = async (offerId) => {
  // Simulate network latency for clicking start offer
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    data: {
      trackingUrl: `https://mockprovider.com/track?offerId=${offerId}&userId=mock_user_123`,
      transactionId: `txn_${Math.floor(Math.random() * 1000000)}`
    }
  };
};
