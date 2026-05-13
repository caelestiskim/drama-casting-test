import type { Locale } from "@/lib/i18n";

export const pageCopy = {
  ko: {
    nav: {
      start: "시작하기",
      home: "홈",
      backHome: "홈으로",
      retry: "다시 테스트하기",
      about: "서비스 소개",
      privacy: "개인정보처리방침",
      refund: "환불 규정",
      terms: "이용약관",
    },
    localeNames: {
      ko: "한국어",
      en: "English",
      ja: "日本語",
    },
    home: {
      eyebrow: "DRAMA CASTING TEST",
      title: "사진 한 장으로 보는 드라마 캐스팅 테스트",
      heroEyebrow: "캐릭터 중심 엔터테인먼트",
      heroTitleA: "당신은 어떤",
      heroTitleB: "드라마 속 역할과 닮아 있을까",
      heroDescription:
        "이 서비스는 외모를 평가하지 않습니다. 얼굴 사진에서 읽히는 분위기와 무드를 바탕으로, 잘 어울리는 장르와 캐릭터를 가볍게 추천하는 콘텐츠형 웹앱입니다.",
      startTest: "테스트 시작하기",
      noticeLink: "이용 전 확인",
      stepsTitle: "이렇게 진행돼요",
      steps: [
        { title: "사진 올리기", description: "얼굴이 잘 보이는 사진 한 장만 올리면 준비 끝." },
        { title: "분위기 확인", description: "사진 상태를 먼저 보고, 결과를 만들기 좋은지 가볍게 체크해요." },
        { title: "캐릭터 받기", description: "잘 어울리는 장르와 메인 캐릭터를 카드로 보여드려요." },
      ],
      features: [
        { title: "사진 한 장 업로드", description: "정면에 가까운 인물 사진으로 시작합니다. 업로드 직후 사진 상태를 먼저 확인합니다." },
        { title: "장르와 역할 추천", description: "로맨스, 범죄, 청춘, 법정 등 여러 장르 중 어떤 분위기가 잘 맞는지 보여줍니다." },
        { title: "공유 카드 제공", description: "결과를 카드 형태로 정리해 링크 복사와 공유하기까지 바로 이어집니다." },
      ],
      editorialTitle: "서비스를 더 잘 이해하고 시작해 보세요",
      editorialDescription:
        "테스트를 시작하기 전에 어떤 기준으로 결과가 나오는지, 어떤 사진이 더 자연스럽게 작동하는지, 결과를 어떻게 읽으면 좋은지 먼저 확인할 수 있습니다.",
      guideCta: "가이드 자세히 보기",
      policyTitle: "정책과 안내",
      policyDescription:
        "개인정보 안내, 이용 안내, 서비스 소개를 한곳에서 확인할 수 있게 정리했습니다. 처음 방문한 사용자도 구조를 쉽게 이해할 수 있도록 구성했습니다.",
      noticeTitle: "이용 전 안내",
      notices: [
        "외모 점수화, 미남/미녀 판정, 상하위 판단은 하지 않습니다.",
        "결과는 엔터테인먼트용 캐릭터 추천이며 실제 성격 진단이 아닙니다.",
        "업로드한 사진은 장기 저장하지 않고 결과 생성용으로만 잠시 사용합니다.",
      ],
      guideTitle: "사진 잘 나오는 팁",
      guideItems: [
        "정면에 가까운 사진일수록 결과가 더 자연스럽습니다.",
        "얼굴을 가리지 않은 사진이 가장 깔끔하게 작동합니다.",
        "한 사람만 나온 사진을 추천합니다.",
        "너무 흐리거나 어두운 사진은 다른 사진을 권장할 수 있습니다.",
      ],
    },
    upload: {
      eyebrow: "UPLOAD",
      title: "사진을 올리고 캐스팅 결과를 받아보세요",
    },
    result: {
      eyebrow: "RESULT",
      title: "드라마 캐스팅 결과",
    },
    uploadPanel: {
      eyebrow: "사진 업로드",
      title: "얼굴 사진 한 장으로 캐스팅 결과 보기",
      description: "셀카 한 장이면 충분해요. 사진에서 느껴지는 분위기를 바탕으로 드라마 속 어떤 역할이 잘 어울리는지 가볍고 재밌게 보여드릴게요.",
      uploadTitle: "사진 올리기",
      uploadHint: "얼굴이 잘 보이는 사진이면 가장 자연스럽게 나와요.",
      chooseLibrary: "앨범에서 고르기",
      mobileCamera: "스마트폰 카메라로 찍기",
      desktopCamera: "PC 웹캠으로 찍기",
      desktopCameraLoading: "카메라 여는 중...",
      mobileHint: "스마트폰에서는 바로 카메라 촬영이 열리고, 필요하면 앨범 사진도 고를 수 있어요.",
      desktopHint: "PC에서는 앨범에서 고르거나 웹캠으로 바로 찍을 수 있어요.",
      webcamTitle: "웹캠 촬영",
      close: "닫기",
      useShot: "지금 사진으로 사용하기",
      cancel: "취소",
      selectedFile: "선택한 파일",
      noFile: "아직 선택한 사진이 없어요",
      characterTone: "캐릭터 선택",
      toneHint: "먼저 보고 싶은 캐릭터 방향을 골라 주세요.",
      toneMale: "남성 캐릭터",
      toneFemale: "여성 캐릭터",
      toneMaleSub: "",
      toneFemaleSub: "",
      quickCheck: "업로드 전 간단 확인",
      checking: "사진을 바로 써도 괜찮은지 가볍게 보고 있어요. 잠깐만 기다려 주세요.",
      quickCheckHint: "얼굴이 잘 보이는 사진인지 간단히 확인해요. 이 단계가 건너뛰어져도 결과는 볼 수 있어요.",
      notesTitle: "가볍게 체크",
      notes: [
        "외모 평가는 하지 않고 분위기랑 캐릭터 느낌만 봐요.",
        "한 사람만 나온 사진일수록 결과가 더 깔끔해요.",
        "너무 흐리면 다시 올려 달라고 안내할 수 있어요.",
      ],
      submit: "캐스팅 결과 보기",
      submitting: "결과를 준비하고 있어요...",
      webcamNotSupported: "이 브라우저에서는 웹캠 촬영을 지원하지 않아요.",
      webcamOpenError: "카메라를 열지 못했어요. 권한을 확인하거나 사진 업로드를 이용해 주세요.",
      captureError: "촬영 이미지를 준비하지 못했어요. 다시 시도해 주세요.",
      filePrepError: "사진을 준비하는 중 문제가 생겼어요. 다시 올려 주세요.",
    },
    share: {
      native: "기본 공유",
      instagram: "인스타그램",
      facebook: "페이스북",
      copyLink: "링크 복사",
      kakao: "카카오톡",
      kakaoView: "결과 보기",
      instagramHint: "인스타그램은 문구 복사 후 앱에서 붙여 넣는 방식이에요.",
      kakaoHint: "카카오톡은 키를 넣으면 바로 공유돼요.",
      copiedLink: "링크를 복사했어요.",
      copiedResultLink: "결과 링크를 복사했어요.",
      copiedInstagram: "인스타그램용 문구를 복사했어요.",
      copiedKakao: "카카오톡용 문구를 복사했어요.",
    },
    resultUi: {
      loadingTitle: "결과를 만드는 중이에요",
      emptyEyebrow: "결과를 아직 만들지 못했어요",
      emptyTitle: "업로드부터 다시 시작해 주세요",
      emptyDescription: "사진을 다시 올리면 캐릭터 결과를 바로 보여드릴게요.",
      headerEyebrow: "드라마 캐스팅 테스트",
      headerTitle: "당신의 캐릭터 결과가 나왔어요",
      friendShare: "친구한테 보내기 좋은 한마디",
      works: "이런 작품 분위기도 잘 어울려요",
      actors: "비슷한 무드의 배우 레퍼런스",
      actorsHint: "닮은꼴 판정이 아니라, 이 캐릭터 유형에 어울리는 분위기 참고 예시예요. 언급된 배우들은 본 서비스와 무관하며 홍보·보증 관계가 아닙니다.",
      storageNote: "사진은 결과 생성을 위해 외부 AI 서비스(OpenAI)로 전달되며, 결과 생성 후 장기 저장하지 않습니다.",
      entertainmentNote: "이 서비스는 순수 오락 목적의 캐릭터 테스트입니다. 인상이나 외모에 대한 과학적 분석·진단이 아니며, 결과는 참고용으로만 활용하세요.",
    },
    footer: {
      privacyTitle: "개인정보 안내",
      privacyBody: "업로드한 사진은 결과 생성에만 잠깐 쓰고 장기 저장하지 않습니다.",
      refundTitle: "환불 규정",
      termsTitle: "이용약관",
      termsBody: "이 서비스는 순수 오락 목적의 캐릭터 테스트이며, 인상·외모에 관한 과학적 분석이나 진단 서비스가 아닙니다. 언급된 배우 및 작품은 본 서비스와 무관합니다.",
      contactTitle: "문의",
      address: "Goyang-si, Gyeonggi-do, South Korea",
      email: "caelestis@empas.com",
    },
    about: {
      title: "드라마 캐스팅 테스트란?",
      intro:
        "드라마 캐스팅 테스트는 얼굴 사진에서 읽히는 분위기와 인상을 바탕으로, 어떤 장르와 역할이 잘 어울리는지 가볍게 추천하는 엔터테인먼트형 서비스입니다.",
      sections: [
        {
          title: "이 서비스가 보는 것",
          body: "외모의 좋고 나쁨이 아니라 차분함, 강렬함, 친근함, 화면 존재감 같은 분위기 중심 요소를 참고합니다.",
        },
        {
          title: "결과가 만들어지는 방식",
          body: "사진에서 읽히는 무드와 장르 분위기를 조합해 메인 캐릭터, 보조 후보, 장르 추천, 작품 레퍼런스를 함께 보여줍니다.",
        },
        {
          title: "어떤 사진이 좋을까",
          body: "정면에 가깝고 얼굴이 또렷하게 보이는 사진, 한 사람만 나온 사진이 가장 자연스럽게 작동합니다.",
        },
      ],
      detailSections: [
        {
          title: "서비스를 어떻게 이해하면 좋을까",
          paragraphs: [
            "이 서비스는 누가 더 예쁘거나 잘생겼는지를 말하는 곳이 아닙니다. 얼굴 사진에서 느껴지는 전체적인 분위기와 화면 인상을 바탕으로, 드라마 속 어떤 역할이 잘 어울릴지를 가볍게 풀어내는 콘텐츠입니다.",
            "그래서 결과는 성격 진단이나 외모 평가처럼 받아들이기보다, 캐스팅 보드에서 재미있게 역할을 매칭해 보는 경험에 가깝습니다.",
          ],
        },
        {
          title: "결과는 어떤 기준으로 만들어질까",
          paragraphs: [
            "사진에서 먼저 보는 것은 차분함, 강렬함, 부드러움, 지적임, 친근함, 신비로움처럼 장면 안에서 느껴지는 무드입니다.",
            "이 무드를 바탕으로 로맨스, 범죄, 스릴러, 법정, 청춘 같은 장르 분위기를 조합하고, 그 위에 메인 캐릭터와 보조 후보를 정리합니다.",
            "즉, 한 장의 사진에서 느껴지는 전체 분위기를 드라마 캐스팅 언어로 바꿔 보여주는 방식입니다.",
          ],
        },
        {
          title: "어떤 사진이 가장 잘 맞을까",
          paragraphs: [
            "정면에 가깝고 얼굴이 또렷하게 보이는 사진이 가장 안정적으로 작동합니다. 한 사람만 나온 사진이면 결과도 더 깔끔하게 나옵니다.",
            "모자가 얼굴을 많이 가리거나, 너무 멀리 찍혔거나, 흔들린 사진이면 분위기를 읽는 데 불리할 수 있습니다.",
          ],
          bullets: [
            "정면 또는 정면에 가까운 사진",
            "얼굴이 너무 작지 않은 사진",
            "한 사람만 나온 사진",
            "너무 어둡거나 흔들리지 않은 사진",
          ],
        },
        {
          title: "결과는 어떻게 읽으면 좋을까",
          paragraphs: [
            "메인 캐릭터는 이번 사진에서 가장 강하게 떠오른 역할입니다. 보조 후보 2개는 비슷한 분위기 안에서 다른 방식으로 잘 어울릴 수 있는 대안입니다.",
            "장르 TOP 3는 어떤 세계관 안에서 이 분위기가 더 자연스럽게 살아나는지를 보여주는 참고용 카드입니다.",
            "작품 레퍼런스와 배우 무드 레퍼런스는 닮은꼴을 판정하는 기능이 아니라, 이번 결과와 함께 떠오르는 분위기 참고 자료로 보면 됩니다.",
          ],
        },
        {
          title: "이 서비스가 하지 않는 것",
          paragraphs: [
            "외모를 점수화하거나 상하를 나누지 않습니다. 미남형, 미녀형 같은 식의 판정도 하지 않습니다.",
            "나이, 인종, 질병, 정치 성향 같은 민감한 속성은 추정하지 않습니다.",
            "사진은 결과를 만들기 위해 잠깐 사용하며, 장기 저장을 전제로 하지 않습니다.",
          ],
        },
      ],
      faqTitle: "자주 묻는 질문",
      faqs: [
        {
          question: "왜 사진마다 결과가 조금씩 달라지나요?",
          answer:
            "사진마다 표정, 각도, 조명, 전체 분위기가 달라지기 때문입니다. 같은 사람이어도 어떤 사진을 넣느냐에 따라 더 강하게 보이는 무드가 달라질 수 있습니다.",
        },
        {
          question: "왜 남성 캐릭터 쪽 / 여성 캐릭터 쪽을 먼저 고르게 하나요?",
          answer:
            "결과를 더 일관되게 보여주기 위해서입니다. 이 선택은 얼굴을 자동으로 판정하는 것이 아니라, 어떤 방향의 캐릭터를 먼저 보여줄지 정하는 역할입니다.",
        },
        {
          question: "자동 점검이 건너뛰어질 때도 있나요?",
          answer:
            "가끔 브라우저 환경에 따라 업로드 전 사진 점검이 생략될 수 있습니다. 이 경우에도 메인 결과 생성은 계속 진행할 수 있습니다.",
        },
        {
          question: "이 결과를 실제 성격이나 외모 평가처럼 믿어도 되나요?",
          answer:
            "아니요. 이 서비스는 어디까지나 엔터테인먼트용 캐릭터 추천입니다. 재미있게 참고하는 용도로 보는 것이 가장 적절합니다.",
        },
      ],
    },
    privacyPage: {
      title: "개인정보처리방침",
      intro:
        "드라마 캐스팅 테스트(이하 '서비스')는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 및 관련 법령을 준수합니다. 본 방침은 서비스가 수집·이용·보관·파기하는 개인정보의 범위와 방식을 구체적으로 안내합니다. 시행일: 2025년 3월 1일",
      sections: [
        {
          title: "1. 수집하는 개인정보 항목 및 수집 방법",
          bullets: [
            "필수 수집 항목: 이용자가 업로드한 얼굴 사진(이미지 파일)",
            "자동 수집 항목: 브라우저 언어 설정, 세션 내 임시 결과 데이터(sessionStorage 한정)",
            "선택 수집 항목: 이용자가 직접 문의 이메일을 보낼 경우 해당 이메일 주소 및 문의 내용",
            "유료 결제 시: 결제 정보는 Polar 플랫폼이 직접 수집하며, 본 서비스는 카드번호 등 결제 수단 정보를 수집·저장하지 않습니다.",
            "수집 방법: 이용자 직접 제공(사진 업로드, 이메일 문의), 서비스 이용 과정 중 자동 생성",
          ],
        },
        {
          title: "2. 개인정보의 이용 목적",
          bullets: [
            "얼굴 사진: AI 기반 드라마 캐릭터 분석 결과 생성을 위한 단일 목적으로만 사용",
            "언어 설정·세션 데이터: 서비스 화면 표시 및 결과 유지 (브라우저 탭 닫으면 자동 소멸)",
            "이메일: 이용자 문의에 대한 응답 목적으로만 사용, 마케팅 활용 없음",
            "광고(Google AdSense): 서비스 운영 비용 충당을 위한 관심 기반 광고 표시",
          ],
        },
        {
          title: "3. 개인정보 보유 기간 및 파기",
          bullets: [
            "얼굴 사진: OpenAI Vision API 처리 완료 즉시 파기. 본 서비스 서버에 장기 저장하지 않습니다.",
            "세션 데이터: 브라우저 탭·창을 닫거나 세션 만료 시 자동 삭제",
            "문의 이메일: 문의 처리 완료 후 1년 이내 삭제",
            "법령에 따라 보관이 필요한 경우 해당 법령에서 정한 기간 동안 보관 후 즉시 파기",
            "파기 방법: 전자적 파일 형태는 복구 불가능한 방법으로 삭제, 출력물은 해당 없음",
          ],
        },
        {
          title: "4. 개인정보의 제3자 제공",
          bullets: [
            "OpenAI (미국): 얼굴 사진을 캐릭터 분석 결과 생성 목적으로 Vision API에 전송. OpenAI API 이용 정책상 API 입력 데이터는 모델 학습에 사용되지 않습니다. (openai.com/policies)",
            "Polar (미국): 프리미엄 결제 처리 목적으로 결제 정보를 제공. 카드 정보는 Polar가 직접 관리합니다. (polar.sh/legal)",
            "Google LLC (미국): Google AdSense를 통한 광고 표시 목적으로 쿠키·식별자를 공유할 수 있습니다. (policies.google.com)",
            "위 3개 제공자 외에는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.",
          ],
        },
        {
          title: "5. 쿠키 및 광고",
          bullets: [
            "본 서비스는 Google AdSense를 통해 광고를 제공합니다. Google은 쿠키를 사용하여 이용자의 이전 방문 기록을 바탕으로 관심 기반 광고를 표시합니다.",
            "이용자는 Google 광고 설정(adssettings.google.com)에서 개인화 광고를 비활성화할 수 있습니다.",
            "브라우저 설정에서 쿠키를 거부할 수 있으나, 일부 서비스 기능이 제한될 수 있습니다.",
            "Google Analytics를 통해 집계된 서비스 방문 흐름을 파악하고 사용자 경험을 개선합니다.",
          ],
        },
        {
          title: "6. 이용자의 권리",
          bullets: [
            "이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있습니다.",
            "삭제 요청은 아래 이메일로 연락 주시면 영업일 기준 7일 이내 처리합니다.",
            "만 14세 미만 아동의 개인정보는 수집하지 않습니다. 해당 사실이 확인되면 즉시 삭제합니다.",
          ],
        },
        {
          title: "7. 개인정보 보호책임자 및 문의",
          bullets: [
            "개인정보 보호책임자: 서비스 운영자",
            "문의 이메일: caelestis@empas.com",
            "요청 수신 후 영업일 기준 7일 이내 답변드립니다.",
            "본 방침은 법령 변경 또는 서비스 변경에 따라 개정될 수 있으며, 개정 시 서비스 내 공지를 통해 안내합니다.",
          ],
        },
      ],
    },
    refundPage: {
      title: "환불 규정",
      intro:
        "본 환불 규정은 드라마 캐스팅 테스트의 유료 프리미엄 결과 이용권에 적용됩니다. 결제는 Polar를 통해 처리되며, 본 서비스는 카드번호 등 결제 수단 정보를 직접 보관하지 않습니다. 시행일: 2025년 3월 1일",
      sections: [
        {
          title: "1. 상품 및 결제 방식",
          bullets: [
            "프리미엄 결과 이용권은 일회성 결제 상품이며 정기 구독이 아닙니다.",
            "결제 완료 후 이용자는 AI 기반 드라마 캐릭터 분석 결과, 캐릭터 유형, 인상 키워드, 스타일 키워드, 공유용 결과 페이지를 이용할 수 있습니다.",
            "모든 결제는 Polar Checkout을 통해 처리되며, Polar의 결제 및 환불 처리 절차가 함께 적용될 수 있습니다.",
          ],
        },
        {
          title: "2. 환불이 가능한 경우",
          bullets: [
            "결제는 완료되었으나 서비스 오류로 프리미엄 결과가 정상적으로 제공되지 않은 경우 전액 환불을 요청할 수 있습니다.",
            "결제 완료 후 결제 검증 오류로 프리미엄 잠금이 해제되지 않거나 결과 페이지에 접근할 수 없는 경우, 먼저 접근 복구를 지원하며 복구가 불가능하면 환불을 요청할 수 있습니다.",
            "중복 결제가 발생한 경우 중복 결제분에 대해 환불을 요청할 수 있습니다.",
            "환불 요청은 결제일로부터 7일 이내에 결제 이메일, 결제 시각, 가능한 경우 Polar 영수증 또는 거래 ID를 포함해 caelestis@empas.com으로 보내주세요.",
          ],
        },
        {
          title: "3. 환불이 제한되는 경우",
          bullets: [
            "프리미엄 결과가 정상적으로 화면에 표시된 이후에는 디지털 콘텐츠가 즉시 제공된 것으로 보아 단순 변심 환불이 제한됩니다.",
            "결과 화면은 제공되었으나 이메일 리포트 발송, 공유 링크 열람, 이미지 저장 등 부가 기능만 실패한 경우 즉시 환불 사유가 아닐 수 있으며, 재발송·링크 재생성·기술 지원을 먼저 제공합니다.",
            "메일 주소 오기재, 스팸함 분류, 일시적인 메일 수신 지연, 이용자 브라우저 또는 네트워크 문제로 인한 접근 실패는 환불 사유에 해당하지 않을 수 있습니다.",
            "이용자의 네트워크 환경, 브라우저 설정, 기기 문제, 잘못된 사진 선택 등 서비스 외부 요인으로 인한 불만족은 환불 사유에 해당하지 않을 수 있습니다.",
            "결과는 엔터테인먼트 목적의 AI 추천이며, 특정 배우와 닮음 여부나 결과 만족도를 보장하지 않습니다.",
          ],
        },
        {
          title: "4. 처리 기간 및 문의",
          bullets: [
            "환불 요청을 받으면 영업일 기준 7일 이내에 확인 후 답변합니다.",
            "정확한 확인을 위해 오류 화면 캡처, 결제 영수증, 사용한 이메일 주소, 발생 시각을 함께 보내주시면 더 빠르게 처리할 수 있습니다.",
            "승인된 환불은 Polar의 결제 처리 일정에 따라 원 결제 수단으로 반환됩니다.",
            "환불이 승인되면 해당 결제에 연결된 프리미엄 결과 접근, 이메일 재발송, 공유 링크 지원이 중단될 수 있습니다.",
            "문의 이메일: caelestis@empas.com",
          ],
        },
      ],
    },
    termsPage: {
      title: "이용약관",
      intro:
        "본 이용약관(이하 '약관')은 드라마 캐스팅 테스트(이하 '서비스')의 이용 조건 및 운영자와 이용자 간의 권리·의무 관계를 규정합니다. 서비스를 이용함으로써 본 약관에 동의한 것으로 간주합니다. 시행일: 2025년 3월 1일",
      sections: [
        {
          title: "제1조 (서비스 소개 및 성격)",
          bullets: [
            "본 서비스는 이용자가 업로드한 얼굴 사진의 분위기·인상을 AI가 분석하여 드라마 캐릭터 유형을 추천하는 엔터테인먼트용 서비스입니다.",
            "분석 결과는 오락·참고 목적이며, 의학적 진단·심리 평가·외모 등급 판정·취업 또는 입시 합격 여부 판단 등 어떠한 공식적 판정도 아닙니다.",
            "서비스는 외모를 점수화·순위화하거나, 성별·인종·연령·장애·질병·정치 성향 등 민감한 속성을 추정하지 않습니다.",
          ],
        },
        {
          title: "제2조 (이용자 의무)",
          bullets: [
            "이용자는 본인이 업로드 권한을 가진 사진만 사용해야 합니다.",
            "타인의 사진을 동의 없이 업로드하거나, 초상권·저작권을 침해하는 행위를 금지합니다.",
            "서비스를 자동화된 수단으로 대량 이용하거나, 역공학·크롤링·스크래핑 등으로 서비스를 복제·분석하는 행위를 금지합니다.",
            "허위 정보 기재, 타인의 계정 도용, 악성 코드 삽입 등 서비스 운영을 방해하는 행위를 금지합니다.",
            "위 금지 행위 위반 시 서비스 이용이 제한되거나 법적 책임이 발생할 수 있습니다.",
          ],
        },
        {
          title: "제3조 (유료 서비스 및 환불 정책)",
          bullets: [
            "프리미엄 결과 이용권은 결제 완료 즉시 디지털 콘텐츠(분석 결과)가 제공되는 서비스입니다.",
            "디지털 콘텐츠의 특성상, 결과가 화면에 표시된 이후에는 「전자상거래 등에서의 소비자 보호에 관한 법률」 제17조에 따라 청약 철회(환불)가 제한됩니다.",
            "단, 서비스 오류·기술적 결함으로 결과가 정상 제공되지 않은 경우 결제일로부터 7일 이내에 환불을 요청하면 전액 환불합니다.",
            "이메일 리포트, 공유 링크, 이미지 저장 등 부가 기능의 오류는 우선 재발송·복구 지원을 제공하며, 복구가 불가능한 경우 환불 여부를 검토합니다.",
            "환불 요청: caelestis@empas.com으로 결제 내역과 함께 연락 주세요.",
            "결제는 Polar 플랫폼을 통해 처리되며, Polar의 이용약관(polar.sh/legal)도 함께 적용됩니다.",
          ],
        },
        {
          title: "제4조 (지적재산권)",
          bullets: [
            "서비스의 UI·UX 디자인, 소프트웨어 코드, 텍스트, 이미지 등 모든 콘텐츠의 저작권은 운영자에게 있습니다.",
            "이용자가 업로드한 사진의 저작권은 이용자에게 있으며, 서비스는 결과 생성 목적 외에 해당 사진을 사용하지 않습니다.",
            "AI가 생성한 분석 결과 텍스트는 이용자의 개인 이용 목적으로만 사용 가능하며, 상업적 재판매·재배포는 금지합니다.",
            "서비스 내 배우·작품 레퍼런스는 정보 제공 목적이며, 해당 배우·제작사와의 공식 제휴·홍보 관계가 아닙니다.",
          ],
        },
        {
          title: "제5조 (면책 및 손해배상 한계)",
          bullets: [
            "서비스는 분석 결과의 정확성·완전성을 보증하지 않습니다. AI 분석 결과는 참고용이며, 이를 근거로 내린 이용자의 의사결정에 대한 책임은 이용자 본인에게 있습니다.",
            "천재지변, 통신 장애, 제3자 서비스(OpenAI, Polar 등)의 장애로 인한 서비스 중단에 대해 운영자는 책임을 지지 않습니다.",
            "운영자의 고의 또는 중과실이 아닌 한, 서비스 이용으로 발생한 손해에 대한 배상 책임은 해당 서비스 이용 금액을 초과하지 않습니다.",
          ],
        },
        {
          title: "제6조 (서비스 변경 및 중단)",
          bullets: [
            "운영자는 서비스 기능·결과 문구·추천 로직·요금제를 사전 공지 후 변경할 수 있습니다.",
            "서비스 전체 종료 시 최소 30일 전 서비스 내 공지를 통해 안내합니다.",
            "점검·기술적 사유로 인한 일시적 서비스 중단은 사전 또는 사후에 공지합니다.",
          ],
        },
        {
          title: "제7조 (준거법 및 분쟁 해결)",
          bullets: [
            "본 약관은 대한민국 법령에 따라 해석되고 적용됩니다.",
            "서비스 이용과 관련하여 분쟁이 발생한 경우 운영자와 이용자는 상호 협의를 통해 해결하도록 노력합니다.",
            "협의가 이루어지지 않을 경우 민사소송법에 따른 관할 법원에서 해결합니다.",
          ],
        },
        {
          title: "제8조 (문의)",
          bullets: [
            "약관 관련 문의, 이의 제기: caelestis@empas.com",
            "영업일 기준 7일 이내 답변을 드립니다.",
          ],
        },
      ],
    },
  },
  en: {
    nav: { start: "Start", home: "Home", backHome: "Back to Home", retry: "Try Again", about: "About", privacy: "Privacy", refund: "Refund Policy", terms: "Terms" },
    localeNames: { ko: "한국어", en: "English", ja: "日本語" },
    home: {
      eyebrow: "DRAMA CASTING TEST",
      title: "A Drama Casting Test from One Photo",
      heroEyebrow: "Character-first entertainment",
      heroTitleA: "Which",
      heroTitleB: "drama role fits your vibe?",
      heroDescription:
        "This service does not rate appearance. It reads the mood and impression of a face photo and lightly recommends genres and character types that fit best.",
      startTest: "Start Test",
      noticeLink: "Before You Start",
      stepsTitle: "How it works",
      steps: [
        { title: "Upload a photo", description: "Start with one photo where the face is easy to see." },
        { title: "Quick mood check", description: "We do a light check first to see if the photo is ready for results." },
        { title: "Get your character", description: "You get a main character card and the top matching genres." },
      ],
      features: [
        { title: "One-photo upload", description: "Start with a face photo close to the front. We check the photo briefly right after upload." },
        { title: "Genre and role match", description: "See which genres such as romance, crime, youth, and legal fit your overall vibe." },
        { title: "Shareable result card", description: "Your result is organized into a card you can share right away." },
      ],
      editorialTitle: "Understand the service before you start",
      editorialDescription:
        "Before starting the test, visitors can see how the result is built, what kind of photo works better, and how to read the character card more naturally.",
      guideCta: "Read the guide",
      policyTitle: "Policies and help",
      policyDescription:
        "Privacy, usage notes, and service details are organized in one place so the product feels clearer and more trustworthy to first-time visitors.",
      noticeTitle: "Before you start",
      notices: [
        "We do not score appearance or rank people.",
        "This is entertainment-focused character matching, not a real personality diagnosis.",
        "Uploaded photos are only used briefly to generate the result and are not stored long-term.",
      ],
      guideTitle: "Tips for better photos",
      guideItems: [
        "A photo close to the front usually gives the cleanest result.",
        "Photos where the face is not covered work best.",
        "A single-person photo is recommended.",
        "If the image is too blurry or dark, we may suggest another photo.",
      ],
    },
    upload: { eyebrow: "UPLOAD", title: "Upload a photo and get your casting result" },
    result: { eyebrow: "RESULT", title: "Drama Casting Result" },
    uploadPanel: {
      eyebrow: "PHOTO UPLOAD",
      title: "Get a casting result from one face photo",
      description: "Just upload one selfie. We read the overall mood and show which drama role fits best in a fun, lightweight way.",
      uploadTitle: "Upload a photo",
      uploadHint: "A photo where your face is easy to see usually gives the cleanest result.",
      chooseLibrary: "Choose from library",
      mobileCamera: "Use phone camera",
      desktopCamera: "Use webcam",
      desktopCameraLoading: "Opening camera...",
      mobileHint: "On mobile, this can open the front camera directly, or you can choose a photo from your gallery.",
      desktopHint: "On desktop, you can choose a file or use your webcam.",
      webcamTitle: "Webcam capture",
      close: "Close",
      useShot: "Use this shot",
      cancel: "Cancel",
      selectedFile: "Selected file",
      noFile: "No photo selected yet",
      characterTone: "Character choice",
      toneHint: "Pick the character direction you want to see first.",
      toneMale: "Male characters",
      toneFemale: "Female characters",
      toneMaleSub: "Leads, rivals, and grounded supporting roles",
      toneFemaleSub: "Romance, leads, and strong supporting roles",
      quickCheck: "Quick check before upload",
      checking: "We are doing a quick check to see if this photo is ready. One moment.",
      quickCheckHint: "We do a light check to see if the face is clearly visible. Even if this step is skipped, you can still get a result.",
      notesTitle: "Quick notes",
      notes: [
        "We do not rate appearance. We only look at mood and character feel.",
        "A photo with one person usually gives a cleaner result.",
        "If the photo is too blurry, we may ask for another one.",
      ],
      submit: "See my result",
      submitting: "Preparing your result...",
      webcamNotSupported: "This browser does not support webcam capture.",
      webcamOpenError: "Could not open the camera. Please check permissions or upload a photo instead.",
      captureError: "Could not prepare the captured image. Please try again.",
      filePrepError: "Something went wrong while preparing the photo. Please try again.",
    },
    share: {
      native: "Share",
      instagram: "Instagram",
      facebook: "Facebook",
      copyLink: "Copy link",
      kakao: "KakaoTalk",
      kakaoView: "View result",
      instagramHint: "For Instagram, we copy the caption first so you can paste it in the app.",
      kakaoHint: "Add a Kakao key to enable direct sharing.",
      copiedLink: "Link copied.",
      copiedResultLink: "Result link copied.",
      copiedInstagram: "Instagram caption copied.",
      copiedKakao: "KakaoTalk text copied.",
    },
    resultUi: {
      loadingTitle: "Building your result",
      emptyEyebrow: "We couldn't load the result yet",
      emptyTitle: "Please start from upload again",
      emptyDescription: "Upload a photo again and we will rebuild your character result.",
      headerEyebrow: "DRAMA CASTING TEST",
      headerTitle: "Your character result is ready",
      friendShare: "A line worth sharing",
      works: "Works with a similar vibe",
      actors: "Actor mood references",
      actorsHint: "These are vibe references for this character type, not look-alike matches. The actors mentioned are not affiliated with or endorsing this service.",
      storageNote: "Your photo is sent to an external AI service (OpenAI) to generate results, and is not stored long-term.",
      entertainmentNote: "This service is for entertainment purposes only. It is not a scientific analysis or diagnosis of appearance, and results are of a random nature.",
    },
    footer: {
      privacyTitle: "Privacy",
      privacyBody: "Uploaded photos are only used briefly to generate the result and are not stored long-term.",
      refundTitle: "Refund Policy",
      termsTitle: "Terms",
      termsBody: "This service is for entertainment purposes only and is not a scientific analysis or diagnosis of appearance. All actors and works mentioned are unrelated to this service.",
      contactTitle: "Contact",
      address: "Goyang-si, Gyeonggi-do, South Korea",
      email: "caelestis@empas.com",
    },
    about: {
      title: "What is Drama Casting Test?",
      intro:
        "Drama Casting Test is an entertainment-style service that reads the mood and impression of a face photo and recommends genres and character roles that fit that vibe.",
      sections: [
        {
          title: "What this service looks at",
          body: "It does not judge attractiveness. It focuses on mood signals like calmness, intensity, warmth, mystery, and screen presence.",
        },
        {
          title: "How results are created",
          body: "The system combines mood cues and genre references to produce a main character, support options, genre matches, and reference cards.",
        },
        {
          title: "What kind of photo works best",
          body: "A near-frontal face photo with one person and a clearly visible face usually gives the most stable result.",
        },
      ],
      detailSections: [
        {
          title: "How to think about this service",
          paragraphs: [
            "This is not a beauty score or a ranking tool. It is a playful casting-style experience that translates the mood of a face photo into drama roles and genre vibes.",
            "The best way to read it is as entertainment: a fun guess at what kind of role feels natural for the image you uploaded.",
          ],
        },
        {
          title: "How results are built",
          paragraphs: [
            "The service first looks at broad mood signals such as calmness, intensity, softness, intelligence, warmth, mystery, and screen presence.",
            "Those signals are then mapped to genre moods like romance, crime, thriller, legal, or youth, and finally turned into a main character and support candidates.",
          ],
        },
        {
          title: "What kind of photo works best",
          paragraphs: [
            "A near-frontal photo with one clearly visible face usually gives the most stable result. A photo where the face is too small, covered, blurry, or very dark may reduce consistency.",
          ],
          bullets: [
            "Near-frontal photo",
            "Face clearly visible",
            "One person in the image",
            "Not too dark or blurry",
          ],
        },
        {
          title: "How to read the result",
          paragraphs: [
            "The main character is the strongest match from the current photo. The two support options are nearby alternatives that fit the same mood in different ways.",
            "Top genres show which story worlds fit the overall vibe most naturally.",
            "Work references and actor mood references are not look-alike matches. They are only there to help you picture the tone of the result.",
          ],
        },
        {
          title: "What this service does not do",
          paragraphs: [
            "It does not score appearance or rank people. It does not estimate sensitive traits such as age, race, health, or political views.",
            "Photos are only used briefly for result generation and are not intended for long-term storage.",
          ],
        },
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why can the result change from photo to photo?",
          answer:
            "Because expression, angle, lighting, and mood can all change the impression of a single image. Different photos can highlight different casting vibes.",
        },
        {
          question: "Why do I choose male-role or female-role direction first?",
          answer:
            "That choice keeps the result more consistent. It is not automatic gender recognition from the face; it simply tells the service which character direction to prioritize.",
        },
        {
          question: "Why is the pre-check sometimes skipped?",
          answer:
            "Depending on browser conditions, the quick photo check may be skipped. Even then, the main result flow can still continue.",
        },
        {
          question: "Is this a real personality or appearance evaluation?",
          answer:
            "No. This is an entertainment-style character recommendation and should be treated as playful reference content.",
        },
      ],
    },
    privacyPage: {
      title: "Privacy Policy",
      intro:
        "Drama Casting Test (the 'Service') is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, how long we keep it, and your rights as a user. Effective date: March 1, 2025",
      sections: [
        {
          title: "1. Information We Collect",
          bullets: [
            "Required: Face photos you upload to the Service",
            "Automatic: Browser language setting, temporary session data stored in sessionStorage only",
            "Optional: Email address and message content when you contact us directly",
            "Payment: Payment details for premium purchases are collected directly by Polar — we never see or store your card number or billing information",
            "Collection methods: Directly provided by you (photo upload, email), or automatically generated during Service use",
          ],
        },
        {
          title: "2. How We Use Your Information",
          bullets: [
            "Face photos: Used solely to generate your AI-based drama character analysis result — no other purpose",
            "Language & session data: To display the correct language and maintain your result within the current session. Deleted automatically when you close the tab",
            "Email: Used only to respond to your inquiry. Never used for marketing",
            "Advertising (Google AdSense): To display interest-based ads to support the cost of running the Service",
          ],
        },
        {
          title: "3. Retention & Deletion",
          bullets: [
            "Face photos: Deleted immediately after the OpenAI Vision API processes them. We do not store your photos on our servers long-term",
            "Session data: Automatically cleared when your browser session ends",
            "Inquiry emails: Deleted within 1 year of resolving your inquiry",
            "Where retention is required by law, data is held only for the legally mandated period and then securely deleted",
          ],
        },
        {
          title: "4. Third-Party Service Providers",
          bullets: [
            "Image analysis: OpenAI (USA) — your photo is sent to the OpenAI Vision API to generate results. Per OpenAI's API usage policy, inputs are not used to train their models. (openai.com/policies)",
            "Payment processing: Polar (USA) — handles all premium transactions. Card data is managed solely by Polar and never stored by us. (polar.sh/legal)",
            "Advertising: Google LLC (USA) — Google AdSense may share cookies and identifiers to show personalized ads. (policies.google.com)",
            "No other third parties receive your personal data. Any future additions will be disclosed here.",
          ],
        },
        {
          title: "5. Cookies & Advertising",
          bullets: [
            "This Service uses Google AdSense, which uses cookies to serve ads based on your prior visits to this and other websites",
            "You can opt out of personalized advertising at any time via Google Ads Settings (adssettings.google.com)",
            "You may also disable cookies in your browser settings, though some Service features may not function correctly as a result",
            "We use Google Analytics to understand aggregate Service traffic and improve the user experience",
          ],
        },
        {
          title: "6. Your Rights",
          bullets: [
            "You may request access to, correction of, or deletion of your personal data at any time",
            "To submit a request, email us at caelestis@empas.com — we will respond within 7 business days",
            "We do not knowingly collect data from children under 13. If we become aware of such data, we will delete it immediately",
          ],
        },
        {
          title: "7. Contact",
          bullets: [
            "Privacy Officer: Service Operator",
            "Email: caelestis@empas.com",
            "This policy may be updated to reflect changes in law or the Service. Updates will be announced within the Service.",
          ],
        },
      ],
    },
    refundPage: {
      title: "Refund Policy",
      intro:
        "This Refund Policy applies to the paid premium result access for Drama Casting Test. Payments are processed by Polar, and this Service does not directly store card numbers or payment method details. Effective date: March 1, 2025",
      sections: [
        {
          title: "1. Product and Payment Model",
          bullets: [
            "Premium result access is a one-time payment product and is not a subscription.",
            "After successful payment, users receive access to an AI-powered Korean drama character-style result, including character type, personality impression, style keywords, and a shareable result page.",
            "All payments are processed through Polar Checkout. Polar's payment and refund handling procedures may also apply.",
          ],
        },
        {
          title: "2. Eligible Refunds",
          bullets: [
            "If payment succeeds but the Service fails to deliver the premium result due to a technical error or system fault, you may request a full refund.",
            "If payment succeeds but payment verification fails, premium access does not unlock, or the result page cannot be accessed, we will first try to restore access. If restoration is not possible, you may request a refund.",
            "If a duplicate payment occurs, you may request a refund for the duplicate charge.",
            "Refund requests must be sent within 7 days of payment to caelestis@empas.com and should include the payment email, payment time, and, if available, the Polar receipt or transaction ID.",
          ],
        },
        {
          title: "3. Non-Refundable Cases",
          bullets: [
            "Once the premium result has been successfully displayed, the digital content is considered delivered and refunds for change of mind are generally not available.",
            "If the result was delivered but an add-on feature such as email report delivery, share link access, or image saving fails, this may not qualify for an immediate refund. We will first provide resend, link regeneration, or technical support.",
            "Incorrect email addresses, spam filtering, temporary email delivery delays, browser issues, or user network problems may not qualify for a refund.",
            "Issues caused by the user's network, browser settings, device environment, or photo choice may not qualify for a refund.",
            "Results are AI-generated entertainment recommendations. The Service does not guarantee a specific actor match, a specific character outcome, or user satisfaction with the result.",
          ],
        },
        {
          title: "4. Processing Time and Contact",
          bullets: [
            "We will review refund requests and respond within 7 business days.",
            "To help us verify the issue faster, please include screenshots of the error, the payment receipt, the email address used, and the approximate time of the issue.",
            "Approved refunds are returned to the original payment method according to Polar's payment processing timeline.",
            "Once a refund is approved, premium result access, email resend support, and share link support connected to that purchase may be discontinued.",
            "Contact: caelestis@empas.com",
          ],
        },
      ],
    },
    termsPage: {
      title: "Terms of Service",
      intro:
        "These Terms of Service ('Terms') govern your use of Drama Casting Test (the 'Service'). By using the Service, you agree to these Terms. Effective date: March 1, 2025",
      sections: [
        {
          title: "1. Service Description & Nature",
          bullets: [
            "Drama Casting Test is an entertainment service that uses AI to analyze the mood and impression of an uploaded face photo and suggest matching Korean drama character types",
            "Results are for entertainment and reference purposes only. They are not medical diagnoses, psychological assessments, employment evaluations, or any form of official determination",
            "The Service does not score or rank appearance, infer sensitive attributes (age, ethnicity, disability, health, political views), or provide cosmetic or surgical advice",
          ],
        },
        {
          title: "2. User Responsibilities",
          bullets: [
            "You may only upload photos for which you have the right to use (your own photos or photos you have explicit permission to use)",
            "Uploading photos of others without their consent, or in a manner that violates portrait rights or intellectual property rights, is strictly prohibited",
            "Automated access, reverse engineering, scraping, or any attempt to extract or replicate the Service's logic is prohibited",
            "Any conduct that disrupts Service operations or harms other users may result in restricted access and potential legal liability",
          ],
        },
        {
          title: "3. Paid Features & Refund Policy",
          bullets: [
            "Premium results are a digital content service — the analysis is delivered immediately upon successful payment",
            "Because digital content is provided instantly upon purchase, refunds are generally not available once the result has been displayed, in accordance with applicable consumer protection law",
            "Exception: if the Service fails to deliver a result due to a technical error or system fault, you may request a full refund within 7 days of payment by contacting caelestis@empas.com with your transaction details",
            "Errors affecting add-on features such as email reports, share links, or image saving will first be handled through resend or restoration support. If restoration is not possible, refund eligibility may be reviewed",
            "All payments are processed by Polar. Polar's Terms of Service (polar.sh/legal) also apply to your purchase",
          ],
        },
        {
          title: "4. Intellectual Property",
          bullets: [
            "All Service content — including UI design, software code, text, and graphics — is owned by the Service operator",
            "Photos you upload remain your property. The Service uses them solely to generate your result and for no other purpose",
            "AI-generated result text is provided for your personal, non-commercial use only. Reselling or redistributing results commercially is prohibited",
            "Actor and work references within results are for informational mood-matching purposes only and do not imply any endorsement or affiliation",
          ],
        },
        {
          title: "5. Disclaimers & Limitation of Liability",
          bullets: [
            "The Service makes no warranties regarding the accuracy or completeness of AI-generated results. Any decisions you make based on results are your sole responsibility",
            "The operator is not liable for service interruptions caused by force majeure, telecommunications failures, or third-party service outages (OpenAI, Polar, etc.)",
            "To the maximum extent permitted by law, the operator's total liability for any claim arising from use of the Service shall not exceed the amount you paid for the relevant transaction",
          ],
        },
        {
          title: "6. Changes & Service Termination",
          bullets: [
            "The operator may modify Service features, pricing, recommendation logic, or these Terms at any time, with notice provided within the Service",
            "If the Service is discontinued entirely, at least 30 days advance notice will be given within the Service",
            "Temporary downtime for maintenance or technical reasons will be announced before or after the event",
          ],
        },
        {
          title: "7. Governing Law & Disputes",
          bullets: [
            "These Terms are governed by the laws of the Republic of Korea",
            "In the event of a dispute, both parties will first attempt to resolve it through good-faith negotiation",
            "If negotiation fails, disputes will be resolved in the competent court under Korean civil procedure law",
          ],
        },
        {
          title: "8. Contact",
          bullets: [
            "Questions or concerns about these Terms: caelestis@empas.com",
            "We will respond within 7 business days.",
          ],
        },
      ],
    },
  },
  ja: {
    nav: { start: "はじめる", home: "ホーム", backHome: "ホームへ", retry: "もう一度試す", about: "サービス紹介", privacy: "プライバシー", refund: "返金ポリシー", terms: "利用規約" },
    localeNames: { ko: "한국어", en: "English", ja: "日本語" },
    home: {
      eyebrow: "DRAMA CASTING TEST",
      title: "1枚の写真で見るドラマキャスティングテスト",
      heroEyebrow: "キャラクター重視のエンタメ",
      heroTitleA: "あなたはどんな",
      heroTitleB: "ドラマの役に似合う？",
      heroDescription:
        "このサービスは見た目を評価しません。顔写真から伝わる雰囲気やムードをもとに、似合うジャンルやキャラクターを気軽におすすめします。",
      startTest: "テストを始める",
      noticeLink: "利用前の案内",
      stepsTitle: "こんな流れです",
      steps: [
        { title: "写真をアップロード", description: "顔が見えやすい写真を1枚選べば準備完了です。" },
        { title: "かんたんチェック", description: "結果を出しやすい写真かどうかを軽く確認します。" },
        { title: "キャラクター結果", description: "似合うジャンルとメインキャラクターをカードで見せます。" },
      ],
      features: [
        { title: "写真1枚でOK", description: "正面に近い顔写真から始めます。アップロード直後に写真の状態を軽く確認します。" },
        { title: "ジャンルと役柄のおすすめ", description: "ロマンス、犯罪、青春、法廷などの中から、どんな雰囲気が合うかを見せます。" },
        { title: "共有しやすいカード", description: "結果をカード形式でまとめて、そのまま共有できます。" },
      ],
      editorialTitle: "始める前にサービスを理解する",
      editorialDescription:
        "テスト前に、どんな基準で結果が作られるのか、どんな写真が自然に出やすいのか、結果をどう読めばよいかを先に確認できます。",
      guideCta: "ガイドを見る",
      policyTitle: "案内とポリシー",
      policyDescription:
        "プライバシー、利用案内、サービス紹介を一か所にまとめ、初めてでも内容が分かりやすい構成にしています。",
      noticeTitle: "利用前の案内",
      notices: [
        "見た目の点数化や順位づけは行いません。",
        "結果はエンタメ向けのキャラクターおすすめであり、性格診断ではありません。",
        "アップロードした写真は結果生成のために短時間だけ使い、長期保存はしません。",
      ],
      guideTitle: "写真のコツ",
      guideItems: [
        "正面に近い写真のほうが結果が安定しやすいです。",
        "顔が隠れていない写真がいちばんきれいに動きます。",
        "1人だけ写った写真がおすすめです。",
        "ぼやけすぎた写真や暗い写真は別の写真をお願いすることがあります。",
      ],
    },
    upload: { eyebrow: "UPLOAD", title: "写真をアップロードしてキャスティング結果を見る" },
    result: { eyebrow: "RESULT", title: "ドラマキャスティング結果" },
    uploadPanel: {
      eyebrow: "写真アップロード",
      title: "顔写真1枚でキャスティング結果を見る",
      description: "セルカを1枚アップロードするだけ。全体のムードを見て、どんなドラマの役が似合うかを気軽に見せます。",
      uploadTitle: "写真をアップロード",
      uploadHint: "顔がはっきり見える写真のほうが自然な結果になりやすいです。",
      chooseLibrary: "アルバムから選ぶ",
      mobileCamera: "スマホカメラで撮る",
      desktopCamera: "PCウェブカメラで撮る",
      desktopCameraLoading: "カメラを開いています...",
      mobileHint: "スマホではそのままカメラ撮影が開き、必要ならアルバム写真も選べます。",
      desktopHint: "PCではファイル選択かウェブカメラ撮影が使えます。",
      webcamTitle: "ウェブカメラ撮影",
      close: "閉じる",
      useShot: "この写真を使う",
      cancel: "キャンセル",
      selectedFile: "選択したファイル",
      noFile: "まだ写真が選ばれていません",
      characterTone: "キャラクター選択",
      toneHint: "先に見たいキャラクターの方向を選んでください。",
      toneMale: "男性キャラクター",
      toneFemale: "女性キャラクター",
      toneMaleSub: "主役、ライバル、支え役まで幅広く",
      toneFemaleSub: "ロマンス、主役、サブ役の流れで",
      quickCheck: "アップロード前のかんたん確認",
      checking: "この写真でそのまま進めてもよさそうか、軽く確認しています。少し待ってください。",
      quickCheckHint: "顔が見えやすい写真かを軽く確認します。この段階が省略されても結果は見ることができます。",
      notesTitle: "かんたんメモ",
      notes: [
        "見た目の評価はせず、雰囲気とキャラクター感だけを見ます。",
        "1人だけ写った写真のほうが結果がすっきり出やすいです。",
        "写真がぼやけている場合は別の写真をお願いすることがあります。",
      ],
      submit: "キャスティング結果を見る",
      submitting: "結果を準備しています...",
      webcamNotSupported: "このブラウザではウェブカメラ撮影に対応していません。",
      webcamOpenError: "カメラを開けませんでした。権限を確認するか、写真アップロードを使ってください。",
      captureError: "撮影画像を準備できませんでした。もう一度お試しください。",
      filePrepError: "写真の準備中に問題が発生しました。もう一度お試しください。",
    },
    share: {
      native: "共有",
      instagram: "Instagram",
      facebook: "Facebook",
      copyLink: "リンクをコピー",
      kakao: "カカオトーク",
      kakaoView: "結果を見る",
      instagramHint: "Instagramは文をコピーしてアプリに貼り付ける方式です。",
      kakaoHint: "カカオ共有キーを入れると直接共有できます。",
      copiedLink: "リンクをコピーしました。",
      copiedResultLink: "結果リンクをコピーしました。",
      copiedInstagram: "Instagram用の文をコピーしました。",
      copiedKakao: "カカオトーク用の文をコピーしました。",
    },
    resultUi: {
      loadingTitle: "結果を作成しています",
      emptyEyebrow: "まだ結果を読み込めていません",
      emptyTitle: "アップロードからやり直してください",
      emptyDescription: "写真をもう一度アップロードすると、キャラクター結果を作り直します。",
      headerEyebrow: "DRAMA CASTING TEST",
      headerTitle: "あなたのキャラクター結果が出ました",
      friendShare: "友だちに送りやすいひとこと",
      works: "こんな作品の雰囲気も似合います",
      actors: "近いムードの俳優レファレンス",
      actorsHint: "そっくり判定ではなく、このキャラクタータイプに合う雰囲気の参考例です。掲載している俳優はこのサービスと無関係であり、推薦・保証関係にありません。",
      storageNote: "写真は結果生成のため外部AIサービス（OpenAI）に送信され、生成後は長期保存しません。",
      entertainmentNote: "このサービスは純粋にエンタメ目的のキャラクターテストです。外見に関する科学的分析・診断ではなく、結果は参考程度にお楽しみください。",
    },
    footer: {
      privacyTitle: "プライバシー",
      privacyBody: "アップロードした写真は結果生成のために短時間だけ使い、長期保存はしません。",
      refundTitle: "返金ポリシー",
      termsTitle: "利用規約",
      termsBody: "このサービスはエンタメ向けのキャラクターおすすめであり、診断や判定を行うものではありません。",
      contactTitle: "お問い合わせ",
      address: "Goyang-si, Gyeonggi-do, South Korea",
      email: "caelestis@empas.com",
    },
    about: {
      title: "ドラマキャスティングテストとは？",
      intro:
        "ドラマキャスティングテストは、顔写真から伝わる雰囲気や印象をもとに、どんなジャンルや役柄が似合うかを気軽におすすめするエンタメ型サービスです。",
      sections: [
        {
          title: "このサービスが見るもの",
          body: "見た目の良し悪しではなく、落ち着き、強さ、親しみやすさ、神秘性、画面での存在感などのムードを見ます。",
        },
        {
          title: "結果ができる流れ",
          body: "写真から伝わるムードとジャンルの雰囲気を組み合わせ、メインキャラクター、候補、ジャンル、レファレンスを見せます。",
        },
        {
          title: "おすすめの写真",
          body: "正面に近く、顔がはっきり見え、1人だけ写っている写真がもっとも安定しやすいです。",
        },
      ],
      detailSections: [
        {
          title: "このサービスをどう見ればいいか",
          paragraphs: [
            "これは見た目の評価や順位づけではありません。顔写真から伝わる雰囲気を、ドラマの役柄やジャンルの言葉に置き換えて楽しむためのコンテンツです。",
            "性格診断として受け取るより、キャスティングボードをのぞくような感覚で読むのがいちばん自然です。",
          ],
        },
        {
          title: "結果ができる流れ",
          paragraphs: [
            "まず落ち着き、強さ、やわらかさ、知的さ、親しみやすさ、神秘性、画面での存在感などのムードを見ます。",
            "そのムードをロマンス、犯罪、スリラー、法廷、青春などのジャンルに重ねて、メインキャラクターと候補をまとめます。",
          ],
        },
        {
          title: "おすすめの写真",
          paragraphs: [
            "正面に近く、顔がはっきり見え、1人だけ写っている写真がいちばん安定しやすいです。顔が小さすぎたり、隠れていたり、暗すぎたりすると結果がぶれやすくなります。",
          ],
          bullets: [
            "正面に近い写真",
            "顔がはっきり見える写真",
            "1人だけ写っている写真",
            "暗すぎず、ぶれすぎていない写真",
          ],
        },
        {
          title: "結果の見方",
          paragraphs: [
            "メインキャラクターは今回の写真でいちばん強く出た役柄です。候補2つは、その近くにある別の見え方です。",
            "ジャンルTOP3は、この雰囲気がどんな物語の世界で自然に生きるかを見るための目安です。",
            "作品レファレンスや俳優ムードレファレンスは、そっくり判定ではなく、雰囲気を思い浮かべるための参考です。",
          ],
        },
        {
          title: "このサービスがしないこと",
          paragraphs: [
            "見た目の点数化や上下の判定はしません。年齢、人種、健康状態、政治的傾向などの敏感な属性も推定しません。",
            "写真は結果生成のために短時間だけ使用し、長期保存は前提にしていません。",
          ],
        },
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "写真ごとに結果が少し変わるのはなぜですか？",
          answer:
            "表情、角度、光、全体の空気感が変わると、1枚の写真から受ける印象も変わるためです。同じ人でも写真によって強く見えるムードが違うことがあります。",
        },
        {
          question: "なぜ最初に男性役寄り / 女性役寄りを選ぶのですか？",
          answer:
            "結果の方向をより安定させるためです。顔から自動で性別を判定するのではなく、どちらのキャラクター方向を優先して見せるかを決める役割です。",
        },
        {
          question: "事前チェックが省略されることはありますか？",
          answer:
            "ブラウザ環境によっては、アップロード前の簡単な点検が省略されることがあります。その場合でもメインの結果生成は続けられます。",
        },
        {
          question: "この結果を本当の診断のように見てもいいですか？",
          answer:
            "いいえ。これはエンタメ向けのキャラクターおすすめであり、診断や評価ではありません。気軽な参考として楽しむのがいちばん合っています。",
        },
      ],
    },
    privacyPage: {
      title: "プライバシーポリシー",
      intro:
        "Drama Casting Test（以下「本サービス」）は、利用者の個人情報を大切に扱います。本ポリシーは、本サービスが収集・利用・保管・削除する個人情報の範囲と方法を具体的にご案内します。施行日：2025年3月1日",
      sections: [
        {
          title: "1. 収集する個人情報の項目と収集方法",
          bullets: [
            "必須収集：利用者がアップロードした顔写真（画像ファイル）",
            "自動収集：ブラウザの言語設定、セッション内の一時的な結果データ（sessionStorageのみ）",
            "任意収集：お問い合わせメールをお送りいただいた場合のメールアドレスおよびお問い合わせ内容",
            "有料決済時：決済情報はPolarプラットフォームが直接収集します。本サービスはカード番号等の決済手段情報を収集・保存しません",
            "収集方法：利用者による直接提供（写真アップロード、メール問い合わせ）、サービス利用中の自動生成",
          ],
        },
        {
          title: "2. 個人情報の利用目的",
          bullets: [
            "顔写真：AIによるドラマキャラクター分析結果の生成のみを目的として使用",
            "言語設定・セッションデータ：サービス画面表示と結果の維持（ブラウザタブを閉じると自動消去）",
            "メール：お問い合わせへの返答のみに使用。マーケティング目的には一切使用しません",
            "広告（Google AdSense）：サービス運営費の確保を目的としたインタレストベース広告の表示",
          ],
        },
        {
          title: "3. 個人情報の保有期間と削除",
          bullets: [
            "顔写真：OpenAI Vision APIの処理完了後、即時削除。本サービスのサーバーには長期保存しません",
            "セッションデータ：ブラウザのタブ・セッション終了時に自動削除",
            "問い合わせメール：対応完了後1年以内に削除",
            "法令により保管が必要な場合は、該当法令の定める期間のみ保管後、速やかに削除します",
          ],
        },
        {
          title: "4. 第三者への個人情報提供",
          bullets: [
            "OpenAI（米国）：顔写真をキャラクター分析結果の生成目的でVision APIに送信。OpenAIのAPI利用ポリシーにより、API入力データはモデルの学習に使用されません。(openai.com/policies)",
            "Polar（米国）：プレミアム決済処理のために決済情報を提供。カード情報はPolarが管理し、本サービスには保存されません。(polar.sh/legal)",
            "Google LLC（米国）：Google AdSenseを通じた広告表示のため、Cookie・識別子を共有することがあります。(policies.google.com)",
            "上記3社以外には、利用者の同意なく個人情報を第三者に提供しません",
          ],
        },
        {
          title: "5. Cookieと広告",
          bullets: [
            "本サービスはGoogle AdSenseを通じて広告を提供します。Googleはお客様の過去の訪問履歴に基づいてインタレストベース広告を表示するためにCookieを使用します",
            "Google広告設定（adssettings.google.com）からいつでもパーソナライズ広告を無効にできます",
            "ブラウザ設定でCookieを拒否することもできますが、一部のサービス機能が制限される場合があります",
            "Google Analyticsを使用し、集計されたサービス利用状況を把握してユーザー体験を改善します",
          ],
        },
        {
          title: "6. 利用者の権利",
          bullets: [
            "利用者はいつでも自身の個人情報の照会・訂正・削除・処理停止を要請できます",
            "削除等のご依頼は caelestis@empas.com までご連絡ください。営業日7日以内に対応いたします",
            "13歳未満のお子様の個人情報は収集しておりません。該当が判明した場合、直ちに削除します",
          ],
        },
        {
          title: "7. 個人情報保護責任者およびお問い合わせ",
          bullets: [
            "個人情報保護責任者：サービス運営者",
            "メールアドレス：caelestis@empas.com",
            "本ポリシーは法令変更またはサービス変更に伴い改訂されることがあります。改訂時はサービス内でお知らせします。",
          ],
        },
      ],
    },
    refundPage: {
      title: "返金ポリシー",
      intro:
        "本返金ポリシーは、Drama Casting Testの有料プレミアム結果アクセスに適用されます。決済はPolarを通じて処理され、本サービスはカード番号などの決済手段情報を直接保存しません。施行日：2025年3月1日",
      sections: [
        {
          title: "1. 商品と決済方式",
          bullets: [
            "プレミアム結果アクセスは一回払いの商品であり、定期購読ではありません",
            "決済完了後、利用者はAIによるドラマキャラクター風の結果、キャラクタータイプ、印象キーワード、スタイルキーワード、共有用結果ページを利用できます",
            "すべての決済はPolar Checkoutを通じて処理され、Polarの決済および返金処理手続きも適用される場合があります",
          ],
        },
        {
          title: "2. 返金可能な場合",
          bullets: [
            "決済が完了したにもかかわらず、本サービスの技術的エラーまたはシステム不具合によりプレミアム結果が正常に提供されなかった場合、全額返金を申請できます",
            "決済完了後に決済確認エラーによりプレミアムアクセスが解除されない場合、または結果ページにアクセスできない場合は、まずアクセス復旧をサポートし、復旧できない場合に返金を申請できます",
            "重複決済が発生した場合、重複分の返金を申請できます",
            "返金申請は決済日から7日以内に、決済メールアドレス、決済時刻、可能であればPolarの領収書または取引IDを添えて caelestis@empas.com までご連絡ください",
          ],
        },
        {
          title: "3. 返金が制限される場合",
          bullets: [
            "プレミアム結果が正常に表示された後は、デジタルコンテンツが提供済みとみなされ、単純な心変わりによる返金は原則としてできません",
            "結果自体は提供されたものの、メールレポート送信、共有リンクの閲覧、画像保存などの付加機能のみで不具合が発生した場合、直ちに返金対象とはならない場合があります。まず再送信、リンク再生成、技術サポートを提供します",
            "メールアドレスの入力誤り、迷惑メール振り分け、一時的なメール受信遅延、ブラウザやネットワーク環境に起因するアクセス失敗は返金対象外となる場合があります",
            "利用者のネットワーク環境、ブラウザ設定、端末環境、写真選択に起因する問題は返金対象外となる場合があります",
            "結果はAIによるエンタメ向けおすすめです。特定の俳優との一致、特定のキャラクター結果、利用者の満足度を保証するものではありません",
          ],
        },
        {
          title: "4. 処理期間とお問い合わせ",
          bullets: [
            "返金申請を受領後、営業日7日以内に確認して返信します",
            "迅速な確認のため、エラー画面のスクリーンショット、決済領収書、使用したメールアドレス、発生時刻を添えてご連絡ください",
            "承認された返金は、Polarの決済処理スケジュールに従って元の決済手段へ返金されます",
            "返金が承認された場合、その購入に紐づくプレミアム結果アクセス、メール再送信、共有リンクのサポートは終了することがあります",
            "お問い合わせ：caelestis@empas.com",
          ],
        },
      ],
    },
    termsPage: {
      title: "利用規約",
      intro:
        "本利用規約（以下「本規約」）は、Drama Casting Test（以下「本サービス」）の利用条件および運営者と利用者との権利・義務関係を定めます。本サービスを利用することで、本規約に同意したものとみなします。施行日：2025年3月1日",
      sections: [
        {
          title: "第1条（サービスの内容と性格）",
          bullets: [
            "本サービスは、利用者がアップロードした顔写真の雰囲気・印象をAIが分析し、ドラマキャラクタータイプをおすすめするエンターテインメント用サービスです",
            "分析結果は娯楽・参考目的であり、医学的診断・心理評価・外見等級判定・採用や入試の合否判断等、いかなる公式的判定でもありません",
            "本サービスは外見を点数化・順位付けしたり、性別・人種・年齢・障害・疾病・政治的傾向等の敏感な属性を推定したりしません",
          ],
        },
        {
          title: "第2条（利用者の義務）",
          bullets: [
            "利用者は、利用権限のある写真のみをアップロードしてください",
            "他人の写真を同意なくアップロードすること、または肖像権・著作権を侵害する行為を禁じます",
            "自動化ツールによる大量アクセス、リバースエンジニアリング、スクレイピング等によるサービスの複製・解析行為を禁じます",
            "虚偽情報の入力、他者のアカウント詐称、悪意あるコードの挿入等、サービス運営を妨げる行為を禁じます",
            "上記の禁止行為に違反した場合、サービス利用が制限されるほか、法的責任が生じることがあります",
          ],
        },
        {
          title: "第3条（有料サービスおよび返金ポリシー）",
          bullets: [
            "プレミアム結果は、決済完了と同時にデジタルコンテンツ（分析結果）が提供されるサービスです",
            "デジタルコンテンツの性質上、結果が画面に表示された後は、消費者保護に関する法令に基づき、原則として返金はお受けできません",
            "ただし、本サービスの技術的な不具合・システム障害により結果が正常に提供されなかった場合は、決済日から7日以内にご連絡いただければ全額返金いたします",
            "メールレポート、共有リンク、画像保存など付加機能の不具合については、まず再送信または復旧サポートを行い、復旧できない場合に返金可否を検討します",
            "返金のご依頼：caelestis@empas.com に決済情報とともにご連絡ください",
            "決済はPolarプラットフォームを通じて処理され、Polarの利用規約（polar.sh/legal）も適用されます",
          ],
        },
        {
          title: "第4条（知的財産権）",
          bullets: [
            "本サービスのUI・UXデザイン、ソフトウェアコード、テキスト、画像等すべてのコンテンツの著作権は運営者に帰属します",
            "利用者がアップロードした写真の著作権は利用者に帰属し、本サービスは結果生成目的以外に当該写真を使用しません",
            "AIが生成した分析結果テキストは利用者の個人的・非商業的利用目的にのみ使用可能であり、商業的な再販・再配布は禁止します",
            "サービス内の俳優・作品レファレンスは情報提供目的であり、当該俳優・制作会社との公式提携・広告関係ではありません",
          ],
        },
        {
          title: "第5条（免責および損害賠償の制限）",
          bullets: [
            "本サービスは分析結果の正確性・完全性を保証しません。AI分析結果を根拠とした利用者の意思決定の責任は利用者本人に帰属します",
            "天災、通信障害、第三者サービス（OpenAI、Polar等）の障害によるサービス中断について、運営者は責任を負いません",
            "運営者の故意または重大な過失がない限り、本サービス利用により発生した損害に対する賠償責任は、当該サービスの利用金額を超えないものとします",
          ],
        },
        {
          title: "第6条（サービスの変更および中断）",
          bullets: [
            "運営者はサービスの機能・料金・推薦ロジックおよび本規約を、事前告知の上で変更することができます",
            "サービスを全面終了する場合は、少なくとも30日前にサービス内で告知します",
            "点検・技術的理由による一時的なサービス中断は、事前または事後に告知します",
          ],
        },
        {
          title: "第7条（準拠法および紛争解決）",
          bullets: [
            "本規約は大韓民国の法令に従って解釈・適用されます",
            "本サービスの利用に関して紛争が生じた場合、運営者と利用者は誠実な協議によって解決するよう努めます",
            "協議が成立しない場合は、韓国の民事訴訟法に基づく管轄裁判所にて解決します",
          ],
        },
        {
          title: "第8条（お問い合わせ）",
          bullets: [
            "本規約に関するお問い合わせ・異議申し立て：caelestis@empas.com",
            "営業日7日以内にご返答いたします。",
          ],
        },
      ],
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;

export function getCopy(locale: Locale) {
  return pageCopy[locale];
}
