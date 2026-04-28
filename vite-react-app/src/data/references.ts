import type { FaceType } from "@/data/characters";
import type { GenreKey } from "@/data/genres";

type I18nString = { ko: string; en: string; ja: string };
type I18nNote   = { ko: string; en: string; ja: string };

export const workReferencesByGenre: Record<
  GenreKey,
  Array<{ title: I18nString; note: I18nNote }>
> = {
  romance: [
    {
      title: { ko: "그 해 우리는", en: "Our Beloved Summer", ja: "その年、私たちは" },
      note: {
        ko: "잔잔한 감정선이 오래 남는 로맨스",
        en: "A quietly emotional romance that stays with you",
        ja: "静かな感情線が長く残るロマンス",
      },
    },
    {
      title: { ko: "사랑의 불시착", en: "Crash Landing on You", ja: "愛の不時着" },
      note: {
        ko: "관계성이 크게 살아나는 로맨스",
        en: "A romance where the relationship truly comes alive",
        ja: "関係性が大きく生きるロマンス",
      },
    },
    {
      title: { ko: "선재 업고 튀어", en: "Lovely Runner", ja: "ソンジェを抱えて走れ" },
      note: {
        ko: "설렘과 서사가 같이 가는 분위기",
        en: "A romance that blends excitement with a strong narrative",
        ja: "ときめきと物語が一緒に進む雰囲気",
      },
    },
    {
      title: { ko: "킹더랜드", en: "King the Land", ja: "キング・ザ・ランド" },
      note: {
        ko: "밝고 경쾌한 에너지가 살아나는 로맨스",
        en: "A bright, breezy romance full of lively energy",
        ja: "明るく軽快なエネルギーが生きるロマンス",
      },
    },
    {
      title: { ko: "내 남편과 결혼해줘", en: "Marry My Husband", ja: "私の夫と結婚して" },
      note: {
        ko: "통쾌한 전개와 감정선이 함께 가는 로맨스",
        en: "A satisfying romance where revenge and emotion intertwine",
        ja: "痛快な展開と感情線が一緒に進むロマンス",
      },
    },
  ],
  crime: [
    {
      title: { ko: "시그널", en: "Signal", ja: "シグナル" },
      note: {
        ko: "긴장감 있게 사건을 끌고 가는 범죄물",
        en: "A gripping crime drama with sustained tension",
        ja: "緊張感がずっと続く犯罪ドラマ",
      },
    },
    {
      title: { ko: "모범택시", en: "Taxi Driver", ja: "模範タクシー" },
      note: {
        ko: "속도감 있는 전개가 강한 작품",
        en: "A fast-paced story with strong momentum",
        ja: "テンポのいい展開が力強い作品",
      },
    },
    {
      title: { ko: "악의 꽃", en: "Flower of Evil", ja: "悪の花" },
      note: {
        ko: "관계와 사건이 함께 움직이는 범죄 드라마",
        en: "A crime drama where relationships and mystery unfold together",
        ja: "関係性と事件が一緒に動く犯罪ドラマ",
      },
    },
    {
      title: { ko: "수사반장 1958", en: "Chief Detective 1958", ja: "捜査班長1958" },
      note: {
        ko: "시대감과 형사 서사가 함께 살아나는 범죄물",
        en: "A crime drama where period atmosphere and detective storytelling merge",
        ja: "時代感と刑事の物語が一緒に生きる犯罪ドラマ",
      },
    },
    {
      title: { ko: "마스크걸", en: "Mask Girl", ja: "マスクガール" },
      note: {
        ko: "날카로운 시선으로 사건과 인물을 파고드는 작품",
        en: "A sharp-eyed look at crime through deeply personal character arcs",
        ja: "鋭い視点で事件と人物を掘り下げる作品",
      },
    },
  ],
  thriller: [
    {
      title: { ko: "비밀의 숲", en: "Stranger", ja: "秘密の森" },
      note: {
        ko: "조용한 긴장감이 오래 가는 작품",
        en: "A slow-burn thriller with tension that holds",
        ja: "静かな緊張感が長く続く作品",
      },
    },
    {
      title: { ko: "마우스", en: "Mouse", ja: "マウス" },
      note: {
        ko: "서늘한 분위기와 반전이 강한 작품",
        en: "A cool, atmospheric thriller full of unexpected turns",
        ja: "冷たい雰囲気と反転が強い作品",
      },
    },
    {
      title: { ko: "괴물", en: "Monster", ja: "怪物" },
      note: {
        ko: "낮은 톤의 긴장감이 돋보이는 작품",
        en: "Quiet dread delivered at a low, controlled pitch",
        ja: "抑えたトーンの緊張感が際立つ作品",
      },
    },
    {
      title: { ko: "더 글로리", en: "The Glory", ja: "ザ・グローリー" },
      note: {
        ko: "차갑게 계획된 서사가 끝까지 당기는 작품",
        en: "A cold, calculated story that grips you until the very end",
        ja: "冷たく計画された物語が最後まで引きつける作品",
      },
    },
    {
      title: { ko: "D.P.", en: "D.P.", ja: "D.P. -脱走兵追跡官-" },
      note: {
        ko: "짧지만 깊은 긴장감이 살아나는 작품",
        en: "Compact and deeply tense from start to finish",
        ja: "短くても深い緊張感が生きる作品",
      },
    },
  ],
  legal: [
    {
      title: { ko: "이상한 변호사 우영우", en: "Extraordinary Attorney Woo", ja: "ウ・ヨンウ弁護士は天才肌" },
      note: {
        ko: "사람 이야기와 사건이 같이 살아나는 법정물",
        en: "A legal drama where human stories and cases come alive together",
        ja: "人の物語と事件が一緒に生きる法廷ドラマ",
      },
    },
    {
      title: { ko: "하이에나", en: "Hyena", ja: "ハイエナ" },
      note: {
        ko: "밀도 있는 대사와 대립이 강한 작품",
        en: "Dense dialogue and sharp confrontations",
        ja: "密度の高いセリフと対立が強い作品",
      },
    },
    {
      title: { ko: "비밀의 숲", en: "Stranger", ja: "秘密の森" },
      note: {
        ko: "판단과 권력이 중심이 되는 분위기",
        en: "A drama where judgment and power take centre stage",
        ja: "判断と権力が中心になる雰囲気",
      },
    },
    {
      title: { ko: "대행사", en: "Agency", ja: "エージェンシー" },
      note: {
        ko: "권력과 야망이 날카롭게 충돌하는 법정·기업물",
        en: "A sharp clash of power and ambition in the boardroom and courtroom",
        ja: "権力と野心が鋭く衝突する法廷・企業ドラマ",
      },
    },
    {
      title: { ko: "법쩐", en: "Money Game", ja: "法の力" },
      note: {
        ko: "법과 돈이 얽히는 복잡한 서사가 살아나는 작품",
        en: "A story where law and money tangle in complex, gripping ways",
        ja: "法とお金が絡む複雑な物語が生きる作品",
      },
    },
  ],
  youth: [
    {
      title: { ko: "스물다섯 스물하나", en: "Twenty-Five Twenty-One", ja: "二十五、二十一" },
      note: {
        ko: "맑은 에너지와 성장 서사가 잘 보이는 작품",
        en: "Clear energy and a strong coming-of-age story",
        ja: "澄んだエネルギーと成長の物語がよく見える作品",
      },
    },
    {
      title: { ko: "치즈인더트랩", en: "Cheese in the Trap", ja: "チーズ・イン・ザ・トラップ" },
      note: {
        ko: "캠퍼스 안의 미묘한 관계성이 살아나는 작품",
        en: "Subtle campus relationships that feel completely real",
        ja: "キャンパス内の微妙な関係性が生きる作品",
      },
    },
    {
      title: { ko: "멜로가 체질", en: "Be Melodramatic", ja: "メロが体質" },
      note: {
        ko: "가볍게 시작해도 여운이 길게 남는 이야기",
        en: "A story that starts easy but lingers far longer than expected",
        ja: "軽く始まっても余韻が長く残る物語",
      },
    },
    {
      title: { ko: "반짝이는 워터멜론", en: "Sparkling Watermelon", ja: "きらきらスイカ" },
      note: {
        ko: "밝고 설레는 에너지가 화면 가득 담긴 이야기",
        en: "Bright, exciting energy that fills every frame",
        ja: "明るくときめくエネルギーが画面いっぱいに詰まった物語",
      },
    },
    {
      title: { ko: "갯마을 차차차", en: "Hometown Cha-Cha-Cha", ja: "海街チャチャチャ" },
      note: {
        ko: "편안하고 사람 냄새가 나는 로맨스 분위기",
        en: "Warm, human-scale romance with a gentle, lived-in feel",
        ja: "温かく人の匂いがするロマンスの雰囲気",
      },
    },
  ],
  fantasy: [
    {
      title: { ko: "도깨비", en: "Goblin", ja: "トッケビ" },
      note: {
        ko: "현실 밖 설정도 감정선과 잘 붙는 작품",
        en: "An otherworldly setting that still holds its emotional thread",
        ja: "現実外の設定も感情線とよく合う作品",
      },
    },
    {
      title: { ko: "호텔 델루나", en: "Hotel Del Luna", ja: "ホテル・デルーナ" },
      note: {
        ko: "화려함과 신비로움이 함께 가는 작품",
        en: "Glamour and mystery woven together naturally",
        ja: "華やかさと神秘さが一緒に進む作品",
      },
    },
    {
      title: { ko: "환혼", en: "Alchemy of Souls", ja: "還魂" },
      note: {
        ko: "세계관과 인물 서사가 함께 살아나는 작품",
        en: "A story where world-building and character arcs grow side by side",
        ja: "世界観と人物の物語が一緒に生きる作品",
      },
    },
    {
      title: { ko: "별에서 온 그대", en: "My Love from the Star", ja: "星から来たあなた" },
      note: {
        ko: "비현실적 설정 속 감정이 자연스럽게 살아나는 작품",
        en: "Emotion that feels completely real inside a fantastical premise",
        ja: "非現実的な設定の中で感情が自然に生きる作品",
      },
    },
    {
      title: { ko: "구가의 서", en: "Gu Family Book", ja: "九家の書" },
      note: {
        ko: "전설적 배경과 인물의 성장 서사가 어우러지는 작품",
        en: "Legendary setting and compelling character growth woven together",
        ja: "伝説的な背景と人物の成長が織り交ざる作品",
      },
    },
  ],
  historical: [
    {
      title: { ko: "미스터 션샤인", en: "Mr. Sunshine", ja: "ミスター・サンシャイン" },
      note: {
        ko: "무게감 있는 분위기가 강한 작품",
        en: "A period drama with a strong sense of gravity and weight",
        ja: "重みのある雰囲気が強い作품",
      },
    },
    {
      title: { ko: "옷소매 붉은 끝동", en: "The Red Sleeve", ja: "赤い袖先" },
      note: {
        ko: "절제된 감정선이 오래 남는 사극",
        en: "A period drama with restrained emotions that linger long",
        ja: "抑えた感情線が長く残る時代劇",
      },
    },
    {
      title: { ko: "연모", en: "The King's Affection", ja: "恋慕" },
      note: {
        ko: "긴장감과 감정선이 함께 가는 사극",
        en: "A period drama that carries tension and emotion together",
        ja: "緊張感と感情線が一緒に進む時代劇",
      },
    },
    {
      title: { ko: "킹덤", en: "Kingdom", ja: "キングダム" },
      note: {
        ko: "생존과 권력이 충돌하는 강렬한 사극",
        en: "An intense period drama where survival and power collide",
        ja: "生存と権力が衝突する強烈な時代劇",
      },
    },
    {
      title: { ko: "이산", en: "Yi San", ja: "イ・サン" },
      note: {
        ko: "왕의 성장과 시대의 무게가 함께 가는 사극",
        en: "A king's growth and the weight of history portrayed in full",
        ja: "王の成長と時代の重みが一緒に描かれる時代劇",
      },
    },
  ],
  noir: [
    {
      title: { ko: "빈센조", en: "Vincenzo", ja: "ヴィンチェンツォ" },
      note: {
        ko: "세련된 어둠과 카리스마가 함께 가는 작품",
        en: "Stylish darkness and charisma in perfect balance",
        ja: "洗練された暗さとカリスマが一緒に進む作品",
      },
    },
    {
      title: { ko: "나의 아저씨", en: "My Mister", ja: "マイ・ディア・ミスター" },
      note: {
        ko: "낮은 톤의 묵직한 감정이 살아나는 작품",
        en: "A quiet, heavy drama where deep emotions surface slowly",
        ja: "抑えたトーンで重みのある感情が生きる作品",
      },
    },
    {
      title: { ko: "카지노", en: "Casino", ja: "カジノ" },
      note: {
        ko: "거친 공기와 긴장감이 강한 느와르",
        en: "A noir piece with raw energy and strong tension",
        ja: "荒い空気と緊張感が強いノワール",
      },
    },
    {
      title: { ko: "무빙", en: "Moving", ja: "ムービング" },
      note: {
        ko: "숨겨진 과거와 능력자 서사가 강렬하게 얽히는 작품",
        en: "Hidden pasts and extraordinary powers collide in a gripping story",
        ja: "隠された過去と能力者の物語が強烈に絡み合う作品",
      },
    },
    {
      title: { ko: "수리남", en: "Narco-Saints", ja: "麻薬共和国" },
      note: {
        ko: "탁한 세계 안에서 살아남는 묵직한 느와르",
        en: "A gritty noir about surviving inside a corrupt world",
        ja: "濁った世界の中で生き抜く重みのあるノワール",
      },
    },
  ],
  medical: [
    {
      title: { ko: "슬기로운 의사생활", en: "Hospital Playlist", ja: "賢い医師生活" },
      note: {
        ko: "편안함과 신뢰가 같이 보이는 메디컬물",
        en: "A medical drama that balances warmth and trust naturally",
        ja: "穏やかさと信頼が自然に見えるメディカルドラマ",
      },
    },
    {
      title: { ko: "낭만닥터 김사부", en: "Dr. Romantic", ja: "ロマンスドクター、キム・サブ" },
      note: {
        ko: "실력과 몰입감이 동시에 살아나는 작품",
        en: "A drama where skill and intensity both shine",
        ja: "実力と没入感が同時に生きる作品",
      },
    },
    {
      title: { ko: "중증외상센터", en: "Trauma Center", ja: "重症外傷センター" },
      note: {
        ko: "급박한 상황에서 존재감이 커지는 메디컬물",
        en: "A medical drama where presence grows strongest under pressure",
        ja: "急迫した状況で存在感が増すメディカルドラマ",
      },
    },
    {
      title: { ko: "굿 닥터", en: "Good Doctor", ja: "グッド・ドクター" },
      note: {
        ko: "인간적인 시선이 따뜻하게 살아나는 메디컬 드라마",
        en: "A medical drama warmed by a deeply human perspective",
        ja: "人間的な視点が温かく生きるメディカルドラマ",
      },
    },
    {
      title: { ko: "닥터 프리즈너", en: "Doctor Prisoner", ja: "ドクター・プリズナー" },
      note: {
        ko: "냉철한 판단과 내부 권력 다툼이 얽히는 메디컬물",
        en: "Cold calculation and internal power struggles intertwined in a medical setting",
        ja: "冷徹な判断と内部権力争いが絡む医療ドラマ",
      },
    },
  ],
  mystery: [
    {
      title: { ko: "작은 아씨들", en: "Little Women", ja: "若草の頃" },
      note: {
        ko: "묘한 긴장감과 궁금증이 이어지는 작품",
        en: "A mystery that keeps tension and curiosity building",
        ja: "独特の緊張感と好奇心が続く作品",
      },
    },
    {
      title: { ko: "마인", en: "Mine", ja: "マイン" },
      note: {
        ko: "숨겨진 관계와 분위기가 강한 미스터리",
        en: "Hidden connections and a powerful atmosphere drive the story",
        ja: "隠れた関係性と雰囲気が強いミステリー",
      },
    },
    {
      title: { ko: "마더", en: "Mother", ja: "マザー" },
      note: {
        ko: "조용한 감정선이 오래 남는 작품",
        en: "A quiet drama with a slow-building emotional undercurrent",
        ja: "静かな感情線が長く残る作品",
      },
    },
    {
      title: { ko: "악귀", en: "Revenant", ja: "悪鬼" },
      note: {
        ko: "서늘한 공기와 진실 추적이 함께 살아나는 미스터리",
        en: "A chilling mystery where the search for truth creeps under your skin",
        ja: "冷たい空気と真実追跡が一緒に生きるミステリー",
      },
    },
    {
      title: { ko: "펜트하우스", en: "The Penthouse", ja: "ペントハウス" },
      note: {
        ko: "욕망과 복수가 얽히는 강렬한 미스터리 드라마",
        en: "Desire and revenge tangle in an intensely gripping mystery",
        ja: "欲望と復讐が絡み合う強烈なミステリードラマ",
      },
    },
  ],
};

/** 얼굴 타입 × 성별 배우 레퍼런스 — 로케일별로 해당 문화권 배우 추천 */
export const actorReferencesByFaceType: Record<
  FaceType,
  {
    male: Array<{ name: I18nString; note: I18nNote }>;
    female: Array<{ name: I18nString; note: I18nNote }>;
  }
> = {
  RUGGED: {
    male: [
      {
        name: { ko: "마동석", en: "Tom Hardy", ja: "大沢たかお" },
        note: {
          ko: "거칠고 강인한 존재감이 장면을 압도하는 무드",
          en: "Rough, powerful presence that dominates every scene",
          ja: "荒削りで力強い存在感がシーンを圧倒するムード",
        },
      },
      {
        name: { ko: "정만식", en: "Jason Statham", ja: "江口洋介" },
        note: {
          ko: "묵직하고 위협적인 분위기가 자연스러운 무드",
          en: "A naturally heavy and quietly menacing atmosphere",
          ja: "重みと威圧感が自然に漂うムード",
        },
      },
      {
        name: { ko: "박성웅", en: "Dave Bautista", ja: "反町隆史" },
        note: {
          ko: "강하고 카리스마 있는 악역 무드",
          en: "Strong, charismatic presence built for villain roles",
          ja: "強くカリスマのある悪役ムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "김혜수", en: "Charlize Theron", ja: "天海祐希" },
        note: {
          ko: "강하고 카리스마 있는 존재감의 무드",
          en: "Strong, charismatic presence that commands every room",
          ja: "強くカリスマのある存在感のムード",
        },
      },
      {
        name: { ko: "전혜진", en: "Gal Gadot", ja: "米倉涼子" },
        note: {
          ko: "거칠고 강인한 에너지가 자연스러운 무드",
          en: "Naturally tough and powerful energy",
          ja: "荒削りで力強いエネルギーが自然なムード",
        },
      },
      {
        name: { ko: "라미란", en: "Michelle Rodriguez", ja: "吉田羊" },
        note: {
          ko: "강렬하고 터프한 인상이 장면을 압도하는 무드",
          en: "Intense, tough impression that overwhelms the scene",
          ja: "強烈でタフな印象がシーンを圧倒するムード",
        },
      },
    ],
  },
  SHARP_COOL: {
    male: [
      {
        name: { ko: "이병헌", en: "Idris Elba", ja: "福山雅治" },
        note: {
          ko: "날카롭고 차가운 카리스마가 장면을 지배하는 무드",
          en: "Sharp, cold charisma that takes full control of the screen",
          ja: "鋭く冷たいカリスマがスクリーンを支配するムード",
        },
      },
      {
        name: { ko: "공유", en: "Tom Hiddleston", ja: "西島秀俊" },
        note: {
          ko: "세련되고 서늘한 분위기가 앞서는 무드",
          en: "Refined and quietly chilling atmosphere that arrives first",
          ja: "洗練されたクールでひんやりした雰囲気が先に立つムード",
        },
      },
      {
        name: { ko: "현빈", en: "Benedict Cumberbatch", ja: "堺雅人" },
        note: {
          ko: "차갑고 단단한 존재감이 먼저 보이는 무드",
          en: "Cold, solid presence that registers before anything else",
          ja: "冷たく芯のある存在感が先に伝わるムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "김혜수", en: "Cate Blanchett", ja: "北川景子" },
        note: {
          ko: "날카롭고 차가운 카리스마가 장면을 지배하는 무드",
          en: "Sharp, cold charisma that takes control of every scene",
          ja: "鋭く冷たいカリスマがシーンを制するムード",
        },
      },
      {
        name: { ko: "전도연", en: "Eva Green", ja: "深田恭子" },
        note: {
          ko: "서늘하고 날 선 분위기가 먼저 보이는 무드",
          en: "Cool, razor-edged atmosphere that cuts through first",
          ja: "クールで切れ味のある雰囲気が先に立つムード",
        },
      },
      {
        name: { ko: "한소희", en: "Tilda Swinton", ja: "石原さとみ" },
        note: {
          ko: "차갑고 단단한 존재감이 인상적인 무드",
          en: "Cold, solid presence that leaves a lasting impression",
          ja: "冷たく芯のある存在感が印象的なムード",
        },
      },
    ],
  },
  WARM_FRIENDLY: {
    male: [
      {
        name: { ko: "조정석", en: "Chris Hemsworth", ja: "二宮和也" },
        note: {
          ko: "따뜻하고 친근한 에너지가 화면을 살리는 무드",
          en: "Warm, approachable energy that lights up the screen",
          ja: "温かく親しみやすいエネルギーが画面を明るくするムード",
        },
      },
      {
        name: { ko: "류준열", en: "Ryan Reynolds", ja: "相葉雅紀" },
        note: {
          ko: "자연스럽고 부담 없이 호감이 가는 무드",
          en: "Effortlessly likeable with a natural, relaxed feel",
          ja: "自然と好感が持てる力の抜けた雰囲気のムード",
        },
      },
      {
        name: { ko: "이선균", en: "Tom Hanks", ja: "向井理" },
        note: {
          ko: "편안하고 신뢰감 있는 분위기의 무드",
          en: "Comfortable, trustworthy presence that puts you at ease",
          ja: "落ち着いた安心感のある雰囲気のムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "공효진", en: "Reese Witherspoon", ja: "綾瀬はるか" },
        note: {
          ko: "따뜻하고 친근한 에너지가 자연스러운 무드",
          en: "Warm, approachable energy that feels completely natural",
          ja: "温かく親しみやすいエネルギーが自然なムード",
        },
      },
      {
        name: { ko: "한지민", en: "Jennifer Aniston", ja: "新垣結衣" },
        note: {
          ko: "편안하고 신뢰감 있는 분위기의 무드",
          en: "Comfortable and trustworthy presence that puts you at ease",
          ja: "落ち着いて信頼感のある雰囲気のムード",
        },
      },
      {
        name: { ko: "이지은(아이유)", en: "Sandra Bullock", ja: "石田ゆり子" },
        note: {
          ko: "밝고 친근한 에너지가 화면을 살리는 무드",
          en: "Bright, approachable energy that brings the scene to life",
          ja: "明るく親しみやすいエネルギーが画面を生かすムード",
        },
      },
    ],
  },
  ELEGANT_REFINED: {
    male: [
      {
        name: { ko: "현빈", en: "Colin Firth", ja: "玉木宏" },
        note: {
          ko: "세련되고 우아한 존재감이 먼저 보이는 무드",
          en: "Polished, elegant presence that comes through immediately",
          ja: "洗練された優雅な存在感が先に伝わるムード",
        },
      },
      {
        name: { ko: "박서준", en: "Hugh Grant", ja: "福山雅治" },
        note: {
          ko: "정돈된 인상과 고급스러운 분위기의 무드",
          en: "Composed look with an upscale, refined atmosphere",
          ja: "整った印象と高級感のある雰囲気のムード",
        },
      },
      {
        name: { ko: "정해인", en: "Daniel Craig", ja: "堺雅人" },
        note: {
          ko: "우아하고 차분한 에너지가 자연스러운 무드",
          en: "Graceful, calm energy that comes through effortlessly",
          ja: "優雅で穏やかなエネルギーが自然に漂うムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "전지현", en: "Natalie Portman", ja: "天海祐希" },
        note: {
          ko: "과하지 않아도 정리된 인상이 남는 무드",
          en: "A composed impression that lingers without trying too hard",
          ja: "過剰でなくても整った印象が残るムード",
        },
      },
      {
        name: { ko: "손예진", en: "Keira Knightley", ja: "松嶋菜々子" },
        note: {
          ko: "우아하고 정돈된 인상이 먼저 남는 무드",
          en: "Graceful, polished impression that registers first",
          ja: "優雅で整った印象が先に残るムード",
        },
      },
      {
        name: { ko: "김태희", en: "Olivia Colman", ja: "稲森いずみ" },
        note: {
          ko: "세련되고 고급스러운 분위기의 무드",
          en: "Refined, high-end atmosphere that carries effortlessly",
          ja: "洗練された高級感のある雰囲気のムード",
        },
      },
    ],
  },
  INTELLECTUAL_SERIOUS: {
    male: [
      {
        name: { ko: "조승우", en: "Bryan Cranston", ja: "阿部寛" },
        note: {
          ko: "조용한데 중심이 단단한 인상의 무드",
          en: "Quiet on the surface, but with an unshakeable centre",
          ja: "静かなのに芯の強い印象のムード",
        },
      },
      {
        name: { ko: "김명민", en: "Anthony Hopkins", ja: "唐沢寿明" },
        note: {
          ko: "지적이고 진지한 분위기가 먼저 보이는 무드",
          en: "Intellectual and serious tone that comes through first",
          ja: "知的で真剣な雰囲気が先に伝わるムード",
        },
      },
      {
        name: { ko: "설경구", en: "Jeff Bridges", ja: "大沢たかお" },
        note: {
          ko: "묵직한 존재감과 지성적 분위기의 무드",
          en: "Heavy, grounded presence with an intellectual weight",
          ja: "重みのある存在感と知性的な雰囲気のムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "전도연", en: "Meryl Streep", ja: "松嶋菜々子" },
        note: {
          ko: "차분하게 장면을 잡는 지성적 무드",
          en: "Quietly commanding every scene with an intellectual vibe",
          ja: "静かにシーンをつかむ知性的なムード",
        },
      },
      {
        name: { ko: "윤여정", en: "Helen Mirren", ja: "天海祐希" },
        note: {
          ko: "조용한데 묵직한 중심이 느껴지는 무드",
          en: "Quiet, yet with a deep and unmistakable gravity",
          ja: "静かなのに重みと芯が感じられるムード",
        },
      },
      {
        name: { ko: "김혜수", en: "Cate Blanchett", ja: "常盤貴子" },
        note: {
          ko: "지적이고 진지한 카리스마가 먼저 보이는 무드",
          en: "Intellectual, serious charisma that registers immediately",
          ja: "知的で真剣なカリスマが先に立つムード",
        },
      },
    ],
  },
  SOFT_YOUTH: {
    male: [
      {
        name: { ko: "박보검", en: "Timothée Chalamet", ja: "山崎賢人" },
        note: {
          ko: "맑고 부드러운 에너지가 먼저 전해지는 무드",
          en: "Clear, gentle energy that comes through before anything else",
          ja: "澄んでやわらかいエネルギーが先に伝わるムード",
        },
      },
      {
        name: { ko: "최우식", en: "Tom Holland", ja: "菅田将暉" },
        note: {
          ko: "자연스럽고 편안한 분위기의 무드",
          en: "Natural, relaxed sensibility that puts you at ease",
          ja: "自然で落ち着いた雰囲気のムード",
        },
      },
      {
        name: { ko: "변우석", en: "Noah Schnapp", ja: "坂口健太郎" },
        note: {
          ko: "산뜻하고 설레는 분위기의 무드",
          en: "Fresh, exciting energy that keeps you engaged",
          ja: "さわやかで胸ときめく雰囲気のムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "박보영", en: "Zendaya", ja: "有村架純" },
        note: {
          ko: "편안한데 여운이 길게 남는 무드",
          en: "Comfortable presence with a warmth that lingers long after",
          ja: "安心感があって余韻が長く残るムード",
        },
      },
      {
        name: { ko: "김고은", en: "Florence Pugh", ja: "新木優子" },
        note: {
          ko: "맑고 자연스러운 에너지가 기억에 남는 무드",
          en: "Clear, natural energy that stays with you",
          ja: "澄んで自然なエネルギーが記憶に残るムード",
        },
      },
      {
        name: { ko: "이지은(아이유)", en: "Millie Bobby Brown", ja: "橋本環奈" },
        note: {
          ko: "산뜻하고 자연스러운 감성의 무드",
          en: "Fresh, effortless sensibility that feels genuine",
          ja: "さわやかで自然な感性のムード",
        },
      },
    ],
  },
  MYSTERIOUS_DARK: {
    male: [
      {
        name: { ko: "이준기", en: "Oscar Isaac", ja: "生田斗真" },
        note: {
          ko: "신비롭고 어두운 매력이 살아나는 무드",
          en: "Mysterious, dark charm that comes alive on screen",
          ja: "神秘的で暗い魅力が生きるムード",
        },
      },
      {
        name: { ko: "고수", en: "Javier Bardem", ja: "吉沢亮" },
        note: {
          ko: "속을 알 수 없는 눈빛이 인상적인 무드",
          en: "A gaze that holds more than it ever reveals",
          ja: "底が見えない目が印象的なムード",
        },
      },
      {
        name: { ko: "남궁민", en: "Joaquin Phoenix", ja: "堤真一" },
        note: {
          ko: "내면의 어둠이 자연스럽게 배어나는 무드",
          en: "Inner darkness that surfaces naturally without effort",
          ja: "内なる暗さが自然ににじみ出るムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "서예지", en: "Rooney Mara", ja: "満島ひかり" },
        note: {
          ko: "설명보다 여백이 더 강한 신비로운 무드",
          en: "More mystery in the silence than in any words",
          ja: "言葉より余白のほうが強い神秘的なムード",
        },
      },
      {
        name: { ko: "한소희", en: "Eva Green", ja: "蒼井優" },
        note: {
          ko: "차갑고 서늘한 신비감이 살아나는 무드",
          en: "Cool, eerie mystery that quietly lingers",
          ja: "冷たく薄ら寒い神秘感が生きるムード",
        },
      },
      {
        name: { ko: "이레", en: "Tilda Swinton", ja: "長澤まさみ" },
        note: {
          ko: "조용하고 어두운 존재감이 인상적인 무드",
          en: "Quiet, dark presence with a distinct impression",
          ja: "静かで暗い存在感が印象的なムード",
        },
      },
    ],
  },
  CHARISMATIC_INTENSE: {
    male: [
      {
        name: { ko: "황정민", en: "Denzel Washington", ja: "役所広司" },
        note: {
          ko: "강렬하고 폭발적인 존재감의 카리스마 무드",
          en: "Intense, explosive presence with unstoppable charisma",
          ja: "強烈で爆発的な存在感のカリスマムード",
        },
      },
      {
        name: { ko: "최민식", en: "Joaquin Phoenix", ja: "阿部寛" },
        note: {
          ko: "장면을 장악하는 압도적인 카리스마 무드",
          en: "Overwhelming charisma that takes full command of every scene",
          ja: "シーンを完全に支配する圧倒的なカリスマムード",
        },
      },
      {
        name: { ko: "송강호", en: "Christian Bale", ja: "松山ケンイチ" },
        note: {
          ko: "짧게 나와도 공기가 달라지는 무드",
          en: "The kind of presence that shifts the whole atmosphere",
          ja: "少し出るだけで空気が変わるムード",
        },
      },
    ],
    female: [
      {
        name: { ko: "김혜수", en: "Viola Davis", ja: "天海祐希" },
        note: {
          ko: "강렬하고 압도적인 카리스마로 장면을 지배하는 무드",
          en: "Intense, overpowering charisma that rules the screen",
          ja: "強烈で圧倒的なカリスマがスクリーンを支配するムード",
        },
      },
      {
        name: { ko: "나문희", en: "Meryl Streep", ja: "小池栄子" },
        note: {
          ko: "짧게 나와도 공기가 달라지는 존재감의 무드",
          en: "A presence that shifts the whole atmosphere with brief appearances",
          ja: "少し出るだけで空気が変わる存在感のムード",
        },
      },
      {
        name: { ko: "이미숙", en: "Cate Blanchett", ja: "大竹しのぶ" },
        note: {
          ko: "강렬한 눈빛과 카리스마로 장면을 장악하는 무드",
          en: "Intense gaze and charisma that seizes every scene",
          ja: "強烈な目線とカリスマがシーンを掌握するムード",
        },
      },
    ],
  },
};
