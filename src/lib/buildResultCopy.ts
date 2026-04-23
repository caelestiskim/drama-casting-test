import type { Locale } from "@/lib/i18n";
import type { FaceType } from "@/data/characters";
import type { CastingResult, ResultCopy } from "@/types/result";

type CharacterCopyPreset = {
  heroSummary: string;
  oneLiner: string;
  intro: string;
  share: string;
  premiumDetail: string;
};

type LocalizedPresets = Record<"ko" | "en" | "ja", CharacterCopyPreset>;

const copyPresets: Record<string, LocalizedPresets> = {
  "cold-prosecutor": {
    ko: {
      heroSummary: "차분하게 장면을 끌고 가는 역할이 잘 어울려요.",
      oneLiner: "차갑게 밀어붙이기보다, 끝까지 침착하게 판을 읽는 쪽입니다.",
      intro: "말이 많지 않아도 존재감이 남습니다. 조용한 장면에서도 중심이 쉽게 흐려지지 않습니다.",
      share: "오늘의 메인 캐릭터는 냉철한 검사. 조용한데 오래 남는 쪽.",
      premiumDetail: "논리와 감정의 경계에서 무게 있게 중심을 잡는 역할입니다. 흔들림 없이 판단하는 모습이 자연스럽고, 그 침착함 안에 감춰진 온도가 한 장면씩 드러나는 방식이 잘 맞습니다.",
    },
    en: {
      heroSummary: "A role that calls for calm authority fits naturally.",
      oneLiner: "Not one to push hard — more the type who reads the room till the very end.",
      intro: "Presence without noise. Even in quiet scenes, the center holds.",
      share: "Today's character: Cold Prosecutor. Quiet, but the kind that stays with you.",
      premiumDetail: "A role that holds its ground at the boundary between logic and emotion. The steady, unshaken judgment feels natural, and the warmth hidden beneath that composure surfaces one scene at a time.",
    },
    ja: {
      heroSummary: "落ち着いた権威が似合う役柄です。",
      oneLiner: "強引に押すより、最後まで冷静に状況を読む側です。",
      intro: "多くを語らなくても存在感が残ります。静かなシーンでも中心が揺れません。",
      share: "今日のメインキャラは冷静な検事。静かなのにずっと記憶に残るタイプ。",
      premiumDetail: "論理と感情の境界で重みを持って中心を保つ役柄です。揺るぎなく判断する姿が自然で、その冷静さの中に隠された温度が一場面ずつ現れる方式がよく合います。",
    },
  },
  "violent-crimes-detective": {
    ko: {
      heroSummary: "정적인 장면보다 힘 있게 밀고 가는 역할이 잘 어울려요.",
      oneLiner: "가만히 있기보다 직접 부딪히는 장면이 더 잘 어울립니다.",
      intro: "등장하자마자 속도가 붙는 타입입니다. 정리된 장면보다 현장의 온도가 먼저 떠오릅니다.",
      share: "오늘의 메인 캐릭터는 강력반 형사. 들어오자마자 장면이 살아나는 타입.",
      premiumDetail: "뛰어들기 전에 이미 몸이 먼저 반응하는 타입입니다. 거친 현장이 배경이어도 흔들리지 않고 중심을 잡는 모습 — 그게 이 역할을 살리는 힘입니다.",
    },
    en: {
      heroSummary: "A role with energy and forward momentum fits best.",
      oneLiner: "More the type to charge in than to stand back and watch.",
      intro: "The pace picks up the moment they walk in. Raw heat, not polished order.",
      share: "Today's character: Violent Crimes Detective. The scene comes alive the second they enter.",
      premiumDetail: "The body responds before the mind decides to move. Even in rough, chaotic settings, the grounded composure holds — and that's what brings this role to life.",
    },
    ja: {
      heroSummary: "エネルギーと勢いのある役柄が自然に似合います。",
      oneLiner: "見守るより飛び込む側です。",
      intro: "登場した瞬間にスピードが生まれるタイプ。整った場面より現場の熱が似合います。",
      share: "今日のメインキャラは強行犯刑事。入った瞬間にシーンが動き出すタイプ。",
      premiumDetail: "飛び込む前にすでに体が先に反応するタイプです。荒々しい現場が背景でも揺れずに中心を保つ姿 — それがこの役柄を活かす力です。",
    },
  },
  "chaebol-heir": {
    ko: {
      heroSummary: "가볍기보다 묵직한 존재감이 먼저 보이는 타입이에요.",
      oneLiner: "화려하게 흔들기보다, 묵직하게 자리를 지키는 쪽입니다.",
      intro: "쉽게 풀어 보이지는 않지만 시선이 갑니다. 말수보다 분위기가 먼저 일을 합니다.",
      share: "오늘의 메인 캐릭터는 재벌가 후계자. 조용한데 존재감은 확실한 쪽.",
      premiumDetail: "부유함보다 그 무게를 짊어진 인물로 더 빛납니다. 화려한 배경 대신 고독함과 책임감이 겹쳐 보이는 장면에서 진가가 드러납니다. 쉽게 가까워지지 않아도 끌리는 이유가 있는 쪽입니다.",
    },
    en: {
      heroSummary: "Weight before flash — that kind of presence.",
      oneLiner: "Not the type to dazzle. More the type to hold their ground, quietly.",
      intro: "Hard to read at first glance, but the gaze follows. The mood does the talking.",
      share: "Today's character: Chaebol Heir. Quiet, but the presence is unmistakable.",
      premiumDetail: "Shines more as someone bearing the weight of wealth than reveling in it. The true quality shows in scenes where solitude and responsibility overlap rather than a lavish backdrop. The kind you're drawn to even without easy access.",
    },
    ja: {
      heroSummary: "華やかさより重厚な存在感が先に感じられるタイプです。",
      oneLiner: "派手に揺さぶるより、どっしりと場を守る側です。",
      intro: "すぐには読めないのに、目が引き寄せられます。言葉より雰囲気が先に動きます。",
      share: "今日のメインキャラは財閥の後継者。静かなのに存在感は確かなタイプ。",
      premiumDetail: "富よりもその重みを背負った人物として輝きます。華やかな背景よりも、孤独と責任感が重なって見えるシーンで真価が現れます。簡単には近づけなくても引き付けられる理由がある側です。",
    },
  },
  "chaebol-heiress": {
    ko: {
      heroSummary: "우아하지만 단단한 중심이 먼저 보이는 타입이에요.",
      oneLiner: "화려하게 꾸미기보다, 차분하게 중심을 잡는 쪽입니다.",
      intro: "한 장면 안에서도 쉽게 흐려지지 않습니다. 부드러워 보여도 무게감이 먼저 남습니다.",
      share: "오늘의 메인 캐릭터는 재벌가 상속녀. 우아한데 존재감은 확실한 쪽.",
      premiumDetail: "우아함 안에 결단력이 보이는 타입입니다. 부드러운 방식으로 장면을 이끌어 가는 힘이 자연스럽고, 화려한 배경 없이도 존재감이 먼저 전해지는 쪽입니다.",
    },
    en: {
      heroSummary: "Elegant, but with a solid core that shows first.",
      oneLiner: "Less about the glamour, more about the quiet anchor.",
      intro: "Even in a single scene, nothing blurs. Soft on the surface, weighty at the center.",
      share: "Today's character: Chaebol Heiress. Graceful, but her presence is undeniable.",
      premiumDetail: "Decisiveness shows through the elegance. The ability to guide a scene in a soft manner feels natural, and the presence comes through first even without a glamorous backdrop.",
    },
    ja: {
      heroSummary: "優雅でありながら芯の強さが先に感じられるタイプです。",
      oneLiner: "華やかに見せるより、静かに中心を保つ側です。",
      intro: "一場面の中でも簡単にぼやけません。柔らかく見えても重みが先に残ります。",
      share: "今日のメインキャラは財閥の令嬢。優雅なのに存在感は確かなタイプ。",
      premiumDetail: "優雅さの中に決断力が見えるタイプです。柔らかい方法でシーンを引っ張る力が自然で、華やかな背景なしでも存在感が先に伝わる側です。",
    },
  },
  "romance-lead": {
    ko: {
      heroSummary: "감정선이 중요한 장면의 중심에 잘 어울려요.",
      oneLiner: "가볍게 스쳐 지나가기보다, 관계의 중심에 남는 타입입니다.",
      intro: "달콤하게만 흐르지 않습니다. 감정선이 붙는 장면에서 더 오래 기억됩니다.",
      share: "오늘의 메인 캐릭터는 로맨스 주인공. 한 장면보다 관계성이 먼저 떠오르는 타입.",
      premiumDetail: "관계 안에서 감정선을 이끌어 가는 힘이 자연스럽습니다. 극적인 장치 없이도 두 사람 사이의 공기를 바꾸는 역할에 잘 어울립니다. 달콤하게만 흐르지 않아서 오히려 진하게 남는 타입입니다.",
    },
    en: {
      heroSummary: "Made for scenes where the emotional current matters most.",
      oneLiner: "Not one to pass through lightly — more the type that stays at the center of a bond.",
      intro: "Not just sweetness. The scenes that carry emotion are where they're remembered longest.",
      share: "Today's character: Romance Lead. Relationships come to mind before any single scene.",
      premiumDetail: "Leading the emotional current within a relationship feels natural. Well suited to the role that shifts the air between two people without dramatic devices. The kind that stays with you precisely because it doesn't just flow sweet.",
    },
    ja: {
      heroSummary: "感情線が重要なシーンの中心にぴったりです。",
      oneLiner: "軽く通り過ぎるより、関係性の中心に残るタイプです。",
      intro: "甘いだけでは終わりません。感情が乗るシーンで一番長く記憶されます。",
      share: "今日のメインキャラはロマンス主人公。一場面より関係性が先に浮かぶタイプ。",
      premiumDetail: "関係の中で感情線を引っ張る力が自然です。劇的な装置なしでも二人の間の空気を変える役柄によく合います。甘いだけで流れないからこそ、濃く残るタイプです。",
    },
  },
  "romance-second-lead-male": {
    ko: {
      heroSummary: "앞에 서기보다 여운을 남기는 역할이 잘 어울려요.",
      oneLiner: "앞에 서기보다, 옆에서 분위기를 더 깊게 만드는 쪽입니다.",
      intro: "지나가듯 등장해도 여운이 남습니다. 가볍지 않고 은근하게 서사를 끌어당깁니다.",
      share: "오늘의 캐스팅 결과는 로맨스 서브남. 지나간 뒤가 더 기억나는 쪽.",
      premiumDetail: "주인공보다 이야기가 끝난 뒤에 더 생각나는 역할입니다. 앞에 서지 않아도 분위기를 더 풍성하게 만드는 존재감 — 은근하게, 서사 안에서 자기 자리를 찾아가는 쪽입니다.",
    },
    en: {
      heroSummary: "Not the lead — but the one whose absence is most felt.",
      oneLiner: "Doesn't need the spotlight to deepen the atmosphere around him.",
      intro: "Even a passing appearance leaves something. Quiet, but narratively magnetic.",
      share: "Today's cast: Male Second Lead. The one you remember more after he's gone.",
      premiumDetail: "The role you think about more after the story ends than the lead. A presence that enriches the atmosphere without stepping to the front — quietly finding its own place within the narrative.",
    },
    ja: {
      heroSummary: "前に出るより余韻を残す役柄が似合います。",
      oneLiner: "前に立つより、横で雰囲気をより深くする側です。",
      intro: "通り過ぎるように登場しても余韻が残ります。さりげなく物語を引き寄せます。",
      share: "今日のキャスト：男性サブ主人公。去った後の方が記憶に残るタイプ。",
      premiumDetail: "主人公よりも物語が終わった後により思い出される役柄です。前に出なくても雰囲気をより豊かにする存在感 — さりげなく、物語の中で自分の場所を見つけていく側です。",
    },
  },
  "romance-second-lead-female": {
    ko: {
      heroSummary: "앞에 서기보다 여운을 남기는 역할이 잘 어울려요.",
      oneLiner: "앞에 서기보다, 옆에서 분위기를 더 깊게 만드는 쪽입니다.",
      intro: "지나가듯 등장해도 여운이 남습니다. 가볍지 않고 은근하게 서사를 끌어당깁니다.",
      share: "오늘의 캐스팅 결과는 로맨스 서브녀. 지나간 뒤가 더 기억나는 쪽.",
      premiumDetail: "주인공보다 이야기가 끝난 뒤에 더 생각나는 역할입니다. 앞에 서지 않아도 분위기를 더 풍성하게 만드는 존재감 — 은근하게, 서사 안에서 자기 자리를 찾아가는 쪽입니다.",
    },
    en: {
      heroSummary: "Not the lead — but the one whose absence is most felt.",
      oneLiner: "Doesn't need the spotlight to deepen the atmosphere around her.",
      intro: "Even a passing appearance leaves something. Quiet, but narratively magnetic.",
      share: "Today's cast: Female Second Lead. The one you remember more after she's gone.",
      premiumDetail: "The role you think about more after the story ends than the lead. A presence that enriches the atmosphere without stepping to the front — quietly finding its own place within the narrative.",
    },
    ja: {
      heroSummary: "前に出るより余韻を残す役柄が似合います。",
      oneLiner: "前に立つより、横で雰囲気をより深くする側です。",
      intro: "通り過ぎるように登場しても余韻が残ります。さりげなく物語を引き寄せます。",
      share: "今日のキャスト：女性サブ主人公。去った後の方が記憶に残るタイプ。",
      premiumDetail: "主人公よりも物語が終わった後により思い出される役柄です。前に出なくても雰囲気をより豊かにする存在感 — さりげなく、物語の中で自分の場所を見つけていく側です。",
    },
  },
  "genius-hacker": {
    ko: {
      heroSummary: "겉보다 숨은 존재감이 더 강하게 느껴지는 타입이에요.",
      oneLiner: "정면으로 드러나기보다, 보이지 않는 곳에서 판을 바꾸는 느낌입니다.",
      intro: "크게 튀지 않아도 장면이 또렷해집니다. 화면 밖 이야기까지 상상하게 만드는 쪽입니다.",
      share: "오늘의 메인 캐릭터는 천재 해커. 조용한데 판이 바뀌는 느낌.",
      premiumDetail: "전면에 나서지 않아도 판을 바꾸는 역할입니다. 보이지 않는 곳에서 조용히 결정적인 일을 해내는 존재감이 이 캐릭터의 매력입니다. 평범해 보이는 겉모습 안에 날카로운 집중력이 숨어있는 타입입니다.",
    },
    en: {
      heroSummary: "The hidden presence underneath is stronger than what shows.",
      oneLiner: "Not one to surface openly — more the type who shifts things from the unseen.",
      intro: "Doesn't need to stand out for the scene to sharpen. You start imagining the story off-screen.",
      share: "Today's character: Genius Hacker. Quiet, but the board changes when they're in it.",
      premiumDetail: "Changes the board without stepping to the front. The appeal of this character lies in a presence that quietly achieves decisive things from where no one can see. A type with sharp focus hidden beneath an ordinary exterior.",
    },
    ja: {
      heroSummary: "表に出る存在感より、隠れた力がより強く感じられるタイプです。",
      oneLiner: "正面に出るより、見えない場所から盤面を変える感じです。",
      intro: "目立たなくてもシーンが鮮明になります。画面外の話まで想像させます。",
      share: "今日のメインキャラは天才ハッカー。静かなのに盤面が変わる感じ。",
      premiumDetail: "前に出なくても盤面を変える役柄です。見えない場所で静かに決定的なことを成し遂げる存在感がこのキャラクターの魅力です。平凡に見える外見の中に鋭い集中力が隠れているタイプです。",
    },
  },
  "secret-agent": {
    ko: {
      heroSummary: "비밀을 품은 주인공 같은 분위기가 잘 어울려요.",
      oneLiner: "평온해 보여도 어딘가 비밀이 있어 보이는 쪽입니다.",
      intro: "선이 또렷하고, 장면의 공기를 단번에 바꾸는 힘이 있습니다. 한 번 들어오면 계속 시선이 갑니다.",
      share: "오늘의 캐스팅 결과는 비밀요원. 평온한데 숨긴 게 있어 보이는 쪽.",
      premiumDetail: "드러내지 않을수록 궁금해지는 역할입니다. 평온한 표면 아래 무언가를 품고 있다는 인상이 자연스럽게 오고, 그게 이 캐릭터의 긴장을 만들어냅니다.",
    },
    en: {
      heroSummary: "The vibe of a lead who is hiding something fits naturally.",
      oneLiner: "Calm on the surface, but you can sense there's more underneath.",
      intro: "Sharp lines, and the ability to shift the air of a scene in an instant. Once they enter, the eye follows.",
      share: "Today's cast: Secret Agent. Calm exterior, something clearly kept inside.",
      premiumDetail: "The less that's revealed, the more curiosity builds. The impression that something is held beneath the calm surface comes naturally, and that is what creates the tension of this character.",
    },
    ja: {
      heroSummary: "秘密を持つ主人公の雰囲気が自然に似合います。",
      oneLiner: "穏やかに見えても、どこか隠していそうな側です。",
      intro: "輪郭がはっきりしていて、シーンの空気を一瞬で変える力があります。入ると目が離せません。",
      share: "今日のキャスト：秘密エージェント。穏やかなのに何かを隠しているように見えるタイプ。",
      premiumDetail: "明かさないほど気になる役柄です。穏やかな表面の下に何かを抱えているという印象が自然に伝わり、それがこのキャラクターの緊張を生み出します。",
    },
  },
  "investigative-reporter": {
    ko: {
      heroSummary: "조용하지만 끝까지 밀고 가는 역할이 잘 맞아요.",
      oneLiner: "가볍게 넘기지 않고 끝까지 이유를 찾는 쪽입니다.",
      intro: "차분하지만 물러나지는 않습니다. 한 번 꽂히면 쉽게 놓지 않을 것 같은 인상입니다.",
      share: "오늘의 메인 캐릭터는 탐사보도 기자. 조용히 끝까지 파고드는 타입.",
      premiumDetail: "포기하지 않는 이유가 분노보다 신념에 가까운 쪽입니다. 조용히 끝까지 파고드는 집요함이 자연스럽고, 소리치지 않아도 설득력이 있는 타입입니다.",
    },
    en: {
      heroSummary: "Quiet but unstoppable — that kind of role is the fit.",
      oneLiner: "Not one to let things slide. Keeps looking for the reason until it's found.",
      intro: "Calm, but doesn't step back. Once something catches their attention, it's hard to shake them off.",
      share: "Today's character: Investigative Reporter. Quietly digs until the end.",
      premiumDetail: "The reason for not giving up is closer to conviction than anger. The quiet, persistent digging feels natural, and the persuasion carries weight even without raising the voice.",
    },
    ja: {
      heroSummary: "静かでも最後まで押し通す役柄がぴったりです。",
      oneLiner: "軽く流さず、最後まで理由を探す側です。",
      intro: "落ち着いていても引きません。一度引っかかったら簡単には離さない印象です。",
      share: "今日のメインキャラは調査報道記者。静かに最後まで掘り続けるタイプ。",
      premiumDetail: "諦めない理由が怒りより信念に近い側です。静かに最後まで掘り下げる執念が自然で、声を上げなくても説得力があるタイプです。",
    },
  },
  "genius-profiler": {
    ko: {
      heroSummary: "말보다 관찰이 먼저 떠오르는 캐릭터에 잘 어울려요.",
      oneLiner: "크게 흔들리지 않아도 이미 다 보고 있는 느낌이 있습니다.",
      intro: "감정으로 먼저 나서기보다 상황을 읽는 쪽에 가깝습니다. 말보다 생각이 먼저 보입니다.",
      share: "오늘의 캐스팅 결과는 천재 프로파일러. 차분한데 다 읽고 있을 것 같은 쪽.",
      premiumDetail: "모르는 척하면서 이미 다 읽고 있는 쪽입니다. 분석이 일이기 전에, 사람을 읽는 눈빛이 먼저 인상에 남습니다. 감정으로 반응하기보다 조용히 판단하는 모습이 이 역할에서 더 강하게 작동합니다.",
    },
    en: {
      heroSummary: "A character known for observation over speech — a natural fit.",
      oneLiner: "No dramatic reaction needed. The sense that they've already seen it all is enough.",
      intro: "Less about leading with feeling, more about reading the room. Thought shows before words do.",
      share: "Today's cast: Genius Profiler. Calm, but you sense they've already read everything.",
      premiumDetail: "Already reading everything while pretending not to know. Before analysis becomes a job, the gaze that reads people makes the first impression. Quietly judging rather than reacting with emotion works more powerfully in this role.",
    },
    ja: {
      heroSummary: "言葉より観察が先に来るキャラクターに自然と似合います。",
      oneLiner: "大きく揺れなくても、もう全部見ている感じがあります。",
      intro: "感情で先に出るより状況を読む側に近いです。言葉より考えが先に見えます。",
      share: "今日のキャスト：天才プロファイラー。落ち着いているのに全部読んでいそうなタイプ。",
      premiumDetail: "知らないふりをしながらすでに全部読んでいる側です。分析が仕事になる前に、人を読む眼差しが先に印象に残ります。感情で反応するより静かに判断する姿がこの役柄でより強く機能します。",
    },
  },
  "villain-rival": {
    ko: {
      heroSummary: "짧게 나와도 분위기를 바꾸는 역할이 잘 어울려요.",
      oneLiner: "정면으로 부딪히지 않아도 긴장을 만드는 타입입니다.",
      intro: "크게 튀지 않는데도 공기가 달라집니다. 선한 역할보다 서늘한 대립각이 더 자연스럽습니다.",
      share: "오늘의 메인 캐릭터는 악역 라이벌. 조용한데 공기가 달라지는 타입.",
      premiumDetail: "단순히 적대적인 게 아니라, 장면마다 긴장의 밀도를 높이는 역할입니다. 거칠게 드러내지 않아도 분위기 자체가 달라지는 존재감 — 그게 이 캐릭터가 기억에 남는 이유입니다.",
    },
    en: {
      heroSummary: "Even a brief appearance shifts the entire atmosphere.",
      oneLiner: "Doesn't need a direct confrontation to build tension.",
      intro: "The air changes without any obvious effort. A cool edge of opposition feels more natural than warmth.",
      share: "Today's character: Villain Rival. Quiet entrance, but the whole vibe shifts.",
      premiumDetail: "Not simply antagonistic — this is a role that raises the density of tension with each scene. A presence that changes the atmosphere itself without forcing anything raw — that's why this character stays in memory.",
    },
    ja: {
      heroSummary: "短く登場するだけで雰囲気を変える役柄が似合います。",
      oneLiner: "正面からぶつからなくても緊張感を生むタイプです。",
      intro: "目立たなくても空気が変わります。善役より冷えた対立の方が自然です。",
      share: "今日のメインキャラは悪役ライバル。静かなのに空気が変わるタイプ。",
      premiumDetail: "単に敵対的なのではなく、シーンごとに緊張の密度を高める役柄です。荒々しく出さなくても雰囲気自体が変わる存在感 — それがこのキャラクターが記憶に残る理由です。",
    },
  },
  "best-friend": {
    ko: {
      heroSummary: "주인공 옆에서 더 빛나는 역할이 잘 어울려요.",
      oneLiner: "앞에서 끌고 가기보다, 옆에서 장면을 더 좋게 만드는 쪽입니다.",
      intro: "편하게 보이지만 그냥 스쳐 지나가지는 않습니다. 붙어 있을수록 장면이 살아나는 타입입니다.",
      share: "오늘의 결과는 주인공의 믿음직한 친구. 곁에 둘수록 더 빛나는 타입.",
      premiumDetail: "장면의 중심은 아니지만, 없으면 이야기 전체가 달라지는 인물입니다. 편안함 안에 든든함이 섞인 존재감이 이 역할에 잘 맞습니다. 붙어 있을수록 장면이 살아나는 타입입니다.",
    },
    en: {
      heroSummary: "Shines brightest right next to the lead.",
      oneLiner: "Not the one pulling ahead — the one who makes the scene better just by being there.",
      intro: "Easy to be around, but never forgettable. The more they appear, the more the scene comes alive.",
      share: "Today's cast: Trusty Best Friend. The type that makes everything brighter just by being close.",
      premiumDetail: "Not the center of the scene, but the story changes entirely without them. A presence that mixes comfort with reliability fits this role well. The type where every scene comes more alive the more they're in it.",
    },
    ja: {
      heroSummary: "主人公の隣にいるときが一番輝く役柄です。",
      oneLiner: "前に引っ張るより、横でシーンをよりよくする側です。",
      intro: "気楽に見えても通り過ぎません。一緒にいるほどシーンが生き生きしてくるタイプです。",
      share: "今日のキャスト：頼れる親友。そばにいるほど輝くタイプ。",
      premiumDetail: "シーンの中心ではないが、いないと物語全体が変わってしまう人物です。穏やかさの中に頼もしさが混じった存在感がこの役柄によく合います。一緒にいるほどシーンが生き生きしてくるタイプです。",
    },
  },
  "campus-romance-lead": {
    ko: {
      heroSummary: "가볍게 시작해서 갈수록 깊어지는 역할이 잘 맞아요.",
      oneLiner: "처음엔 밝아 보이지만, 이야기가 쌓일수록 다른 무게가 느껴지는 타입입니다.",
      intro: "풋풋함만 있는 쪽은 아닙니다. 가벼운 첫 장면에서도 은근한 서사가 따라붙습니다.",
      share: "오늘의 메인 캐릭터는 청춘 성장형 주인공. 가볍게 시작해서 갈수록 무게가 생기는 쪽.",
      premiumDetail: "처음엔 눈에 잘 안 들어오는데, 어느 순간부터 계속 신경 쓰이는 타입입니다. 밝고 친근한 인상 뒤에 아직 꺼내지 않은 이야기가 있는 것처럼 느껴지고 — 그 여지가 이 역할을 오래 기억하게 만드는 힘입니다.",
    },
    en: {
      heroSummary: "Starts light and grows heavier — that arc fits naturally.",
      oneLiner: "Bright at first, but something deeper surfaces as the story builds.",
      intro: "More than just fresh-faced. Even the lightest first scenes carry a quiet undercurrent.",
      share: "Today's character: Coming-of-Age Lead. Starts easy, ends with weight.",
      premiumDetail: "Hard to notice at first, then suddenly you can't stop thinking about them. Behind the bright, approachable impression there's a sense of something not yet said — and that space is what makes this role stay with you.",
    },
    ja: {
      heroSummary: "軽く始まって徐々に深まる役柄が自然に似合います。",
      oneLiner: "最初は明るく見えますが、物語が積み重なるほど別の重みが感じられるタイプです。",
      intro: "初々しさだけではありません。軽い最初のシーンでも、さりげない物語がついてきます。",
      share: "今日のメインキャラは青春成長型主人公。軽く始まって徐々に重みが出るタイプ。",
      premiumDetail: "最初はなかなか目に入らないのに、ある瞬間からずっと気になるタイプです。明るく親しみやすい印象の後ろに、まだ取り出していない物語があるように感じられ — その余地がこの役柄を長く記憶させる力です。",
    },
  },
  "band-leader": {
    ko: {
      heroSummary: "등장만으로 분위기를 끌어올리는 역할이 잘 어울려요.",
      oneLiner: "가만히 있어도 장면에 리듬이 생기는 타입입니다.",
      intro: "시선이 자연스럽게 중앙으로 모입니다. 복잡하게 꾸미지 않아도 에너지가 먼저 보입니다.",
      share: "오늘의 메인 캐릭터는 청춘물 밴드부 선배. 등장만으로 박자가 생기는 타입.",
      premiumDetail: "음악을 다루는 역할이기 전에, 에너지 자체가 장면을 이끄는 인물입니다. 화려하지 않아도 시선이 먼저 가는 쪽이고, 복잡한 감정보다 직관적인 존재감으로 무리 안에서 자연스럽게 중심이 됩니다.",
    },
    en: {
      heroSummary: "An entrance alone is enough to lift the whole mood.",
      oneLiner: "Even standing still, they bring rhythm to the scene.",
      intro: "Eyes naturally find the center. No effort needed — the energy announces itself first.",
      share: "Today's character: Youth Band Senior. The beat starts the moment they arrive.",
      premiumDetail: "Before being someone who handles music, this is a person whose energy itself leads the scene. Not flashy, yet the gaze goes there first — naturally becoming the center of a group through intuitive presence rather than complex emotion.",
    },
    ja: {
      heroSummary: "登場だけで雰囲気を引き上げる役柄が似合います。",
      oneLiner: "じっとしていてもシーンにリズムが生まれるタイプです。",
      intro: "視線が自然と中心に集まります。複雑に飾らなくてもエネルギーが先に見えます。",
      share: "今日のメインキャラは青春バンドの先輩。登場するだけでリズムが生まれるタイプ。",
      premiumDetail: "音楽を扱う役柄である前に、エネルギー自体がシーンを引っ張る人物です。華やかでなくても視線が先に向かう側で、複雑な感情よりも直感的な存在感でグループの中で自然と中心になります。",
    },
  },
  "young-monarch": {
    ko: {
      heroSummary: "무게감 있는 한마디가 필요한 역할과 잘 맞아요.",
      oneLiner: "어리게 보이기보다, 조용한 결단이 먼저 느껴지는 쪽입니다.",
      intro: "힘을 과하게 쓰지 않아도 중심이 생깁니다. 화려한 장면보다 무게 있는 장면에서 더 살아납니다.",
      share: "오늘의 캐스팅 결과는 사극의 젊은 군주. 말보다 결이 먼저 남는 타입.",
      premiumDetail: "권력이 아니라 결단을 중심에 두는 군주입니다. 나이와 무관하게 묵직하게 판단하는 모습이 자연스럽고, 조용한 결심을 보여주는 장면에서 기억에 남는 쪽입니다.",
    },
    en: {
      heroSummary: "Roles that call for gravity in every word are the natural fit.",
      oneLiner: "Not young-looking — the quiet decisiveness comes first.",
      intro: "No need to force it — the center forms on its own. Less about spectacle, more about weight.",
      share: "Today's cast: Young Monarch. The resolve lingers longer than the words.",
      premiumDetail: "A monarch centered on decision rather than power. The weighty, composed judgment that transcends age feels natural, and it's the scenes showing quiet resolve that leave the lasting impression.",
    },
    ja: {
      heroSummary: "一言に重みが必要な役柄に自然と似合います。",
      oneLiner: "若く見えるよりも、静かな決断が先に感じられる側です。",
      intro: "力を使わなくても中心が生まれます。華やかなシーンより重みのあるシーンで輝きます。",
      share: "今日のキャスト：時代劇の若き君主。言葉より決意が先に残るタイプ。",
      premiumDetail: "権力ではなく決断を中心に置く君主です。年齢に関わらず重みを持って判断する姿が自然で、静かな決意を見せるシーンで記憶に残る側です。",
    },
  },
  "young-queen": {
    ko: {
      heroSummary: "부드러워 보여도 단단한 무게감이 필요한 역할과 잘 맞아요.",
      oneLiner: "조용해 보여도 쉽게 흔들리지 않는 중심이 느껴지는 쪽입니다.",
      intro: "목소리를 높이지 않아도 장면을 붙잡는 힘이 있습니다. 단정한 분위기 안에 결단력이 같이 보입니다.",
      share: "오늘의 캐스팅 결과는 사극의 젊은 여군주. 부드러워 보여도 무게감이 남는 타입.",
      premiumDetail: "부드럽게 말해도 결단이 느껴지는 방식이 이 역할의 핵심입니다. 거칠게 싸우기보다 조용히 버티는 쪽에서 더 강한 인상이 남는 타입입니다.",
    },
    en: {
      heroSummary: "Soft in appearance, but built for roles with quiet gravity.",
      oneLiner: "Still waters, but the center doesn't move easily.",
      intro: "No need to raise the voice to hold a scene. Resolve sits alongside the composure.",
      share: "Today's cast: Young Queen. Gentle on the surface, but the gravity stays.",
      premiumDetail: "The way decisiveness comes through even in soft speech is the core of this role. The stronger impression comes from quietly holding on rather than fighting hard.",
    },
    ja: {
      heroSummary: "柔らかく見えても重みが必要な役柄にぴったりです。",
      oneLiner: "静かに見えても、容易には揺らがない中心が感じられます。",
      intro: "声を上げなくてもシーンを引き留める力があります。凛とした雰囲気の中に決断力も見えます。",
      share: "今日のキャスト：時代劇の若き女君主。柔らかく見えても重みが残るタイプ。",
      premiumDetail: "柔らかく話しても決断が感じられる方式がこの役柄の核心です。荒々しく戦うより静かに耐える側でより強い印象が残るタイプです。",
    },
  },
  "palace-strategist": {
    ko: {
      heroSummary: "앞에 서기보다 판을 읽는 역할이 잘 어울려요.",
      oneLiner: "앞에 나서기보다, 뒤에서 판을 정리하는 역할이 더 잘 어울립니다.",
      intro: "한마디가 길게 남을 것 같은 분위기가 있습니다. 눈에 띄는 주인공보다 믿고 듣는 인물이 더 가깝습니다.",
      share: "오늘의 메인 캐릭터는 궁중 책사. 조용히 판을 움직이는 타입.",
      premiumDetail: "앞에 서지 않아도 흐름을 설계하는 사람입니다. 충성심이 아니라 판단으로 움직이는 쪽이고, 한마디가 여러 장면을 앞서 가는 통찰이 자연스럽습니다.",
    },
    en: {
      heroSummary: "Reading the board rather than standing at the front — that's the fit.",
      oneLiner: "Less about stepping forward, more about organizing things from behind.",
      intro: "The kind whose single line lingers. Closer to the trusted advisor than the obvious lead.",
      share: "Today's character: Palace Strategist. Quietly moves the board.",
      premiumDetail: "Someone who designs the flow without standing at the front. Moves by judgment rather than loyalty, and the insight where a single word runs ahead of many scenes feels natural.",
    },
    ja: {
      heroSummary: "前に出るより盤面を読む役柄が似合います。",
      oneLiner: "前に立つより、後ろから盤面を整理する役柄がより自然です。",
      intro: "一言が長く残りそうな雰囲気があります。目立つ主人公より、信頼されて聞かれる人物に近いです。",
      share: "今日のメインキャラは宮廷の策士。静かに盤面を動かすタイプ。",
      premiumDetail: "前に出なくても流れを設計する人です。忠誠心ではなく判断で動く側で、一言が複数のシーンを先行く洞察が自然です。",
    },
  },
  "noir-strategist": {
    ko: {
      heroSummary: "어둡고 묵직한 장면에서 존재감이 더 살아나요.",
      oneLiner: "소리치지 않아도 위험한 느낌이 남는 쪽입니다.",
      intro: "정면 승부보다 한 걸음 비켜선 긴장이 어울립니다. 단순한 악역보다 계산된 인물이 더 잘 맞습니다.",
      share: "오늘의 결과는 느와르 조직의 전략가. 낮은 톤인데도 긴장감이 큰 타입.",
      premiumDetail: "힘을 소리치지 않아도 전해지는 타입입니다. 단 한마디로 공기를 바꾸는 능력 — 선한 역할보다 계산된 어둠 쪽에서 오히려 더 자연스럽습니다.",
    },
    en: {
      heroSummary: "Presence that sharpens in dark, heavy scenes.",
      oneLiner: "No need to shout — the sense of danger lingers on its own.",
      intro: "One step to the side of a direct confrontation. Less a blunt villain, more a calculated one.",
      share: "Today's character: Noir Strategist. Low tone, but the tension runs deep.",
      premiumDetail: "Power that comes through without raising the voice. The ability to change the air with a single word — actually more natural on the side of calculated darkness than in a good role.",
    },
    ja: {
      heroSummary: "暗く重いシーンで存在感が増すタイプです。",
      oneLiner: "叫ばなくても危険な感じが残る側です。",
      intro: "正面対決より一歩引いた緊張感が似合います。単純な悪役より計算された人物の方がぴったりです。",
      share: "今日のキャスト：ノワール組織の戦略家。低いトーンなのに緊張感が大きいタイプ。",
      premiumDetail: "力を叫ばなくても伝わるタイプです。たった一言で空気を変える能力 — 善い役柄より計算された闇の側でむしろより自然です。",
    },
  },
  "medical-elite-doctor": {
    ko: {
      heroSummary: "침착함이 먼저 필요한 역할에 잘 어울려요.",
      oneLiner: "다정함보다 정확함이 먼저 보이는 타입입니다.",
      intro: "급한 장면에서도 쉽게 흔들리지 않을 것 같습니다. 차분한데 차갑게만 남지는 않는 쪽입니다.",
      share: "오늘의 메인 캐릭터는 메디컬 드라마 엘리트 의사. 침착한데 믿음이 가는 쪽.",
      premiumDetail: "위기 상황에서 흔들리지 않는 침착함이 자연스럽습니다. 정확하기 위해 감정을 잠시 뒤에 두는 방식이 이 역할에 잘 맞고, 신뢰가 먼저 와서 따뜻함은 나중에 발견되는 타입입니다.",
    },
    en: {
      heroSummary: "Roles that need calm first fit most naturally.",
      oneLiner: "Precision shows before warmth does.",
      intro: "Not the type to waver even in urgent scenes. Composed, but not cold.",
      share: "Today's character: Elite Doctor. Steady, and somehow easy to trust.",
      premiumDetail: "The composure that doesn't waver in crisis feels natural. Setting emotion aside briefly in order to be precise fits this role well — trust arrives first and warmth is discovered later.",
    },
    ja: {
      heroSummary: "落ち着きが先に求められる役柄に自然と似合います。",
      oneLiner: "温かさより正確さが先に見えるタイプです。",
      intro: "急なシーンでも簡単には揺れなそうです。落ち着いているのに冷たいだけでは終わらない側です。",
      share: "今日のメインキャラは医療ドラマのエリート医師。落ち着いていて信頼が持てるタイプ。",
      premiumDetail: "危機状況でも揺れない冷静さが自然です。正確であるために感情を少し後回しにする方式がこの役柄によく合い、信頼が先に来て温かさは後から発見されるタイプです。",
    },
  },
  "warm-lawyer": {
    ko: {
      heroSummary: "사람 이야기를 품는 역할과 잘 맞는 분위기예요.",
      oneLiner: "단호하게 누르기보다, 사람 쪽으로 먼저 기우는 분위기입니다.",
      intro: "날카롭게 재단하기보다 곁에 남는 쪽입니다. 단정한 말보다 마음을 움직이는 장면이 더 잘 어울립니다.",
      share: "오늘의 캐스팅 결과는 따뜻한 동네 변호사. 부드럽지만 약하지 않은 타입.",
      premiumDetail: "이기는 게 목적이 아니라 사람을 지키는 게 목적인 변호사입니다. 날카롭게 재단하기보다 곁에 남는 방식이 이 역할에서 더 오래 기억됩니다. 법정 밖에서도 신뢰가 먼저 가는 쪽입니다.",
    },
    en: {
      heroSummary: "A role built around human stories and warmth fits well.",
      oneLiner: "Less inclined to press hard — the lean is toward people first.",
      intro: "Not the type to cut sharply. More likely to stay close. Moving scenes over precise arguments.",
      share: "Today's cast: Warm Local Lawyer. Gentle, but not soft.",
      premiumDetail: "A lawyer whose purpose is protecting people, not winning. The way of staying close rather than cutting sharply is what's remembered longer in this role. Trust comes first even outside the courtroom.",
    },
    ja: {
      heroSummary: "人の話を包む役柄に似合う雰囲気です。",
      oneLiner: "強く押さえるより、人の側にまず傾く雰囲気です。",
      intro: "鋭く裁くより、そばに残る側です。整った言葉より心を動かすシーンの方がよく似合います。",
      share: "今日のキャスト：温かい町の弁護士。柔らかいけど弱くないタイプ。",
      premiumDetail: "勝つことが目的ではなく、人を守ることが目的の弁護士です。鋭く裁くよりそばに残る方式がこの役柄でより長く記憶されます。法廷の外でも信頼が先に来る側です。",
    },
  },
  "mystery-writer": {
    ko: {
      heroSummary: "한 번에 다 읽히지 않는 역할에 특히 잘 어울려요.",
      oneLiner: "설명보다 여백이 더 궁금해지는 얼굴입니다.",
      intro: "밝게 다 드러내기보다 조금 남겨 두는 쪽이 더 잘 어울립니다. 한 장면만으로도 다음 이야기가 궁금해집니다.",
      share: "오늘의 메인 캐릭터는 미스터리 작가형 인물. 다 보여주지 않아 더 궁금한 타입.",
      premiumDetail: "쓰는 사람이기 이전에, 이미 모든 걸 알고 있는 눈빛이 먼저 보입니다. 설명하지 않아도 궁금해지는 여백이 있고, 한 장면 안에서도 다음 이야기를 상상하게 만드는 쪽입니다.",
    },
    en: {
      heroSummary: "Roles that can't be read all at once are the perfect match.",
      oneLiner: "The gaps are more interesting than the explanations.",
      intro: "Less about showing everything — leaving a little behind suits better. One scene is enough to make you wonder what comes next.",
      share: "Today's character: Mystery Writer type. More intriguing because not everything is shown.",
      premiumDetail: "Before being a writer, the gaze that already knows everything shows first. There is a space that makes you curious without explanation, and it's the type that makes you imagine the next story even within a single scene.",
    },
    ja: {
      heroSummary: "一度に全部読めない役柄に特に似合います。",
      oneLiner: "説明より余白の方が気になる顔です。",
      intro: "全部明るく見せるより少し残す方が似合います。一場面だけで次の話が気になります。",
      share: "今日のメインキャラはミステリー作家型人物。全部見せないから余計に気になるタイプ。",
      premiumDetail: "書く人である前に、すでに全てを知っている眼差しが先に見えます。説明しなくても気になる余白があり、一場面の中でも次の話を想像させる側です。",
    },
  },
  "fantasy-advisor": {
    ko: {
      heroSummary: "현실보다 조금 더 특별한 세계관에서 더 빛나요.",
      oneLiner: "현실적인 장면보다, 한 번쯤 다른 세계를 열 것 같은 분위기입니다.",
      intro: "앞에 서지 않아도 장면의 결을 바꾸는 힘이 있습니다. 화려하기보다 신비롭게 남는 쪽입니다.",
      share: "오늘의 캐스팅 결과는 판타지 세계의 마법 참모. 조용한데 세계관이 생기는 타입.",
      premiumDetail: "마법이나 능력보다 그 눈빛과 말 한마디가 더 큰 힘을 가지는 방식이 이 역할에 잘 맞습니다. 조용히 등장하지만, 세계가 그 사람을 중심으로 넓어지는 쪽입니다.",
    },
    en: {
      heroSummary: "Shines brightest in worlds a step beyond ordinary.",
      oneLiner: "Less suited to realistic scenes — more likely to open a door to another world.",
      intro: "No need to step forward to shift the texture of a scene. Stays mysterious rather than dazzling.",
      share: "Today's cast: Fantasy World Advisor. Quiet, but a whole world appears around them.",
      premiumDetail: "The way a single gaze and a single word carry more power than magic or ability fits this role well. Enters quietly, but the world expands with this person at its center.",
    },
    ja: {
      heroSummary: "現実より少し特別な世界観でより輝きます。",
      oneLiner: "現実的なシーンより、いつか別の世界を開きそうな雰囲気です。",
      intro: "前に出なくてもシーンの質感を変える力があります。華やかよりも神秘的に残る側です。",
      share: "今日のキャスト：ファンタジー世界の魔法参謀。静かなのに世界観が生まれるタイプ。",
      premiumDetail: "魔法や能力よりもその眼差しと一言がより大きな力を持つ方式がこの役柄によく合います。静かに登場しますが、世界がその人を中心に広がる側です。",
    },
  },
  "revenge-mastermind": {
    ko: {
      heroSummary: "사연이 깊은 주인공 역할과 잘 어울려요.",
      oneLiner: "밝게 흘려보내기보다, 속에 이야기를 오래 품고 있을 것 같은 인상입니다.",
      intro: "한 번 마음을 정하면 쉽게 꺾이지 않을 것 같습니다. 감정보다 결심이 먼저 보이는 타입입니다.",
      share: "오늘의 메인 캐릭터는 복수극 핵심 인물. 웃고 있어도 사연이 느껴지는 쪽.",
      premiumDetail: "웃고 있어도 어딘가 단단하게 결심된 게 느껴지는 타입입니다. 복수라는 감정을 극적으로 드러내기보다, 조용히 쌓아온 이유를 품고 움직이는 방식이 이 역할과 잘 맞습니다.",
    },
    en: {
      heroSummary: "A lead role with deep backstory fits naturally.",
      oneLiner: "Not one to let things go lightly — the sense of a long-held story inside.",
      intro: "Once a decision is made, it doesn't bend easily. Resolve shows before feeling does.",
      share: "Today's character: Revenge Mastermind. Even a smile carries a story behind it.",
      premiumDetail: "The type where even a smile carries the feel of something firmly decided. Rather than dramatically displaying the emotion of revenge, moving while holding quietly accumulated reasons fits this role well.",
    },
    ja: {
      heroSummary: "深い背景を持つ主人公の役柄が自然に似合います。",
      oneLiner: "明るく流すより、内側に長く物語を持っていそうな印象です。",
      intro: "一度心を決めると簡単には折れなそうです。感情より決意が先に見えるタイプです。",
      share: "今日のメインキャラは復讐劇の核心人物。笑っていても物語が感じられるタイプ。",
      premiumDetail: "笑っていてもどこか固く決意が感じられるタイプです。復讐という感情を劇的に表すより、静かに積み重ねた理由を抱えて動く方式がこの役柄とよく合います。",
    },
  },
  "suspense-suspect": {
    ko: {
      heroSummary: "한 번 더 보게 되는 미묘한 역할에 잘 어울려요.",
      oneLiner: "좋은 쪽인지 아닌지, 쉽게 단정할 수 없게 만드는 얼굴입니다.",
      intro: "처음엔 평온해 보여도 뒤로 갈수록 더 궁금해집니다. 한 장면보다 여운이 길게 남는 타입입니다.",
      share: "오늘의 캐스팅 결과는 서스펜스물 핵심 용의자. 평온한데 계속 신경 쓰이는 타입.",
      premiumDetail: "좋고 나쁨을 쉽게 결론 내리지 못하게 만드는 모호함이 이 역할의 핵심입니다. 의심받으면서도 공감을 얻는 그 간격 — 거기서 가장 빛나는 타입입니다.",
    },
    en: {
      heroSummary: "The subtle role that makes you look twice.",
      oneLiner: "Hard to pin down as good or not — that ambiguity is the point.",
      intro: "Calm at first, but the more you watch, the more curious you get. The afterthought outlasts the scene.",
      share: "Today's cast: Key Suspect. Calm, but somehow always on your mind.",
      premiumDetail: "Ambiguity that resists quick conclusions is the heart of this role. The gap between being suspected and being understood — that's where this type shines most.",
    },
    ja: {
      heroSummary: "もう一度見たくなる微妙な役柄に似合います。",
      oneLiner: "善か悪かを簡単に決めさせない顔です。",
      intro: "最初は穏やかに見えても、後になるほど気になります。一場面より余韻が長く残るタイプです。",
      share: "今日のキャスト：サスペンスの核心人物。穏やかなのにずっと気になるタイプ。",
      premiumDetail: "善悪を簡単に結論付けさせない曖昧さがこの役柄の核心です。疑われながらも共感を得るその間隔 — そこで最も輝くタイプです。",
    },
  },
  "cold-ceo": {
    ko: {
      heroSummary: "차분하게 중심을 잡는 역할이 잘 어울려요.",
      oneLiner: "따뜻하게 끌어안기보다, 차분하게 판을 주도하는 쪽입니다.",
      intro: "크게 감정을 드러내지 않아도 중심이 생깁니다. 무심해 보여도 장면의 결을 바꾸는 힘이 있습니다.",
      share: "오늘의 메인 캐릭터는 냉미남 CEO. 말수보다 존재감이 먼저 남는 타입.",
      premiumDetail: "감정보다 판단이 먼저 오는 타입입니다. 차갑다는 인상보다, 감정을 쓸 타이밍을 정확히 아는 사람에 가깝습니다. 그래서 결정적인 장면에서 한 번 흔들렸을 때 더 오래 기억됩니다.",
    },
    en: {
      heroSummary: "A grounding, commanding presence — the right fit.",
      oneLiner: "Less about warmth, more about quietly leading the room.",
      intro: "Center forms without visible effort. Looks detached, but carries the ability to shift the texture of any scene.",
      share: "Today's character: Cold CEO. Presence outlasts the words.",
      premiumDetail: "Judgment before feeling — that's the default mode. Less about being cold, more about knowing exactly when to use emotion. That precision is why the one moment of wavering stays with you.",
    },
    ja: {
      heroSummary: "落ち着いて中心を保つ役柄が似合います。",
      oneLiner: "温かく包むより、静かに場を主導する側です。",
      intro: "感情を大きく出さなくても中心が生まれます。無関心に見えてもシーンの質感を変える力があります。",
      share: "今日のメインキャラはクールなCEO。言葉より存在感が先に残るタイプ。",
      premiumDetail: "感情より判断が先に来るタイプです。冷たいというより、感情を使うタイミングを正確に知っている人に近いです。だから決定的なシーンで一度揺れた時にこそ、より長く記憶されます。",
    },
  },
  "cold-ceo-female": {
    ko: {
      heroSummary: "차분한 카리스마로 중심을 잡는 역할이 잘 어울려요.",
      oneLiner: "세게 밀어붙이기보다, 낮은 톤으로 판을 주도하는 쪽입니다.",
      intro: "쉽게 흔들리지 않는 인상이 먼저 남습니다. 말이 많지 않아도 분위기로 장면을 정리하는 타입입니다.",
      share: "오늘의 메인 캐릭터는 냉미녀 CEO. 말보다 분위기로 장면을 잡는 타입.",
      premiumDetail: "가까이 가기 어려운데 시선은 자꾸 가는 쪽입니다. 단단함 뒤에 있는 감정의 온도가 가끔 드러날 때 — 그게 이 역할이 가장 위력적인 순간입니다.",
    },
    en: {
      heroSummary: "Quiet charisma that anchors the center — a natural fit.",
      oneLiner: "Not about pushing hard — about leading with a low, steady tone.",
      intro: "The first impression is one that doesn't shake easily. Few words, but the mood organizes the scene.",
      share: "Today's character: Cold Female CEO. Mood does the scene-setting, not words.",
      premiumDetail: "Hard to get close to, but the gaze keeps returning. When the emotional temperature behind that hardness shows itself, even briefly — that's when this role becomes most powerful.",
    },
    ja: {
      heroSummary: "静かなカリスマで中心を保つ役柄が似合います。",
      oneLiner: "強く押すより、低いトーンで場を主導する側です。",
      intro: "容易に揺れない印象が先に残ります。多くを語らなくても雰囲気でシーンを整えるタイプです。",
      share: "今日のメインキャラはクールな女性CEO。言葉より雰囲気でシーンを掴むタイプ。",
      premiumDetail: "近づきにくいのに目が続いていく側です。固さの後ろにある感情の温度がたまに現れる時 — それがこの役柄が最も力を持つ瞬間です。",
    },
  },
  "cafe-owner": {
    ko: {
      heroSummary: "편안한데 기억에 남는 역할과 잘 맞아요.",
      oneLiner: "세게 밀어붙이기보다, 분위기로 장면을 붙잡는 쪽입니다.",
      intro: "편안한데 밋밋하지 않습니다. 로맨스 한가운데보다 여운 있는 관계성에 더 잘 어울립니다.",
      share: "오늘의 캐스팅 결과는 감성 카페 사장. 부드럽고 은근하게 기억나는 타입.",
      premiumDetail: "주인공보다 기억에 남는 주변 인물이 될 수 있는 드문 타입입니다. 로맨스가 중심이어도 이 사람이 잠깐 나오면 장면의 온도가 바뀌는 쪽입니다.",
    },
    en: {
      heroSummary: "Comfortable and memorable — that combination fits well.",
      oneLiner: "Not about pressure — holding the mood of a scene with ease.",
      intro: "Easy to be around, but not plain. Better suited to the lingering connection than the center of a romance.",
      share: "Today's cast: Indie Café Owner. The kind that stays in memory, quietly and naturally.",
      premiumDetail: "A rare type that can outlast the lead in memory. Even in a romance-centered story, when this person appears briefly, the temperature of the scene shifts.",
    },
    ja: {
      heroSummary: "気楽なのに記憶に残る役柄に似合います。",
      oneLiner: "強く押すより、雰囲気でシーンを引き留める側です。",
      intro: "気楽なのに平凡ではありません。ロマンスの中心より余韻のある関係性の方が似合います。",
      share: "今日のキャスト：感性カフェのオーナー。柔らかくさりげなく記憶に残るタイプ。",
      premiumDetail: "主人公より記憶に残る周辺人物になれる稀なタイプです。ロマンスが中心でもこの人が少し出てくるとシーンの温度が変わる側です。",
    },
  },
  "political-aide": {
    ko: {
      heroSummary: "앞보다 뒤에서 흐름을 움직이는 역할이 잘 맞아요.",
      oneLiner: "앞에 나서기보다, 한 걸음 뒤에서 더 크게 움직이는 쪽입니다.",
      intro: "눈에 띄는 방식보다 흐름을 설계하는 역할이 자연스럽습니다. 조용한데 계산이 보이는 타입입니다.",
      share: "오늘의 메인 캐릭터는 야망 있는 정치 보좌관. 조용한데 판을 읽는 쪽.",
      premiumDetail: "충성심이 아니라 계산으로 움직이는 사람의 눈빛입니다. 말 한마디가 미래 몇 장면을 먼저 설계하는 방식 — 조용하지만 결코 뒤처지지 않는 타입입니다.",
    },
    en: {
      heroSummary: "Moving the flow from one step behind — that's the natural fit.",
      oneLiner: "Less about stepping forward, more about moving bigger things from just behind.",
      intro: "Designing the current rather than being visibly in it feels more natural. Quiet, but the calculation shows.",
      share: "Today's character: Ambitious Political Aide. Reads the board quietly.",
      premiumDetail: "The eyes of someone who moves by calculation, not loyalty. A single word already designed to set up several scenes ahead — quiet, but never falling behind.",
    },
    ja: {
      heroSummary: "前より後ろから流れを動かす役柄に自然と似合います。",
      oneLiner: "前に出るより、一歩後ろからより大きく動く側です。",
      intro: "目立つ方法より流れを設計する役柄が自然です。静かなのに計算が見えるタイプです。",
      share: "今日のメインキャラは野心ある政治補佐官。静かなのに盤面を読むタイプ。",
      premiumDetail: "忠誠心ではなく計算で動く人の眼差しです。一言が未来の数シーンを先に設計する方式 — 静かでも決して遅れを取らないタイプです。",
    },
  },
  "mysterious-helper": {
    ko: {
      heroSummary: "친절하지만 어딘가 비밀이 있는 역할에 잘 어울려요.",
      oneLiner: "친절해 보여도 끝까지 다 읽히지는 않는 쪽입니다.",
      intro: "한 번에 설명되지 않을수록 더 매력이 살아납니다. 지나간 뒤가 더 궁금한 타입입니다.",
      share: "오늘의 캐스팅 결과는 비밀을 가진 조력자. 친절한데 끝까지 다 보이진 않는 타입.",
      premiumDetail: "처음엔 선명하게 보이다가, 지나고 나면 무언가 빠진 것 같은 느낌을 남기는 타입입니다. 다 보여줬는데도 전부 본 게 맞나 싶은 — 그 간격이 이 역할의 매력입니다.",
    },
    en: {
      heroSummary: "Kind but with something hidden underneath — a natural fit.",
      oneLiner: "Looks approachable, but not fully readable to the end.",
      intro: "The harder to explain at once, the stronger the pull. You're more curious after they've gone.",
      share: "Today's cast: Mysterious Helper. Kind, but never fully seen.",
      premiumDetail: "Seems clear at first, but leaves a feeling that something was missing once the moment has passed. You showed everything — but did you really see it all? That gap is the charm of this role.",
    },
    ja: {
      heroSummary: "親切だけどどこか秘密がある役柄に似合います。",
      oneLiner: "親切に見えても最後まで全部は読めない側です。",
      intro: "一度に説明されないほど魅力が増します。通り過ぎた後の方が気になるタイプです。",
      share: "今日のキャスト：秘密を持つ協力者。親切なのに最後まで全部は見えないタイプ。",
      premiumDetail: "最初は鮮明に見えて、過ぎ去ったら何かが足りないような感じを残すタイプです。全部見せたはずなのに全部見たのか疑問に思う — その間隔がこの役柄の魅力です。",
    },
  },
};

const faceTypeContext: Record<FaceType, Record<"ko" | "en" | "ja", string>> = {
  RUGGED: {
    ko: "꾸미지 않아도 밀도가 있어요. 화면에 올라가면 날 것 그대로가 강점이 되는 쪽입니다.",
    en: "Density without effort. On screen, the unpolished edge becomes the strength.",
    ja: "飾らなくても密度があります。スクリーンでは生のままが強みになる側です。",
  },
  SHARP_COOL: {
    ko: "차가운 게 아니라, 쓸데없는 것이 없는 쪽에 가까워요. 선이 또렷할수록 장면이 살아납니다.",
    en: "Not cold — just without excess. The cleaner the line, the sharper the scene.",
    ja: "冷たいのではなく、無駄がない側に近いです。輪郭が鮮明なほどシーンが生きてきます。",
  },
  WARM_FRIENDLY: {
    ko: "억지가 없어요. 계산 없이 그냥 나오는 따뜻함이라, 보는 쪽에서 먼저 마음이 열립니다.",
    en: "Nothing forced. Warmth that isn't performed — and the viewer opens up first.",
    ja: "無理がありません。計算なく自然に出る温かさで、見る側が先に心を開きます。",
  },
  ELEGANT_REFINED: {
    ko: "복잡한 감정도 단정하게 담아내요. 화려하지 않아도 오래 기억에 남는 쪽입니다.",
    en: "Even complexity comes through composed. Remembered long without needing to dazzle.",
    ja: "複雑な感情も端正に収めます。華やかでなくても長く記憶に残る側です。",
  },
  INTELLECTUAL_SERIOUS: {
    ko: "말하기 전에 이미 다 읽고 있을 것 같아요. 조용한데 신뢰가 먼저 오는 인상입니다.",
    en: "Seems to have read the room before speaking. Quiet, but trust arrives first.",
    ja: "話す前にもう全部読んでいそうです。静かなのに信頼が先に来る印象です。",
  },
  SOFT_YOUTH: {
    ko: "가볍게 보이지만 여운이 오래 남아요. 쉽게 지나쳐지지 않는 섬세함이 있습니다.",
    en: "Looks light, but the impression stays. There's a delicacy that doesn't get passed over.",
    ja: "軽く見えるけど余韻が長く残ります。簡単に通り過ぎられない繊細さがあります。",
  },
  MYSTERIOUS_DARK: {
    ko: "다 봤다고 생각했는데, 끝나고 나서도 계속 떠오르는 타입이에요.",
    en: "You think you've seen it all — then they keep coming back to you after it's over.",
    ja: "全部見たと思ったのに、終わってからもずっと頭に浮かぶタイプです。",
  },
  CHARISMATIC_INTENSE: {
    ko: "등장하는 순간 다른 것들이 배경이 돼요. 힘을 쓰지 않아도 화면을 쥐는 타입입니다.",
    en: "The moment they appear, everything else becomes backdrop. Holds the screen without trying.",
    ja: "登場した瞬間、他のものが背景になります。力まなくても画面を掴むタイプです。",
  },
};

function getFallbackPreset(characterId: string, locale: Locale): CharacterCopyPreset {
  const presets = copyPresets[characterId];
  if (presets) return presets[locale] ?? presets.ko;
  const fallbacks: Record<Locale, CharacterCopyPreset> = {
    ko: {
      heroSummary: "이 역할과 잘 어울리는 분위기가 있어요.",
      oneLiner: "장면의 분위기를 자연스럽게 이끄는 타입입니다.",
      intro: "처음 등장부터 인상이 남는 쪽입니다.",
      share: `오늘의 메인 캐릭터는 ${characterId}. 화면에서도 존재감이 남는 타입.`,
      premiumDetail: "장면 안에서 설명하지 않아도 읽히는 쪽입니다. 독특한 인상이 역할의 무게를 자연스럽게 받쳐줍니다.",
    },
    en: {
      heroSummary: "There's a vibe here that fits this role naturally.",
      oneLiner: "The type who leads the mood of a scene without effort.",
      intro: "Leaves an impression from the very first entrance.",
      share: `Today's character: ${characterId}. The kind of presence that stays on screen.`,
      premiumDetail: "Readable without explanation within the scene. A distinct impression that naturally carries the weight of the role.",
    },
    ja: {
      heroSummary: "この役柄に自然と似合う雰囲気があります。",
      oneLiner: "シーンの雰囲気を自然に引っ張るタイプです。",
      intro: "最初の登場から印象が残ります。",
      share: `今日のメインキャラは${characterId}。画面でも存在感が残るタイプ。`,
      premiumDetail: "シーンの中で説明しなくても読めるタイプです。独特な印象が役柄の重みを自然に支えてくれます。",
    },
  };
  return fallbacks[locale];
}

export function buildResultCopy(result: CastingResult, locale: Locale = "ko"): ResultCopy {
  const character = result.main.character;
  const preset = getFallbackPreset(character.id, locale);
  const context = faceTypeContext[result.faceType]?.[locale] ?? faceTypeContext[result.faceType]?.ko ?? "";

  const shortIntro = `${preset.intro} ${context}`;
  const topGenre = character.genres[0] ?? "드라마";
  const shareCopy = preset.share;

  return {
    title: character.name,
    heroSummary: preset.heroSummary,
    oneLiner: preset.oneLiner,
    shortIntro,
    premiumDetail: preset.premiumDetail,
    shareCopy,
    sectionEyebrow:
      locale === "en"
        ? "Your drama casting"
        : locale === "ja"
          ? "あなたのドラマキャスティング"
          : "당신의 드라마 캐스팅",
    supportTitle:
      locale === "en"
        ? "These roles fit too"
        : locale === "ja"
          ? "こんな役も似合います"
          : "이런 역할도 어울려요",
  };
}
