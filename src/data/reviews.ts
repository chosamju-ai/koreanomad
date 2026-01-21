import { Review } from "./types";

export const reviews: Review[] = [
  // Seoul Gangnam Reviews
  {
    id: "rev-1",
    citySlug: "seoul-gangnam",
    userId: "user-1",
    userName: "김민준",
    rating: 5,
    content:
      "강남은 디지털 노마드에게 최고의 장소입니다. 카페가 정말 많고 인터넷 속도도 빠릅니다. 다만 생활비가 조금 비싼 편이에요.",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "rev-2",
    citySlug: "seoul-gangnam",
    userId: "user-2",
    userName: "박서연",
    rating: 4,
    content:
      "교통이 매우 편리하고 코워킹 스페이스도 다양합니다. 밤늦게까지 일할 수 있는 카페가 많아서 좋아요.",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "rev-3",
    citySlug: "seoul-gangnam",
    userId: "user-3",
    userName: "이준호",
    rating: 5,
    content:
      "모든 것이 완벽합니다. 인프라, 편의시설, 네트워킹 기회까지. 장기 체류하기 좋은 곳입니다.",
    createdAt: new Date("2024-03-05"),
  },

  // Jeju Seogwipo Reviews
  {
    id: "rev-4",
    citySlug: "jeju-seogwipo",
    userId: "user-4",
    userName: "최지우",
    rating: 5,
    content:
      "자연 속에서 일하는 기분이 정말 좋습니다. 스트레스가 확 풀리고 창의력이 올라가는 느낌이에요. 힐링하며 일하기 최고!",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "rev-5",
    citySlug: "jeju-seogwipo",
    userId: "user-5",
    userName: "정수민",
    rating: 4,
    content:
      "바다 뷰 카페에서 일하는 게 정말 멋져요. 다만 교통이 불편한 편이라 렌터카가 필수입니다.",
    createdAt: new Date("2024-02-14"),
  },
  {
    id: "rev-6",
    citySlug: "jeju-seogwipo",
    userId: "user-6",
    userName: "강현우",
    rating: 5,
    content:
      "제주 남쪽의 조용한 분위기가 좋습니다. 집중해서 일하기에 완벽하고, 주말엔 관광도 즐길 수 있어요.",
    createdAt: new Date("2024-03-01"),
  },

  // Busan Haeundae Reviews
  {
    id: "rev-7",
    citySlug: "busan-haeundae",
    userId: "user-7",
    userName: "윤서진",
    rating: 5,
    content:
      "해변 근처 카페에서 일하는 게 정말 환상적입니다. 서울보다 여유롭고 생활비도 저렴해요.",
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "rev-8",
    citySlug: "busan-haeundae",
    userId: "user-8",
    userName: "한지민",
    rating: 4,
    content:
      "부산 사람들이 친절하고 음식도 맛있습니다. 해운대 해변을 보며 일하는 건 특별한 경험이에요.",
    createdAt: new Date("2024-02-18"),
  },
  {
    id: "rev-9",
    citySlug: "busan-haeundae",
    userId: "user-9",
    userName: "송민석",
    rating: 5,
    content:
      "워케이션 하기 완벽한 도시입니다. 일과 휴식의 밸런스가 좋아요. 강력 추천합니다!",
    createdAt: new Date("2024-03-10"),
  },

  // Gangneung Reviews
  {
    id: "rev-10",
    citySlug: "gangneung",
    userId: "user-10",
    userName: "오세훈",
    rating: 4,
    content:
      "커피의 도시답게 카페 퀄리티가 정말 높습니다. 조용하고 평화로운 분위기에서 일할 수 있어요.",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "rev-11",
    citySlug: "gangneung",
    userId: "user-11",
    userName: "임지영",
    rating: 5,
    content:
      "경포대 해변 근처 카페가 정말 멋져요. 자연과 가까워서 마음이 편안해집니다.",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "rev-12",
    citySlug: "gangneung",
    userId: "user-12",
    userName: "배준영",
    rating: 4,
    content:
      "서울에서 2시간이면 도착할 수 있어서 주말 워케이션으로 자주 옵니다. 커피도 맛있고 분위기도 좋아요.",
    createdAt: new Date("2024-03-08"),
  },

  // Jeonju Hanok Reviews
  {
    id: "rev-13",
    citySlug: "jeonju-hanok",
    userId: "user-13",
    userName: "신동엽",
    rating: 4,
    content:
      "한옥 카페에서 일하는 경험이 독특합니다. 전통과 현대가 조화를 이루는 분위기가 좋아요.",
    createdAt: new Date("2024-02-05"),
  },
  {
    id: "rev-14",
    citySlug: "jeonju-hanok",
    userId: "user-14",
    userName: "홍은지",
    rating: 5,
    content:
      "맛집이 정말 많고 생활비가 저렴합니다. 한옥마을의 고즈넉한 분위기 속에서 집중이 잘 돼요.",
    createdAt: new Date("2024-02-22"),
  },
  {
    id: "rev-15",
    citySlug: "jeonju-hanok",
    userId: "user-15",
    userName: "유재석",
    rating: 4,
    content:
      "전주 비빔밥과 콩나물국밥이 정말 맛있어요. 문화 체험도 할 수 있어서 장기 체류하기 좋습니다.",
    createdAt: new Date("2024-03-12"),
  },

  // Daejeon Yuseong Reviews
  {
    id: "rev-16",
    citySlug: "daejeon-yuseong",
    userId: "user-16",
    userName: "김연아",
    rating: 4,
    content:
      "과학단지 근처라 카페들이 깔끔하고 현대적입니다. 조용하고 집중하기 좋은 환경이에요.",
    createdAt: new Date("2024-02-08"),
  },
  {
    id: "rev-17",
    citySlug: "daejeon-yuseong",
    userId: "user-17",
    userName: "박지성",
    rating: 5,
    content:
      "생활비가 저렴하고 교통도 편리합니다. 서울과 부산 중간이라 접근성도 좋아요.",
    createdAt: new Date("2024-02-25"),
  },
  {
    id: "rev-18",
    citySlug: "daejeon-yuseong",
    userId: "user-18",
    userName: "손흥민",
    rating: 4,
    content:
      "온천도 즐기고 일도 할 수 있어서 좋습니다. 스타트업 분위기도 느껴져요.",
    createdAt: new Date("2024-03-15"),
  },
];

export function getReviewsByCity(citySlug: string): Review[] {
  return reviews.filter((review) => review.citySlug === citySlug);
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function getReviewStats(citySlug: string): ReviewStats {
  const cityReviews = getReviewsByCity(citySlug);
  const totalReviews = cityReviews.length;

  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const totalRating = cityReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / totalReviews;

  const ratingDistribution = cityReviews.reduce(
    (dist, review) => {
      dist[review.rating as keyof typeof dist]++;
      return dist;
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  );

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews,
    ratingDistribution,
  };
}
