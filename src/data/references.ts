import type { FaceType } from "@/data/characters";
import type { GenreKey } from "@/data/genres";

export const workReferencesByGenre: Record<
  GenreKey,
  Array<{
    title: string;
    note: string;
  }>
> = {
  romance: [
    { title: "그 해 우리는", note: "잔잔한 감정선이 오래 남는 로맨스" },
    { title: "사랑의 불시착", note: "관계성이 크게 살아나는 로맨스" },
    { title: "선재 업고 튀어", note: "설렘과 서사가 같이 가는 분위기" },
  ],
  crime: [
    { title: "시그널", note: "긴장감 있게 사건을 끌고 가는 범죄물" },
    { title: "모범택시", note: "속도감 있는 전개가 강한 작품" },
    { title: "악의 꽃", note: "관계와 사건이 함께 움직이는 범죄 드라마" },
  ],
  thriller: [
    { title: "비밀의 숲", note: "조용한 긴장감이 오래 가는 작품" },
    { title: "마우스", note: "서늘한 분위기와 반전이 강한 작품" },
    { title: "괴물", note: "낮은 톤의 긴장감이 돋보이는 작품" },
  ],
  legal: [
    { title: "이상한 변호사 우영우", note: "사람 이야기와 사건이 같이 살아나는 법정물" },
    { title: "하이에나", note: "밀도 있는 대사와 대립이 강한 작품" },
    { title: "비밀의 숲", note: "판단과 권력이 중심이 되는 분위기" },
  ],
  youth: [
    { title: "스물다섯 스물하나", note: "맑은 에너지와 성장 서사가 잘 보이는 작품" },
    { title: "치즈인더트랩", note: "캠퍼스 안의 미묘한 관계성이 살아나는 작품" },
    { title: "멜로가 체질", note: "가볍게 시작해도 여운이 남는 청춘물" },
  ],
  fantasy: [
    { title: "도깨비", note: "현실 밖 설정도 감정선과 잘 붙는 작품" },
    { title: "호텔 델루나", note: "화려함과 신비로움이 함께 가는 작품" },
    { title: "환혼", note: "세계관과 인물 서사가 함께 살아나는 작품" },
  ],
  historical: [
    { title: "미스터 션샤인", note: "무게감 있는 분위기가 강한 작품" },
    { title: "옷소매 붉은 끝동", note: "절제된 감정선이 오래 남는 사극" },
    { title: "연모", note: "긴장감과 감정선이 함께 가는 사극" },
  ],
  noir: [
    { title: "빈센조", note: "세련된 어둠과 카리스마가 함께 가는 작품" },
    { title: "나의 아저씨", note: "낮은 톤의 묵직한 감정이 살아나는 작품" },
    { title: "카지노", note: "거친 공기와 긴장감이 강한 느와르" },
  ],
  medical: [
    { title: "슬기로운 의사생활", note: "편안함과 신뢰가 같이 보이는 메디컬물" },
    { title: "낭만닥터 김사부", note: "실력과 몰입감이 동시에 살아나는 작품" },
    { title: "중증외상센터", note: "급박한 상황에서 존재감이 커지는 메디컬물" },
  ],
  mystery: [
    { title: "작은 아씨들", note: "묘한 긴장감과 궁금증이 이어지는 작품" },
    { title: "마인", note: "숨겨진 관계와 분위기가 강한 미스터리" },
    { title: "마더", note: "조용한 감정선이 오래 남는 작품" },
  ],
};

/** 얼굴 타입별 배우 레퍼런스 — 닮은꼴이 아니라 같은 인상 계열 */
export const actorReferencesByFaceType: Record<
  FaceType,
  Array<{
    name: string;
    note: string;
  }>
> = {
  RUGGED: [
    { name: "마동석", note: "거칠고 강인한 존재감이 장면을 압도하는 무드" },
    { name: "정만식", note: "묵직하고 위협적인 분위기가 자연스러운 무드" },
    { name: "박성웅", note: "강하고 카리스마 있는 악역 무드" },
  ],
  SHARP_COOL: [
    { name: "이병헌", note: "날카롭고 차가운 카리스마가 장면을 지배하는 무드" },
    { name: "공유", note: "세련되고 서늘한 분위기의 주연 무드" },
    { name: "현빈", note: "차갑고 단단한 존재감이 먼저 보이는 무드" },
  ],
  WARM_FRIENDLY: [
    { name: "조정석", note: "따뜻하고 친근한 에너지가 화면을 살리는 무드" },
    { name: "류준열", note: "자연스럽고 부담 없이 호감이 가는 무드" },
    { name: "이선균", note: "편안하고 신뢰감 있는 분위기의 무드" },
  ],
  ELEGANT_REFINED: [
    { name: "전지현", note: "과하지 않아도 정리된 인상이 남는 무드" },
    { name: "손예진", note: "우아하고 정돈된 로맨스 주연 무드" },
    { name: "김태희", note: "세련되고 고급스러운 분위기의 무드" },
  ],
  INTELLECTUAL_SERIOUS: [
    { name: "조승우", note: "조용한데 중심이 단단한 주연 무드" },
    { name: "김명민", note: "지적이고 진지한 분위기가 먼저 보이는 무드" },
    { name: "전도연", note: "차분하게 장면을 잡는 지성적 무드" },
  ],
  SOFT_YOUTH: [
    { name: "박보영", note: "편안한데 여운이 남는 청춘 무드" },
    { name: "박보검", note: "맑고 부드러운 에너지의 청춘 주연 무드" },
    { name: "아이유", note: "산뜻하고 자연스러운 감성의 무드" },
  ],
  MYSTERIOUS_DARK: [
    { name: "이준기", note: "신비롭고 어두운 매력이 살아나는 무드" },
    { name: "고수", note: "속을 알 수 없는 눈빛이 인상적인 무드" },
    { name: "서예지", note: "설명보다 여백이 더 강한 신비로운 무드" },
  ],
  CHARISMATIC_INTENSE: [
    { name: "황정민", note: "강렬하고 폭발적인 존재감의 카리스마 무드" },
    { name: "최민식", note: "장면을 장악하는 압도적인 카리스마 무드" },
    { name: "송강호", note: "짧게 나와도 공기가 달라지는 무드" },
  ],
};
