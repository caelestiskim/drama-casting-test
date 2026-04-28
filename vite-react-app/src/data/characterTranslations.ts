import type { Locale } from "@/lib/i18n";

type CharacterL10n = {
  name: string;
  title: string;
  shortDescription: string;
};

type GenreL10n = Record<string, string>;
type RoleL10n = Record<string, string>;

const characterTranslations: Record<
  "en" | "ja",
  Record<string, CharacterL10n>
> = {
  en: {
    "violent-crimes-detective": {
      name: "Violent Crimes Detective",
      title: "The one who leads from the front",
      shortDescription: "A action-driven detective who solves cases on the ground",
    },
    "villain-rival": {
      name: "Villain Rival",
      title: "The one who shifts the tension",
      shortDescription: "A figure who creates sharp conflict against the lead",
    },
    "noir-strategist": {
      name: "Noir Strategist",
      title: "The one who controls the scene in low tones",
      shortDescription: "A cold mastermind who designs the board from the shadows",
    },
    "cold-prosecutor": {
      name: "Cold Prosecutor",
      title: "The one whose judgment outlasts his words",
      shortDescription: "An elite prosecutor who dissects cases with logic and reason",
    },
    "chaebol-heir": {
      name: "Chaebol Heir",
      title: "The one with weight before glamour",
      shortDescription: "A corporate heir who carries both power and responsibility",
    },
    "cold-ceo": {
      name: "Cold CEO",
      title: "The one whose presence speaks louder than words",
      shortDescription: "A corporate leader with cold charisma and unshakeable authority",
    },
    "young-monarch": {
      name: "Young Monarch",
      title: "The one whose quiet decisions lead",
      shortDescription: "A young king who leads with resolve rather than words",
    },
    "secret-agent": {
      name: "Secret Agent",
      title: "The one with calm on the outside and purpose within",
      shortDescription: "A covert operative running missions behind a neutral exterior",
    },
    "chaebol-heiress": {
      name: "Chaebol Heiress",
      title: "The one who is elegant but unshakeable",
      shortDescription: "A corporate heiress who carries power with quiet grace",
    },
    "cold-ceo-female": {
      name: "Cold Female CEO",
      title: "The one who takes charge in a low tone",
      shortDescription: "A corporate leader whose cold charisma commands every room",
    },
    "young-queen": {
      name: "Young Queen",
      title: "The one who is gentle but full of gravity",
      shortDescription: "A young queen who rules with quiet strength",
    },
    "palace-strategist": {
      name: "Palace Strategist",
      title: "The one who moves the board from behind",
      shortDescription: "A trusted advisor who shapes the court from the shadows",
    },
    "romance-lead": {
      name: "Romance Lead",
      title: "The one at the center of every feeling",
      shortDescription: "A lead who makes emotional scenes unforgettable",
    },
    "romance-second-lead-male": {
      name: "Male Second Lead",
      title: "The one who lingers after he leaves",
      shortDescription: "A second lead whose quiet presence stays in the memory",
    },
    "romance-second-lead-female": {
      name: "Female Second Lead",
      title: "The one who lingers after she leaves",
      shortDescription: "A second lead whose quiet presence deepens the story",
    },
    "best-friend": {
      name: "Trusty Best Friend",
      title: "The one who makes every scene better",
      shortDescription: "A loyal friend who lights up the scenes they share",
    },
    "cafe-owner": {
      name: "Indie Café Owner",
      title: "The one who holds the mood of the scene",
      shortDescription: "A quietly charming figure who anchors the atmosphere",
    },
    "campus-romance-lead": {
      name: "Coming-of-Age Lead",
      title: "The one who starts light and grows heavier",
      shortDescription: "A youth drama lead whose brightness hides an unfolding story",
    },
    "band-leader": {
      name: "Youth Band Senior",
      title: "The one whose entrance sets the rhythm",
      shortDescription: "A band senior whose energy lifts every scene",
    },
    "genius-hacker": {
      name: "Genius Hacker",
      title: "The one who changes the game from the shadows",
      shortDescription: "A quiet disruptor who flips the board without being seen",
    },
    "genius-profiler": {
      name: "Genius Profiler",
      title: "The one who has already read it all",
      shortDescription: "A profiler who observes more than they let on",
    },
    "investigative-reporter": {
      name: "Investigative Reporter",
      title: "The one who never lets go once they start",
      shortDescription: "A tenacious journalist who digs until the truth comes out",
    },
    "mystery-writer": {
      name: "Mystery Writer",
      title: "The one you can never fully read",
      shortDescription: "A figure who reveals just enough to keep you wondering",
    },
    "medical-elite-doctor": {
      name: "Elite Doctor",
      title: "The one whose calm carries trust",
      shortDescription: "A top-tier doctor who stays steady under any pressure",
    },
    "warm-lawyer": {
      name: "Warm Local Lawyer",
      title: "The one who leads with people, not arguments",
      shortDescription: "A lawyer who puts heart before strategy",
    },
    "fantasy-advisor": {
      name: "Fantasy World Advisor",
      title: "The one who quietly shifts the shape of the world",
      shortDescription: "A mysterious advisor whose subtle influence changes everything",
    },
    "political-aide": {
      name: "Ambitious Political Aide",
      title: "The one who moves the flow from one step behind",
      shortDescription: "A sharp aide who designs the political current from behind the scenes",
    },
    "mysterious-helper": {
      name: "Mysterious Helper",
      title: "The one who helps but never fully reveals",
      shortDescription: "A kind yet enigmatic figure who leaves questions in every scene",
    },
    "revenge-mastermind": {
      name: "Revenge Mastermind",
      title: "The one carrying a story you can feel",
      shortDescription: "A character who drives the plot with deep-seated resolve",
    },
    "suspense-suspect": {
      name: "Key Suspect",
      title: "The one you keep second-guessing",
      shortDescription: "A figure who stays ambiguous just long enough to stay compelling",
    },
  },
  ja: {
    "violent-crimes-detective": {
      name: "強行犯捜査刑事",
      title: "正面から突き進む人物",
      shortDescription: "現場を飛び回り事件を解決する行動派の刑事",
    },
    "villain-rival": {
      name: "悪役ライバル",
      title: "緊張感を変える人物",
      shortDescription: "主人公と激しく対立し、場の空気を変える人物",
    },
    "noir-strategist": {
      name: "ノワール組織の戦略家",
      title: "低いトーンで場を握る人物",
      shortDescription: "闇の中で盤面を設計する冷徹な戦略家",
    },
    "cold-prosecutor": {
      name: "冷静な検事",
      title: "言葉より判断が先に残る人物",
      shortDescription: "論理と理性で事件を追うエリート検事",
    },
    "chaebol-heir": {
      name: "財閥の後継者",
      title: "華やかさより重みが先に見える人物",
      shortDescription: "権力と責任を同時に担う企業の後継者",
    },
    "cold-ceo": {
      name: "クールなCEO",
      title: "存在感が言葉より先に来る人物",
      shortDescription: "冷たいカリスマを持つ企業リーダー",
    },
    "young-monarch": {
      name: "時代劇の若き君主",
      title: "静かな決断が先に感じられる人物",
      shortDescription: "言葉よりも決断で国を率いる若い王",
    },
    "secret-agent": {
      name: "秘密エージェント",
      title: "穏やかに見えて秘密を持つ人物",
      shortDescription: "素性を隠しながら任務を遂行する諜報員",
    },
    "chaebol-heiress": {
      name: "財閥の令嬢",
      title: "優雅でも容易に揺らがない人物",
      shortDescription: "権力と責任を同時に担う企業の後継者",
    },
    "cold-ceo-female": {
      name: "クールな女性CEO",
      title: "低いトーンで場を仕切る人物",
      shortDescription: "冷静なカリスマで場を支配する企業リーダー",
    },
    "young-queen": {
      name: "時代劇の若き女君主",
      title: "柔らかく見えて重みがある人物",
      shortDescription: "静かな強さで国を治める若い女王",
    },
    "palace-strategist": {
      name: "宮廷の策士",
      title: "盤面を読む側に回る人物",
      shortDescription: "影から宮廷の流れを操る信頼の参謀",
    },
    "romance-lead": {
      name: "ロマンス主人公",
      title: "感情線の中心にいる人物",
      shortDescription: "感情的な場面を忘れられなくする主役",
    },
    "romance-second-lead-male": {
      name: "男性サブ主人公",
      title: "去った後に残る人物",
      shortDescription: "静かな存在感で記憶に残るサブ主人公",
    },
    "romance-second-lead-female": {
      name: "女性サブ主人公",
      title: "去った後に残る人物",
      shortDescription: "静かな存在感で物語を深めるサブ主人公",
    },
    "best-friend": {
      name: "頼れる親友",
      title: "そばにいるほど場が輝く人物",
      shortDescription: "共に登場するシーンを明るくする忠実な友人",
    },
    "cafe-owner": {
      name: "感性カフェのオーナー",
      title: "雰囲気で場を引き止める人物",
      shortDescription: "静かな魅力で場の空気を作る人物",
    },
    "campus-romance-lead": {
      name: "青春成長型主人公",
      title: "軽く始まって徐々に深まる人物",
      shortDescription: "明るい外見の裏に展開する物語を持つ青春ドラマの主人公",
    },
    "band-leader": {
      name: "青春バンドの先輩",
      title: "登場だけでリズムが生まれる人物",
      shortDescription: "エネルギーでシーンを盛り上げるバンドの先輩",
    },
    "genius-hacker": {
      name: "天才ハッカー",
      title: "見えない場所から盤面を変える人物",
      shortDescription: "目立たずして状況を一変させる静かな存在",
    },
    "genius-profiler": {
      name: "天才プロファイラー",
      title: "すでに全部見ている人物",
      shortDescription: "言葉より先に観察が走る分析のプロ",
    },
    "investigative-reporter": {
      name: "調査報道記者",
      title: "始めたら離さない人物",
      shortDescription: "真実が出るまで掘り続ける粘り強い記者",
    },
    "mystery-writer": {
      name: "ミステリー作家",
      title: "最後まで読み切れない人物",
      shortDescription: "ちょうどよく隠して、続きを気にさせる人物",
    },
    "medical-elite-doctor": {
      name: "エリート医師",
      title: "落ち着きが信頼を生む人物",
      shortDescription: "どんな状況でも揺れない一流の医師",
    },
    "warm-lawyer": {
      name: "温かい町の弁護士",
      title: "論理より人を先に見る人物",
      shortDescription: "戦略より心を動かす場面が似合う弁護士",
    },
    "fantasy-advisor": {
      name: "ファンタジー世界の魔法参謀",
      title: "静かに世界の形を変える人物",
      shortDescription: "さりげない影響力で全てを変える神秘的な参謀",
    },
    "political-aide": {
      name: "野心ある政治補佐官",
      title: "一歩後ろから流れを動かす人物",
      shortDescription: "舞台裏で政治の流れを設計する切れ者",
    },
    "mysterious-helper": {
      name: "秘密を持つ協力者",
      title: "助けるけど全部は見せない人物",
      shortDescription: "親切だがすべては見せない謎めいた人物",
    },
    "revenge-mastermind": {
      name: "復讐劇の主人公",
      title: "深い物語を内に持つ人物",
      shortDescription: "強い決意で物語を動かすキャラクター",
    },
    "suspense-suspect": {
      name: "サスペンスの核心人物",
      title: "最後まで判断できない人物",
      shortDescription: "最後まで善悪を判断させない絶妙な人物",
    },
  },
};

export const genreTranslations: Record<"en" | "ja", GenreL10n> = {
  en: {
    법정: "Legal",
    범죄: "Crime",
    드라마: "Drama",
    로맨스: "Romance",
    스릴러: "Thriller",
    액션: "Action",
    청춘: "Youth",
    사극: "Historical",
    느와르: "Noir",
    메디컬: "Medical",
    미스터리: "Mystery",
    판타지: "Fantasy",
  },
  ja: {
    법정: "法廷",
    범죄: "犯罪",
    드라마: "ドラマ",
    로맨스: "ロマンス",
    스릴러: "スリラー",
    액션: "アクション",
    청춘: "青春",
    사극: "時代劇",
    느와르: "ノワール",
    메디컬: "医療",
    미스터리: "ミステリー",
    판타지: "ファンタジー",
  },
};

export const roleTypeTranslations: Record<"en" | "ja", RoleL10n> = {
  en: {
    주인공: "Lead",
    서브: "Support",
    조력자: "Ally",
    라이벌: "Rival",
  },
  ja: {
    주인공: "主役",
    서브: "サブ",
    조력자: "協力者",
    라이벌: "ライバル",
  },
};

export function getCharacterL10n(
  characterId: string,
  originalName: string,
  originalTitle: string,
  originalDesc: string,
  locale: Locale,
): CharacterL10n {
  if (locale === "ko") {
    return { name: originalName, title: originalTitle, shortDescription: originalDesc };
  }
  return (
    characterTranslations[locale]?.[characterId] ?? {
      name: originalName,
      title: originalTitle,
      shortDescription: originalDesc,
    }
  );
}

export function getGenreL10n(genre: string, locale: Locale): string {
  if (locale === "ko") return genre;
  return genreTranslations[locale]?.[genre] ?? genre;
}

export function getRoleTypeL10n(roleType: string, locale: Locale): string {
  if (locale === "ko") return roleType;
  return roleTypeTranslations[locale]?.[roleType] ?? roleType;
}
