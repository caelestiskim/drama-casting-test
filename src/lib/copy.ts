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
      terms: "이용안내",
    },
    localeNames: {
      ko: "한국어",
      en: "English",
      ja: "日本語",
    },
    home: {
      eyebrow: "DRAMA CASTING TEST",
      title: "얼굴 한 장으로 보는 드라마 캐스팅 테스트",
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
      actorsHint: "닮은꼴이 아니라, 이번 결과와 함께 떠오르는 분위기 레퍼런스예요.",
      storageNote: "사진은 브라우저 안에서만 잠깐 쓰고 따로 오래 보관하지 않아요.",
      entertainmentNote: "이건 재미로 보는 캐릭터 테스트예요. 외모 평가나 등급 매기기는 하지 않아요.",
    },
    footer: {
      privacyTitle: "개인정보 안내",
      privacyBody: "업로드한 사진은 결과 생성에만 잠깐 쓰고 장기 저장하지 않습니다.",
      termsTitle: "이용 안내",
      termsBody: "이 서비스는 엔터테인먼트용 캐릭터 추천이며, 실제 진단이나 판정 서비스가 아닙니다.",
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
        "드라마 캐스팅 테스트는 방문자가 어떤 정보가 어디에 쓰이는지 쉽게 이해할 수 있도록, 현재 서비스 기준의 데이터 처리 방식을 정리해 두고 있습니다.",
      sections: [
        {
          title: "1. 어떤 정보를 다루나요",
          bullets: [
            "업로드한 얼굴 사진",
            "브라우저 안에서 잠깐 저장되는 결과 정보와 언어 설정",
            "문의 시 사용자가 직접 보내는 이메일 정보",
          ],
        },
        {
          title: "2. 사진은 어떻게 사용되나요",
          bullets: [
            "업로드한 사진은 캐릭터 추천 결과를 만들기 위한 입력값으로만 사용합니다.",
            "사진 원본은 장기 보관용 데이터베이스를 전제로 저장하지 않습니다.",
            "현재 서비스는 브라우저 세션과 결과 생성 흐름 안에서만 사진을 잠깐 사용합니다.",
          ],
        },
        {
          title: "3. 결과와 공유 링크",
          bullets: [
            "공유 링크에는 원본 사진 자체가 아니라 결과 문구와 카드 정보가 중심이 됩니다.",
            "서비스 구조가 바뀌면 공유 방식과 저장 범위도 함께 고지할 예정입니다.",
          ],
        },
        {
          title: "4. 쿠키, 광고, 외부 도구",
          bullets: [
            "이 사이트는 브라우저 기능과 외부 라이브러리를 이용해 언어 설정, 업로드 흐름, 얼굴 확인 같은 기능을 처리할 수 있습니다.",
            "향후 Google AdSense 같은 광고 도구를 연결하는 경우, 광고 쿠키와 관련 고지를 이 페이지에 함께 반영합니다.",
            "광고가 적용될 경우 사용자는 Google 광고 설정 등 관련 설정 페이지를 통해 개인화 광고 옵션을 조정할 수 있습니다.",
          ],
        },
        {
          title: "5. 제3자 전송 가능성",
          bullets: [
            "AI 분석 기능이 활성화되면 결과 생성을 위해 이미지 또는 파생 정보가 외부 API로 전달될 수 있습니다.",
            "이 경우 실제 연결된 제공자와 처리 목적은 서비스 문서와 환경 설정 기준으로 별도 고지합니다.",
          ],
        },
        {
          title: "6. 문의",
          bullets: [
            "개인정보와 서비스 운영 관련 문의는 아래 이메일로 받을 수 있습니다.",
            "caelestis@empas.com",
          ],
        },
      ],
    },
    termsPage: {
      title: "이용안내",
      intro:
        "드라마 캐스팅 테스트는 사진에서 느껴지는 분위기를 바탕으로, 드라마와 영화 속 어떤 역할이 잘 어울리는지 재미있게 풀어보는 엔터테인먼트형 서비스입니다.",
      sections: [
        {
          title: "1. 서비스 성격",
          bullets: [
            "이 서비스는 엔터테인먼트용 캐릭터 추천 서비스입니다.",
            "결과는 재미를 위한 참고용이며 실제 진단, 평가, 합격 여부 판단이 아닙니다.",
          ],
        },
        {
          title: "2. 서비스가 하지 않는 것",
          bullets: [
            "외모 점수화, 등급화, 미남/미녀 판정은 제공하지 않습니다.",
            "연령, 인종, 민족, 장애, 질병, 정치 성향 같은 민감한 속성 추정은 제공하지 않습니다.",
            "성형 추천, 비하 표현, 차별적 표현은 다루지 않습니다.",
          ],
        },
        {
          title: "3. 결과를 보는 방법",
          bullets: [
            "메인 캐릭터는 이번 사진에서 가장 강하게 떠오른 역할 흐름을 보여줍니다.",
            "보조 후보와 장르 TOP 3는 비슷한 분위기 안에서 함께 볼 수 있는 참고 카드입니다.",
            "작품/배우 레퍼런스는 닮은꼴 판정이 아니라 무드 참고용입니다.",
          ],
        },
        {
          title: "4. 이용자 유의사항",
          bullets: [
            "본인에게 업로드 권한이 있는 사진만 사용해 주세요.",
            "타인의 초상권이나 권리를 침해하는 방식의 업로드는 삼가 주세요.",
            "서비스 운영을 방해하거나 비정상적으로 사용하는 행위는 제한될 수 있습니다.",
          ],
        },
        {
          title: "5. 서비스 변경과 제한",
          bullets: [
            "기능, 결과 문구, 추천 로직, 공유 방식은 운영 과정에서 바뀔 수 있습니다.",
            "테스트용 기능이나 외부 API 연결 상태에 따라 일부 결과가 달라질 수 있습니다.",
          ],
        },
        {
          title: "6. 문의",
          bullets: [
            "서비스 이용과 정책 관련 문의는 아래 이메일로 받을 수 있습니다.",
            "caelestis@empas.com",
          ],
        },
      ],
    },
  },
  en: {
    nav: { start: "Start", home: "Home", backHome: "Back to Home", retry: "Try Again", about: "About", privacy: "Privacy", terms: "Terms" },
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
      actorsHint: "These are mood references, not look-alike matches.",
      storageNote: "Your photo is only used briefly in the browser and is not stored long-term.",
      entertainmentNote: "This is an entertainment-style character test. It does not rate appearance or rank people.",
    },
    footer: {
      privacyTitle: "Privacy",
      privacyBody: "Uploaded photos are only used briefly to generate the result and are not stored long-term.",
      termsTitle: "Terms",
      termsBody: "This service is for entertainment-style character matching and is not a real diagnosis or evaluation tool.",
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
        "Drama Casting Test explains, in plain language, what data is touched by the service and how it is used in the current version of the product.",
      sections: [
        {
          title: "1. What information may be handled",
          bullets: [
            "Uploaded face photos",
            "Temporary result data and language settings stored in the browser session",
            "Email information sent directly by the user when making an inquiry",
          ],
        },
        {
          title: "2. How uploaded photos are used",
          bullets: [
            "Uploaded photos are used only as input to generate the character recommendation result.",
            "Original photos are not intended to be stored in a long-term database.",
            "In the current service flow, photos are used temporarily within the browser session and result-generation process.",
          ],
        },
        {
          title: "3. Result links and sharing",
          bullets: [
            "Shared result links are designed around result text and card information rather than the original image itself.",
            "If the sharing structure changes later, the storage scope and disclosure will be updated in this page as well.",
          ],
        },
        {
          title: "4. Cookies, ads, and external tools",
          bullets: [
            "The site may use browser features and external libraries for language settings, upload flow, and face validation.",
            "If advertising tools such as Google AdSense are added later, cookie-related disclosures will be updated here.",
            "When ads are enabled, users may manage personalized advertising preferences through Google Ads Settings and related tools.",
          ],
        },
        {
          title: "5. Possible third-party transfer",
          bullets: [
            "If AI analysis is enabled, an image or derived information may be sent to an external API for result generation.",
            "When that happens, the active provider and processing purpose should be disclosed based on the deployed configuration.",
          ],
        },
        {
          title: "6. Contact",
          bullets: [
            "For privacy or service questions, contact:",
            "caelestis@empas.com",
          ],
        },
      ],
    },
    termsPage: {
      title: "Terms of Use",
      intro:
        "Drama Casting Test is an entertainment-style service that turns the mood of a face photo into a playful drama casting result.",
      sections: [
        {
          title: "1. Nature of the service",
          bullets: [
            "This is an entertainment-focused character recommendation service.",
            "Results are for playful reference and are not a diagnosis, assessment, or eligibility decision.",
          ],
        },
        {
          title: "2. What the service does not do",
          bullets: [
            "It does not score appearance, rank people, or label users as attractive or unattractive.",
            "It does not infer sensitive traits such as age, ethnicity, disability, illness, or political orientation.",
            "It does not provide cosmetic surgery advice, insults, or discriminatory language.",
          ],
        },
        {
          title: "3. How to read the result",
          bullets: [
            "The main character shows the strongest role direction suggested by the current photo.",
            "Secondary candidates and top genres are supporting references within a similar mood range.",
            "Work and actor references are mood references, not look-alike claims.",
          ],
        },
        {
          title: "4. User responsibilities",
          bullets: [
            "Please upload only photos that you have the right to use.",
            "Please avoid uploads that violate another person's portrait rights or other rights.",
            "Abuse or attempts to disrupt the service may be restricted.",
          ],
        },
        {
          title: "5. Changes and limitations",
          bullets: [
            "Features, copy, recommendation logic, and sharing formats may change over time.",
            "Some results may differ depending on experimental features or external API availability.",
          ],
        },
        {
          title: "6. Contact",
          bullets: [
            "For service and policy questions, contact:",
            "caelestis@empas.com",
          ],
        },
      ],
    },
  },
  ja: {
    nav: { start: "はじめる", home: "ホーム", backHome: "ホームへ", retry: "もう一度試す", about: "サービス紹介", privacy: "プライバシー", terms: "利用案内" },
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
      actorsHint: "そっくり判定ではなく、今回の結果に近い雰囲気の参考です。",
      storageNote: "写真はブラウザ内で短時間だけ使い、長期保存はしません。",
      entertainmentNote: "これはエンタメ向けのキャラクターテストです。見た目の評価や順位づけはしません。",
    },
    footer: {
      privacyTitle: "プライバシー",
      privacyBody: "アップロードした写真は結果生成のために短時間だけ使い、長期保存はしません。",
      termsTitle: "利用案内",
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
        "Drama Casting Test では、現在のサービスでどの情報をどのように扱うのかを分かりやすく整理して案内しています。",
      sections: [
        {
          title: "1. 扱う可能性のある情報",
          bullets: [
            "アップロードした顔写真",
            "ブラウザ内に一時保存される結果情報や言語設定",
            "問い合わせ時に利用者が直接送るメール情報",
          ],
        },
        {
          title: "2. 写真の使われ方",
          bullets: [
            "アップロードした写真はキャラクター結果を作るための入力としてのみ使います。",
            "元の写真を長期保存用データベースに保管する前提ではありません。",
            "現在のサービスでは、写真はブラウザセッションと結果生成の流れの中で一時的に使われます。",
          ],
        },
        {
          title: "3. 結果リンクと共有",
          bullets: [
            "共有リンクは元画像そのものよりも、結果テキストやカード情報を中心に構成されます。",
            "今後共有方式が変わる場合は、このページでも保存範囲を更新して案内します。",
          ],
        },
        {
          title: "4. Cookie、広告、外部ツール",
          bullets: [
            "このサイトは言語設定、アップロード導線、顔確認などのためにブラウザ機能や外部ライブラリを使うことがあります。",
            "将来 Google AdSense などの広告ツールを導入する場合は、Cookie に関する案内をこのページに追記します。",
            "広告が有効になる場合、利用者は Google 広告設定などを通じてパーソナライズ広告の設定を調整できます。",
          ],
        },
        {
          title: "5. 第三者への送信可能性",
          bullets: [
            "AI 分析機能が有効になると、結果生成のために画像または派生情報が外部 API に送られることがあります。",
            "その場合は、実際に接続されている提供者と利用目的を運用構成に合わせて別途案内します。",
          ],
        },
        {
          title: "6. お問い合わせ",
          bullets: [
            "プライバシーやサービス運営に関する問い合わせ先:",
            "caelestis@empas.com",
          ],
        },
      ],
    },
    termsPage: {
      title: "利用案内",
      intro:
        "Drama Casting Test は、顔写真から伝わるムードをもとに、ドラマや映画で似合う役柄を気軽に楽しむためのエンタメ型サービスです。",
      sections: [
        {
          title: "1. サービスの性格",
          bullets: [
            "このサービスはエンタメ向けのキャラクターおすすめサービスです。",
            "結果は楽しむための参考情報であり、診断、評価、合否判断ではありません。",
          ],
        },
        {
          title: "2. このサービスがしないこと",
          bullets: [
            "見た目の点数化、順位づけ、美醜判定は行いません。",
            "年齢、人種、民族、障害、病気、政治的傾向などの敏感な属性推定は行いません。",
            "整形の勧誘、侮辱的表現、差別的表現は扱いません。",
          ],
        },
        {
          title: "3. 結果の見方",
          bullets: [
            "メインキャラクターは今回の写真で最も強く見えた役の流れを示します。",
            "サブ候補とジャンル TOP 3 は近い雰囲気の中で一緒に見られる参考カードです。",
            "作品・俳優レファレンスはそっくり判定ではなく、ムード参考用です。",
          ],
        },
        {
          title: "4. 利用者へのお願い",
          bullets: [
            "利用権限のある写真のみアップロードしてください。",
            "他人の肖像権や権利を侵害する形での利用は避けてください。",
            "サービス運営を妨げる行為や不正利用は制限されることがあります。",
          ],
        },
        {
          title: "5. 変更と制限",
          bullets: [
            "機能、文言、推薦ロジック、共有形式は運営過程で変わることがあります。",
            "実験機能や外部 API の状態により、一部結果が変わる場合があります。",
          ],
        },
        {
          title: "6. お問い合わせ",
          bullets: [
            "サービス利用やポリシーに関する問い合わせ先:",
            "caelestis@empas.com",
          ],
        },
      ],
    },
  },
} as const satisfies Record<Locale, Record<string, unknown>>;

export function getCopy(locale: Locale) {
  return pageCopy[locale];
}
