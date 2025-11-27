// Bhagavad Gita - Sacred Wisdom Portal JavaScript

// ===== GLOBAL VARIABLES =====
let currentVerseIndex = 0;
let savedVerses = JSON.parse(localStorage.getItem('savedVerses')) || [];
let currentChapter = null;

// ===== VERSES DATABASE =====
const verses = [
    {
        chapter: 2,
        verse: 47,
        sanskrit: ["कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।", "मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥"],
        transliteration: ["karmaṇy evādhikāras te mā phaleṣu kadācana", "mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi"],
        translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
        theme: "Karma Yoga"
    },
    {
        chapter: 2,
        verse: 20,
        sanskrit: ["न जायते म्रियते वा कदाचिन्", "नायं भूत्वा भविता वा न भूयः।"],
        transliteration: ["na jāyate mriyate vā kadācin", "nāyaṁ bhūtvā bhavitā vā na bhūyaḥ"],
        translation: "For the soul there is neither birth nor death. It is not slain when the body is slain.",
        theme: "Nature of Soul"
    },
    {
        chapter: 18,
        verse: 66,
        sanskrit: ["सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।", "अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥"],
        transliteration: ["sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja", "ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ"],
        translation: "Abandon all varieties of dharma and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
        theme: "Surrender"
    },
    {
        chapter: 4,
        verse: 7,
        sanskrit: ["यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।", "अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥"],
        transliteration: ["yadā yadā hi dharmasya glānir bhavati bhārata", "abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham"],
        translation: "Whenever and wherever there is a decline in dharma and a predominant rise of adharma, at that time I descend Myself.",
        theme: "Divine Incarnation"
    },
    {
        chapter: 9,
        verse: 22,
        sanskrit: ["अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।", "तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥"],
        transliteration: ["ananyāś cintayanto māṁ ye janāḥ paryupāsate", "teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham"],
        translation: "To those who are constantly devoted and who always remember Me with love, I carry what they lack and I preserve what they have.",
        theme: "Divine Protection"
    },
    {
        chapter: 7,
        verse: 19,
        sanskrit: ["बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते।", "वासुदेवः सर्वमिति स महात्मा सुदुर्लभः॥"],
        transliteration: ["bahūnāṁ janmanām ante jñānavān māṁ prapadyate", "vāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ"],
        translation: "After many births and deaths, one who is actually in knowledge surrenders unto Me, knowing Me to be the cause of all causes and all that is. Such a great soul is very rare.",
        theme: "Self-Realization"
    },
    {
        chapter: 6,
        verse: 5,
        sanskrit: ["उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।", "आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥"],
        transliteration: ["uddhared ātmanātmānaṁ nātmānam avasādayet", "ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ"],
        translation: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.",
        theme: "Self-Control"
    },
    {
        chapter: 3,
        verse: 21,
        sanskrit: ["यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।", "स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥"],
        transliteration: ["yad yad ācarati śreṣṭhas tat tad evetaro janaḥ", "sa yat pramāṇaṁ kurute lokas tad anuvartate"],
        translation: "Whatever action a great man performs, common men follow. And whatever standards he sets by exemplary acts, all the world pursues.",
        theme: "Leadership"
    },
    
    // ===== CHAPTER 12 - BHAKTI YOGA (Complete) =====
    {
        chapter: 12,
        verse: 1,
        sanskrit: ["अर्जुन उवाच", "एवं सततयुक्ता ये भक्तास्त्वां पर्युपासते।", "ये चाप्यक्षरमव्यक्तं तेषां के योगवित्तमाः॥"],
        transliteration: ["arjuna uvāca", "evaṁ satata-yuktā ye bhaktās tvāṁ paryupāsate", "ye cāpy akṣaram avyaktaṁ teṣāṁ ke yoga-vittamāḥ"],
        translation: "Arjuna said: Those who are always engaged in devotional service and worship You with love, and those who worship the unmanifested, eternal—which of these is more perfect in knowledge of yoga?",
        wordMeaning: {
            "अर्जुनः": "Arjuna",
            "उवाच": "said",
            "एवम्": "thus",
            "सतत": "always/constantly",
            "युक्ताः": "engaged",
            "ये": "those who",
            "भक्ताः": "devotees",
            "त्वाम्": "You",
            "पर्युपासते": "worship with devotion",
            "ये": "those who",
            "च": "and",
            "अपि": "also",
            "अक्षरम्": "imperishable",
            "अव्यक्तम्": "unmanifested",
            "तेषाम्": "of them",
            "के": "who",
            "योग-वित्तमाः": "most perfect in yoga"
        },
        theme: "Devotional Inquiry"
    },
    {
        chapter: 12,
        verse: 2,
        sanskrit: ["श्रीभगवानुवाच", "मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते।", "श्रद्धया परयोपेतास्ते मे युक्ततमा मताः॥"],
        transliteration: ["śrī-bhagavān uvāca", "mayy āveśya mano ye māṁ nitya-yuktā upāsate", "śraddhayā parayopetās te me yuktatamā matāḥ"],
        translation: "The Supreme Lord said: Those who fix their minds on Me and always engage in My devotional service with supreme faith, I consider them to be most perfect in yoga.",
        wordMeaning: {
            "श्री-भगवान्": "The Supreme Lord",
            "उवाच": "said",
            "मयि": "in Me",
            "आवेश्य": "fixing",
            "मनः": "mind",
            "ये": "those who",
            "माम्": "Me",
            "नित्य": "always",
            "युक्ताः": "engaged",
            "उपासते": "worship",
            "श्रद्धया": "with faith",
            "परया": "supreme",
            "उपेताः": "endowed with",
            "ते": "they",
            "मे": "My",
            "युक्ततमाः": "most perfect in yoga",
            "मताः": "considered"
        },
        theme: "Supreme Devotion"
    },
    {
        chapter: 12,
        verse: 3,
        sanskrit: ["ये त्वक्षरमनिर्देश्यमव्यक्तं पर्युपासते।", "सर्वत्रगमचिन्त्यं च कूटस्थमचलं ध्रुवम्॥"],
        transliteration: ["ye tv akṣaram anirdeśyam avyaktaṁ paryupāsate", "sarvatra-gam acintyaṁ ca kūṭa-stham acalaṁ dhruvam"],
        translation: "But those who worship the imperishable, the indefinable, the unmanifested, which is omnipresent, inconceivable, unchanging, immovable and eternal—",
        wordMeaning: {
            "ये": "those who",
            "तु": "but",
            "अक्षरम्": "imperishable",
            "अनिर्देश्यम्": "indefinable",
            "अव्यक्तम्": "unmanifested",
            "पर्युपासते": "worship completely",
            "सर्वत्र-गम्": "all-pervading",
            "अचिन्त्यम्": "inconceivable",
            "च": "and",
            "कूटस्थम्": "unchanging",
            "अचलम्": "immovable",
            "ध्रुवम्": "eternal"
        },
        theme: "Impersonal Worship"
    },
    {
        chapter: 12,
        verse: 4,
        sanskrit: ["सन्नियम्येन्द्रियग्रामं सर्वत्र समबुद्धयः।", "ते प्राप्नुवन्ति मामेव सर्वभूतहिते रताः॥"],
        transliteration: ["sanniyamyendriya-grāmaṁ sarvatra sama-buddhayaḥ", "te prāpnuvanti mām eva sarva-bhūta-hite ratāḥ"],
        translation: "By controlling their senses and being equally disposed toward everyone, such persons, engaged in the welfare of all beings, also achieve Me.",
        wordMeaning: {
            "सन्नियम्य": "controlling",
            "इन्द्रिय-ग्रामम्": "group of senses",
            "सर्वत्र": "everywhere",
            "सम-बुद्धयः": "equally disposed",
            "ते": "they",
            "प्राप्नुवन्ति": "achieve",
            "माम्": "Me",
            "एव": "certainly",
            "सर्व-भूत": "all beings",
            "हिते": "in welfare",
            "रताः": "engaged"
        },
        theme: "Equal Vision"
    },
    {
        chapter: 12,
        verse: 5,
        sanskrit: ["क्लेशोऽधिकतरस्तेषामव्यक्तासक्तचेतसाम्।", "अव्यक्ता हि गतिर्दुःखं देहवद्भिरवाप्यते॥"],
        transliteration: ["kleśo 'dhika-taras teṣām avyaktāsakta-cetasām", "avyaktā hi gatir duḥkhaṁ deha-vadbhir avāpyate"],
        translation: "Those whose minds are attached to the unmanifested face much more trouble, for the path of the unmanifested is very difficult for embodied beings to attain.",
        wordMeaning: {
            "क्लेशः": "difficulty/trouble",
            "अधिकतरः": "much greater",
            "तेषाम्": "for them",
            "अव्यक्त": "unmanifested",
            "आसक्त": "attached",
            "चेतसाम्": "whose minds",
            "अव्यक्ता": "unmanifested",
            "हि": "indeed",
            "गतिः": "path",
            "दुःखम्": "difficult",
            "देह-वद्भिः": "by embodied beings",
            "अवाप्यते": "is attained"
        },
        theme: "Difficulty of Impersonal Path"
    },
    {
        chapter: 12,
        verse: 6,
        sanskrit: ["ये तु सर्वाणि कर्माणि मयि संन्यस्य मत्पराः।", "अनन्येनैव योगेन मां ध्यायन्त उपासते॥"],
        transliteration: ["ye tu sarvāṇi karmāṇi mayi saṁnyasya mat-parāḥ", "ananyenaiva yogena māṁ dhyāyanta upāsate"],
        translation: "But those who surrender all their activities unto Me and are devoted to Me without deviation, engaging in devotional service and always meditating upon Me—",
        wordMeaning: {
            "ये": "those who",
            "तु": "but",
            "सर्वाणि": "all",
            "कर्माणि": "activities",
            "मयि": "unto Me",
            "संन्यस्य": "surrendering",
            "मत्-पराः": "devoted to Me",
            "अनन्येन": "without deviation",
            "एव": "certainly",
            "योगेन": "by devotional service",
            "माम्": "Me",
            "ध्यायन्तः": "meditating upon",
            "उपासते": "worship"
        },
        theme: "Complete Surrender"
    },
    {
        chapter: 12,
        verse: 7,
        sanskrit: ["तेषामहं समुद्धर्ता मृत्युसंसारसागरात्।", "भवामि नचिरात्पार्थ मय्यावेशितचेतसाम्॥"],
        transliteration: ["teṣām ahaṁ samuddhartā mṛtyu-saṁsāra-sāgarāt", "bhavāmi na cirāt pārtha mayy āveśita-cetasām"],
        translation: "For those whose thoughts are placed in Me, O Partha, I am soon the deliverer from the ocean of death and transmigration.",
        wordMeaning: {
            "तेषाम्": "for them",
            "अहम्": "I",
            "समुद्धर्ता": "deliverer",
            "मृत्यु": "death",
            "संसार": "material existence",
            "सागरात्": "from ocean",
            "भवामि": "become",
            "न चिरात्": "without delay",
            "पार्थ": "O Partha",
            "मयि": "in Me",
            "आवेशित": "absorbed",
            "चेतसाम्": "whose consciousness"
        },
        theme: "Divine Deliverance"
    },
    {
        chapter: 12,
        verse: 8,
        sanskrit: ["मय्येव मन आधत्स्व मयि बुद्धिं निवेशय।", "निवसिष्यसि मय्येव अत ऊर्ध्वं न संशयः॥"],
        transliteration: ["mayy eva mana ādhatsva mayi buddhiṁ niveśaya", "nivasiṣyasi mayy eva ata ūrdhvaṁ na saṁśayaḥ"],
        translation: "Just fix your mind upon Me, the Supreme Personality of Godhead, and engage all your intelligence in Me. Thus you will live in Me always, without a doubt.",
        wordMeaning: {
            "मयि": "in Me",
            "एव": "certainly",
            "मनः": "mind",
            "आधत्स्व": "fix",
            "मयि": "in Me",
            "बुद्धिम्": "intelligence",
            "निवेशय": "engage",
            "निवसिष्यसि": "you will live",
            "मयि": "in Me",
            "एव": "certainly",
            "अतः ऊर्ध्वम्": "hereafter",
            "न": "no",
            "संशयः": "doubt"
        },
        theme: "Mind and Intelligence in God"
    },
    {
        chapter: 12,
        verse: 9,
        sanskrit: ["अथ चित्तं समाधातुं न शक्नोषि मयि स्थिरम्।", "अभ्यासयोगेन ततो मामिच्छाप्तुं धनञ्जय॥"],
        transliteration: ["atha cittaṁ samādhātuṁ na śaknoṣi mayi sthiram", "abhyāsa-yogena tato mām icchāptuṁ dhanañ-jaya"],
        translation: "If you cannot fix your mind upon Me without deviation, then follow the regulative principles of devotional service and try to reach Me, O Arjuna.",
        wordMeaning: {
            "अथ": "if",
            "चित्तम्": "mind",
            "समाधातुम्": "to concentrate",
            "न": "not",
            "शक्नोषि": "you are able",
            "मयि": "upon Me",
            "स्थिरम्": "steadily",
            "अभ्यास-योगेन": "by practice of devotional service",
            "ततः": "then",
            "माम्": "Me",
            "इच्छा": "desire",
            "आप्तुम्": "to achieve",
            "धनञ्जय": "O Arjuna"
        },
        theme: "Gradual Practice"
    },
    {
        chapter: 12,
        verse: 10,
        sanskrit: ["अभ्यासेऽप्यसमर्थोऽसि मत्कर्मपरमो भव।", "मदर्थमपि कर्माणि कुर्वन्सिद्धिमवाप्स्यसि॥"],
        transliteration: ["abhyāse 'py asamartho 'si mat-karma-paramo bhava", "mad-artham api karmāṇi kurvan siddhim avāpsyasi"],
        translation: "If you cannot practice the regulative principles of devotional service, then just try to work for Me, because by working for Me you will come to the perfect stage.",
        wordMeaning: {
            "अभ्यासे": "in practice",
            "अपि": "even",
            "असमर्थः": "unable",
            "असि": "you are",
            "मत्-कर्म": "My work",
            "परमः": "dedicated",
            "भव": "become",
            "मत्-अर्थम्": "for My sake",
            "अपि": "even",
            "कर्माणि": "works",
            "कुर्वन्": "performing",
            "सिद्धिम्": "perfection",
            "अवाप्स्यसि": "you will achieve"
        },
        theme: "Working for the Divine"
    },
    {
        chapter: 12,
        verse: 11,
        sanskrit: ["अथैतदप्यशक्तोऽसि कर्तुं मद्योगमाश्रितः।", "सर्वकर्मफलत्यागं ततः कुरु यतात्मवान्॥"],
        transliteration: ["athaitad apy aśakto 'si kartuṁ mad-yogam āśritaḥ", "sarva-karma-phala-tyāgaṁ tataḥ kuru yatātmavān"],
        translation: "If, however, you are unable to work in this consciousness of Me, then just try to act giving up all results of your work and try to be self-situated.",
        wordMeaning: {
            "अथ": "if",
            "एतत्": "this",
            "अपि": "also",
            "अशक्तः": "unable",
            "असि": "you are",
            "कर्तुम्": "to perform",
            "मत्-योगम्": "devotional service to Me",
            "आश्रितः": "taking refuge",
            "सर्व-कर्म-फल": "all results of activities",
            "त्यागम्": "renunciation",
            "ततः": "then",
            "कुरु": "do",
            "यत-आत्मवान्": "self-controlled"
        },
        theme: "Renunciation of Results"
    },
    {
        chapter: 12,
        verse: 12,
        sanskrit: ["श्रेयो हि ज्ञानमभ्यासाज्ज्ञानाद्ध्यानं विशिष्यते।", "ध्यानात्कर्मफलत्यागस्त्यागाच्छान्तिरनन्तरम्॥"],
        transliteration: ["śreyo hi jñānam abhyāsāj jñānād dhyānaṁ viśiṣyate", "dhyānāt karma-phala-tyāgas tyāgāc chāntir anantaram"],
        translation: "If you cannot take to this practice, then engage yourself in the cultivation of knowledge. Better than knowledge, however, is meditation, and better than meditation is renunciation of the fruits of action, for by such renunciation one can attain peace of mind.",
        wordMeaning: {
            "श्रेयः": "better",
            "हि": "certainly",
            "ज्ञानम्": "knowledge",
            "अभ्यासात्": "than practice",
            "ज्ञानात्": "than knowledge",
            "ध्यानम्": "meditation",
            "विशिष्यते": "is better",
            "ध्यानात्": "than meditation",
            "कर्म-फल-त्यागः": "renunciation of fruits of action",
            "त्यागात्": "by renunciation",
            "शान्तिः": "peace",
            "अनन्तरम्": "immediately"
        },
        theme: "Hierarchy of Practices"
    },
    {
        chapter: 12,
        verse: 13,
        sanskrit: ["अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।", "निर्ममो निरहंकारः समदुःखसुखः क्षमी॥"],
        transliteration: ["adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca", "nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī"],
        translation: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant,",
        wordMeaning: {
            "अद्वेष्टा": "non-envious",
            "सर्व-भूतानाम्": "to all living entities",
            "मैत्रः": "friendly",
            "करुणः": "compassionate",
            "एव": "certainly",
            "च": "and",
            "निर्ममः": "without sense of proprietorship",
            "निरहंकारः": "without false ego",
            "सम": "equal",
            "दुःख-सुखः": "in distress and happiness",
            "क्षमी": "tolerant"
        },
        theme: "Divine Qualities - Part 1"
    },
    {
        chapter: 12,
        verse: 14,
        sanskrit: ["सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।", "मय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥"],
        transliteration: ["santuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ", "mayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ"],
        translation: "always satisfied, self-controlled, and possessed of firm conviction, who has dedicated his mind and intelligence to Me—such a devotee of Mine is very dear to Me.",
        wordMeaning: {
            "सन्तुष्टः": "satisfied",
            "सततम्": "always",
            "योगी": "devotee",
            "यत-आत्मा": "self-controlled",
            "दृढ-निश्चयः": "firm conviction",
            "मयि": "unto Me",
            "अर्पित": "dedicated",
            "मनः-बुद्धिः": "mind and intelligence",
            "यः": "who",
            "मत्-भक्तः": "My devotee",
            "सः": "he",
            "मे": "to Me",
            "प्रियः": "dear"
        },
        theme: "Divine Qualities - Part 2"
    },
    {
        chapter: 12,
        verse: 15,
        sanskrit: ["यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।", "हर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥"],
        transliteration: ["yasmān nodvijate loko lokān nodvijate ca yaḥ", "harṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ"],
        translation: "He by whom no one is put into difficulty and who is not disturbed by anyone, who is equipoised in happiness and distress, fear and anxiety, is very dear to Me.",
        wordMeaning: {
            "यस्मात्": "from whom",
            "न उद्विजते": "does not become agitated",
            "लोकः": "people",
            "लोकात्": "from people",
            "न उद्विजते": "is not disturbed",
            "च": "and",
            "यः": "who",
            "हर्ष": "happiness",
            "अमर्ष": "distress",
            "भय": "fear",
            "उद्वेगैः": "anxiety",
            "मुक्तः": "freed from",
            "यः": "who",
            "सः": "he",
            "च": "and",
            "मे": "to Me",
            "प्रियः": "dear"
        },
        theme: "Peaceful Nature"
    },
    {
        chapter: 12,
        verse: 16,
        sanskrit: ["अनपेक्षः शुचिर्दक्ष उदासीनो गतव्यथः।", "सर्वारम्भपरित्यागी यो मद्भक्तः स मे प्रियः॥"],
        transliteration: ["anapekṣaḥ śucir dakṣa udāsīno gata-vyathaḥ", "sarvārambha-parityāgī yo mad-bhaktaḥ sa me priyaḥ"],
        translation: "My devotee who is not dependent on the ordinary course of activities, who is pure, expert, without cares, free from all pains, and not striving for some result, is very dear to Me.",
        wordMeaning: {
            "अनपेक्षः": "without expectation",
            "शुचिः": "pure",
            "दक्षः": "expert",
            "उदासीनः": "neutral",
            "गत-व्यथः": "free from all distress",
            "सर्व-आरम्भ": "all endeavors",
            "परित्यागी": "renouncer of",
            "यः": "who",
            "मत्-भक्तः": "My devotee",
            "सः": "he",
            "मे": "to Me",
            "प्रियः": "very dear"
        },
        theme: "Detached Expert"
    },
    {
        chapter: 12,
        verse: 17,
        sanskrit: ["यो न हृष्यति न द्वेष्टि न शोचति न काङ्क्षति।", "शुभाशुभपरित्यागी भक्तिमान्यः स मे प्रियः॥"],
        transliteration: ["yo na hṛṣyati na dveṣṭi na śocati na kāṅkṣati", "śubhāśubha-parityāgī bhaktimān yaḥ sa me priyaḥ"],
        translation: "One who neither rejoices nor grieves, who neither laments nor desires, and who renounces both auspicious and inauspicious things—such a devotee is very dear to Me.",
        wordMeaning: {
            "यः": "who",
            "न हृष्यति": "does not rejoice",
            "न द्वेष्टि": "does not hate",
            "न शोचति": "does not lament",
            "न काङ्क्षति": "does not desire",
            "शुभ": "auspicious",
            "अशुभ": "inauspicious",
            "परित्यागी": "renouncer",
            "भक्तिमान्": "devotional",
            "यः": "who",
            "सः": "he",
            "मे": "to Me",
            "प्रियः": "dear"
        },
        theme: "Beyond Duality"
    },
    {
        chapter: 12,
        verse: 18,
        sanskrit: ["समः शत्रौ च मित्रे च तथा मानापमानयोः।", "शीतोष्णसुखदुःखेषु समः सङ्गविवर्जितः॥"],
        transliteration: ["samaḥ śatrau ca mitre ca tathā mānāpamānayoḥ", "śītoṣṇa-sukha-duḥkheṣu samaḥ saṅga-vivarjitaḥ"],
        translation: "One who is equal to friends and enemies, who is equipoised in honor and dishonor, heat and cold, happiness and distress, fame and infamy, who is always free from contaminating association,",
        wordMeaning: {
            "समः": "equal",
            "शत्रौ": "to enemy",
            "च": "and",
            "मित्रे": "to friend",
            "च": "also",
            "तथा": "so",
            "मान-अपमानयोः": "in honor and dishonor",
            "शीत-उष्ण": "cold and heat",
            "सुख-दुःखेषु": "in happiness and distress",
            "समः": "equipoised",
            "सङ्ग-विवर्जितः": "free from association"
        },
        theme: "Perfect Equilibrium"
    },
    {
        chapter: 12,
        verse: 19,
        sanskrit: ["तुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित्।", "अनिकेतः स्थिरमतिर्भक्तिमान्मे प्रियो नरः॥"],
        transliteration: ["tulya-nindā-stutir maunī santuṣṭo yena kenacit", "aniketaḥ sthira-matir bhaktimān me priyo naraḥ"],
        translation: "who is silent, satisfied with anything, without a sense of proprietorship, fixed in knowledge, engaged in devotional service—such a person is very dear to Me.",
        wordMeaning: {
            "तुल्य": "equal",
            "निन्दा-स्तुतिः": "in blame and praise",
            "मौनी": "silent",
            "सन्तुष्टः": "satisfied",
            "येन केनचित्": "with anything",
            "अनिकेतः": "without attachment to residence",
            "स्थिर-मतिः": "steady in knowledge",
            "भक्तिमान्": "engaged in devotion",
            "मे": "to Me",
            "प्रियः": "dear",
            "नरः": "person"
        },
        theme: "Silent Contentment"
    },
    {
        chapter: 12,
        verse: 20,
        sanskrit: ["ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते।", "श्रद्दधाना मत्परमा भक्तास्तेऽतीव मे प्रियाः॥"],
        transliteration: ["ye tu dharmyāmṛtam idaṁ yathoktaṁ paryupāsate", "śraddadhānā mat-paramā bhaktās te 'tīva me priyāḥ"],
        translation: "Those who follow this imperishable path of devotional service and who completely engage themselves with faith, making Me the supreme goal, are very, very dear to Me.",
        wordMeaning: {
            "ये": "those who",
            "तु": "but",
            "धर्म्य": "righteous",
            "अमृतम्": "nectar",
            "इदम्": "this",
            "यथा-उक्तम्": "as described",
            "पर्युपासते": "completely worship",
            "श्रद्दधानाः": "with faith",
            "मत्-परमाः": "making Me the supreme goal",
            "भक्ताः": "devotees",
            "ते": "they",
            "अतीव": "very much",
            "मे": "to Me",
            "प्रियाः": "dear"
        },
        theme: "Supreme Devotion"
    }
];

// ===== CHAPTERS DATA =====
const chaptersData = {
    1: { title: "Arjuna Vishada Yoga", subtitle: "The Dejection of Arjuna", verses: 47 },
    2: { title: "Sankhya Yoga", subtitle: "Transcendental Knowledge", verses: 72 },
    3: { title: "Karma Yoga", subtitle: "Path of Action", verses: 43 },
    4: { title: "Jnana Yoga", subtitle: "Path of Knowledge", verses: 42 },
    5: { title: "Karma Sannyasa Yoga", subtitle: "Path of Renunciation", verses: 29 },
    6: { title: "Atmasamyama Yoga", subtitle: "Path of Meditation", verses: 47 },
    7: { title: "Paramahamsa Vijnana Yoga", subtitle: "Knowledge of the Absolute", verses: 30 },
    8: { title: "Aksara Brahma Yoga", subtitle: "Attaining the Supreme", verses: 28 },
    9: { title: "Raja Vidya Yoga", subtitle: "The Most Confidential Knowledge", verses: 34 },
    10: { title: "Vibhuti Vistara Yoga", subtitle: "The Opulence of the Absolute", verses: 42 },
    11: { title: "Visvarupa Darsana Yoga", subtitle: "The Universal Form", verses: 55 },
    12: { title: "Bhakti Yoga", subtitle: "The Path of Devotion", verses: 20 },
    13: { title: "Ksetra Ksetrajna Vibhaga Yoga", subtitle: "The Field and the Knower", verses: 35 },
    14: { title: "Gunatraya Vibhaga Yoga", subtitle: "The Three Modes of Nature", verses: 27 },
    15: { title: "Purushottama Prapti Yoga", subtitle: "The Supreme Divine Personality", verses: 20 },
    16: { title: "Daivasura Sampad Vibhaga Yoga", subtitle: "Divine and Demoniac Natures", verses: 24 },
    17: { title: "Sraddhatraya Vibhaga Yoga", subtitle: "The Divisions of Faith", verses: 28 },
    18: { title: "Moksha Sannyasa Yoga", subtitle: "Conclusion - Liberation and Surrender", verses: 78 }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadDailyVerse();
    setupScrollAnimations();
    updateCurrentDate();
});

// ===== DYNAMIC META TAGS FOR SOCIAL SHARING =====
function updateSocialMetaTags() {
    // Only run on chapter pages
    if (!window.location.pathname.includes('chapter')) return;
    
    const chapterTitle = document.querySelector('.chapter-title-english')?.textContent || 'Bhagavad Gita Chapter';
    const chapterSubtitle = document.querySelector('.chapter-subtitle')?.textContent || '';
    const sanskritTitle = document.querySelector('.chapter-title')?.textContent || '';
    
    // Get chapter number from URL
    const chapterNumber = window.location.pathname.match(/chapter(\d+)/)?.[1];
    
    // Spiritual images for different chapters
    const chapterImages = {
        '1': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=630&fit=crop&crop=center&q=80', // Battlefield/warrior
        '2': 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=630&fit=crop&crop=center&q=80', // Soul/meditation
        '3': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&crop=center&q=80', // Action/work
        '4': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=center&q=80', // Knowledge/wisdom
        '5': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=630&fit=crop&crop=center&q=80', // Renunciation/peace
        '6': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop&crop=center&q=80', // Meditation/yoga
        '7': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=630&fit=crop&crop=center&q=80', // Divine knowledge
        '8': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&crop=center&q=80', // Eternal/cosmic
        '9': 'https://images.unsplash.com/photo-1582649264880-3e59c69c3b1e?w=1200&h=630&fit=crop&crop=center&q=80', // Royal knowledge/devotion
        '10': 'https://images.unsplash.com/photo-1593365081881-e8b19b1b5043?w=1200&h=630&fit=crop&crop=center&q=80', // Divine opulences
        '11': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&crop=center&q=80', // Universal form
        '12': 'https://images.unsplash.com/photo-1582649264880-3e59c69c3b1e?w=1200&h=630&fit=crop&crop=center&q=80', // Devotion/love
        '13': 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&h=630&fit=crop&crop=center&q=80', // Field and knower
        '14': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop&crop=center&q=80', // Three modes
        '15': 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=630&fit=crop&crop=center&q=80', // Supreme person
        '16': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=630&fit=crop&crop=center&q=80', // Divine vs demonic
        '17': 'https://images.unsplash.com/photo-1593365081881-e8b19b1b5043?w=1200&h=630&fit=crop&crop=center&q=80', // Faith/Om Tat Sat
        '18': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&h=630&fit=crop&crop=center&q=80'  // Liberation/surrender
    };
    
    const chapterImage = chapterImages[chapterNumber] || 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1200&h=630&fit=crop&crop=center&q=80';
    
    // Update Open Graph tags
    updateOrCreateMeta('og:title', `${chapterTitle} - ${chapterSubtitle}`);
    updateOrCreateMeta('og:description', `Discover Krishna's divine teachings in ${chapterTitle}. Complete with Sanskrit verses, translations, and spiritual insights from the sacred Bhagavad Gita.`);
    updateOrCreateMeta('og:image', chapterImage);
    updateOrCreateMeta('og:type', 'article');
    
    // Update Twitter tags
    updateOrCreateMeta('twitter:title', `${chapterTitle} - ${chapterSubtitle}`);
    updateOrCreateMeta('twitter:description', `Sacred wisdom from ${chapterTitle} with Sanskrit verses and English translations.`);
    updateOrCreateMeta('twitter:image', chapterImage);
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    
    // Update page title
    document.title = `${chapterTitle} - ${chapterSubtitle} | Bhagavad Gita`;
}

function updateOrCreateMeta(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
}

function initializeApp() {
    // Set random verse for daily verse
    currentVerseIndex = Math.floor(Math.random() * verses.length);
    
    // Setup navigation
    setupNavigation();
    
    // Setup chapter cards
    setupChapterCards();
    
    // Setup commentary tabs
    setupCommentaryTabs();
    
    // Update social meta tags for better sharing
    updateSocialMetaTags();
    
    console.log('🕉️ Bhagavad Gita Portal initialized');
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 80; // Account for fixed header
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== DAILY VERSE FUNCTIONALITY =====
function loadDailyVerse() {
    // Only load daily verse on the home page (index.html)
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/');
    
    if (!isHomePage) return;
    
    const currentVerse = verses[currentVerseIndex];
    updateVerseDisplay(currentVerse);
}

function updateVerseDisplay(verse) {
    // Only update verse display on home page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/');
    
    if (!isHomePage) return;
    
    const verseCard = document.querySelector('.verse-card');
    if (!verseCard) return;
    
    // Update verse number
    const verseNumber = verseCard.querySelector('.verse-number');
    if (verseNumber) {
        verseNumber.textContent = `Chapter ${verse.chapter}, Verse ${verse.verse}`;
    }
    
    // Update Sanskrit verse
    const sanskritVerse = verseCard.querySelector('.sanskrit-verse');
    if (sanskritVerse) {
        sanskritVerse.innerHTML = verse.sanskrit.map(line => `<p>${line}</p>`).join('');
    }
    
    // Update transliteration
    const transliteration = verseCard.querySelector('.transliteration');
    if (transliteration) {
        transliteration.innerHTML = verse.transliteration.map(line => `<p>${line}</p>`).join('');
    }
    
    // Update English translation
    const englishTranslation = verseCard.querySelector('.english-translation');
    if (englishTranslation) {
        englishTranslation.innerHTML = `<p>${verse.translation}</p>`;
    }
}

function getNewVerse() {
    // Only allow new verse functionality on home page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/');
    
    if (!isHomePage) return;
    
    currentVerseIndex = (currentVerseIndex + 1) % verses.length;
    const currentVerse = verses[currentVerseIndex];
    updateVerseDisplay(currentVerse);
    
    // Add animation
    const verseCard = document.querySelector('.verse-card');
    if (verseCard) {
        verseCard.style.opacity = '0.5';
        verseCard.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            verseCard.style.opacity = '1';
            verseCard.style.transform = 'scale(1)';
        }, 200);
    }
}

function shareVerse() {
    // Only allow share verse functionality on home page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/');
    
    if (!isHomePage) return;
    
    const currentVerse = verses[currentVerseIndex];
    const shareText = `${currentVerse.sanskrit.join('\n')}\n\n"${currentVerse.translation}"\n\n- Bhagavad Gita ${currentVerse.chapter}.${currentVerse.verse}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Bhagavad Gita Verse',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback for browsers without Web Share API
        copyToClipboard(shareText);
        showNotification('Verse copied to clipboard! 📋');
    }
}

function saveVerse() {
    // Only allow save verse functionality on home page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/' || 
                      window.location.pathname.endsWith('/');
    
    if (!isHomePage) return;
    
    const currentVerse = verses[currentVerseIndex];
    const verseId = `${currentVerse.chapter}-${currentVerse.verse}`;
    
    if (!savedVerses.some(saved => saved.id === verseId)) {
        savedVerses.push({
            id: verseId,
            ...currentVerse,
            savedAt: new Date().toISOString()
        });
        
        localStorage.setItem('savedVerses', JSON.stringify(savedVerses));
        showNotification('Verse saved! 💾');
    } else {
        showNotification('Verse already saved! ✅');
    }
}

// ===== CHAPTER FUNCTIONALITY =====
function setupChapterCards() {
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    chapterCards.forEach(card => {
        card.addEventListener('click', function() {
            const chapterNumber = parseInt(this.dataset.chapter);
            navigateToChapter(chapterNumber);
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });
}

function navigateToChapter(chapterNumber) {
    // Map of available chapter pages
    const availableChapters = {
        1: 'chapter1.html',
        2: 'chapter2.html',
        3: 'chapter3.html',
        4: 'chapter4.html',
        5: 'chapter5.html',
        6: 'chapter6.html',
        7: 'chapter7.html',
        8: 'chapter8.html',
        9: 'chapter9.html',
        10: 'chapter10.html',
        11: 'chapter11.html',
        12: 'chapter12.html',
        13: 'chapter13.html',
        14: 'chapter14.html',
        15: 'chapter15.html',
        16: 'chapter16.html',
        17: 'chapter17.html',
        18: 'chapter18.html'
    };
    
    if (availableChapters[chapterNumber]) {
        window.location.href = availableChapters[chapterNumber];
    } else {
        // For chapters that don't have dedicated pages yet, show a message
        showChapterComingSoon(chapterNumber);
    }
}

function showChapterComingSoon(chapterNumber) {
    const chapterData = chaptersData[chapterNumber];
    
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        border: 2px solid var(--primary-orange);
    `;
    
    notification.innerHTML = `
        <h3 style="color: var(--deep-saffron); margin-bottom: 1rem;">
            Chapter ${chapterNumber}: ${chapterData ? chapterData.title : 'Chapter'}
        </h3>
        <p style="margin-bottom: 1.5rem; color: var(--text-primary);">
            This chapter page is coming soon! 📖
        </p>
        <button onclick="this.parentElement.remove()" 
                style="background: var(--primary-orange); color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 6px; cursor: pointer;">
            Close
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// ===== COMMENTARY TABS =====
function setupCommentaryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function setupEventListeners() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Verse action buttons
    const shareBtn = document.querySelector('.verse-actions .btn:nth-child(1)');
    const saveBtn = document.querySelector('.verse-actions .btn:nth-child(2)');
    const newVerseBtn = document.querySelector('.verse-actions .btn:nth-child(3)');
    
    if (shareBtn) shareBtn.addEventListener('click', shareVerse);
    if (saveBtn) saveBtn.addEventListener('click', saveVerse);
    if (newVerseBtn) newVerseBtn.addEventListener('click', getNewVerse);
    
    // Social media sharing buttons
    setupSocialMediaButtons();
}

function setupSocialMediaButtons() {
    // Wait for DOM to be ready
    setTimeout(() => {
        const socialLinks = document.querySelectorAll('.social-links a');
        
        socialLinks.forEach((link, index) => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const icon = this.textContent.trim();
                switch(icon) {
                    case '📘':
                        shareOnFacebook();
                        break;
                    case '🐦':
                        shareOnTwitter();
                        break;
                    case '📷':
                        shareOnInstagram();
                        break;
                    case '📺':
                        openYouTube();
                        break;
                }
            });
            
            // Add hover effects
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) translateY(-2px)';
                this.style.transition = 'all 0.2s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
            });
        });
    }, 100);
}

function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        dateElement.textContent = currentDate;
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff7b00, #ff9500);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function createModal(id, content) {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-container">
                ${content}
            </div>
        </div>
    `;
    
    // Add modal styles if not present
    if (!document.getElementById('modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease-in-out;
            }
            
            .modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-container {
                background: white;
                border-radius: 16px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: scale(0.9);
                transition: transform 0.3s ease-in-out;
            }
            
            .modal.active .modal-container {
                transform: scale(1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem;
                border-bottom: 1px solid #e0e0e0;
            }
            
            .modal-header h2 {
                margin: 0;
                color: #5d4037;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #757575;
                transition: color 0.2s;
            }
            
            .modal-close:hover {
                color: #ff7b00;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .chapter-verse-item {
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: #fafafa;
                border-radius: 12px;
                border-left: 4px solid #ff7b00;
            }
            
            .verse-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .verse-number {
                font-weight: 600;
                color: #ff7b00;
            }
            
            .verse-theme {
                font-size: 0.875rem;
                color: #757575;
                background: white;
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
            }
            
            .verse-sanskrit {
                font-family: 'Noto Sans Devanagari', sans-serif;
                font-size: 1.125rem;
                color: #e65100;
                margin-bottom: 1rem;
                line-height: 1.8;
            }
            
            .verse-translation {
                color: #2c2c2c;
                line-height: 1.7;
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Close modal functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-backdrop') || e.target.classList.contains('modal-close')) {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    });
    
    return modal;
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    setTimeout(() => {
        const elementsToObserve = document.querySelectorAll(
            '.chapter-card, .teaching-card, .commentary-card, .verse-card'
        );
        
        elementsToObserve.forEach(element => {
            element.classList.add('scroll-reveal');
            observer.observe(element);
        });
    }, 100);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Space or N for new verse
    if ((e.code === 'Space' || e.key === 'n') && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            getNewVerse();
        }
    }
    
    // S for save verse
    if (e.key === 's' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            saveVerse();
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images when they come into viewport
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== LOCAL STORAGE MANAGEMENT =====
function getSavedVerses() {
    return JSON.parse(localStorage.getItem('savedVerses')) || [];
}

function clearSavedVerses() {
    localStorage.removeItem('savedVerses');
    savedVerses = [];
    showNotification('Saved verses cleared! 🗑️');
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function setupAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #ff7b00;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels where needed
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// ===== SOCIAL MEDIA SHARING =====
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    
    // Use Facebook's sharer with Open Graph meta tags
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    
    window.open(shareUrl, 'facebook-share', 'width=626,height=436,scrollbars=yes,resizable=yes');
    trackSocialShare('facebook');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    let title, hashtags;
    
    // Customize content based on current page
    if (window.location.pathname.includes('chapter')) {
        const chapterTitle = document.querySelector('.chapter-title-english')?.textContent || 'Bhagavad Gita Chapter';
        const chapterSubtitle = document.querySelector('.chapter-subtitle')?.textContent || '';
        title = encodeURIComponent(`📖 ${chapterTitle}: ${chapterSubtitle}\n\n🕉️ Discover Krishna's divine wisdom in this sacred chapter.`);
        hashtags = encodeURIComponent('BhagavadGita,Krishna,Spirituality,Wisdom,Yoga,Dharma,SanskritWisdom');
    } else {
        title = encodeURIComponent('🕉️ Complete Bhagavad Gita with Sanskrit verses & translations\n\n📿 18 chapters of eternal spiritual wisdom\n🙏 Perfect for daily study & meditation');
        hashtags = encodeURIComponent('BhagavadGita,Krishna,Spirituality,Wisdom,Yoga,SacredTexts,Meditation');
    }
    
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}`;
    window.open(shareUrl, 'twitter-share', 'width=626,height=436,scrollbars=yes,resizable=yes');
    trackSocialShare('twitter');
}

function shareOnInstagram() {
    const url = window.location.href;
    
    let shareText, storyText;
    if (window.location.pathname.includes('chapter')) {
        const chapterTitle = document.querySelector('.chapter-title-english')?.textContent || 'Bhagavad Gita Chapter';
        const chapterSubtitle = document.querySelector('.chapter-subtitle')?.textContent || '';
        const sanskritTitle = document.querySelector('.chapter-title')?.textContent || '';
        
        shareText = `📖 ${chapterTitle}\n${sanskritTitle}\n\n✨ ${chapterSubtitle}\n\n🕉️ Discover Krishna's divine teachings in this sacred chapter of the Bhagavad Gita\n\n🔗 Link in bio: ${url}\n\n#BhagavadGita #Krishna #Spirituality #Wisdom #Yoga #Sanskrit #Dharma #Meditation #SacredTexts #SpiritualWisdom`;
        
        storyText = `Currently studying: ${chapterTitle} 📖\n\n🕉️ Swipe up for full chapter\n\n#BhagavadGita #Krishna`;
    } else {
        shareText = `🕉️ BHAGAVAD GITA\nSacred Wisdom Portal\n\n📖 Complete 18 chapters with:\n✨ Sanskrit verses\n🌟 English translations\n💫 Word-by-word meanings\n🙏 Spiritual insights\n\n🔗 ${url}\n\n#BhagavadGita #Krishna #Spirituality #SacredWisdom #Yoga #Sanskrit #Dharma #Meditation #Philosophy #HinduScripture`;
        
        storyText = `🕉️ Complete Bhagavad Gita\nwith Sanskrit & translations\n\nSwipe up to explore! 📖`;
    }
    
    copyToClipboard(shareText);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #E1306C, #F56040, #FFDC80);
        color: white;
        padding: 2.5rem;
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(225, 48, 108, 0.4);
        z-index: 10000;
        text-align: center;
        max-width: 450px;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(10px);
    `;
    
    notification.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1.5rem; animation: bounce 2s infinite;">📱</div>
        <h3 style="margin-bottom: 1rem; color: white; font-size: 1.5rem;">Share on Instagram</h3>
        <p style="margin-bottom: 2rem; line-height: 1.6; opacity: 0.95;">
            Perfect caption & link copied! Choose how you'd like to share this spiritual wisdom.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem;">
            <button onclick="this.parentElement.parentElement.parentElement.remove(); window.open('https://instagram.com', '_blank')" 
                    style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.4); padding: 1rem 1.5rem; border-radius: 12px; cursor: pointer; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem;">
                📱 Open Instagram
            </button>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                    style="background: rgba(255,255,255,0.9); color: #E1306C; border: none; padding: 1rem 1.5rem; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
                ✅ Done
            </button>
        </div>
        <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 1.5rem; text-align: left; max-height: 150px; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <strong style="color: white;">📋 Ready to paste:</strong>
                <span style="font-size: 0.8rem; opacity: 0.7;">Post or Story</span>
            </div>
            <div style="font-size: 0.9rem; opacity: 0.9; font-style: italic; line-height: 1.4; border-left: 3px solid rgba(255,255,255,0.3); padding-left: 1rem;">
                ${shareText.substring(0, 200)}${shareText.length > 200 ? '...' : ''}
            </div>
        </div>
        <div style="margin-top: 1rem; font-size: 0.85rem; opacity: 0.8; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <span>💡</span> Tip: Works great for both Posts and Stories!
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Copy the full caption too
    copyToClipboard(shareText);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
        if (style.parentElement) {
            style.remove();
        }
    }, 10000);
    
    trackSocialShare('instagram');
}

function openYouTube() {
    let searchQuery;
    if (window.location.pathname.includes('chapter')) {
        const chapterTitle = document.querySelector('.chapter-title-english')?.textContent || 'Bhagavad Gita Chapter';
        searchQuery = encodeURIComponent(`Bhagavad Gita ${chapterTitle} explanation commentary`);
    } else {
        searchQuery = encodeURIComponent('Bhagavad Gita spiritual teachings Krishna');
    }
    
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
    trackSocialShare('youtube');
}

function trackSocialShare(platform) {
    // Track social sharing for analytics
    console.log(`📊 Social share: ${platform}`);
    
    // Show success notification
    const messages = {
        'facebook': 'Shared on Facebook! 📘',
        'twitter': 'Shared on Twitter! 🐦',
        'instagram': 'Ready for Instagram! 📷',
        'youtube': 'Opened YouTube! 📺'
    };
    
    showNotification(messages[platform] || 'Shared successfully! 🎉');
}

// ===== INITIALIZE ACCESSIBILITY =====
setupAccessibility();

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('🕉️ Ready for offline service worker implementation');
    });
}

// ===== ANALYTICS TRACKING =====
function trackEvent(action, category = 'engagement') {
    // Analytics tracking would be implemented here
    console.log(`📊 Event tracked: ${action} in ${category}`);
}

// Track verse interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn')) {
        const buttonText = e.target.textContent.trim();
        trackEvent(`button_click_${buttonText.toLowerCase().replace(' ', '_')}`);
    }
});

console.log('🕉️ Bhagavad Gita Portal JavaScript loaded successfully');
console.log('📚 Available keyboard shortcuts:');
console.log('  - Space/N: New verse');
console.log('  - S: Save verse');
console.log('  - ESC: Close modals');