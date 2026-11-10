import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  FileSpreadsheet,
  Cpu,
  HeartHandshake,
  Layers,
  Phone,
  Mail,
  MapPin,
  Github,
  CheckCircle2,
  FileText,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Sliders,
  Plus,
  Trash2,
  Edit3,
  Eye,
  MessageSquare,
  Award,
  Briefcase,
  ChevronLeft,
  ShieldCheck,
  Calculator,
  Truck,
  Users,
  Database,
  Code2,
  Sparkles,
  Calendar,
  Hash,
  Search,
  Download,
  X,
  ArrowUpRight,
  HardHat,
  Ruler,
  Wallet
} from 'lucide-react';

// ==========================================
// 1. INITIAL DATA & ROLE PRESETS (NATURAL FIRST-PERSON ARABIC)
// ==========================================

const ROLE_LENSES = {
  all: {
    id: 'all',
    label: 'الملف التنفيذي الشامل (الكل)',
    shortLabel: 'الشامل (360°)',
    icon: Layers,
    badge: 'مهندس مدني وإنشائي | مدير مشاريع وتطوير عقاري | مكتب فني وأنظمة تشغيل رقمية',
    title: 'مهندس مدني وإنشائي | إدارة مشاريع التطوير العقاري، المكتب الفني، وأنظمة التشغيل الرقمية',
    summary:
      'مهندس مدني وإنشائي خريج جامعة ذمار (2014م – بتقدير جيد جداً)، أمتلك خبرة عملية تتجاوز 10 سنوات أجمع فيها بين قوة التنفيذ الميداني في المواقع، ودقة العمل الهندسي والمالي في المكتب الفني، وبين القدرة العملية على بناء وتشغيل الأنظمة الرقمية ومنصات إدارة المقاولات. توليتُ خلال مسيرتي إدارة وتنفيذ والإشراف على أكثر من 360 وحدة ومنزلاً سكنياً (عظم وتشطيب كامل حتى تسليم المفتاح)، شملت الإدارة التنفيذية والمالية الكاملة لمشروع 70 منزلاً سكنياً لحساب مقاول من البداية للنهاية، والإشراف على 290 وحدة سكنية مع المجلس النرويجي (NRC)، ومشاريع المباني الخدمية والطرق والخزانات مع الصندوق الاجتماعي للتنمية (SFD)، إلى جانب تطوير وتشغيل منصة (BANA Pro) السحابية لإدارة المشاريع والكميات والمستخلصات وسلاسل الإمداد.',
    highlightStats: [
      { label: 'سنوات الخبرة الميدانية والمكتبية', value: '+10 سنوات', sub: 'تنفيذ، إشراف، مكتب فني، وتشغيل' },
      { label: 'وحدات ومنازل سكنية منفذة', value: '+360 وحدة', sub: 'عظم وتشطيب كامل حتى تسليم المفتاح' },
      { label: 'إدارة تنفيذية ومالية كاملة لمقاول', value: '70 منزلاً', sub: 'حصر، تسعير، مشتريات، وقيادة عمالة' },
      { label: 'أنظمة ومنصات رقمية عاملة', value: 'BANA Pro ERP', sub: 'أتمتة كميات، مستخلصات، ومواد بناء' }
    ]
  },
  realestate: {
    id: 'realestate',
    label: 'التطوير العقاري والمقاولات (تسليم مفتاح)',
    shortLabel: 'التطوير العقاري والمقاولات',
    icon: Building2,
    badge: 'إدارة مشاريع التطوير العقاري والفلل السكنية (عظم وتشطيب تسليم مفتاح)',
    title: 'مهندس مدني وإنشائي | إدارة مشاريع التطوير العقاري والتنفيذ الميداني (عظم وتشطيب تسليم مفتاح)',
    summary:
      'مهندس مدني وإنشائي ومدير مشاريع تطوير عقاري بخبرة عملية تمتد لأكثر من 10 سنوات في استلام المواقع وإدارة التنفيذ الكامل للوحدات السكنية والمنازل والفلل (أعمال العظم والتشطيبات المتكاملة حتى تسليم المفتاح). أنجزتُ فعلياً إدارة وتنفيذ والإشراف على أكثر من 360 وحدة ومنزلاً سكنياً، منها الإدارة التنفيذية والمالية الكاملة نيابة عن المقاول لمشروع 70 منزلاً سكنياً من المعاينة والتسعير وشراء المواد وقيادة العمالة وحتى التسليم للملاك، ومشروع 290 وحدة سكنية مع المجلس النرويجي (NRC). أتقن ضبط التكاليف والبرنامج الزمني، والتفاوض مع مقاولي الباطن وأصحاب المهن والموردين لتحقيق أعلى جودة تنفيذية وأفضل وفر مالي للمطور العقاري.',
    highlightStats: [
      { label: 'مشاريع سكنية (عظم وتشطيب)', value: '+360 وحدة', sub: 'استلام مواقع وتنفيذ حتى تسليم المفتاح' },
      { label: 'إدارة شاملة لحساب مقاول', value: '70 منزلاً', sub: 'تسعير، شراء مواد، مصنعيات، وحسابات' },
      { label: 'ضبط التكاليف والجدولة', value: '100% التزام', sub: 'ربط الكميات بالميزانية والجدول الزمني' },
      { label: 'قيادة العمالة ومقاولي الباطن', value: 'جميع المهن', sub: 'حدادين، نجارين، بنائين، مبلطين، سباكين' }
    ]
  },
  techoffice: {
    id: 'techoffice',
    label: 'المكتب الفني وحصر الكميات والتسعير (QS)',
    shortLabel: 'المكتب الفني والكميات (QS)',
    icon: FileSpreadsheet,
    badge: 'مهندس مكتب فني | حصر كميات (BOQ)، تسعير مناقصات، ومستخلصات',
    title: 'مهندس مدني – مكتب فني وحصر كميات وتسعير مناقصات (Technical Office & QS Engineer)',
    summary:
      'مهندس مدني ومختص مكتب فني وحصر كميات (QS) بخبرة تزيد عن 10 سنوات في إعداد ومراجعة المخططات الهندسية والتنفيذية (Shop Drawings)، والحصر الهندسي الدقيق للكميات من المخططات وعلى الطبيعة، وإعداد جداول الكميات التفصيلية (BOQ) ودفاتر المواصفات الفنية. مارستُ فعلياً تسعير المشاريع والمنافسات وتحليل أسعار المواد والمصنعيات، وإعداد وتدقيق المستخلصات الجارية والختامية (IPCs)، ودراسة أوامر التغيير (Variation Orders)، وتجهيز اعتمادات المواد وطلبات الفحص (IRs)، مع مهارة متقدمة جداً في تصميم منظومات الحصر ومتابعة التكاليف عبر برنامج (Excel المتقدم) والأنظمة الرقمية.',
    highlightStats: [
      { label: 'حصر كميات وإعداد BOQ', value: '+360 وحدة', sub: 'مشاريع إسكان، مباني عامة، طرق، وخزانات' },
      { label: 'المستخلصات والعقود', value: 'IPCs & VOs', sub: 'إعداد وتدقيق مستخلصات المقاولين والعمالة' },
      { label: 'تحليل الأسعار والمناقصات', value: '+10 سنوات', sub: 'دراسة أسعار المواد والمصنعيات وتحليل العطاءات' },
      { label: 'أدوات المكتب الفني', value: 'BIM & Excel', sub: 'AutoCAD, Revit, MS Project, BANA Pro' }
    ]
  },
  techops: {
    id: 'techops',
    label: 'التشغيل الرقمي وتطبيقات مواد البناء',
    shortLabel: 'التشغيل الرقمي ومواد البناء',
    icon: Cpu,
    badge: 'مدير تشغيل منصات وتطبيقات إلكترونية | إدارة مشتريات وسلاسل إمداد مواد البناء',
    title: 'مدير تشغيل ومشتريات مواد البناء | إدارة المنصات والتطبيقات الإلكترونية وأتمتة العمليات',
    summary:
      'مهندس مدني ومدير تشغيل بخبرة عملية تتجاوز 10 سنوات تجمع بشكل مباشر بين الخبرة الميدانية والتجارية في سوق مواد البناء (الخرسانة، البلك بجميع مقاساته، البحص، الرمل، الإسمنت، الحديد، ومواد التشطيبات والسباكة والكهرباء: تسعيراً وشراءً وتوريداً وفحصاً) وبين الخبرة العملية في بناء وتشغيل المنصات الرقمية وتطبيقات الويب وقواعد البيانات السحابية. عملتُ لسنوات في التفاوض المباشر مع مصانع الخرسانة والبلك والكسارات وتجار الجملة وإدارة التوريدات لأكثر من 360 وحدة سكنية، كما قمتُ بتطوير وتشغيل نظام (BANA Pro) السحابي لإدارة المقاولات والمواد والموردين والطلبات عبر توظيف تقنيات الويب الحديثة وأدوات الذكاء الاصطناعي.',
    highlightStats: [
      { label: 'خبرة سوق مواد البناء والتوريد', value: '+10 سنوات', sub: 'خرسانة، بلك، بحص، حديد، ومواد تشطيب' },
      { label: 'إدارة مشتريات وتوريد مباشر', value: '70 موقعاً', sub: 'تفاوض مع المصانع وجدولة شاحنات التوريد' },
      { label: 'منصة سحابية موثقة (GitHub)', value: 'BANA Pro', sub: 'Next.js, PostgreSQL, Supabase, AI' },
      { label: 'إدارة الطلبات والحسابات', value: 'لوحات تحكم', sub: 'متابعة دورة الطلب من العميل للمورد للموقع' }
    ]
  },
  ngo: {
    id: 'ngo',
    label: 'مشاريع الجمعيات والصناديق الداعمة',
    shortLabel: 'مشاريع الجمعيات والمنظمات',
    icon: HeartHandshake,
    badge: 'أخصائي إعداد ورفع مشاريع الجمعيات والصناديق الداعمة | إدارة المشاريع التنموية',
    title: 'أخصائي إعداد ورفع مشاريع الجمعيات والصناديق الداعمة | إدارة المشاريع التنموية والخيرية',
    summary:
      'أخصائي مشاريع تنموية ومهندس مدني بخبرة عملية تزيد عن 9 سنوات في العمل المباشر مع الصناديق الداعمة والمؤسسات والجمعيات التنموية والإنسانية غير الربحية (الصندوق الاجتماعي للتنمية SFD، المجلس النرويجي NRC، ومؤسسة RDP). مارستُ فعلياً إعداد وصياغة ملفات ومقترحات المشاريع التنموية والخيرية، واستيفاء مسوغاتها الفنية والمالية لرفعها عبر المنصات الداعمة (مثل منصة إحسان وصندوق دعم الجمعيات)، إلى جانب دراسة احتياجات المستفيدين، وإعداد الميزانيات التفصيلية وجداول الكميات (BOQ)، وإدارة قواعد بيانات الأسر المستفيدة على برنامج (Excel)، ومتابعة التنفيذ وإعداد تقارير الإنجاز الموثقة للجهات المانحة.',
    highlightStats: [
      { label: 'خبرة الصناديق والمنظمات التنموية', value: '+9 سنوات', sub: 'عمل مباشر مع SFD و NRC و RDP' },
      { label: 'مشاريع إسكان وتأهيل للأسر', value: '+360 أسرة', sub: 'دراسة احتياج، ميزانيات، وتنفيذ ميداني' },
      { label: 'رفع المشاريع للمنصات الداعمة', value: 'إحسان والدعم', sub: 'إعداد مقترحات المشاريع ومؤشرات الأثر' },
      { label: 'تقارير المانحين وقواعد البيانات', value: 'توثيق كامل', sub: 'ربط الصرف المالي بنسب الإنجاز الفعلي' }
    ]
  }
};

const INITIAL_PILLARS = [
  {
    id: 'p1',
    roles: ['all', 'realestate'],
    domain: 'إدارة التنفيذ الميداني والتطوير العقاري (عظم وتشطيب تسليم مفتاح)',
    tasks:
      'استلام المواقع وإدارة التنفيذ الكامل للمشاريع السكنية والفلل: أعمال الحفر، الإحلال، القواعد والهياكل الخرسانية (العظم)، وأعمال التشطيبات المتكاملة (مباني، لياسة، عزل، سباكة، كهرباء، بلاط، دهانات، وواجهات) حتى التسليم النهائي للمفتاح.'
  },
  {
    id: 'p2',
    roles: ['all', 'techoffice', 'realestate'],
    domain: 'أعمال المكتب الفني، حصر الكميات، والتسعير (QS & BOQ)',
    tasks:
      'مراجعة وتدقيق المخططات الهندسية والتنفيذية (Shop Drawings)، وإجراء الحصر الهندسي الدقيق من المخططات وعلى الطبيعة، وإعداد جداول الكميات (BOQ) ودفاتر المواصفات، وتسعير المشاريع والمناقصات، وإعداد المستخلصات الجارية والختامية وطلبات الفحص (IRs).'
  },
  {
    id: 'p3',
    roles: ['all', 'techops', 'realestate', 'techoffice'],
    domain: 'إدارة التكاليف، المشتريات، وسلاسل إمداد مواد البناء',
    tasks:
      'معرفة تفصيلية بجميع أصناف مواد البناء (الخرسانة، البلك، البحص، الرمل، الإسمنت، الحديد، ومواد التشطيب)، والتفاوض المباشر مع المصانع والكسارات والموردين ومقاولي الباطن وأصحاب المهن لضبط التكلفة وتأمين التوريد للمواقع دون توقف.'
  },
  {
    id: 'p4',
    roles: ['all', 'techops', 'techoffice'],
    domain: 'تشغيل المنصات الرقمية وأتمتة أنظمة المقاولات (BANA Pro & Excel)',
    tasks:
      'بناء وتشغيل منصات الويب وقواعد البيانات السحابية (PostgreSQL / Supabase) ولوحات التحكم (Dashboards)، وتوظيف أدوات الذكاء الاصطناعي وبرنامج (Excel المتقدم) لأتمتة متابعة الطلبات والمخزون وجدولة الوقت والتكاليف وحسابات الموردين والعمالة.'
  },
  {
    id: 'p5',
    roles: ['all', 'ngo'],
    domain: 'إعداد ورفع مشاريع الجمعيات والصناديق الداعمة وتقارير المانحين',
    tasks:
      'صياغة مقترحات وملفات المشاريع الخيرية والتنموية، واستيفاء المتطلبات الفنية والمالية لرفعها على (منصة إحسان وصندوق دعم الجمعيات)، وإدارة قواعد بيانات المستفيدين، وإعداد تقارير الإنجاز المرحلية والختامية الموثقة لجهات التمويل.'
  }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj-70',
    title: 'مدير مشروع ومهندس تنفيذ وتسعير – إدارة شاملة لمشروع 70 منزلاً سكنياً (تسليم مفتاح)',
    organization: 'قطاع المقاولات العامة والتطوير العقاري | إدارة هندسية وتنفيذية ومالية متكاملة',
    period: 'إدارة شاملة من البداية للنهاية',
    roles: ['all', 'realestate', 'techoffice', 'techops', 'ngo'],
    badge: '70 منزلاً سكنياً – تسليم مفتاح',
    metrics: ['70 منزلاً مرمماً ومشطباً', 'إدارة مالية وتنفيذية 100%', 'توريد مواد وقيادة مصنعيات'],
    bullets: [
      'إدارة المشروع والتنفيذ: توليتُ المسؤولية الهندسية والتنفيذية والمالية الكاملة نيابة عن المقاول لإعادة تأهيل وتشطيب 70 منزلاً سكنياً، بدءاً من المعاينة الميدانية واستلام العقارات وحتى تسليم المفتاح للملاك.',
      'الحصر والتسعير والمشتريات: أجريتُ الحصر الهندسي الدقيق لكل منزل، وأعددتُ جداول الكميات (BOQ) والاحتياجات الفعلية من المواد (إسمنت، بلك، بحص، رمل، حديد، بلاط، دهانات، ومواد سباكة وكهرباء)، وتفاوضتُ مباشرة مع المصانع والموردين للحصول على أفضل أسعار الجملة.',
      'قيادة العمالة والحسابات: تعاقدتُ مع فرق المصنعيات والمهنيين (بنائين، مليسين، مبلطين، سباكين، ودهانين) بالمتر والمقطوعية، ووزعتُهم يومياً على المواقع الـ 70 لضمان سرعة الإنجاز المتوازي، وضبطتُ كافة الفواتير واليوميات ومستخلصات العمال حتى إغلاق الحسابات.'
    ],
    deepDive: {
      challenge: 'إدارة العمل في 70 موقعاً سكنياً متفرقاً في وقت واحد مع ضبط التكلفة المحددة لكل منزل ومنع أي هدر في المواد أو تعطل لفرق العمالة.',
      methodology: 'تقسيم المنازل إلى مجموعات عمل متوازية، وإجراء حصر قبلي دقيق لكل منزل قبل دخول العمالة، والاتفاق مع الموردين على جدول توريد يومي مباشر للمواقع، مع مسك دفتر حسابات إلكتروني يومي يربط كل كيس إسمنت وكل متر بلاط بالمنزل المخصص له.',
      deliverables: ['جداول كميات (BOQ) تفصيلية لـ 70 منزلاً', 'عقود واتفاقيات مصنعيات ومقطوعيات', 'سجل فواتير ومشتريات مواد بناء متكامل', 'محاضر استلام وتسليم مفتاح نهائية للملاك']
    }
  },
  {
    id: 'proj-nrc',
    title: 'مهندس مدني ومشرف مشاريع إسكان – إنشاء 240 وحدة سكنية جديدة + تأهيل 50 منزلاً',
    organization: 'المجلس النرويجي للاجئين (NRC) – مشاريع الإنشاءات والإسكان',
    period: '2024 – 2026',
    roles: ['all', 'realestate', 'techoffice', 'ngo', 'techops'],
    badge: '290 وحدة ومنزلاً سكنياً',
    metrics: ['240 وحدة سكنية جديدة', '50 منزلاً مؤهلاً', 'منظومة متابعة رقمية مؤتمتة'],
    bullets: [
      'الإشراف الهندسي وضبط الجودة (QA/QC): أشرفتُ ميدانياً وفنياً على إنشاء 240 وحدة سكنية متكاملة (عظم وتشطيب)، ومشروع تأهيل 50 منزلاً سكنياً، وتابعتُ تنفيذ كافة البنود (حفريات، أساسات، هياكل، مباني، عزل، وتشطيبات) وفق المخططات والمواصفات المعتمدة.',
      'حصر الكميات واعتماد المواد: راجعتُ جداول الكميات (BOQs)، وفحصتُ واعتمدتُ عينات وشحنات مواد البناء الموردة للموقع، وطابقتُ الكميات المنفذة فعلياً لصرف الدفعات.',
      'الأتمتة والجدولة الرقمية: صممتُ نماذج متابعة رقمية مؤتمتة على برنامج (Advanced Excel) لربط جداول الكميات وبيانات المستفيدين بنسب الإنجاز المالي والزمني، وشاركتُ في لجان الفحص والاستلام الابتدائي والنهائي.'
    ],
    deepDive: {
      challenge: 'متابعة جودة التنفيذ ونسب الصرف المالي والكميات لمشروع إسكاني ضخم يضم 290 وحدة سكنية ضمن إطار زمني صارم ومعايير تدقيق دولية.',
      methodology: 'تطبيق نظام فحص واستلام مرحلي لكل بند قبل الانتقال للبند التالي، وبناء لوحة متابعة رقمية على برنامج Excel تحسب تلقائياً نسب الإنجاز لكل وحدة وتنبه لأي انحراف في الكميات أو الوقت.',
      deliverables: ['تقارير فحص واستلام فني لـ 290 وحدة سكنية', 'منظومة تتبع الكميات والميزانيات ونسب الإنجاز', 'محاضر اعتماد المواد والمطابقة الفنية', 'تقارير الإغلاق والتوثيق النهائي للمانحين']
    }
  },
  {
    id: 'proj-banapro',
    title: 'مطور ومدير تشغيل منصة (BANA Pro) – نظام سحابي متكامل لإدارة المقاولات والمشاريع (ERP)',
    organization: 'تطوير وتشغيل المنصات الرقمية وأنظمة إدارة الإنشاءات (github.com/eng540/bana-pro)',
    period: '2024 – 2026',
    roles: ['all', 'techops', 'techoffice', 'realestate'],
    badge: 'منصة سحابية موثقة على GitHub',
    metrics: ['18+ وحدة تشغيلية (Modules)', 'Next.js & PostgreSQL', 'تطوير معزز بالذكاء الاصطناعي'],
    bullets: [
      'هندسة وتشغيل المنصة: قمتُ بتصميم وبناء وتشغيل منصة ويب سحابية متكاملة لإدارة شركات المقاولات والمشاريع الهندسية (موثقة برمجياً على GitHub: eng540/bana-pro) بالاعتماد على خبرتي الميدانية وتوظيف أدوات الذكاء الاصطناعي الحديثة.',
      'الوحدات الهندسية والمالية والتشغيلية: تضم المنصة لوحات تحكم مترابطة لإدارة جداول الكميات (BOQ)، ضبط التكاليف (Cost Control)، المستخلصات الجارية والختامية (IPC)، المشتريات والموردين ومواد البناء (Procurement & Materials)، العمالة والرواتب (Labor & Payroll)، العهد النقدية (Petty Cash)، أوامر التغيير (Variations)، وتقليل الهدر (Waste).',
      'البنية التقنية وقواعد البيانات: بناء قاعدة بيانات علائقية متكاملة (PostgreSQL / Supabase) مع صلاحيات مستخدمين متعددة، ومسارات عمل ذرية (Atomic Workflows) تمنع تضارب الحسابات، وجاهزية كاملة للنشر السحابي عبر (Railway / Vercel).'
    ],
    deepDive: {
      challenge: 'معظم البرامج المحاسبية في السوق لا تفهم لغة المهندس الميداني (مثل ربط بند الـ BOQ بالمستخلص IPC وربط استهلاك الإسمنت والحديد بنسبة الإنجاز الفعلي في الموقع).',
      methodology: 'ترجمة خبرتي التي تزيد عن 10 سنوات في المواقع والمكتب الفني إلى نظام رقمي متكامل (BANA Pro) باستخدام Next.js و TypeScript و PostgreSQL بمساعدة الذكاء الاصطناعي، بحيث يدير دورة المشروع والمواد من طلب الشراء وحتى المستخلص الختامي.',
      deliverables: ['مستودع برمجي كامل على GitHub (eng540/bana-pro)', 'قاعدة بيانات PostgreSQL من 5 مراحل ترحيل (Migrations)', 'نظام إدارة موردين ومواد بناء ومخزون', 'وحدة تحليل ذكي للتكاليف والكميات (AI Cost & BOQ Assistant)']
    }
  },
  {
    id: 'proj-sfd-health',
    title: 'مهندس استشاري ومشرف تنفيذ مباني عامة ومرافق خدمية',
    organization: 'الصندوق الاجتماعي للتنمية (SFD) – مشروع تشييد مبنى وحدة صحية متكاملة',
    period: '2023 – 2024',
    roles: ['all', 'realestate', 'techoffice', 'ngo'],
    badge: 'إشراف استشاري متكامل',
    metrics: ['مبنى خدمي متكامل + مرافق', 'تدقيق مستخلصات IPCs', 'إدارة الركوستات وأوامر التغيير'],
    bullets: [
      'إدارة التنفيذ والاعتمادات: أشرفتُ إشرافاً هندسياً كاملاً على تشييد مبنى وحدة صحية متكاملة مع الخزانات والأسوار والموقع العام (أعمال الحفر، الأساسات، الهياكل الخرسانية، المباني، التشطيبات، وأعمال السباكة والكهرباء).',
      'المستخلصات والتقارير الفنية: أعددتُ ودققتُ مستخلصات المقاولين الجارية والختامية (IPCs)، وراجعتُ وسعّرتُ أوامر التغيير (Change Orders)، وجهزتُ طلبات استلام الأعمال (IRs)، وأدرتُ سجل الموقع اليومي والتقارير الدورية.'
    ],
    deepDive: {
      challenge: 'ضمان تنفيذ منشأة صحية خدمية بمواصفات فنية عالية للخرسانات والعزل والتمديدات الصحية والكهربائية ضمن الميزانية المعتمدة من الصندوق.',
      methodology: 'الرقابة اليومية الصارمة في الموقع، واستلام أعمال الحدادة والنجارة قبل الصب، وحصر كل بند منفذ على الطبيعة أولاً بأول لمطابقته مع المستخلصات المرفوعة.',
      deliverables: ['مستخلصات جارية وختامية مدققة (IPCs)', 'سجل موقع هندسي يومي (Site Logbook)', 'تقارير فنية ومالية دورية لجهة التمويل']
    }
  },
  {
    id: 'proj-sfd-qs',
    title: 'مهندس مكتب فني ودراسات وحصر كميات وتسعير مناقصات',
    organization: 'الصندوق الاجتماعي للتنمية (SFD) ومؤسسة تنمية (RDP)',
    period: '2019 – 2022',
    roles: ['all', 'techoffice', 'ngo', 'techops'],
    badge: 'دراسات، BOQ، ومناقصات',
    metrics: ['إعداد وثائق مناقصات وبنود BOQ', 'تحليل عروض أسعار المقاولين', 'مشاريع مباني ومدارس ومياه'],
    bullets: [
      'التصميم وإعداد وثائق المشاريع: أعددتُ المخططات الهندسية، ودفاتر المواصفات الفنية، وجداول الكميات التفصيلية (BOQ)، والتسعيرات التقديرية لمشاريع المباني والمدارس والمرافق الخدمية ومنظومات المياه والطاقة الشمسية.',
      'التقييم الفني وتحليل العطاءات: نفذتُ المعاينات الهندسية الميدانية لتقييم المباني القائمة وتحديد أعمال الترميم والتأهيل المطلوبة، وشاركتُ في لجان فتح المظاريف وتحليل عروض أسعار المقاولين والموردين مالياً وفنياً لترسية العقود.'
    ],
    deepDive: {
      challenge: 'إعداد دراسات تكلفة وجداول كميات دقيقة لمشاريع تنموية متنوعة في مناطق مختلفة بحيث تتطابق التكلفة التقديرية مع أسعار السوق الفعلية عند طرح المناقصات.',
      methodology: 'المسح الميداني الدقيق للمواقع وتحديث قوائم أسعار مواد البناء والمصنعيات بشكل مستمر قبل إعداد التسعير التقديري ووثائق المناقصة.',
      deliverables: ['جداول كميات ومواصفات فنية (BOQs & Specs)', 'تقارير تحليل مالي وفني لعطاءات المقاولين', 'دراسات تقييم فني للمنشآت القائمة']
    }
  },
  {
    id: 'proj-sfd-roads',
    title: 'مهندس استشاري ومدير مشروع طرق ومنشآت خرسانية مائية',
    organization: 'الصندوق الاجتماعي للتنمية (SFD) – مشاريع الطرق والخزانات الخرسانية',
    period: '2017 – 2018',
    roles: ['all', 'realestate', 'techoffice', 'ngo'],
    badge: 'طرق وخزانات خرسانية مسلحة',
    metrics: ['إدارة مشروع طريق النيد سعدان', 'سلسلة خزانات خرسانية مسلحة', 'إشراف وحصر ومستخلصات'],
    bullets: [
      'مشاريع الطرق والخرسانات: أدرتُ مشروع طريق النيد سعدان وسلسلة مشاريع خزانات خرسانية مسلحة وحجرية منذ مرحلة التخطيط وحصر الكميات وطرح المناقصة، وحتى الإشراف الميداني على أعمال القطع والردم والجدران الساندة وصب الخرسانات والعزل المائي وإصدار المستخلصات.'
    ],
    deepDive: {
      challenge: 'تنفيذ أعمال طرق وجدران ساندة وخزانات مياه في تضاريسوعرة تتطلب دقة عالية في حساب كميات القطع الصخري والردميات وضبط جودة الخرسانات والعزل.',
      methodology: 'الرفع المساحي والهندسي المستمر قبل وبعد التنفيذ لحساب الكميات الفعلية بدقة، واختبار المواد والخرسانات والعزل المائي قبل التسليم.',
      deliverables: ['حصر كميات أعمال الطرق والمنشآت الساندة', 'تقارير استلام الحدادة والخرسانة والعزل للخزانات', 'المستخلصات المرحلية والختامية للمشاريع']
    }
  }
];

// ==========================================
// 2. SAMPLE INTERACTIVE PREVIEWS (BANA PRO & BOQ)
// ==========================================

const BANA_PRO_MODULES = [
  { code: 'boq', name: 'حصر الكميات (BOQ)', desc: 'إدارة بنود الأعمال، الوحدات، الأسعار التعاقدية، ونسب التنفيذ لكل بند.', status: 'مفعل – مرتبط بالمستخلصات' },
  { code: 'ipc', name: 'المستخلصات الجارية (IPC)', desc: 'إصدار المستخلصات تلقائياً بناءً على نسب الإنجاز الفعلي مع حساب الاستقطاعات والضمان.', status: 'مفعل – حساب ذري دقيق' },
  { code: 'cost-control', name: 'ضبط التكاليف (Cost Control)', desc: 'مقارنة التكلفة التقديرية بالتكلفة الفعلية للمواد والعمالة وتنبيهات تجاوز الميزانية.', status: 'مفعل – مراقبة لحظية' },
  { code: 'materials & procurement', name: 'المواد والمشتريات والموردين', desc: 'إدارة طلبات الشراء (PO)، مقارنة عروض أسعار مصانع الخرسانة والبلك والحديد، وتتبع التوريد للموقع.', status: 'مفعل – سلاسل إمداد' },
  { code: 'labor & payroll', name: 'العمالة، المصنعيات، والرواتب', desc: 'تسجيل يوميات العمال وإنتاجية المهنيين بالمتر والمقطوعية وصرف الدفعات.', status: 'مفعل – ميداني' },
  { code: 'ai-assistant', name: 'المساعد الهندسي الذكي (AI)', desc: 'تحليل الانحرافات المالية والفنية في المشروع وتوليد ملخصات تنفيذية فورية.', status: 'مفعل – تقنية AI' }
];

const SAMPLE_BOQ_ITEMS = [
  { id: '01-01', item: 'أعمال الحفر والإحلال لأساسات المباني السكنية شاملة الدمك والاختبار', unit: 'م3', qty: 1450, price: 45, executed: 1450 },
  { id: '02-01', item: 'توريد وصب خرسانة مسلحة للقواعد والميدات (إجهاد 350 كجم/سم2) شاملة الحدادة والنجارة', unit: 'م3', qty: 620, price: 980, executed: 620 },
  { id: '02-02', item: 'توريد وصب خرسانة مسلحة للأعمدة والأسقف والكمرات', unit: 'م3', qty: 840, price: 1120, executed: 790 },
  { id: '03-01', item: 'أعمال مباني بلك أسمنتي معزول ومفرغ مقاس 20×20×40 سم', unit: 'م2', qty: 4200, price: 75, executed: 4100 },
  { id: '04-01', item: 'أعمال اللياسة الداخلية والخارجية مع الشبك والطرطشة المسمارية', unit: 'م2', qty: 8500, price: 32, executed: 7800 },
  { id: '05-01', item: 'توريد وتركيب بلاط بورسلان للأرضيات والسيراميك لدورات المياه شاملاً الغراء والفواصل', unit: 'م2', qty: 3100, price: 85, executed: 2650 }
];

// ==========================================
// 3. MAIN APPLICATION COMPONENT
// ==========================================

export default function App() {
  // Active Lens State
  const [activeLens, setActiveLens] = useState('all');

  // Interactive Tabs for Showcase
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('banapro'); // 'banapro' | 'boq' | 'materials'

  // Project Deep-Dive Modal State
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  // CV Studio / Customizer Drawer State
  const [isCvStudioOpen, setIsCvStudioOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);

  // Customizable CV Configuration (Saved in LocalStorage for flexibility)
  const [cvConfig, setCvConfig] = useState(() => {
    const todayStr = new Date().toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return {
      recipientName: '', // e.g., "شركة محور برو المحترمين" or "المكتب الهندسي وشركة التطوير العقاري"
      issueDate: todayStr,
      refNumber: 'ENG-AF-2026',
      showVerificationBadge: true,
      showGitHubLink: true,
      customNote: '',
      selectedProjectIds: INITIAL_PROJECTS.map((p) => p.id)
    };
  });

  // Editable Projects & Pillars State
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [pillars, setPillars] = useState(INITIAL_PILLARS);

  // New Project Form inside Studio
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    organization: '',
    period: '2026',
    badge: 'مشروع منفذ',
    bullet1: '',
    bullet2: ''
  });

  // Copy feedback states
  const [copiedState, setCopiedState] = useState('');

  const currentLensData = ROLE_LENSES[activeLens] || ROLE_LENSES.all;

  // Filtered & Prioritized Pillars based on Active Lens
  const displayedPillars = useMemo(() => {
    if (activeLens === 'all') return pillars;
    const matching = pillars.filter((p) => p.roles.includes(activeLens));
    const others = pillars.filter((p) => !p.roles.includes(activeLens));
    return [...matching, ...others];
  }, [activeLens, pillars]);

  // Filtered & Prioritized Projects based on Active Lens
  const displayedProjects = useMemo(() => {
    // Reorder so the most relevant projects for the chosen lens appear first
    const priorityOrder = {
      all: ['proj-70', 'proj-nrc', 'proj-banapro', 'proj-sfd-health', 'proj-sfd-qs', 'proj-sfd-roads'],
      realestate: ['proj-70', 'proj-nrc', 'proj-sfd-health', 'proj-sfd-roads', 'proj-sfd-qs', 'proj-banapro'],
      techoffice: ['proj-sfd-qs', 'proj-70', 'proj-nrc', 'proj-sfd-health', 'proj-banapro', 'proj-sfd-roads'],
      techops: ['proj-banapro', 'proj-70', 'proj-nrc', 'proj-sfd-qs', 'proj-sfd-health', 'proj-sfd-roads'],
      ngo: ['proj-nrc', 'proj-70', 'proj-sfd-health', 'proj-sfd-qs', 'proj-sfd-roads', 'proj-banapro']
    };
    const order = priorityOrder[activeLens] || priorityOrder.all;
    return [...projects].sort((a, b) => {
      const idxA = order.indexOf(a.id);
      const idxB = order.indexOf(b.id);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  }, [activeLens, projects]);

  // Projects included in the Print/Export CV
  const cvExportProjects = useMemo(() => {
    return displayedProjects.filter((p) => cvConfig.selectedProjectIds.includes(p.id));
  }, [displayedProjects, cvConfig.selectedProjectIds]);

  // Copy helper
  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedState(key);
    setTimeout(() => setCopiedState(''), 2500);
  };

  // Add Custom Project Handler
  const handleAddCustomProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const createdId = 'proj-custom-' + Date.now();
    const created = {
      id: createdId,
      title: newProject.title,
      organization: newProject.organization || 'قطاع المقاولات والمشاريع الهندسية',
      period: newProject.period || '2026',
      roles: ['all', 'realestate', 'techoffice', 'techops', 'ngo'],
      badge: newProject.badge || 'مشروع مضاف',
      metrics: ['إنجاز موثق'],
      bullets: [newProject.bullet1, newProject.bullet2].filter(Boolean),
      deepDive: {
        challenge: 'تنفيذ وإدارة أعمال المشروع وفق المعايير الهندسية والميزانية المحددة.',
        methodology: 'إدارة ميدانية ومكتبية متكاملة وضبط للكميات والتكاليف.',
        deliverables: ['تسليم الأعمال النهائية بنجاح']
      }
    };
    setProjects([created, ...projects]);
    setCvConfig((prev) => ({
      ...prev,
      selectedProjectIds: [createdId, ...prev.selectedProjectIds]
    }));
    setNewProject({ title: '', organization: '', period: '2026', badge: 'مشروع منفذ', bullet1: '', bullet2: '' });
    setShowAddProjectForm(false);
  };

  // Toggle project in CV export
  const toggleProjectInCv = (id) => {
    setCvConfig((prev) => {
      const exists = prev.selectedProjectIds.includes(id);
      return {
        ...prev,
        selectedProjectIds: exists
          ? prev.selectedProjectIds.filter((item) => item !== id)
          : [...prev.selectedProjectIds, id]
      };
    });
  };

  // Generate Smart WhatsApp / Email Pitch based on Active Lens & Recipient
  const generatedPitchText = useMemo(() => {
    const greeting = cvConfig.recipientName
      ? `السلام عليكم ورحمة الله وبركاته،\nحياكم الله السادة / ${cvConfig.recipientName}،`
      : `السلام عليكم ورحمة الله وبركاته،\nحياك الله يا باشمهندس،`;

    if (activeLens === 'techops') {
      return `${greeting}

أتقدم إليكم بطلب الترشح للعمل لديكم في مجال (إدارة التشغيل، المنصات الرقمية، ومشتريات وسلاسل إمداد مواد البناء).

أمتلك خبرة عملية تتجاوز (10 سنوات) تجمع بشكل مباشر بين:
1. خبرة ميدانية وتجارية طويلة في سوق مواد البناء (الخرسانة، البلك بجميع مقاساته، البحص، الرمل، الإسمنت، الحديد، ومواد التشطيب): تفاوضاً مع المصانع والكسارات والموردين، وتسعيراً، وتوريداً لأكثر من 360 وحدة ومنزلاً سكنياً (منها إدارة مشتريات وتنفيذ كامل لمشروع 70 منزلاً سكنياً).
2. خبرة عملية في بناء وتشغيل المنصات الرقمية وتطبيقات الويب وقواعد البيانات (مثل نظام BANA Pro لإدارة المقاولات والمواد والموردين الموثق على GitHub)، وإدارة لوحات التحكم ومتابعة دورة الطلبات والحسابات بدقة.

بدلاً من الاكتفاء بسيرة ورقية تقليدية، يسعدني اطلاعكم على منصتي المهنية التفاعلية التي توثق سجل مشاريعي والأنظمة التي قمت بتشغيلها، مع إمكانية استعراض وتحميل السيرة الذاتية الرسمية المؤرخة مباشرة:
[رابط المنصة المهنية / مرفق ملف السيرة الذاتية PDF]

متواجد حالياً في المملكة وجاهز للمباشرة الفورية.

خالص التحية والتقدير،
م. عبدالمجيد علي الفقيه
جوال / واتساب: 0532777678`;
    }

    if (activeLens === 'ngo') {
      return `${greeting}

أتقدم إليكم بطلب الترشح للعمل في مجال (إعداد ورفع مشاريع الجمعيات والصناديق الداعمة وإدارة المشاريع التنموية).

لدي خبرة عملية تزيد عن (9 سنوات) في العمل المباشر مع المؤسسات والجمعيات التنموية والإنسانية وصناديق الدعم (الصندوق الاجتماعي للتنمية SFD، المجلس النرويجي NRC، ومؤسسة RDP)، وتشمل:
1. إعداد وصياغة ملفات ومقترحات المشاريع التنموية والخيرية، واستيفاء كافة مسوغاتها الفنية والمالية لرفعها عبر المنصات الداعمة (منصة إحسان وصندوق دعم الجمعيات).
2. إعداد الميزانيات التفصيلية وجداول الكميات (BOQ) ودراسات التكلفة لمشاريع الإسكان الخيري وترميم المنازل وسقيا المياه (أكثر من 360 وحدة ومنزلاً سكنياً).
3. إدارة قواعد بيانات المستفيدين على برنامج (Excel المتقدم)، ومتابعة التنفيذ وإعداد تقارير الإنجاز الموثقة للجهات المانحة.

تجدون مرفقاً سيرتي الذاتية الرسمية، كما يمكنكم الاطلاع على تفاصيل المشاريع المنفذة عبر منصتي المهنية.

خالص التحية والتقدير،
م. عبدالمجيد علي الفقيه
جوال / واتساب: 0532777678`;
    }

    return `${greeting}

أتقدم إليكم بطلب التعاون والعمل معكم، حيث تجمع خبرتي العملية (أكثر من 10 سنوات) بين العمل الميداني التنفيذي وبين أعمال المكتب الهندسي والفني:

1. إدارة وتنفيذ مشاريع التطوير العقاري والوحدات السكنية (عظم وتشطيب تسليم مفتاح) مع سجل فعلي في تنفيذ وإدارة وإشراف أكثر من 360 وحدة ومنزلاً سكنياً (منها إدارة تنفيذية ومالية كاملة لمشروع 70 منزلاً سكنياً لحساب مقاول من البداية للنهاية، و290 وحدة مع المجلس النرويجي NRC).
2. أعمال المكتب الفني وحصر الكميات والتسعير: إعداد جداول الكميات (BOQ)، تسعير المشاريع والمنافسات، مراجعة المخططات، وإعداد وتدقيق المستخلصات (IPCs) والركوستات.
3. ضبط التكاليف والحسابات والجدولة الزمنية عبر منظومات (Excel المتقدم) ونظام (BANA Pro ERP) بما يضبط المصروفات ويعظم ربحية وجودة المشروع.

يسعدني اطلاعكم على منصتي المهنية التفاعلية وسجل المشاريع والأنظمة، ومرفق لكم نسخة PDF رسمية من سيرتي الذاتية.

خالص التحية والتقدير،
م. عبدالمجيد علي الفقيه
جوال / واتساب: 0532777678`;
  }, [activeLens, cvConfig.recipientName]);

  // Trigger Print / Export PDF
  const handlePrintCv = () => {
    window.print();
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* =====================================================================
          PRINT STYLESHEET: ENSURES CLEAN A4 EXECUTIVE PDF EXPORT ON PRINT
      ===================================================================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap');

        body {
          font-family: 'Tajawal', 'Cairo', system-ui, -apple-system, sans-serif;
        }

        h1, h2, h3, h4, .font-heading {
          font-family: 'Cairo', 'Tajawal', sans-serif;
        }

        .ltr-inline {
          direction: ltr;
          unicode-bidi: embed;
          display: inline-block;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 9mm 11mm;
          }
          body {
            background: #ffffff !important;
            color: #111827 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-only-cv {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>

      {/* =====================================================================
          TOP STICKY EXECUTIVE BAR (WEB VIEW ONLY)
      ===================================================================== */}
      <header className="no-print sticky top-0 z-40 bg-[#1B365D] text-white shadow-lg border-b border-slate-700/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Identity Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F627D] border border-teal-400/30 flex items-center justify-center font-heading font-bold text-lg shadow-inner">
              م.ع
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base sm:text-lg tracking-tight">
                  م. عبدالمجيد علي الفقيه
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  مقيم بالسعودية – جاهز للمباشرة
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block">
                المنصة المهنية التفاعلية وسجل المشاريع والأنظمة الرقمية
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="https://wa.me/966532777678"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg transition shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>واتساب مباشر</span>
            </a>

            <button
              onClick={() => setIsPitchModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg transition"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">رسالة التقديم</span>
            </button>

            <button
              onClick={() => setIsCvStudioOpen(true)}
              className="inline-flex items-center gap-1.5 bg-[#0F627D] hover:bg-teal-600 text-white border border-teal-400/40 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg transition shadow-md"
            >
              <Sliders className="w-4 h-4" />
              <span>تخصيص وتصدير السيرة (PDF)</span>
            </button>
          </div>
        </div>

        {/* =====================================================================
            SMART ROLE LENS SWITCHER BAR (مفتاح تبديل المسار المهني الفوري)
        ===================================================================== */}
        <div className="bg-[#132642] border-t border-slate-700/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-teal-300 shrink-0 ml-1 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                استعرض خبراتي حسب تخصص شركتكم:
              </span>
              {Object.values(ROLE_LENSES).map((lens) => {
                const IconComponent = lens.icon;
                const isActive = activeLens === lens.id;
                return (
                  <button
                    key={lens.id}
                    onClick={() => setActiveLens(lens.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold shrink-0 transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-sm scale-[1.01]'
                        : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{lens.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MAIN INTERACTIVE PORTFOLIO CONTENT (HIDDEN ON PRINT)
      ===================================================================== */}
      <main className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* 1. EXECUTIVE HERO CARD */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-l from-[#1B365D] via-[#1B365D] to-[#0F627D] p-6 sm:p-8 text-white relative">
            <div className="max-w-4xl space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-teal-200">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{currentLensData.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold leading-tight">
                المهندس / عبدالمجيد علي يحيى حسن الفقيه
              </h1>

              <p className="text-sm sm:text-base text-teal-100 font-semibold">
                {currentLensData.title}
              </p>

              {/* Contact Info Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-200">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <strong className="ltr-inline text-white">+966 53 277 7678 (0532777678)</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <strong className="ltr-inline text-white">eng.alfakih@gmail.com</strong>
                </span>
                <a
                  href="https://github.com/eng540/bana-pro"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-amber-300 underline decoration-teal-400/60"
                >
                  <Github className="w-4 h-4 text-amber-400" />
                  <strong className="ltr-inline text-white">github.com/eng540/bana-pro</strong>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>المملكة العربية السعودية (جاهز للمباشرة الفورية)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Executive Summary & Key Metrics */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-slate-50 border-r-4 border-[#1B365D] rounded-l-xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F627D]">
                  نبذة مهنية (بصيغة المسار المختار: {currentLensData.label})
                </span>
                <span className="text-xs text-slate-500">
                  يمكنك تغيير المسار من الشريط العلوي لتخصيص العرض
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed text-justify">
                {currentLensData.summary}
              </p>
            </div>

            {/* 4 Key Impact Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentLensData.highlightStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-[#0F627D] transition"
                >
                  <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#1B365D]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-1">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. WHY THIS DIGITAL PLATFORM INSTEAD OF A STATIC PAPER CV? */}
        <section className="bg-gradient-to-r from-amber-50 via-white to-teal-50 border border-amber-200/80 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>رسالة لأصحاب العمل ومديري التوظيف</span>
            </div>
            <h2 className="text-base sm:text-lg font-heading font-bold text-[#1B365D]">
              لماذا صممتُ هذه المنصة المهنية التفاعلية بدلاً من الاكتفاء بسيرة ورقية عادية؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              لأن الخبرة العملية التي تمتد لأكثر من 10 سنوات في التنفيذ الميداني، والمكتب الفني، وإدارة المشتريات، وبناء أنظمة المقاولات الرقمية لا يمكن اختصارها في ورقة واحدة دون إغفال جوانب قد تهم شركتكم. هنا يمكنكم الاطلاع بشفافية كاملة على كل مشروع نفذته وكل نظام بنيته، وعند رغبتكم بنسخة PDF رسمية ومؤرخة لإجراءاتكم الإدارية، يمكنكم تصديرها بضغطة زر.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto">
            <button
              onClick={handlePrintCv}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 bg-[#1B365D] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>طباعة / حفظ السيرة PDF فوراً</span>
            </button>
            <button
              onClick={() => setIsCvStudioOpen(true)}
              className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#1B365D] border border-slate-300 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition"
            >
              <Edit3 className="w-4 h-4 text-[#0F627D]" />
              <span>تخصيص السيرة باسم شركتكم</span>
            </button>
          </div>
        </section>

        {/* 3. ENGINEERING & OPERATIONAL PILLARS TABLE */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-heading font-extrabold text-[#1B365D] flex items-center gap-2">
                <HardHat className="w-6 h-6 text-[#0F627D]" />
                <span>مجالات الخبرة والمهام الهندسية والتشغيلية</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                المهام الفعلية التي أمارسها في الموقع، والمكتب الفني، وإدارة الأنظمة والمشتريات
              </p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg self-start sm:self-center">
              مرتبة تلقائياً حسب المسار: {currentLensData.shortLabel}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-[#1B365D] text-white text-xs sm:text-sm">
                  <th className="py-3.5 px-4 font-heading font-bold w-1/3 border-l border-slate-700">
                    مجال العمل والتخصص
                  </th>
                  <th className="py-3.5 px-4 font-heading font-bold">
                    المهام والأعمال الفعلية التي أقوم بها
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {displayedPillars.map((pillar, index) => {
                  const isHighlighted = activeLens !== 'all' && pillar.roles.includes(activeLens);
                  return (
                    <tr
                      key={pillar.id}
                      className={`${
                        isHighlighted
                          ? 'bg-teal-50/50 hover:bg-teal-50'
                          : index % 2 === 0
                          ? 'bg-white hover:bg-slate-50'
                          : 'bg-slate-50/60 hover:bg-slate-50'
                      } transition`}
                    >
                      <td className="py-3.5 px-4 font-bold text-[#1B365D] align-top border-l border-slate-200">
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#0F627D]/10 text-[#0F627D] text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <span>{pillar.domain}</span>
                            {isHighlighted && (
                              <span className="block mt-1 text-[11px] font-semibold text-teal-700">
                                ★ أولوية قصوى لهذا المسار
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed text-justify align-top">
                        {pillar.tasks}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. VERIFIED PROJECT CASE STUDIES (سجل المشاريع والخبرات الموثق) */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#1B365D] flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#0F627D]" />
                <span>سجل الخبرات العملية والمشاريع المنفذة (+10 سنوات)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                اضغط على زر «تفاصيل ومنهجية التنفيذ» في أي مشروع للاطلاع على التحديات والمخرجات الهندسية والرقابية
              </p>
            </div>
            <button
              onClick={() => {
                setIsCvStudioOpen(true);
                setShowAddProjectForm(true);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F627D] hover:text-[#1B365D] bg-white border border-slate-300 px-3 py-2 rounded-xl shadow-2xs self-start sm:self-center transition"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مشروع أو خبرة جديدة</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {displayedProjects.map((proj) => {
              const isRelevantToLens = activeLens !== 'all' && proj.roles.includes(activeLens);
              return (
                <div
                  key={proj.id}
                  className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 shadow-2xs ${
                    isRelevantToLens
                      ? 'border-[#0F627D] ring-1 ring-[#0F627D]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold bg-[#1B365D] text-white px-2.5 py-0.5 rounded-md">
                          {proj.badge}
                        </span>
                        <span className="text-xs font-bold text-[#0F627D] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                          {proj.period}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-heading font-bold text-[#1B365D] pt-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-600">
                        {proj.organization}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProjectModal(proj)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-100 hover:bg-[#1B365D] text-slate-800 hover:text-white px-3.5 py-2 rounded-lg transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>تفاصيل ومنهجية التنفيذ</span>
                      </button>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc pr-5">
                    {proj.bullets.map((b, i) => (
                      <li key={i} className="text-justify">
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Key Metrics Pills */}
                  {proj.metrics && proj.metrics.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      {proj.metrics.map((m, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. LIVE INTERACTIVE SHOWCASE: BANA PRO ERP & TECHNICAL OFFICE SAMPLES */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 bg-teal-950/80 border border-teal-700/50 px-3 py-1 rounded-full">
                  <Code2 className="w-4 h-4" />
                  <span>إثبات عملي للقدرات التقنية والهندسية</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-extrabold">
                  معرض الأنظمة الرقمية ونماذج المكتب الفني ومواد البناء
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
                  هنا يمكنك استعراض هيكلة نظام <strong className="text-white">BANA Pro ERP</strong> الموثق على حسابي في GitHub، بالإضافة إلى نماذج تفاعلية لحصر الكميات (BOQ) وإدارة توريد مواد البناء.
                </p>
              </div>

              <a
                href="https://github.com/eng540/bana-pro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-amber-400 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition shrink-0 self-start lg:self-center"
              >
                <Github className="w-4 h-4" />
                <span className="ltr-inline">github.com/eng540/bana-pro</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Showcase Sub-Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveShowcaseTab('banapro')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  activeShowcaseTab === 'banapro'
                    ? 'bg-[#0F627D] text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>1. هيكلة ووحدات نظام BANA Pro ERP</span>
              </button>
              <button
                onClick={() => setActiveShowcaseTab('boq')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  activeShowcaseTab === 'boq'
                    ? 'bg-[#0F627D] text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>2. نموذج تفاعلي لحصر الكميات والمستخلصات (BOQ & IPC)</span>
              </button>
              <button
                onClick={() => setActiveShowcaseTab('materials')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${
                  activeShowcaseTab === 'materials'
                    ? 'bg-[#0F627D] text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>3. خبرة تشغيل وتوريد مواد البناء (خرسانة، بلك، بحص، حديد)</span>
              </button>
            </div>
          </div>

          {/* Tab Content 1: BANA Pro Architecture */}
          {activeShowcaseTab === 'banapro' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-[#1B365D]">
                    حول منهجية بناء النظام (شفافية مهنية تامة):
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    صممتُ هذا النظام انطلاقاً من خبرتي كمهندس مدني ومدير مشاريع يعرف بدقة الدورة المستندية والمحاسبية للموقع، ووظفتُ تقنيات الذكاء الاصطناعي الحديثة وأطر العمل السحابية (<span className="ltr-inline font-semibold">Next.js, TypeScript, PostgreSQL, Supabase</span>) لبناء وتشغيل هذا النظام المتكامل.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BANA_PRO_MODULES.map((mod, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 rounded-xl p-4 hover:border-[#0F627D] transition bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded ltr-inline">
                          /{mod.code}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {mod.status}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#1B365D] mb-1">
                        {mod.name}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Sample BOQ & IPC Sheet */}
          {activeShowcaseTab === 'boq' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-heading font-bold text-[#1B365D]">
                    نموذج مصغر لجدول كميات ومستخلص جاري (BOQ & IPC Progress Tracker)
                  </h3>
                  <p className="text-xs text-slate-500">
                    يوضح طريقة ربط الكميات التعاقدية بالكميات المنفذة فعلياً وحساب نسبة الإنجاز المالي تلقائياً
                  </p>
                </div>
                <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg">
                  إجمالي قيمة البنود المعروضة: 1,929,350 ريال
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-right border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                      <th className="py-2.5 px-3">رقم البند</th>
                      <th className="py-2.5 px-3">بيان الأعمال الهندسية</th>
                      <th className="py-2.5 px-3">الوحدة</th>
                      <th className="py-2.5 px-3">الكمية التعاقدية</th>
                      <th className="py-2.5 px-3">سعر الوحدة</th>
                      <th className="py-2.5 px-3">المنفذ الفعلي</th>
                      <th className="py-2.5 px-3">نسبة الإنجاز</th>
                      <th className="py-2.5 px-3">المستحق المالي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {SAMPLE_BOQ_ITEMS.map((row) => {
                      const pct = Math.round((row.executed / row.qty) * 100);
                      const amount = row.executed * row.price;
                      return (
                        <tr key={row.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{row.id}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{row.item}</td>
                          <td className="py-2.5 px-3 text-slate-600">{row.unit}</td>
                          <td className="py-2.5 px-3 font-mono">{row.qty.toLocaleString()}</td>
                          <td className="py-2.5 px-3 font-mono">{row.price.toLocaleString()}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-[#0F627D]">
                            {row.executed.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-bold ${
                                pct === 100
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {pct}%
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-[#1B365D]">
                            {amount.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content 3: Building Materials & Supply Chain */}
          {activeShowcaseTab === 'materials' && (
            <div className="p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                  <h4 className="font-heading font-bold text-sm text-[#1B365D] mb-2">
                    1. مواد العظم والخرسانة والكسارات
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    خبرة ميدانية وتجارية كاملة في طلب وفحص وتوريد الخرسانة الجاهزة بمختلف رتبها وإجهاداتها، البلك الأسمنتي المعزول والعادي والبركاني بجميع مقاساته (10، 15، 20 سم)، البحص، الرمل (الدفان واللياسة)، الإسمنت، وحديد التسليح.
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                  <h4 className="font-heading font-bold text-sm text-[#1B365D] mb-2">
                    2. مواد التشطيبات والعزل والسباكة والكهرباء
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    حصر وشراء وتوريد مواد العزل المائي والحراري، مواسير وقطع السباكة والصرف، الأسلاك والطبلونات الكهربائية، البورسلان والسيراميك والغراء، ومواد الدهانات والواجهات (كما طبقته فعلياً في تأهيل وتشطيب 70 منزلاً سكنياً).
                  </p>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/60">
                  <h4 className="font-heading font-bold text-sm text-[#1B365D] mb-2">
                    3. إدارة التطبيقات واللوجستيات وحسابات الموردين
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    تحديث قوائم الأصناف والأسعار في لوحات التحكم، استقطاب المصانع والموردين، جدولة ردود الشاحنات للمواقع، ومطابقة سندات الاستلام في الموقع مع فواتير الموردين ومستحقاتهم.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 6. ACADEMIC QUALIFICATIONS, COURSES & SKILLS */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-heading font-extrabold text-[#1B365D] flex items-center gap-2 border-b border-slate-200 pb-3">
            <Award className="w-6 h-6 text-[#0F627D]" />
            <span>المؤهل العلمي، الدورات التدريبية، والبرامج الهندسية</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-[#0F627D]">الدرجة الجامعية</div>
                <div className="text-base font-heading font-bold text-[#1B365D] mt-0.5">
                  بكالوريوس العلوم في الهندسة المدنية (B.Sc. in Civil Engineering)
                </div>
                <div className="text-xs sm:text-sm text-slate-700 mt-1">
                  جامعة ذمار (جامعة حكومية معتمدة) | التخرج: 2014 م (التقدير العام: جيد جداً)
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="text-xs font-bold text-[#0F627D]">الدورات التخصصية والمهنية</div>
                <ul className="text-xs sm:text-sm text-slate-700 space-y-1 list-disc pr-4">
                  <li>دورة التحليل والتصميم للمنشآت الخرسانية بتقنية نمذجة معلومات البناء (BIM).</li>
                  <li>دورة التصميم الإنشائي وحساب الكميات والمواصفات والتسعير – نقابة المهندسين.</li>
                  <li>دورة إدارة وتنفيذ المشاريع الهندسية والمناقصات – الصندوق الاجتماعي للتنمية (SFD).</li>
                  <li>دورة إدارة مشاريع المياه والبنية التحتية | دورة الأمن والسلامة المهنية في المواقع (HSE).</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="text-xs font-bold text-[#0F627D]">البرامج الهندسية والتقنية</div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  إجادة العمل على برامج <strong className="ltr-inline">AutoCAD (2D & 3D)</strong>، وبرنامج <strong className="ltr-inline">Autodesk Revit & BIM</strong>، وبرنامج <strong className="ltr-inline">MS Project</strong>، وإتقان بمستوى متقدم جداً لبرنامج <strong className="ltr-inline">MS Excel</strong> في تصميم معادلات الحصر والتسعير والمستخلصات وضبط حسابات المقاولين والعمال.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="text-xs font-bold text-[#0F627D]">الأنظمة الرقمية، المهارات الإدارية، واللغات</div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  بناء وتشغيل منصات الويب وقواعد البيانات (<span className="ltr-inline">PostgreSQL, Supabase, GitHub</span>) وتوظيف أدوات الذكاء الاصطناعي لأتمتة سير العمل | قيادة فرق العمل الميدانية والمكتبية والتفاوض مع الموردين والملاك | اللغة العربية (اللغة الأم – إجادة تامة للهجة السعودية) | اللغة الإنجليزية (جيد جداً).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MODAL 1: PROJECT DEEP-DIVE (تفاصيل ومنهجية تنفيذ المشروع)
      ===================================================================== */}
      {selectedProjectModal && (
        <div className="no-print fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold bg-[#1B365D] text-white px-2.5 py-0.5 rounded">
                  {selectedProjectModal.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-[#1B365D] mt-2">
                  {selectedProjectModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {selectedProjectModal.organization} | {selectedProjectModal.period}
                </p>
              </div>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedProjectModal.deepDive && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                  <div className="font-bold text-amber-950 mb-1">1. طبيعة المشروع والتحدي الهندسي والتشغيلي:</div>
                  <p className="text-slate-800 leading-relaxed">{selectedProjectModal.deepDive.challenge}</p>
                </div>

                <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4">
                  <div className="font-bold text-teal-950 mb-1">2. منهجية العمل والإدارة التي طبقتُها:</div>
                  <p className="text-slate-800 leading-relaxed">{selectedProjectModal.deepDive.methodology}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="font-bold text-[#1B365D] mb-2">3. أبرز المخرجات والوثائق المنجزة:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProjectModal.deepDive.deliverables.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="bg-[#1B365D] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: SMART PITCH GENERATOR (مولد رسائل الواتساب والإيميل)
      ===================================================================== */}
      {isPitchModalOpen && (
        <div className="no-print fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-heading font-bold text-[#1B365D]">
                  رسالة التقديم الجاهزة (مخصصة لمسار: {currentLensData.shortLabel})
                </h3>
                <p className="text-xs text-slate-500">
                  انسخ هذه الرسالة وأرسلها عبر الواتساب أو الإيميل مع رابط موقعك أو ملف الـ PDF
                </p>
              </div>
              <button
                onClick={() => setIsPitchModalOpen(false)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                اسم الشركة أو المهندس المرسل إليه (اختياري – يظهر تلقائياً في الرسالة والسيرة):
              </label>
              <input
                type="text"
                value={cvConfig.recipientName}
                onChange={(e) => setCvConfig({ ...cvConfig, recipientName: e.target.value })}
                placeholder="مثال: شركة محور برو المحترمين / مكتب التطوير العقاري"
                className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#0F627D]"
              />
            </div>

            <textarea
              readOnly
              rows={11}
              value={generatedPitchText}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => handleCopy(generatedPitchText, 'pitch')}
                className="inline-flex items-center gap-2 bg-[#0F627D] hover:bg-teal-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition"
              >
                {copiedState === 'pitch' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تم نسخ الرسالة بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ نص الرسالة</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsPitchModalOpen(false)}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: DYNAMIC CUSTOM CV STUDIO & EXPORTER (محرك تفصيل وتصدير السيرة)
      ===================================================================== */}
      {isCvStudioOpen && (
        <div className="no-print fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#0F627D] bg-teal-50 px-2.5 py-0.5 rounded-md">
                  لوحة التخصيص والتصدير الفوري
                </span>
                <h2 className="text-xl font-heading font-extrabold text-[#1B365D] mt-1">
                  محرك إصدار السيرة الذاتية المخصصة والمؤرخة (PDF الرسمي)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  اختر المسار الوظيفي، ووجه السيرة باسم الجهة (إن رغبت)، وحدد المشاريع، ثم اضغط «تصدير PDF الرسمي»
                </p>
              </div>
              <button
                onClick={() => setIsCvStudioOpen(false)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Choose Lens Preset */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#1B365D]">
                1. اختر المسار المهني للسيرة الذاتية التي تريد تصديرها:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {Object.values(ROLE_LENSES).map((lens) => (
                  <button
                    key={lens.id}
                    onClick={() => setActiveLens(lens.id)}
                    className={`p-3 rounded-xl border text-right transition ${
                      activeLens === lens.id
                        ? 'border-[#1B365D] bg-[#1B365D] text-white font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{lens.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Document Metadata (Dated & Directed To) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  موجهة إلى (اختياري – يظهر أعلى السيرة):
                </label>
                <input
                  type="text"
                  value={cvConfig.recipientName}
                  onChange={(e) => setCvConfig({ ...cvConfig, recipientName: e.target.value })}
                  placeholder="مثال: شركة محور برو / مكتب هندسي"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تاريخ إصدار الوثيقة:
                </label>
                <input
                  type="text"
                  value={cvConfig.issueDate}
                  onChange={(e) => setCvConfig({ ...cvConfig, issueDate: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  خيارات العرض في الـ PDF:
                </label>
                <div className="flex flex-col gap-1.5 pt-1 text-xs">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cvConfig.showGitHubLink}
                      onChange={(e) => setCvConfig({ ...cvConfig, showGitHubLink: e.target.checked })}
                      className="rounded text-[#1B365D]"
                    />
                    <span>إظهار رابط GitHub (مشروع BANA Pro)</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cvConfig.showVerificationBadge}
                      onChange={(e) =>
                        setCvConfig({ ...cvConfig, showVerificationBadge: e.target.checked })
                      }
                      className="rounded text-[#1B365D]"
                    />
                    <span>إظهار ترويسة التوثيق والتاريخ</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Toggle Projects or Add New Project */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-bold text-[#1B365D]">
                  2. المشاريع والخبرات المضمنة في ملف الـ PDF ({cvConfig.selectedProjectIds.length} مختارة):
                </label>
                <button
                  onClick={() => setShowAddProjectForm(!showAddProjectForm)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F627D] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة خبرة أو مشروع جديد للقائمة</span>
                </button>
              </div>

              {showAddProjectForm && (
                <form
                  onSubmit={handleAddCustomProject}
                  className="bg-teal-50/60 border border-teal-200 rounded-xl p-4 space-y-3"
                >
                  <div className="text-xs font-bold text-[#1B365D]">إضافة مشروع أو خبرة جديدة:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="المسمى وموضوع المشروع *"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="sm:col-span-2 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="الفترة (مثال: 2025 - 2026)"
                      value={newProject.period}
                      onChange={(e) => setNewProject({ ...newProject, period: e.target.value })}
                      className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="الجهة أو الشركة"
                    value={newProject.organization}
                    onChange={(e) => setNewProject({ ...newProject, organization: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="النقطة الأولى (تفاصيل المهام والإنجاز)"
                    value={newProject.bullet1}
                    onChange={(e) => setNewProject({ ...newProject, bullet1: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProjectForm(false)}
                      className="text-xs text-slate-600 px-3 py-1"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="bg-[#0F627D] text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                    >
                      حفظ وإدراج في السيرة
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                {displayedProjects.map((p) => {
                  const checked = cvConfig.selectedProjectIds.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                        checked ? 'bg-slate-50 border-[#1B365D]' : 'bg-white border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleProjectInCv(p.id)}
                          className="rounded text-[#1B365D]"
                        />
                        <span className="font-bold text-slate-800">{p.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 shrink-0">{p.period}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                عند الضغط على «تصدير PDF»، اختر <strong>Save as PDF / حفظ بتنسيق PDF</strong> من نافذة الطباعة.
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsCvStudioOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  معاينة السيرة أسفل الصفحة
                </button>
                <button
                  onClick={handlePrintCv}
                  className="inline-flex items-center gap-2 bg-[#1B365D] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>تصدير / طباعة السيرة الذاتية (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          EXECUTIVE PRINTABLE A4 CV PREVIEW & PRINT TARGET
          (Uses the exact Navy #1B365D & Teal #0F627D Framed Design he loved)
      ===================================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-4 pt-6 border-t border-slate-200">
          <div>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-[#1B365D] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0F627D]" />
              <span>معاينة وثيقة السيرة الذاتية الرسمية الجاهزة للتصدير (A4 PDF)</span>
            </h2>
            <p className="text-xs text-slate-500">
              هذه الوثيقة تتحدث تلقائياً حسب المسار المختار أعلاه ({currentLensData.label}) وتُطبع بمفردها دون قوائم الموقع
            </p>
          </div>
          <button
            onClick={handlePrintCv}
            className="inline-flex items-center gap-2 bg-[#0F627D] hover:bg-teal-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs transition"
          >
            <Download className="w-4 h-4" />
            <span>تحميل / طباعة هذه الوثيقة (PDF)</span>
          </button>
        </div>

        {/* THE A4 DOCUMENT SHEET */}
        <div className="print-only-cv bg-white border border-slate-300 shadow-xl rounded-none sm:rounded-lg p-6 sm:p-10 text-slate-900">
          {/* Optional Verification / Directed Header Bar */}
          {(cvConfig.showVerificationBadge || cvConfig.recipientName) && (
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 mb-3 rounded">
              <div className="flex items-center gap-3">
                <span>
                  <strong>تاريخ الإصدار:</strong> {cvConfig.issueDate}
                </span>
                {cvConfig.recipientName && (
                  <span className="font-bold text-[#1B365D]">
                    | عناية السادة: {cvConfig.recipientName}
                  </span>
                )}
              </div>
              <div className="ltr-inline font-mono text-[10.5px] text-[#0F627D]">
                Ref: {cvConfig.refNumber}
              </div>
            </div>
          )}

          {/* Classic Framed Executive Header */}
          <div className="text-center border-b-[2.5px] border-[#1B365D] pb-3 mb-3.5">
            <h1 className="text-2xl sm:text-[23px] font-heading font-extrabold text-[#1B365D] leading-snug">
              المهندس / عبدالمجيد علي يحيى الفقيه
            </h1>
            <div className="text-xs sm:text-[13px] font-heading font-bold text-[#0F627D] mt-1">
              {currentLensData.title}
            </div>
            <div className="text-xs text-slate-800 font-semibold mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <span>
                جوال / واتساب: <strong className="ltr-inline text-[#1B365D]">+966 53 277 7678 (0532777678)</strong>
              </span>
              <span>|</span>
              <span>
                البريد: <strong className="ltr-inline text-[#1B365D]">eng.alfakih@gmail.com</strong>
              </span>
              {cvConfig.showGitHubLink && (
                <>
                  <span>|</span>
                  <span>
                    الأنظمة والمشاريع: <strong className="ltr-inline text-[#1B365D]">github.com/eng540</strong>
                  </span>
                </>
              )}
              <span>|</span>
              <span className="text-[#0F627D] font-bold">
                الإقامة: المملكة العربية السعودية (جاهز للمباشرة)
              </span>
            </div>
          </div>

          {/* Framed Summary Box */}
          <div className="bg-[#F4F7FA] border border-[#D0D9E2] border-r-4 border-r-[#1B365D] p-3 mb-4 text-xs sm:text-[12.5px] leading-relaxed text-justify">
            <strong className="text-[#1B365D]">نبذة مهنية: </strong>
            {currentLensData.summary}
          </div>

          {/* Section 1: Engineering & Operational Pillars Table */}
          <div className="mb-4">
            <h2 className="text-xs sm:text-[13.5px] font-heading font-bold text-[#1B365D] bg-[#F0F4F8] border-r-4 border-r-[#1B365D] border-b border-b-[#D0D9E2] py-1 px-2.5 mb-2">
              مجالات الخبرة والمهام الهندسية والتشغيلية
            </h2>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#1B365D] text-white">
                  <th className="py-1.5 px-2.5 text-right font-bold w-[29%] border border-[#1B365D]">
                    المجال الهندسي والتشغيلي
                  </th>
                  <th className="py-1.5 px-2.5 text-right font-bold border border-[#1B365D]">
                    المهام والأعمال التي أقوم بها
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedPillars.slice(0, 4).map((pillar, i) => (
                  <tr key={pillar.id} className={i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                    <td className="py-1.5 px-2.5 font-bold text-[#1B365D] border border-slate-300 align-top">
                      {i + 1}. {pillar.domain}
                    </td>
                    <td className="py-1.5 px-2.5 text-slate-800 border border-slate-300 leading-snug text-justify align-top">
                      {pillar.tasks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 2: Practical Experience & Executed Projects */}
          <div className="mb-4">
            <h2 className="text-xs sm:text-[13.5px] font-heading font-bold text-[#1B365D] bg-[#F0F4F8] border-r-4 border-r-[#1B365D] border-b border-b-[#D0D9E2] py-1 px-2.5 mb-2.5">
              الخبرات العملية والمشاريع المنفذة
            </h2>

            <div className="space-y-3">
              {cvExportProjects.map((proj) => (
                <div key={proj.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xs sm:text-[13px] font-heading font-bold text-[#1B365D]">
                      {proj.title}
                    </h3>
                    <span className="text-[11.5px] font-bold text-[#0F627D]">
                      {proj.period}
                    </span>
                  </div>
                  <div className="text-[11.5px] font-semibold text-[#0F627D] mb-1">
                    {proj.organization}
                  </div>
                  <ul className="list-disc pr-4 space-y-0.5 text-xs text-slate-800 leading-snug">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="text-justify">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Education, Courses, Technical Stack & Languages */}
          <div className="break-inside-avoid">
            <h2 className="text-xs sm:text-[13.5px] font-heading font-bold text-[#1B365D] bg-[#F0F4F8] border-r-4 border-r-[#1B365D] border-b border-b-[#D0D9E2] py-1 px-2.5 mb-2">
              المؤهل العلمي، الدورات التدريبية، والبرامج الهندسية
            </h2>
            <ul className="list-disc pr-4 space-y-1 text-xs text-slate-800 leading-snug">
              <li>
                <strong className="text-[#1B365D]">المؤهل العلمي: </strong>
                بكالوريوس العلوم في الهندسة المدنية – جامعة ذمار (جامعة حكومية معتمدة) | 2014م (التقدير العام: جيد جداً).
              </li>
              <li>
                <strong className="text-[#1B365D]">الدورات التدريبية: </strong>
                دورة التحليل والتصميم للمنشآت الخرسانية بتقنية (BIM) | دورة التصميم الإنشائي وحساب الكميات والمواصفات والتسعير (نقابة المهندسين) | دورة إدارة وتنفيذ المشاريع الهندسية والمناقصات (SFD) | دورة الأمن والسلامة المهنية في المواقع (HSE).
              </li>
              <li>
                <strong className="text-[#1B365D]">البرامج الهندسية والأنظمة الرقمية: </strong>
                إجادة العمل على برنامج AutoCAD (2D & 3D)، وبرنامج Autodesk Revit & BIM، وبرنامج MS Project، وإتقان بمستوى متقدم برنامج MS Excel في إعداد جداول الحصر والتسعير والمستخلصات ومتابعة التكاليف، بالإضافة إلى تطوير وتشغيل منصات الويب وقواعد البيانات (PostgreSQL, GitHub, BANA Pro ERP) وأتمتة سير العمل.
              </li>
              <li>
                <strong className="text-[#1B365D]">المهارات الإدارية واللغات: </strong>
                قيادة فرق العمل الميدانية والمكتبية، التفاوض مع الموردين والمصانع ومقاولي الباطن، والتعامل المباشر مع الملاك والعملاء | اللغة العربية (اللغة الأم – إجادة تامة للهجة السعودية) | اللغة الإنجليزية (جيد جداً في المصطلحات الهندسية والتقارير والمراسلات).
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}