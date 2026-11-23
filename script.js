/* The Shammakhi Chronicle — site behaviour
   - English / Arabic switch (right-to-left)
   - Day / night edition
   - Project filters
   - Live date, sticky-nav highlight, scroll reveal, back-to-top, copy email
*/
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Safe storage ---------- */
  function save(key, value) { try { localStorage.setItem(key, value); } catch (e) {} }

  /* ---------- Arabic text (English lives in the HTML) ---------- */
  var AR = {
    'skip': 'تخطَّ إلى المحتوى',
    'strip.vol': 'المجلد الخامس · العدد 8',
    'strip.place': 'مسقط، عُمان',
    'ear.left': '<b>تأسست 2022</b> تقارير من مكتب مهندس برمجيات.',
    'ear.right': '<b>توقعات اليوم</b> بناء صافٍ، وإعادة هيكلة خفيفة.',
    'title': 'صحيفة الشمّاخي',
    'tagline': 'برمجيات وصحة وأفكار — من مسقط',
    'nav.front': 'الصفحة الأولى',
    'nav.years': 'السنوات',
    'nav.projects': 'المشاريع',
    'nav.classifieds': 'الإعلانات المبوّبة',
    'nav.contact': 'تواصل',
    'ticker.label': 'عاجل',
    't1': 'يحصل على شهادة هندسة الذكاء الاصطناعي',
    't2': 'ينضم إلى المديرية العامة لتقنية المعلومات والصحة الرقمية',
    't3': 'يحصل على شهادة مطوّر OutSystems المعتمد (O11)',
    't4': 'يطلق روبوت محادثة ذكيًا للموارد البشرية يعمل دون إنترنت لشركة تميمة للاتصالات',
    't5': 'إطلاق منصة «القرآن حياتي»',

    'front.kicker': 'الصفحة الأولى · التقنية والصحة',
    'front.headline': 'مهندس عُماني شاب يبني برمجيات لمستشفيات الوطن',
    'front.deck': 'من تطبيقات Flutter إلى أنظمة الصحة على OutSystems وروبوت محادثة ذكي يعمل دون إنترنت، يحوّل مهنّد الشمّاخي الشيفرة إلى رعاية.',
    'front.byline': 'بقلم مهنّد الشمّاخي · مهندس برمجيات',
    'front.read': 'قراءة في 3 دقائق',
    'front.caption': 'المهندس في يوم تخرّجه، مسقط.',
    'front.p1': 'مسقط — خلال العام الماضي، بنى مهنّد الشمّاخي، خرّيج هندسة البرمجيات من جامعة التقنية والعلوم التطبيقية، برمجياتٍ في أكثر الأماكن أهمية: داخل القطاع الصحي في عُمان.',
    'front.p2': 'منذ نوفمبر 2025 يعمل مع المديرية العامة لتقنية المعلومات والصحة الرقمية، حيث يطوّر تطبيقات الويب ويصونها باستخدام OutSystems — يدمج واجهات البرمجة، ويبني الشاشات ومنطق العمل، ويختبر أنظمة الصحة الرقمية.',
    'front.p3': 'يتقن Flutter ويستند إلى أسس هندسة البرمجيات، وتكمن قوته في تطوير التطبيقات وتصميم الأنظمة وحل المشكلات — وقد أضاف مهارة أو شهادة جديدة كل عام تقريبًا منذ 2022.',
    'front.quote': '«شغوف بتطوير حلول برمجية عالية الجودة والمساهمة في فرق العمل التعاونية.»',
    'front.cite': '— من الملف الشخصي للمهندس',
    'front.continue': 'تتمة القصة في «السنوات» ←',

    'side.numbers': 'بالأرقام',
    'n1': 'تجارب مهنية',
    'n2': 'مشاريع منجزة',
    'n3': 'شهادات مهنية',
    'n4': 'لغتان: العربية والإنجليزية',
    'side.now': 'يعمل الآن على',
    'now.title': 'أنظمة الصحة الرقمية على OutSystems',
    'now.meta': 'المديرية العامة لتقنية المعلومات والصحة الرقمية · نوفمبر 2025 – حتى الآن',
    'side.inside': 'في هذا العدد',
    'idx1': 'السنوات، 2022–2026',
    'idx2': 'ثمانية مشاريع منشورة',
    'idx3': 'الإعلانات والأوسمة',
    'idx4': 'قصّ واحتفظ: التواصل',
    'download': 'تحميل السيرة الذاتية (PDF)',
    'download.full': 'تحميل السيرة الذاتية كاملة (PDF) ↓',

    'years.kicker': 'القسم أ2 · من الأرشيف',
    'years.title': 'السنوات، عددًا بعد عدد',
    'years.deck': 'أربع سنوات، أربعة أعداد — من أول استعلام SQL إلى الصحة الرقمية.',
    'ed1': 'العدد الأول', 'ed2': 'العدد الثاني', 'ed3': 'العدد الثالث', 'ed4': 'العدد الحالي',
    'th1': 'الأساسات', 'th2': 'يدٌ على لوحة المفاتيح', 'th3': 'من التخرّج إلى الاحتراف', 'th4': 'الارتقاء',
    'k.cert': 'شهادة', 'k.boot': 'معسكر تدريبي', 'k.grad': 'تخرّج', 'k.train': 'تدريب', 'k.hired': 'توظيف',
    'm.jan': 'يناير', 'm.apr': 'أبريل', 'm.may': 'مايو', 'm.dec': 'ديسمبر',
    'm.augsep': 'أغسطس – سبتمبر', 'm.febapr': 'فبراير – أبريل', 'm.sepnov': 'سبتمبر – نوفمبر', 'm.novnow': 'نوفمبر – حتى الآن',
    'now': 'الآن',
    'e.code': 'برنامج مكثّف لمدة ستة أسابيع في أساسيات تطوير البرمجيات والبرمجة العملية.',
    'e.bsc': 'بكالوريوس هندسة البرمجيات، جامعة التقنية والعلوم التطبيقية',
    'e.mc': 'المدينة الطبية للخدمات العسكرية والأمنية',
    'e.mc.d': 'برمجيات الرعاية الصحية وإدارة قواعد البيانات وأمن الأنظمة.',
    'e.tt': 'شركة تميمة للاتصالات',
    'e.tt.d': 'تطوير تطبيقات الجوال واختبار الجودة وتتبّع الأخطاء.',
    'e.dg': 'المديرية العامة لتقنية المعلومات والصحة الرقمية',
    'e.dg.d': 'تطبيقات ويب على OutSystems، ودمج واجهات البرمجة، وواجهات ومنطق عمل للصحة الرقمية.',
    'e.os': 'مطوّر OutSystems المعتمد (O11)',
    'e.ai': 'هندسة الذكاء الاصطناعي، Udemy',

    'proj.kicker': 'القسم أ3 · تحقيقات',
    'proj.title': 'مشاريع أعدّها مهندسنا',
    'f.all': 'الكل', 'f.health': 'الصحة', 'f.mobile': 'الجوال', 'f.web': 'الويب', 'f.ai': 'الذكاء الاصطناعي',
    'leadtag': 'قصة رئيسية',
    'p1.k': 'ويب · متكامل',
    'p1.t': '«القرآن حياتي» تُبقي الحفَظة على المسار',
    'p1.deck': 'منصة عربية متكاملة بُنيت ونُشرت من البداية إلى النهاية.',
    'p1.d': 'تطبيق ويب من اليمين إلى اليسار لمتابعة حفظ القرآن الكريم: خطط تعلّم أسبوعية، ومقارنات أسبوعًا بأسبوع، وتقارير PDF شهرية، وثلاثة أدوار للمستخدمين، وتسجيل جماعي عبر Excel، وتذكيرات واتساب، ودخول برقم الهاتف — مع حماية البيانات عبر PostgreSQL Row Level Security.',
    'p1.f': 'مُدرج تحت: PostgreSQL RLS، واجهة عربية RTL، تقارير PDF',
    'p2.k': 'ذكاء اصطناعي · Python',
    'p2.t': 'روبوت محادثة ذكي دون إنترنت يجيب عن أسئلة الموارد البشرية',
    'p2.deck': 'صُمّم لشركة تميمة للاتصالات — ويعمل دون اتصال بالإنترنت.',
    'p2.d': 'مساعد ثنائي اللغة (عربي/إنجليزي) يجيب عن أسئلة سياسات الموظفين باستخدام RAG، وبحث هجين TF-IDF + BM25، ومطابقة تقريبية، وقاعدة معرفة جاهزة، ونموذج ذكاء اصطناعي محلي، عبر واجهة محادثة على الويب.',
    'p2.f': 'مُدرج تحت: Python، Flask، RAG، ذكاء اصطناعي محلي',
    'p3.k': 'الصحة · الجوال',
    'p3.t': 'تسجيل العلامات الحيوية بجانب سرير المريض',
    'p3.d': 'تطبيق جوال يسجّل العلامات الحيوية للمرضى عند أسرّتهم ويرسلها مباشرة إلى نظام الشفاء للمعلومات الصحية.',
    'p3.f': 'مُدرج تحت: الجوال، التكامل مع نظام الشفاء',
    'p4.k': 'الصحة · الويب',
    'p4.t': 'طريق أسرع إلى العلاج لمستحقي الزكاة',
    'p4.d': 'خدمة إلكترونية تتيح لمرضى الزكاة المستحقين في عُمان التقدّم للعلاج المجاني في المؤسسات الصحية الخاصة، فتقلّص قوائم الانتظار وتسرّع الموافقات.',
    'p4.f': 'مُدرج تحت: خدمة إلكترونية، عمل جماعي',
    'p5.t': 'الصحة المدرسية تتحوّل رقميًا',
    'p5.d': 'نظام للصحة المدرسية مبني على OutSystems لإدارة الخدمات الصحية في المدارس وتسهيل الوصول إلى المعلومات الصحية للطلبة.',
    'p5.f': 'مُدرج تحت: OutSystems',
    'p6.t': 'طلبات الإجازة بلا تعقيد',
    'p6.d': 'تطبيق Flutter لطلب إجازات الموظفين وتنظيمها في المدينة الطبية للخدمات العسكرية والأمنية.',
    'p6.f': 'مُدرج تحت: Flutter، قاعدة بيانات',
    'p7.t': 'متتبّع المصروفات يضبط الإنفاق اليومي',
    'p7.d': 'تطبيق Flutter بسيط وسهل لتسجيل المصروفات اليومية وتصنيفها وتلخيصها.',
    'p7.f': 'مُدرج تحت: Flutter',
    'p8.k': 'الجوال · الذكاء الاصطناعي',
    'p8.t': 'رفيق دراسي ذكي للطلبة',
    'p8.d': 'يساعد «منظّم الحياة الطلابية» طلبة الجامعة على إدارة مهامهم واستخدام أدوات دراسة مدعومة بالذكاء الاصطناعي واختيار تخصصهم في تقنية المعلومات.',
    'p8.f': 'مُدرج تحت: Flutter، ذكاء اصطناعي',

    'cl.kicker': 'القسم ب1',
    'cl.title': 'إعلانات مبوّبة: مهارات معروضة',
    'adno': 'إعلان رقم',
    'inquire': 'للاستفسار، تواصلوا معنا.',
    'ad1': 'تطبيقات جوال متعددة المنصات، بإتقان.',
    'ad2': 'تطبيقات ويب منخفضة الشيفرة للمؤسسات والصحة.',
    'ad3': 'واجهات ويب حديثة ومتجاوبة.',
    'ad4': 'ذكاء اصطناعي وRAG وخدمات Flask.',
    'ad5': 'SQL وPL/SQL بشهادة Oracle.',
    'ad6': 'خلفيات ومصادقة لتطبيقات الجوال.',
    'also': '<b>متوفر أيضًا:</b> التواصل · العمل الجماعي والتعاون · حل المشكلات · إدارة الوقت · العربية (اللغة الأم) والإنجليزية',
    'hon.title': 'أوسمة وإعلانات',
    'hon.kicker': 'درجة ممنوحة',
    'hon.degree': 'بكالوريوس هندسة البرمجيات',
    'hon.meta': 'جامعة التقنية والعلوم التطبيقية، مسقط · يناير 2025',
    'c1': 'هندسة الذكاء الاصطناعي <i>— Udemy</i>', 'c1d': 'مايو 2026',
    'c2': 'مطوّر OutSystems المعتمد (O11) <i>— OutSystems</i>', 'c2d': 'يناير 2026',
    'c3': 'PL/SQL <i>— Oracle</i>', 'c3d': 'ديسمبر 2022',
    'c4': 'Java <i>— Oracle</i>', 'c4d': 'مايو 2022',
    'c5': 'SQL <i>— Oracle</i>', 'c5d': 'أبريل 2022',

    'ct.kicker': 'القسم ب2 · رسائل إلى المحرّر',
    'ct.title': 'توظيف؟ تعاون؟ راسل غرفة الأخبار.',
    'ct.clip': 'قصّ واحتفظ',
    'ct.name': 'مهنّد الشمّاخي',
    'ct.role': 'مهندس برمجيات · مسقط، عُمان',
    'ct.email': 'البريد الإلكتروني',
    'ct.copy': 'نسخ',
    'ct.linkedin': 'لينكدإن',
    'ct.linkedinName': 'مهنّد الشمّاخي ↗',
    'ft.printed': 'طُبعت في مسقط، عُمان',
    'ft.back': 'العودة إلى الصفحة الأولى ↑'
  };

  var UI = {
    en: {
      docTitle: 'Muhannad Al Shammakhi — Software Engineer · The Shammakhi Chronicle',
      night: 'Night edition', day: 'Day edition', langBtn: 'عربي', langBtnLang: 'ar',
      copied: 'Email copied', copyFail: 'Copy failed — please select the address',
      showing: function (n) { return 'Showing ' + n + (n === 1 ? ' project' : ' projects'); },
      toTop: 'Back to top', locale: 'en-GB'
    },
    ar: {
      docTitle: 'مهنّد الشمّاخي — مهندس برمجيات · صحيفة الشمّاخي',
      night: 'الطبعة الليلية', day: 'الطبعة النهارية', langBtn: 'English', langBtnLang: 'en',
      copied: 'تم نسخ البريد الإلكتروني', copyFail: 'تعذّر النسخ — يرجى تحديد العنوان',
      showing: function (n) { return 'عرض ' + n + ' من المشاريع'; },
      toTop: 'العودة إلى الأعلى', locale: 'ar-OM-u-nu-latn'
    }
  };

  /* Remember the English HTML once so we can switch back. */
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  nodes.forEach(function (el) { el.setAttribute('data-en', el.innerHTML); });

  function currentLang() { return root.lang === 'ar' ? 'ar' : 'en'; }

  function setDate() {
    var el = document.getElementById('today');
    if (!el) return;
    var now = new Date();
    try {
      el.textContent = now.toLocaleDateString(UI[currentLang()].locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      el.textContent = now.toDateString();
    }
    el.setAttribute('datetime', now.toISOString().slice(0, 10));
    var y = document.getElementById('year');
    if (y) y.textContent = String(now.getFullYear());
  }

  function applyLang(lang) {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = (lang === 'ar' && AR[key] != null) ? AR[key] : el.getAttribute('data-en');
    });
    var ui = UI[lang];
    document.title = ui.docTitle;
    var lb = document.getElementById('langToggle');
    lb.textContent = ui.langBtn;
    lb.setAttribute('lang', ui.langBtnLang);
    lb.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    document.getElementById('toTop').setAttribute('aria-label', ui.toTop);
    updateThemeLabel();
    setDate();
    updateCounts();
  }

  /* ---------- Theme ---------- */
  function isNight() { return root.getAttribute('data-theme') === 'night'; }
  function updateThemeLabel() {
    var ui = UI[currentLang()];
    document.getElementById('themeLabel').textContent = isNight() ? ui.day : ui.night;
    document.getElementById('themeToggle').setAttribute('aria-pressed', String(isNight()));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isNight() ? '#15130F' : '#F6F1E7');
  }
  document.getElementById('themeToggle').addEventListener('click', function () {
    if (isNight()) { root.removeAttribute('data-theme'); save('chronicle-theme', 'day'); }
    else { root.setAttribute('data-theme', 'night'); save('chronicle-theme', 'night'); }
    updateThemeLabel();
  });

  document.getElementById('langToggle').addEventListener('click', function () {
    var next = currentLang() === 'ar' ? 'en' : 'ar';
    save('chronicle-lang', next);
    applyLang(next);
  });

  /* ---------- Project filters ---------- */
  var stories = Array.prototype.slice.call(document.querySelectorAll('.story'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  var activeFilter = 'All';

  function matches(story, f) {
    return f === 'All' || (' ' + story.getAttribute('data-cats') + ' ').indexOf(' ' + f + ' ') !== -1;
  }
  function updateCounts() {
    buttons.forEach(function (b) {
      var f = b.getAttribute('data-filter');
      var n = stories.filter(function (s) { return matches(s, f); }).length;
      b.querySelector('.count').textContent = n;
    });
  }
  function applyFilter(f, announce) {
    activeFilter = f;
    var shown = 0;
    stories.forEach(function (s) {
      var ok = matches(s, f);
      s.hidden = !ok;
      if (ok) { shown++; if (announce) s.classList.add('is-visible'); }
    });
    ['.leads', '.stories'].forEach(function (sel) {
      var box = document.querySelector(sel);
      var any = Array.prototype.some.call(box.children, function (c) { return !c.hidden; });
      box.hidden = !any;
    });
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === f)); });
    if (announce) document.getElementById('filterStatus').textContent = UI[currentLang()].showing(shown);
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter'), true); });
  });

  /* ---------- Copy email ---------- */
  var toastTimer;
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  /* Build the email address at runtime (keeps it out of the raw HTML). */
  var emailLink = document.getElementById('emailLink');
  var email = emailLink.getAttribute('data-user') + '@' + emailLink.getAttribute('data-domain');
  emailLink.setAttribute('href', 'mailto:' + email);
  document.getElementById('emailText').textContent = email;

  document.getElementById('copyEmail').addEventListener('click', function () {
    var ui = UI[currentLang()];
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = email; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      toast(ok ? ui.copied : ui.copyFail);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(function () { toast(ui.copied); }, fallback);
    } else {
      fallback();
    }
  });

  /* ---------- LinkedIn placeholder: don't open an empty tab ---------- */
  var li = document.getElementById('linkedin');
  if (li && li.getAttribute('href') === '#') {
    li.removeAttribute('target');
    li.addEventListener('click', function (e) { e.preventDefault(); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  function onScroll() { toTop.hidden = window.scrollY < 900; }
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.querySelector('.masthead h1').focus({ preventScroll: true });
  });
  document.querySelector('.masthead h1').setAttribute('tabindex', '-1');

  /* ---------- Scroll reveal + section highlight ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });

    var links = Array.prototype.slice.call(document.querySelectorAll('.sections a'));
    var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a, i) { a.classList.toggle('active', targets[i] === en.target); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(function (t) { if (t) spy.observe(t); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Show everything before printing */
  window.addEventListener('beforeprint', function () {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  });

  /* ---------- Start ---------- */
  applyLang(currentLang());
  applyFilter(activeFilter, false);
  onScroll();
})();
