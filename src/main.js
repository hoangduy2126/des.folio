import { gsap } from 'gsap';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './style.css';

/* ===================== SMOOTH SCROLL (LENIS) ===================== */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

window.lenis = lenis;

/* ===================== HAPTIC FEEDBACK (Mobile) ===================== */
function triggerHaptic(duration = 10) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (_) {}
  }
}

/* ===================== BRUTALIST TOAST NOTIFICATION ===================== */
const toastContainer = document.getElementById('toastContainer');
function showToast(message, duration = 2600) {
  if (!toastContainer || !message) return;
  const toast = document.createElement('div');
  toast.className = 'brutalist-toast';
  toast.innerHTML = `<span class="brutalist-toast-dot" aria-hidden="true"></span><span>${message}</span>`;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

/* ===================== CURSOR (Desktop Only) ===================== */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursorTrail');
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (!isTouchDevice && cursor && trail) {
  const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
  const setCursorY = gsap.quickSetter(cursor, 'y', 'px');
  const moveTrailX = gsap.quickTo(trail, 'x', { duration: 0.14, ease: 'power2.out' });
  const moveTrailY = gsap.quickTo(trail, 'y', { duration: 0.14, ease: 'power2.out' });
  document.addEventListener('mousemove', e => {
    setCursorX(e.clientX);
    setCursorY(e.clientY);
    moveTrailX(e.clientX);
    moveTrailY(e.clientY);
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    trail.style.opacity = '0.4';
  });

  const hoverSelector = 'a, button, input, textarea, select, .tool-chip, .sc-card, .skill-card, .skill-tile, .profile-stat-box, .bento-chip, .h-nav-btn, .topbar-btn, .timeline-see-more-btn, .tab-nav-arrow, .detail-close-btn, .lang-toggle, .theme-toggle, .detail-gallery-item, .lightbox-close-btn, .social-action-btn, .carousel-arrow, .carousel-dot, .division-tab, .social-tag, .social-slide img';
  document.addEventListener('mouseover', e => {
    if (e.target.closest && e.target.closest(hoverSelector)) {
      cursor.classList.add('hovered');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest && e.target.closest(hoverSelector)) {
      cursor.classList.remove('hovered');
    }
  });
} else if (cursor && trail) {
  cursor.style.display = 'none';
  trail.style.display = 'none';
}

/* ===================== BILINGUAL TRANSLATION SYSTEM (EN / VN) ===================== */
const translations = {
  en: {
    page_title: "Desfolio - The Moee's Lab",
    meta_description: 'Graphic Designer portfolio focusing on Social Media and Branding.',
    nav_showcase: 'HOME',
    nav_info: 'INFO & SKILLS',
    nav_works: 'MY WORKS',
    nav_contact: 'CONTACT',
    nav_status: 'AVAILABLE',
    theme_day: 'DAY',
    theme_night: 'NIGHT',
    menu: 'MENU',
    menu_close: 'CLOSE',
    mobile_nav_title: '// NAVIGATION',
    mobile_drawer_footer: '// HOÀNG DUY · GRAPHIC DESIGNER',
    hero_tag: 'DUNNO WHO YOU ARE, BUT WELCOME!',
    hero_hi: 'HI!',
    hero_is_here: 'IS HERE',
    btn_view_work: 'VIEW_WORK',
    btn_contact: 'GET_IN_TOUCH',
    stat_exp: 'YRS_EXP',
    stat_projects: 'PROJECTS',
    stat_open: 'OPEN_TO_WORK',
    stat_devotion: 'DEVOTION',
    profile_role: 'GRAPHIC DESIGNER',
    profile_loc: 'HANOI, VN 🇻🇳',
    showcase_reel_label: '// LIVE_SHOWCASE_REEL',
    info_about_label: '01_ABOUT_ME',
    info_about_bio: "Hi, I'm Hoàng Duy (Randommoee06). I'm a graphic designer and design student based in Hanoi, Vietnam. To me, design has never been just about making things look cool—it's about finding honest ways to tell stories, solve problems, and connect with people.",
    info_about_bio_sub: "Whether building a visual identity from scratch, crafting social media campaigns, or exploring typography and brutalist aesthetics, I put care and intention into every detail. I'm constantly learning, staying curious, and looking for meaningful collaborations with people who care about what they build.",
    manifesto_badge: 'PHILOSOPHY',
    manifesto_quote: '"Good design isn\'t just visual decoration—it gives ideas an honest voice and creates genuine human connection."',
    info_key_location: 'LOCATION',
    info_val_location: 'Hanoi, Vietnam 🇻🇳',
    info_key_status: 'STATUS',
    info_val_status: 'Open to opportunities',
    info_key_focus: 'FOCUS',
    info_val_focus: 'Branding · Social Media · Key Visuals',
    info_skills_label: '02_SKILLS_&_EXPERTISE',
    skills_count: '// 6 CORE DISCIPLINES',
    skill_1_badge: 'BRAND',
    skill_1_name: 'Brand Identity',
    skill_1_desc: 'Logos, visual systems, guidelines & brand assets.',
    skill_2_badge: 'SOCIAL',
    skill_2_name: 'Social Media Design',
    skill_2_desc: 'Feed aesthetics, campaign posts, carousels & banners.',
    skill_3_badge: 'POSTER',
    skill_3_name: 'Key Visual & Poster',
    skill_3_desc: 'Event artwork, promo posters & print collaterals.',
    skill_4_badge: 'TYPE',
    skill_4_name: 'Typography & Layout',
    skill_4_desc: 'Grid systems, editorial styling & font hierarchy.',
    skill_5_badge: 'STORY',
    skill_5_name: 'Visual Storytelling',
    skill_5_desc: 'Creative direction, concept art & engagement assets.',
    skill_6_badge: 'MOTION',
    skill_6_name: 'Motion & Video',
    skill_6_desc: 'Reels, short-form editing & dynamic motion graphics.',
    skills_summary_title: '// CORE_COMPETENCIES',
    tag_vector: 'Vector Craft',
    tag_grid: 'Grid Systems',
    tag_identity: 'Design Systems',
    tag_color: 'Color Harmony',
    info_edu_label: '03_EDUCATION_&_RESEARCH',
    edu_badge_1: '2024 — 2028 · IN PROGRESS',
    edu_deg_1: 'Bachelor in Industrial & Graphic Design',
    edu_sch_1: 'Univ. of Engineering and Technology · VNU · Hanoi',
    edu_major_1: 'Major in Industrial & Engineering Design',
    tag_interior: 'Industrial',
    tag_graphics: 'Graphics',
    tag_design: 'Design',
    edu_badge_2: '2021 — 2024 · GRADUATED',
    edu_deg_2: 'High School Diploma',
    edu_sch_2: 'Viet Tri High School · Vietnam',
    tag_math: 'Math',
    tag_physics: 'Physics',
    tag_coding: 'Coding',
    academic_note_title: '// ACADEMIC_FOCUS',
    academic_note_p: 'Focusing on visual communication, industrial ergonomics, human-centered design principles, and modern digital branding methodology.',
    info_tools_label: '04_TOOLS_&_STACK',
    tools_creative_title: '// CREATIVE_SUITE',
    tools_tech_title: '// 3D_CAD_&_CODE',
    tools_env_title: '// ENVIRONMENT',
    works_label: '03_MY_WORKS',
    works_section_label: '03_SELECTED_WORKS',
    works_sub: '// SELECTED GRAPHIC DESIGN & BRANDING PROJECTS',
    btn_see_more: 'SEE MORE [FULL VIEW]',
    btn_close_detail: 'CLOSE [ESC]',
    view_asset: 'VIEW_ASSET ↗',
    detail_process_label: '// PROCESS & APPROACH',
    detail_results_label: '// RESULTS & OUTCOME',
    detail_gallery_label: '// GALLERY & ASSETS',
    work_spec_role: 'Role',
    work_spec_deliv: 'Deliverables',
    work_spec_org: 'Organization',
    work_1_cat: 'BRAND IDENTITY · ROBOTICS CLUB · VIET TRI HIGH SCHOOL',
    work_1_title: 'CRC — Robotics Club · Viet Tri High School',
    work_1_client: 'CRC Robotics Club · Viet Tri High School',
    work_1_desc: 'Comprehensive brand identity system and multi-generation recruitment media for the robotics club at Viet Tri High School. Engineered the official geometric vector logo mark, branded social banners, and high-impact recruitment collateral for Gen 1 and Gen 2.',
    work_1_role: 'Head of Media / Lead Designer',
    work_1_deliv: 'Vector Logo Mark, Brand Banner, Gen 1 & 2 Recruitment Posters, Roster Infographic',
    work_1_org: 'CRC Robotics Club · Viet Tri High School',
    p1_slide_1: '// SLIDE 01 · OFFICIAL CLUB BANNER',
    p1_slide_2: '// SLIDE 02 · VECTOR LOGO MARK',
    p1_slide_3: '// SLIDE 03 · GEN 1 RECRUITMENT POSTER',
    p1_slide_4: '// SLIDE 04 · GEN 2 RECRUITMENT POSTER',
    p1_slide_5: '// SLIDE 05 · MEMBER ROSTER INFOGRAPHIC',
    work_2_cat: 'BRAND ECOSYSTEM · MULTI-DISCIPLINARY ARCHIVE · SOV MEDIA CLUB',
    work_2_title: 'SOV — Media Club · Viet Tri High School',
    work_2_client: 'SOV Media Club · Viet Tri High School',
    work_2_badge: 'COLLECTION // 04 [3 MODULES]',
    work_2_desc: 'Comprehensive visual direction, campaign architecture, and recognition systems for the premier media club of Viet Tri High School (2023–2024). Structured into three creative modules: major campaigns (26/3, Exam Support, SOV Radio), official member excellence certificates (Gen 1 & 2), and school-wide interactive avatar frames.',
    work_2_role: 'Core Media Member Gen 1, Media Advisor Gen 2',
    work_2_deliv: '01. Campaigns (Key Visual, 26/3, TSMT, Radio) · 02. Certificates (Gen 1 & 2 Awards) · 03. Frames & Farewells (Congress, K58, K59)',
    work_2_org: 'SOV Media Club · Viet Tri High School',
    sov_tab_all: '✦ ALL (15)',
    sov_tab_campaigns: '📢 01 · CAMPAIGNS (7)',
    sov_tab_awards: '🏆 02 · AWARDS (4)',
    sov_tab_frames: '🎨 03 · FRAMES & FAREWELL (4)',
    p2_slide_1: '// [CAMPAIGNS] 01 · THÁNG THANH NIÊN 2023 KEY VISUAL',
    p2_slide_2: '// [CAMPAIGNS] 02 · 2:1 PANORAMIC MILESTONE BANNER',
    p2_slide_3: '// [CAMPAIGNS] 03 · 3D DUAL-FLYER EVENT POSTER',
    p2_slide_4: '// [AWARDS] 04 · GEN 1 EXCELLENCE AWARD (A4 FOIL)',
    p2_slide_5: '// [AWARDS] 05 · GEN 2 EXCELLENCE AWARD (A4 FOIL)',
    p2_slide_6: '// [CAMPAIGNS] 06 · TIẾP SỨC MÙA THI EXAM SUPPORT',
    p2_slide_7: '// [CAMPAIGNS] 07 · SOV RADIO PODCAST COVER',
    p2_slide_8: '// [FRAMES] 08 · ĐHĐB LXI CONGRESS CAMPAIGN FRAME',
    p2_slide_9: '// [FRAMES] 09 · YOUTH MONTH 2023 AVATAR FRAME',
    p2_slide_10: '// [CAMPAIGNS] 10 · REQUEST RADIO INTERACTIVE FEED',
    p2_slide_11: '// [CAMPAIGNS] 11 · 26/3 YOUTH MONTH SERIES (PART I)',
    p2_slide_12: '// [FAREWELL] 12 · K58 SENIOR FAREWELL COMMEMORATION',
    p2_slide_13: '// [FAREWELL] 13 · K59 SENIOR FAREWELL COMMEMORATION',
    p2_slide_14: '// [AWARDS] 14 · GEN 1 MEMBER RECOGNITION CERTIFICATE',
    p2_slide_15: '// [AWARDS] 15 · GEN 2 MEMBER RECOGNITION CERTIFICATE',
    work_3_cat: 'EDITORIAL · COMMEMORATIVE YEARBOOK · VISUAL STORYTELLING',
    work_3_title: 'Our Memories Yearbook — Class A4K59 × Hola Studio',
    work_3_client: 'Class A4K59 · Viet Tri High School × Hola Studio',
    work_3_desc: 'Complete editorial layout, typographic curation, and visual storytelling for the "Our Memories" graduation yearbook. Designed balanced grids, nostalgic color palettes, and emotional photo spreads preserving high school memories.',
    work_3_role: 'Concept & Editorial Layout Designer',
    work_3_deliv: '05 Commemorative Photo Spreads, Concept Direction, Typographic Grid Layouts',
    work_3_org: 'Class A4K59 · Viet Tri High School × Hola Studio',
    p3_slide_1: '// SLIDE 01 · MASTER DOUBLE-PAGE SPREAD',
    p3_slide_2: '// SLIDE 02 · SPREAD 01 "OUR YOUTH"',
    p3_slide_3: '// SLIDE 03 · SPREAD 02 "FRIENDSHIP MOMENTS"',
    p3_slide_4: '// SLIDE 04 · SPREAD 03 "CLASSROOM NOSTALGIA"',
    p3_slide_5: '// SLIDE 05 · SPREAD 04 "GRADUATION MEMOIR"',
    work_4_cat: 'EVENT · FRESHMEN ORIENTATION · CAMPAIGN · RECRUITMENT',
    work_4_title: 'Unleash — Freshmen Orientation Program · Viet Tri High School',
    work_4_client: 'Unleash — Viet Tri High School',
    work_4_desc: 'Creative visual direction and media publication design for the transition phase of the "Unleash" freshmen orientation program, crafted with a bold cyber-neon aesthetic.',
    work_4_role: 'Media Advisor — Unleash 2023',
    work_4_deliv: 'Transition Phase Media Publications',
    work_4_org: 'Viet Tri High School · Unleash Organizing Committee',
    p4_slide_1: '// SLIDE 01 · CORETEAM RECRUITMENT HERO POSTER',
    p4_slide_2: '// SLIDE 02 · 3-HOUR COUNTDOWN URGENCY VISUAL',
    p4_slide_3: '// SLIDE 03 · FORM CLOSURE ANNOUNCEMENT',
    contact_label: '04_CONTACT_&_COLLABORATE',
    contact_status: '● Open for new projects',
    contact_headline: 'Got an idea or project?<br>Let\'s talk, <span class="accent2">Duy</span>\'s here.',
    contact_tagline: '// reach out via email or zalo — quick replies, no complicated forms.',
    contact_email_label: 'Email',
    contact_email_sub: '// Replies within 24 hours',
    contact_phone_label: 'Zalo / Phone',
    contact_phone_sub: '// Direct chat & quick project inquiries',
    contact_btn_mail: 'Send mail',
    contact_btn_zalo: 'Chat Zalo',
    contact_btn_call: 'Call now',
    contact_btn_copy: 'Copy',
    contact_btn_copied: 'Copied ✓',
    contact_socials_label: '// or find me here —',
    footer_copy: '© 2026 HOÀNG DUY — ALL RIGHTS RESERVED',
    footer_version: 'v3.0.0 · VERTICAL FLOW',
    topbar_tz: 'GMT+7 · INDOCHINA',
    panel_name_0: 'HOME',
    panel_name_1: 'INFO',
    panel_name_2: 'WORKS',
    panel_name_3: 'CONTACT',
  },
  vi: {
    page_title: 'Desfolio - Phòng thí nghiệm của Moee',
    meta_description: 'Portfolio Nhà thiết kế Đồ hoạ chuyên sâu về Social Media và Nhận diện Thương hiệu.',
    nav_showcase: 'TRANG CHỦ',
    nav_info: 'GIỚI THIỆU & KỸ NĂNG',
    nav_works: 'DỰ ÁN TIÊU BIỂU',
    nav_contact: 'LIÊN HỆ',
    nav_status: 'SẴN SÀNG',
    theme_day: 'NGÀY',
    theme_night: 'ĐÊM',
    menu: 'MENU',
    menu_close: 'ĐÓNG',
    mobile_nav_title: '// ĐIỀU HƯỚNG',
    mobile_drawer_footer: '// HOÀNG DUY · NHÀ THIẾT KẾ ĐỒ HOẠ',
    hero_tag: 'CHÀO MỪNG ĐẾN PHÒNG THÍ NGHIỆM CỦA MOEE!',
    hero_hi: 'XIN CHÀO!',
    hero_is_here: 'ĐÃ CÓ MẶT',
    btn_view_work: 'XEM_DỰ_ÁN',
    btn_contact: 'LIÊN_HỆ',
    stat_exp: 'NĂM_KN',
    stat_projects: 'DỰ_ÁN',
    stat_open: 'NHẬN_DỰ_ÁN',
    stat_devotion: 'TẬN TÂM',
    profile_role: 'NHÀ THIẾT KẾ ĐỒ HOẠ',
    profile_loc: 'HÀ NỘI, VN 🇻🇳',
    showcase_reel_label: '// ẤN_PHẨM_TIÊU_BIỂU',
    info_about_label: '01_VỀ_BẢN_THÂN',
    info_about_bio: 'Xin chào, mình là Hoàng Duy (Randommoee06) — một graphic designer và sinh viên thiết kế đang học tập, làm việc tại Hà Nội. Với mình, thiết kế chưa bao giờ chỉ là làm cho mọi thứ trông bắt mắt; đó là cách chân thành nhất để kể một câu chuyện, giải quyết vấn đề và chạm tới cảm xúc của mọi người.',
    info_about_bio_sub: 'Dù là xây dựng bộ nhận diện thương hiệu từ con số không, sáng tạo chiến dịch mạng xã hội, hay thử nghiệm với typography và phong cách brutalism, mình luôn dành trọn tâm huyết cho từng chi tiết nhỏ. Mình luôn giữ tinh thần học hỏi, tò mò và tìm kiếm những cơ hội hợp tác ý nghĩa cùng những người tâm huyết với sản phẩm họ tạo ra.',
    manifesto_badge: 'TRIẾT_LÝ',
    manifesto_quote: '"Thiết kế tốt không chỉ là tô điểm bề ngoài — nó mang lại tiếng nói chân thật cho ý tưởng và tạo nên sự kết nối giữa người với người."',
    info_key_location: 'NƠI Ở',
    info_val_location: 'Hà Nội, Việt Nam 🇻🇳',
    info_key_status: 'TRẠNG THÁI',
    info_val_status: 'Sẵn sàng nhận dự án mới',
    info_key_focus: 'CHUYÊN MÔN',
    info_val_focus: 'Nhận diện thương hiệu · Social Media · Key Visuals',
    info_skills_label: '02_KỸ_NĂNG_&_CHUYÊN_MÔN',
    skills_count: '// 6 NĂNG LỰC CỐT LÕI',
    skill_1_badge: 'BRAND',
    skill_1_name: 'Nhận Diện Thương Hiệu',
    skill_1_desc: 'Logo, hệ thống hình ảnh, brand guidelines & ấn phẩm đại diện.',
    skill_2_badge: 'SOCIAL',
    skill_2_name: 'Thiết Kế Social Media',
    skill_2_desc: 'Định hình thẩm mỹ feed, bài đăng chiến dịch, carousels & banners.',
    skill_3_badge: 'POSTER',
    skill_3_name: 'Key Visual & Poster',
    skill_3_desc: 'Ấn phẩm sự kiện, poster quảng bá & tài liệu in ấn.',
    skill_4_badge: 'TYPE',
    skill_4_name: 'Typography & Bố Cục',
    skill_4_desc: 'Hệ thống lưới (grid), phong cách dàn trang & phân cấp chữ.',
    skill_5_badge: 'STORY',
    skill_5_name: 'Kể Chuyện Thị Giác',
    skill_5_desc: 'Định hướng sáng tạo, concept art & nội dung tương tác.',
    skill_6_badge: 'MOTION',
    skill_6_name: 'Chuyển Động & Video',
    skill_6_desc: 'Reels, biên tập video ngắn & đồ hoạ chuyển động sống động.',
    skills_summary_title: '// NĂNG_LỰC_CỐT_LÕI',
    tag_vector: 'Đồ Hoạ Vector',
    tag_grid: 'Hệ Thống Lưới',
    tag_identity: 'Hệ Thống Thiết Kế',
    tag_color: 'Phối Màu Thị Giác',
    info_edu_label: '03_HỌC_VẤN_&_NGHIÊN_CỨU',
    edu_badge_1: '2024 — 2028 · ĐANG THEO HỌC',
    edu_deg_1: 'Cử nhân Thiết kế Công nghiệp & Đồ hoạ',
    edu_sch_1: 'Trường Đại học Công nghệ · ĐHQGHN · Hà Nội',
    edu_major_1: 'Chuyên ngành Thiết kế Công nghiệp & Kỹ thuật',
    tag_interior: 'Công nghiệp',
    tag_graphics: 'Đồ hoạ',
    tag_design: 'Thiết kế',
    edu_badge_2: '2021 — 2024 · ĐÃ TỐT NGHIỆP',
    edu_deg_2: 'Bằng Tốt Nghiệp THPT',
    edu_sch_2: 'Trường THPT Việt Trì · Phú Thọ',
    tag_math: 'Toán',
    tag_physics: 'Lý',
    tag_coding: 'Lập trình',
    academic_note_title: '// ĐỊNH_HƯỚNG_HỌC_TẬP',
    academic_note_p: 'Tập trung vào truyền thông thị giác, công thái học công nghiệp, các nguyên lý thiết kế lấy con người làm trung tâm và phương pháp xây dựng thương hiệu số hiện đại.',
    info_tools_label: '04_CÔNG_CỤ_&_STACK',
    tools_creative_title: '// BỘ CÔNG CỤ SÁNG TẠO',
    tools_tech_title: '// 3D_CAD_&_LẬP_TRÌNH',
    tools_env_title: '// MÔI TRƯỜNG & NỀN TẢNG',
    works_label: '03_DỰ_ÁN_TIÊU_BIỂU',
    works_section_label: '03_DỰ_ÁN_TIÊU_BIỂU',
    works_sub: '// CÁC DỰ ÁN THIẾT KẾ ĐỒ HOẠ & THƯƠNG HIỆU CHỌN LỌC',
    btn_see_more: 'XEM CHI TIẾT [ĐẦY ĐỦ]',
    btn_close_detail: 'ĐÓNG [ESC]',
    view_asset: 'XEM_ẢNH_GỐC ↗',
    detail_process_label: '// QUY TRÌNH & PHƯƠNG PHÁP',
    detail_results_label: '// KẾT QUẢ & DẤU ẤN',
    detail_gallery_label: '// HÌNH ẢNH & TƯ LIỆU DỰ ÁN',
    work_spec_role: 'Vai trò',
    work_spec_deliv: 'Hạng mục',
    work_spec_org: 'Đơn vị',
    work_1_cat: 'NHẬN DIỆN THƯƠNG HIỆU · CLB ROBOTICS · THPT VIỆT TRÌ',
    work_1_title: 'CRC — CLB Robotics THPT Việt Trì',
    work_1_client: 'CLB Robotics CRC · THPT Việt Trì',
    work_1_desc: 'Hệ thống nhận diện thương hiệu toàn diện và chiến dịch truyền thông tuyển thành viên qua các thế hệ cho CLB Robotics THPT Việt Trì. Thiết kế biểu trưng vector hình học, bộ banner truyền thông và các ấn phẩm tuyển quân Gen 1 & Gen 2 đầy ấn tượng.',
    work_1_role: 'Trưởng ban Media / Lead Designer',
    work_1_deliv: 'Biểu Trưng Vector, Banner Nhận Diện, Poster Tuyển Gen 1 & Gen 2, Infographic Thành Viên',
    work_1_org: 'CLB Robotics CRC · THPT Việt Trì',
    p1_slide_1: '// SLIDE 01 · BANNER CHÍNH THỨC CLB',
    p1_slide_2: '// SLIDE 02 · BIỂU TRƯNG VECTOR HÌNH HỌC',
    p1_slide_3: '// SLIDE 03 · POSTER TUYỂN THÀNH VIÊN GEN 1',
    p1_slide_4: '// SLIDE 04 · POSTER TUYỂN THÀNH VIÊN GEN 2',
    p1_slide_5: '// SLIDE 05 · INFOGRAPHIC DANH SÁCH THÀNH VIÊN',
    work_2_cat: 'HỆ SINH THÁI NHẬN DIỆN · KHO LƯU TRỮ ĐA PHÂN HỆ · CLB SOV',
    work_2_title: 'SOV — CLB Truyền thông THPT Việt Trì',
    work_2_client: 'CLB Truyền thông SOV · THPT Việt Trì',
    work_2_badge: 'BỘ SƯU TẬP // 04 [3 PHÂN HỆ]',
    work_2_desc: 'Định hướng hình ảnh, kiến tạo chiến dịch và hệ thống ấn phẩm nhận diện cho CLB Truyền thông THPT Việt Trì (2023–2024). Gồm 3 phân hệ sáng tạo: các chiến dịch tiêu biểu (26/3, Tiếp Sức Mùa Thi, SOV Radio), bằng khen vinh danh thành viên (Gen 1 & 2) và khung avatar đại hội - tri ân toàn trường.',
    work_2_role: 'Thành viên nòng cốt Gen 1, Cố vấn Media Gen 2',
    work_2_deliv: '01. Chiến dịch (Key Visual, 26/3, TSMT, Radio) · 02. Khen thưởng (Bằng khen Gen 1 & 2) · 03. Khung & Tri ân (Đại hội, K58, K59)',
    work_2_org: 'CLB Truyền thông SOV · THPT Việt Trì',
    sov_tab_all: '✦ TẤT CẢ (15)',
    sov_tab_campaigns: '📢 01 · CHIẾN DỊCH (7)',
    sov_tab_awards: '🏆 02 · KHEN THƯỞNG (4)',
    sov_tab_frames: '🎨 03 · KHUNG & TRI ÂN (4)',
    p2_slide_1: '// [CHIẾN DỊCH] 01 · KEY VISUAL THÁNG THANH NIÊN 2023',
    p2_slide_2: '// [CHIẾN DỊCH] 02 · BANNER CỘT MỐC TOÀN CẢNH 2:1',
    p2_slide_3: '// [CHIẾN DỊCH] 03 · POSTER SỰ KIỆN PHỐI CẢNH 3D',
    p2_slide_4: '// [KHEN THƯỞNG] 04 · BẰNG KHEN XUẤT SẮC GEN 1 (A4)',
    p2_slide_5: '// [KHEN THƯỞNG] 05 · BẰNG KHEN XUẤT SẮC GEN 2 (A4)',
    p2_slide_6: '// [CHIẾN DỊCH] 06 · TIẾP SỨC MÙA THI',
    p2_slide_7: '// [CHIẾN DỊCH] 07 · ẢNH BÌA PODCAST SOV RADIO',
    p2_slide_8: '// [KHUNG] 08 · KHUNG AVATAR ĐẠI HỘI ĐB LXI',
    p2_slide_9: '// [KHUNG] 09 · KHUNG AVATAR THÁNG THANH NIÊN 2023',
    p2_slide_10: '// [CHIẾN DỊCH] 10 · BÀI ĐĂNG TƯƠNG TÁC REQUEST RADIO',
    p2_slide_11: '// [CHIẾN DỊCH] 11 · CHUỖI THÁNG THANH NIÊN 26/3 (PHẦN I)',
    p2_slide_12: '// [TRI ÂN] 12 · TRI ÂN HỌC SINH NIÊN KHOÁ K58',
    p2_slide_13: '// [TRI ÂN] 13 · TRI ÂN HỌC SINH NIÊN KHOÁ K59',
    p2_slide_14: '// [KHEN THƯỞNG] 14 · GIẤY CHỨNG NHẬN THÀNH VIÊN GEN 1',
    p2_slide_15: '// [KHEN THƯỞNG] 15 · GIẤY CHỨNG NHẬN THÀNH VIÊN GEN 2',
    work_3_cat: 'XUẤT BẢN · KỶ YẾU TRI ÂN · KỂ CHUYỆN THỊ GIÁC',
    work_3_title: 'Dự Án Kỷ Yếu Our Memories — A4K59 × Hola Studio',
    work_3_client: 'Lớp A4K59 · THPT Việt Trì × Hola Studio',
    work_3_desc: 'Thiết kế dàn trang xuất bản, định hướng typography và kể chuyện thị giác cho cuốn kỷ yếu tốt nghiệp "Our Memories". Bố cục lưới cân đối, bảng màu hoài niệm và các trang trải đôi giàu cảm xúc lưu giữ kỷ niệm tuổi học trò.',
    work_3_role: 'Lên Concept & Thiết Kế Dàn Trang Kỷ Yếu',
    work_3_deliv: '05 Trang Trải Đôi Kỷ Yếu Hoàn Chỉnh, Định Hướng Concept, Dàn Trang Typography',
    work_3_org: 'Lớp A4K59 · THPT Việt Trì × Hola Studio',
    p3_slide_1: '// SLIDE 01 · TRANG TRẢI ĐÔI CHỦ ĐẠO',
    p3_slide_2: '// SLIDE 02 · TRANG 01 "THANH XUÂN CỦA CHÚNG TA"',
    p3_slide_3: '// SLIDE 03 · TRANG 02 "KHOẢNH KHẮC BẠN BÈ"',
    p3_slide_4: '// SLIDE 04 · TRANG 03 "KỶ NIỆM LỚP HỌC"',
    p3_slide_5: '// SLIDE 05 · TRANG 04 "LƯU BÚT TỐT NGHIỆP"',
    work_4_cat: 'SỰ KIỆN · CHÀO TÂN HỌC SINH · CHIẾN DỊCH · TUYỂN BAN ĐIỀU HÀNH',
    work_4_title: 'Unleash — Chương Trình Chào Tân Học Sinh THPT Việt Trì',
    work_4_client: 'Unleash — THPT Việt Trì',
    work_4_desc: 'Định hướng mỹ thuật sáng tạo và thiết kế bộ ấn phẩm truyền thông trong giai đoạn chuyển giao của chương trình chào tân học sinh "Unleash", thể hiện phong cách cyber-neon hiện đại và ấn tượng.',
    work_4_role: 'Cố Vấn Media — Unleash 2023',
    work_4_deliv: 'Ấn phẩm truyền thông trong giai đoạn chuyển giao',
    work_4_org: 'Trường THPT Việt Trì · Ban Tổ Chức Unleash',
    p4_slide_1: '// SLIDE 01 · POSTER TUYỂN BAN ĐIỀU HÀNH',
    p4_slide_2: '// SLIDE 02 · ĐỒ HOẠ ĐẾM NGƯỢC 3 GIỜ',
    p4_slide_3: '// SLIDE 03 · THÔNG BÁO ĐÓNG ĐƠN ĐĂNG KÝ',
    contact_label: '04_LIÊN_HỆ_&_HỢP_TÁC',
    contact_status: '● Đang nhận dự án mới · Sẵn sàng hợp tác',
    contact_headline: 'Có ý tưởng hay dự án mới?<br>Nhắn <span class="accent2">Duy</span> ngay nhé.',
    contact_tagline: '// liên hệ qua email hoặc zalo — phản hồi nhanh, không thủ tục rườm rà.',
    contact_email_label: 'Địa chỉ Email',
    contact_email_sub: '// Phản hồi thư trong vòng 24 giờ',
    contact_phone_label: 'Zalo / Điện thoại',
    contact_phone_sub: '// Trò chuyện trực tiếp & trao đổi dự án nhanh',
    contact_btn_mail: 'Gửi email ↗',
    contact_btn_zalo: 'Chat Zalo 💬',
    contact_btn_call: 'Gọi ngay 📞',
    contact_btn_copy: 'Sao chép',
    contact_btn_copied: 'Đã chép ✓',
    contact_socials_label: '// KẾT NỐI QUA MẠNG XÃ HỘI',
    footer_copy: '© 2026 HOÀNG DUY — BẢN QUYỀN ĐƯỢC BẢO LƯU',
    footer_version: "v3.0.0 · THE MOEE'S LAB",
    topbar_tz: 'GMT+7 · HÀ NỘI',
    panel_name_0: 'TRANG CHỦ',
    panel_name_1: 'GIỚI THIỆU',
    panel_name_2: 'DỰ ÁN',
    panel_name_3: 'LIÊN HỆ',
  }
};

// TODO: Thay bằng các câu quotes cá nhân của bạn sau
const quotesEn = [
  'Ctrl + Z is my favorite cardio.',
  'Powered by iced coffee and stubborn pixels.',
  'Make it pop—just not with Comic Sans.',
  'Good kerning is an act of kindness.',
  '99% of design is knowing what to delete.',
  'Pixels aligned, brain slightly caffeinated.',
  'Less clutter, more character.',
  'Warning: may spontaneously obsess over 1px.',
  'Turning wild ideas into crisp visual stories.',
  'Stay curious, keep shipping cool stuff.',
];
const quotesVi = [
  'Ctrl + Z là bài tập cardio mỗi ngày.',
  'Chạy bằng cà phê sữa đá và những pixel lì lợm.',
  'Làm cho nó nổi bật — miễn đừng dùng Comic Sans.',
  'Căn chỉnh từng pixel cho tới khi vừa mắt mới chịu.',
  '99% thiết kế giỏi là biết nên bỏ bớt thứ gì.',
  'Ít rườm rà, nhiều cá tính hơn.',
  'Cảnh báo: có thể mất 30 phút chỉ để soi lệch 1px.',
  'Biến ý tưởng táo bạo thành câu chuyện thị giác.',
  'Deadline có thể dí, nhưng gu thẩm mỹ thì không vội.',
  'Luôn tò mò, luôn thử nghiệm điều mới mẻ.',
];

let currentLang = localStorage.getItem('des_lang') || 'en';
let quotes = currentLang === 'vi' ? quotesVi : quotesEn;

/* ===================== TYPEWRITER (RANDOM QUOTES) ===================== */
function pickRandomQuoteIdx(list, prevIdx) {
  if (list.length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * list.length);
  } while (next === prevIdx);
  return next;
}

let quoteIdx = pickRandomQuoteIdx(quotes, -1);
let charIdx = 0;
let deleting = false;
const tw = document.getElementById('typewriter');
let typeTimer = null;

function typeLoop() {
  if (!tw) return;
  const current = quotes[quoteIdx] || quotes[0];
  tw.textContent = deleting ? current.slice(0, charIdx--) : current.slice(0, ++charIdx);
  if (!deleting && charIdx === current.length) {
    typeTimer = setTimeout(() => { deleting = true; typeLoop(); }, 2200);
    return;
  }
  if (deleting && charIdx === 0) {
    deleting = false;
    quoteIdx = pickRandomQuoteIdx(quotes, quoteIdx);
  }
  typeTimer = setTimeout(typeLoop, deleting ? 28 : 55);
}
typeLoop();

function restartTypewriter() {
  clearTimeout(typeTimer);
  quotes = currentLang === 'vi' ? quotesVi : quotesEn;
  quoteIdx = pickRandomQuoteIdx(quotes, -1);
  charIdx = 0;
  deleting = false;
  if (tw) tw.textContent = '';
  typeLoop();
}

/* ===================== THEME TOGGLE (DAY / NIGHT) ===================== */
const themeToggleBtn       = document.getElementById('themeToggle');
const themeToggleIcon      = document.getElementById('themeToggleIcon');
const themeToggleLabel     = document.getElementById('themeToggleLabel');
const mobileThemeToggleBtn = document.getElementById('mobileThemeToggle');
const mobileThemeToggleIcon = document.getElementById('mobileThemeToggleIcon');
const mobileThemeToggleLabel = document.getElementById('mobileThemeToggleLabel');
const navThemeToggleBtn    = document.getElementById('navThemeToggle');
const navThemeToggleIcon   = document.getElementById('navThemeToggleIcon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('des_theme', theme);
  const isDark = theme === 'dark';
  const iconSvg = isDark
    ? `<svg class="btn-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    : `<svg class="btn-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

  if (themeToggleIcon) themeToggleIcon.innerHTML = iconSvg;
  if (mobileThemeToggleIcon) mobileThemeToggleIcon.innerHTML = iconSvg;
  if (navThemeToggleIcon) navThemeToggleIcon.innerHTML = iconSvg;

  const labelKey = isDark ? 'theme_night' : 'theme_day';
  const dict = translations[currentLang] || translations.en;
  const labelText = dict[labelKey] || (isDark ? 'NIGHT' : 'DAY');

  if (themeToggleLabel) themeToggleLabel.textContent = labelText;
  if (mobileThemeToggleLabel) mobileThemeToggleLabel.textContent = labelText;

  const titleText = isDark ? 'Active: Night mode (click to switch)' : 'Active: Day mode (click to switch)';
  const ariaText = isDark ? 'Switch to Day mode' : 'Switch to Night mode';

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('title', titleText);
    themeToggleBtn.setAttribute('aria-label', ariaText);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.setAttribute('title', titleText);
    mobileThemeToggleBtn.setAttribute('aria-label', ariaText);
  }
  if (navThemeToggleBtn) {
    navThemeToggleBtn.setAttribute('title', titleText);
    navThemeToggleBtn.setAttribute('aria-label', ariaText);
  }
}

const savedTheme = localStorage.getItem('des_theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const urlTheme = new URLSearchParams(window.location.search).get('theme');
const initialTheme = urlTheme || savedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

function handleThemeToggle() {
  triggerHaptic(10);
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

themeToggleBtn?.addEventListener('click', handleThemeToggle);
mobileThemeToggleBtn?.addEventListener('click', handleThemeToggle);
navThemeToggleBtn?.addEventListener('click', handleThemeToggle);

/* ===================== LANGUAGE TOGGLE CONTROLLER ===================== */
const langToggleBtn       = document.getElementById('langToggle');
const langToggleLabel     = document.getElementById('langToggleLabel');
const mobileLangToggleBtn = document.getElementById('mobileLangToggle');
const mobileLangToggleLabel = document.getElementById('mobileLangToggleLabel');
const navLangToggleBtn    = document.getElementById('navLangToggle');

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('des_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  const dict = translations[lang] || translations.en;

  // Update page title & meta description
  if (dict.page_title) document.title = dict.page_title;
  const metaDesc = document.getElementById('metaDescription') || document.querySelector('meta[name="description"]');
  if (metaDesc && dict.meta_description) {
    metaDesc.setAttribute('content', dict.meta_description);
  }

  // Update all [data-i18n] text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update all placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Update language button state
  const isEn = lang === 'en';
  const targetLabel = isEn ? 'VN' : 'EN';
  const targetTitle = isEn ? 'Chuyển sang Tiếng Việt / Switch to Vietnamese' : 'Switch to English / Chuyển sang Tiếng Anh';

  if (langToggleLabel) langToggleLabel.textContent = targetLabel;
  if (langToggleBtn) langToggleBtn.setAttribute('title', targetTitle);

  if (mobileLangToggleLabel) mobileLangToggleLabel.textContent = targetLabel;
  if (mobileLangToggleBtn) mobileLangToggleBtn.setAttribute('title', targetTitle);

  if (navLangToggleBtn) navLangToggleBtn.setAttribute('title', targetTitle);

  // Refresh theme button text
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const themeText = dict[currentTheme === 'dark' ? 'theme_night' : 'theme_day'];
  if (themeToggleLabel) themeToggleLabel.textContent = themeText;
  if (mobileThemeToggleLabel) mobileThemeToggleLabel.textContent = themeText;

  // Refresh mobile menu button text
  if (mobileMenuLabel) {
    mobileMenuLabel.textContent = mobileMenuBtn?.classList.contains('active') ? dict.menu_close : dict.menu;
  }

  // Restart typewriter with language phrases
  restartTypewriter();

  // Update slide indicator and navigation titles
  updateUIStates(currentSection);

  // Update topbar clock and date formatting
  updateTopbarClock();

  // Update open detail modal if currently displayed
  if (detailOverlayOpen && currentWorkId) {
    openDetail(currentWorkId);
  }
}

function toggleLanguage() {
  triggerHaptic(10);
  const nextLang = currentLang === 'en' ? 'vi' : 'en';
  applyLanguage(nextLang);
}

langToggleBtn?.addEventListener('click', toggleLanguage);
mobileLangToggleBtn?.addEventListener('click', toggleLanguage);
navLangToggleBtn?.addEventListener('click', toggleLanguage);

/* ===================== NATURAL VERTICAL SCROLL & NAVIGATION ENGINE ===================== */
const panels          = Array.from(document.querySelectorAll('.panel'));
const progressFill    = document.getElementById('progressFill');
const hIndicator      = document.getElementById('hIndicator');
const scrollTopBtn    = document.getElementById('scrollTopBtn');
const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');
const mobileNavLinks  = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

// Detail Overlay DOM elements & interaction state
const worksDetailOverlay = document.getElementById('worksDetailOverlay');
const detailCloseBtn     = document.getElementById('detailCloseBtn');
const detailDismissBtn   = document.getElementById('detailDismissBtn');
const detailFileName     = document.getElementById('detailFileName');
const detailTags         = document.getElementById('detailTags');
const detailYear         = document.getElementById('detailYear');
const detailTitle        = document.getElementById('detailTitle');
const detailClient       = document.getElementById('detailClient');
const detailProcess      = document.getElementById('detailProcess');
const detailGallery      = document.getElementById('detailGallery');
const detailGalleryCount = document.getElementById('detailGalleryCount');
const detailResults      = document.getElementById('detailResults');
const detailLink         = document.getElementById('detailLink');
const detailScrollArea   = document.getElementById('detailScrollArea');

// Fullscreen Lightbox DOM elements
const lightboxModal      = document.getElementById('lightboxModal');
const lightboxBackdrop   = document.getElementById('lightboxBackdrop');
const lightboxCloseBtn   = document.getElementById('lightboxCloseBtn');
const lightboxFilename   = document.getElementById('lightboxFilename');
const lightboxCounter    = document.getElementById('lightboxCounter');
const lightboxPrevBtn    = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn    = document.getElementById('lightboxNextBtn');
const lightboxImg        = document.getElementById('lightboxImg');
let lightboxItems        = [];
let lightboxIndex        = 0;

let currentSection    = 0;
let detailOverlayOpen = false;
let currentWorkId     = null;

function getPanelName(idx) {
  const dict = translations[currentLang] || translations.en;
  return dict[`panel_name_${idx}`] || panels[idx]?.getAttribute('data-panel-name') || '';
}

/**
 * Synchronize all UI states across the interface
 */
function updateUIStates(idx) {
  if (idx < 0 || idx >= panels.length) return;
  currentSection = idx;

  // 1. Bottom status bar indicator ("01 / 04 HOME")
  if (hIndicator) {
    const num = String(idx + 1).padStart(2, '0');
    const total = String(panels.length).padStart(2, '0');
    const name = getPanelName(idx);
    hIndicator.innerHTML = `${num} / ${total} <span class="h-nav-title">${name}</span>`;
  }

  // 2. Navigation Active State (Desktop & Mobile)
  desktopNavLinks.forEach((link, i) => {
    link.classList.toggle('active', i === idx);
  });
  mobileNavLinks.forEach((link, i) => {
    link.classList.toggle('active', i === idx);
  });

  // 3. Reveal states for panels (permanent once entered, prevents effect reload)
  panels.forEach((p, i) => {
    if (i <= idx) {
      p.classList.add('panel--revealed');
    }
  });
}

/**
 * Update real-time vertical scroll progress and back-to-top button
 */
function updateScrollProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

  if (progressFill) {
    progressFill.style.width = `${pct}%`;
  }

  if (scrollTopBtn) {
    const shouldShow = scrollTop > 320;
    scrollTopBtn.style.opacity = shouldShow ? '1' : '0.35';
    scrollTopBtn.style.pointerEvents = shouldShow ? 'auto' : 'none';
  }
}

// Listen to Lenis smooth scroll events (single unified scroll callback)
lenis.on('scroll', () => {
  updateScrollProgress();
});

// IntersectionObserver to accurately track the active section in view
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = panels.indexOf(entry.target);
      if (idx !== -1) {
        updateUIStates(idx);
      }
    }
  });
}, {
  root: null,
  rootMargin: '-20% 0px -40% 0px',
  threshold: 0.1
});

panels.forEach(panel => sectionObserver.observe(panel));

// Persistent one-time reveal observer: elements stay open permanently once scrolled into view
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Smooth momentum scroll to section on anchor clicks via Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const targetEl = document.querySelector(href);
    if (targetEl) {
      e.preventDefault();
      triggerHaptic(10);
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 54;
      lenis.scrollTo(targetEl, {
        offset: -navH,
        duration: 1.2,
      });
      if (mobileDrawer?.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    }
  });
});

// Smooth scroll to top button
scrollTopBtn?.addEventListener('click', () => {
  triggerHaptic(12);
  lenis.scrollTo(0, { duration: 1.2 });
});

// Programmatic goToSection helper with Lenis
function goToSection(targetIdx) {
  if (targetIdx < 0 || targetIdx >= panels.length) return;
  const targetEl = panels[targetIdx];
  if (targetEl) {
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 54;
    lenis.scrollTo(targetEl, { offset: -navH, duration: 1.2 });
  }
}
window.goToSection = goToSection;

function handleHashChange() {
  const hash = window.location.hash;
  if (!hash) return;
  const targetEl = document.querySelector(hash);
  if (targetEl) {
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 54;
    lenis.scrollTo(targetEl, { offset: -navH, duration: 1.2 });
  }
}
window.addEventListener('hashchange', handleHashChange);
if (window.location.hash) {
  setTimeout(handleHashChange, 150);
}

// Initial UI synchronization
updateUIStates(0);
updateScrollProgress();

/* ===================== WORKS TIMELINE & LIGHTBOX DATA ===================== */
const WORKS_DATA = {
  1: {
    file: '02_crc_robotics.sys', year: '09/2023 — 05/2024', startDate: 'SEP 2023', endDate: 'MAY 2024', duration: '9 MONTHS',
    category: 'branding',
    title: {
      en: 'CRC — Robotics Club · Viet Tri High School',
      vi: 'CRC — CLB Robotics THPT Việt Trì'
    },
    client: {
      en: '// ROLE: Head of Media / Lead Designer · CRC Robotics Club',
      vi: '// VAI TRÒ: Trưởng ban Media / Thiết kế trưởng · CLB Robotics CRC'
    },
    tags: {
      en: '<span class="tag tag-purple">Branding</span><span class="tag tag-blue">Robotics</span><span class="tag tag-yellow">Vector</span>',
      vi: '<span class="tag tag-purple">Bộ nhận diện</span><span class="tag tag-blue">Robotics</span><span class="tag tag-yellow">Đồ hoạ Vector</span>'
    },
    process: {
      en: 'Served as Head of Media / Lead Designer from September 2023 to May 2024. Oversaw overall creative direction and visual design execution for all club public communication channels, crafting brand identity assets, geometric vector logos, and Gen 1 & Gen 2 recruitment campaigns.',
      vi: 'Đảm nhiệm vị trí Trưởng ban Media / Thiết kế trưởng từ 09/2023 đến 05/2024; phụ trách toàn bộ khâu định hình concept mỹ thuật và thiết kế các ấn phẩm truyền thông của CLB Robotics THPT Việt Trì, bao gồm banner nhận diện, biểu trưng vector hình học và các chiến dịch tuyển thành viên Gen 1 & Gen 2.'
    },
    gallery: [
      {
        src: '/assets/Projects/CRC%20-%20CLB%20Robotics%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Banner.webp',
        span: 'full',
        badge: { en: '// PANORAMIC IDENTITY BANNER', vi: '// BANNER NHẬN DIỆN TOÀN CẢNH' }
      },
      {
        src: '/assets/Projects/CRC%20-%20CLB%20Robotics%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/LOGO.webp',
        span: 'half',
        badge: { en: '// GEOMETRIC VECTOR LOGO', vi: '// BIỂU TRƯNG HÌNH HỌC VECTOR' }
      },
      {
        src: '/assets/Projects/CRC%20-%20CLB%20Robotics%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/GEN%201%20Recruitment.webp',
        span: 'half',
        badge: { en: '// GEN 1 RECRUITMENT POSTER', vi: '// ẤN PHẨM TUYỂN QUÂN GEN 1' }
      },
      {
        src: '/assets/Projects/CRC%20-%20CLB%20Robotics%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/GEN%201%20Members.webp',
        span: 'half',
        badge: { en: '// MEMBER ROSTER INFOGRAPHIC', vi: '// INFOGRAPHIC DANH SÁCH THÀNH VIÊN' }
      },
      {
        src: '/assets/Projects/CRC%20-%20CLB%20Robotics%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/GEN%202%20Recruitment.webp',
        span: 'half',
        badge: { en: '// GEN 2 RECRUITMENT CAMPAIGN', vi: '// ẤN PHẨM TUYỂN QUÂN GEN 2' }
      }
    ],
    results: {
      en: 'Established a recognizable identity that helped attract over 80 applicant submissions across two generations, positioning CRC as one of the most vibrant student academic clubs at Viet Tri High School.',
      vi: 'Xây dựng bản sắc thương hiệu nhận diện rõ nét, thu hút hơn 80 đơn ứng tuyển qua 2 mùa tuyển quân, đưa CRC trở thành một trong những câu lạc bộ học thuật kỹ thuật sôi nổi nhất trường THPT Việt Trì.'
    },
    link: '/assets/Projects/CRC%20-%20CLB%20Robotics%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Banner.webp'
  },
  2: {
    file: '04_sov_media_ecosystem.sys', year: '02/2023 — 07/2024', startDate: 'FEB 2023', endDate: 'JUL 2024', duration: '17 MONTHS',
    category: 'branding',
    title: {
      en: 'SOV — Media Club · Viet Tri High School',
      vi: 'SOV — CLB Truyền thông THPT Việt Trì'
    },
    client: {
      en: '// ROLE: Core Media Member (Gen 1) · Media Advisor (Gen 2)',
      vi: '// VAI TRÒ: Thành viên chủ lực ban Media (Gen 1) · Cố vấn Media (Gen 2)'
    },
    tags: {
      en: '<span class="tag tag-pink">Brand Ecosystem</span><span class="tag tag-purple">Campaigns</span><span class="tag tag-yellow">Certificates</span><span class="tag tag-blue">Frames</span>',
      vi: '<span class="tag tag-pink">Hệ sinh thái thương hiệu</span><span class="tag tag-purple">Chiến dịch</span><span class="tag tag-yellow">Chứng nhận</span><span class="tag tag-blue">Khung đại diện</span>'
    },
    process: {
      en: 'Active from February 2023 to July 2024 as Core Media Member (Gen 1) and Media Advisor (Gen 2). Led 2D graphic design and multi-channel publication production, including social media campaigns, event posters, infographics, commemorative profile frames, ceremonial backdrops, and certificates of merit.',
      vi: 'Hoạt động từ 02/2023 đến 07/2024 với vai trò Thành viên chủ lực ban Media (Gen 1) và Cố vấn Media (Gen 2). Đảm nhận hầu hết khâu thiết kế 2D và sản xuất ấn phẩm truyền thông như bài đăng mạng xã hội, poster sự kiện, infographic, khung ảnh đại diện đồng bộ, backdrop sân khấu, giấy khen vinh danh, v.v.'
    },
    gallery: [
      // DIVISION 1: CAMPAIGNS & SOCIAL (7 items)
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/26.3.2.webp',
        span: 'full',
        division: 'campaigns',
        divisionLabel: { en: '01. CAMPAIGNS & KEY VISUALS', vi: '01. CHIẾN DỊCH & KEY VISUAL' },
        badge: { en: '// YOUTH MONTH 26/3 KEY VISUAL', vi: '// KEY VISUAL THÁNG THANH NIÊN 26/3' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/Milestone.webp',
        span: 'full',
        division: 'campaigns',
        badge: { en: '// MILESTONE CAMPAIGN BANNER', vi: '// BANNER CỘT MỐC TRUYỀN THÔNG' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/Poster.webp',
        span: 'half',
        division: 'campaigns',
        badge: { en: '// FLAGSHIP EVENT POSTER', vi: '// POSTER SỰ KIỆN CHỦ ĐẠO' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/Radio%202.webp',
        span: 'half',
        division: 'campaigns',
        badge: { en: '// SOV RADIO EPISODE 02 COVER', vi: '// ẢNH BÌA SOV RADIO SỐ 02' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/26.3.webp',
        span: 'half',
        division: 'campaigns',
        badge: { en: '// YOUTH MONTH CAMPAIGN 01', vi: '// CHIẾN DỊCH THÁNG THANH NIÊN 01' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/TSMT.webp',
        span: 'half',
        division: 'campaigns',
        badge: { en: '// EXAM SEASON SUPPORT CAMPAIGN', vi: '// CHIẾN DỊCH TIẾP SỨC MÙA THI' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/Request%20Radio.webp',
        span: 'half',
        division: 'campaigns',
        badge: { en: '// SOV RADIO EPISODE 01 COVER', vi: '// ẢNH BÌA SOV RADIO SỐ 01' }
      },

      // DIVISION 2: CERTIFICATES & RECOGNITIONS (4 items)
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Certificates/SOV%20GEN%202.webp',
        span: 'half',
        division: 'certificates',
        divisionLabel: { en: '02. CERTIFICATES & FORMAL AWARDS', vi: '02. BẰNG KHEN & VINH DANH' },
        badge: { en: '// GEN 2 MERIT CERTIFICATE', vi: '// GIẤY CHỨNG NHẬN THÀNH VIÊN GEN 2' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Certificates/SOV%20Award%20GEN%201.webp',
        span: 'half',
        division: 'certificates',
        badge: { en: '// DISTINGUISHED CONTRIBUTION AWARD GEN 1', vi: '// BẰNG VINH DANH CỐNG HIẾN GEN 1' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Certificates/SOV%20Award%20GEN%202.webp',
        span: 'half',
        division: 'certificates',
        badge: { en: '// DISTINGUISHED CONTRIBUTION AWARD GEN 2', vi: '// BẰNG VINH DANH CỐNG HIẾN GEN 2' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Certificates/SOV%20GEN%201.webp',
        span: 'half',
        division: 'certificates',
        badge: { en: '// GEN 1 MERIT CERTIFICATE', vi: '// GIẤY CHỨNG NHẬN THÀNH VIÊN GEN 1' }
      },

      // DIVISION 3: FRAMES & FAREWELL (4 items)
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Avatar%20Frames/%C4%90H%C4%90B%20LXI.webp',
        span: 'quarter',
        division: 'frames',
        divisionLabel: { en: '03. AVATAR FRAMES & FAREWELL MEDIA', vi: '03. KHUNG ĐẠI DIỆN & TRI ÂN' },
        badge: { en: '// 61ST YOUTH CONGRESS PROFILE FRAME', vi: '// KHUNG ĐẠI DIỆN ĐHĐB LXI' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Avatar%20Frames/Th%C3%A1ng%20thanh%20ni%C3%AAn%202023.webp',
        span: 'quarter',
        division: 'frames',
        badge: { en: '// YOUTH MONTH 2023 PROFILE FRAME', vi: '// KHUNG ĐẠI DIỆN THÁNG THANH NIÊN 2023' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Commemorative%20Posts/K58.webp',
        span: 'quarter',
        division: 'frames',
        badge: { en: '// CLASS K58 FAREWELL TRIBUTE', vi: '// ẤN PHẨM TRI ÂN KHOÁ K58' }
      },
      {
        src: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Commemorative%20Posts/K59.webp',
        span: 'quarter',
        division: 'frames',
        badge: { en: '// CLASS K59 FAREWELL TRIBUTE', vi: '// ẤN PHẨM TRI ÂN KHOÁ K59' }
      }
    ],
    results: {
      en: 'Established visual design benchmarks across all student media channels at Viet Tri High School. Campaigns reached over 15,000 users, certificates of merit were officially presented at the school gala, and avatar frames achieved hundreds of simultaneous adoptions during major youth congresses.',
      vi: 'Thiết lập chuẩn mực thẩm mỹ chuyên nghiệp cho toàn bộ kênh truyền thông học đường tại THPT Việt Trì. Các chiến dịch tiếp cận hơn 15.000 lượt xem, toàn bộ bằng khen được in trang trọng trao tặng tại Gala thường niên và khung đại diện đạt hàng trăm lượt sử dụng đồng loạt trong các kỳ đại hội.'
    },
    link: '/assets/Projects/SOV%20-%20CLB%20Truy%E1%BB%81n%20th%C3%B4ng%20THPT%20Vi%E1%BB%87t%20Tr%C3%AC/Social%20Posts/26.3.2.webp'
  },
  3: {
    file: '01_our_memories_yearbook.sys', year: '05/2024', startDate: 'MAY 2024', endDate: 'MAY 2024', duration: '1 MONTH',
    category: 'editorial',
    title: {
      en: 'Our Memories Yearbook — Class A4K59 × Hola Studio',
      vi: 'Kỷ yếu Our Memories — Lớp A4K59 × Hola Studio'
    },
    client: {
      en: '// CLIENT: Class A4K59 · Viet Tri High School × Hola Studio',
      vi: '// ĐƠN VỊ: Tập thể Lớp A4K59 Trường THPT Việt Trì × Hola Studio'
    },
    tags: {
      en: '<span class="tag tag-yellow">Editorial Design</span><span class="tag tag-purple">Yearbook</span><span class="tag tag-blue">Photography</span>',
      vi: '<span class="tag tag-yellow">Thiết kế Kỷ yếu</span><span class="tag tag-purple">Ấn phẩm</span><span class="tag tag-blue">Nhiếp ảnh</span>'
    },
    process: {
      en: 'Executed in May 2024. Conceived the creative editorial concept and produced a complete set of 05 commemorative double-page spreads for Class A4K59 (Viet Tri High School), working in collaboration with studio photography captured by Hola Studio.',
      vi: 'Thực hiện vào tháng 05/2024. Đảm nhận vai trò định hướng ý tưởng mỹ thuật và dàn trang hoàn chỉnh bộ 05 ảnh kỷ yếu trang trải đôi cho lớp A4K59 Trường THPT Việt Trì, phối hợp chặt chẽ trên nền tư liệu hình ảnh từ Hola Studio.'
    },
    gallery: [
      {
        src: '/assets/Projects/Our%20Memories%20-%20K%E1%BB%B7%20y%E1%BA%BFu/1.webp',
        span: 'full',
        badge: { en: '// HERO PANORAMIC DOUBLE SPREAD', vi: '// KỶ YẾU TOÀN CẢNH · TRANG TRẢI ĐÔI CHỦ ĐẠO' }
      },
      {
        src: '/assets/Projects/Our%20Memories%20-%20K%E1%BB%B7%20y%E1%BA%BFu/anh%201.webp',
        span: 'half',
        badge: { en: '// EDITORIAL SPREAD 01 · "OUR YOUTH"', vi: '// DÀN TRANG 01 · "THANH XUÂN CỦA CHÚNG TA"' }
      },
      {
        src: '/assets/Projects/Our%20Memories%20-%20K%E1%BB%B7%20y%E1%BA%BFu/anh%202%20fix.webp',
        span: 'half',
        badge: { en: '// EDITORIAL SPREAD 02 · PHOTO ESSAY', vi: '// DÀN TRANG 02 · KHOẢNH KHẮC THANH XUÂN' }
      },
      {
        src: '/assets/Projects/Our%20Memories%20-%20K%E1%BB%B7%20y%E1%BA%BFu/anh%203.webp',
        span: 'half',
        badge: { en: '// EDITORIAL SPREAD 03 · CLASSROOM NOSTALGIA', vi: '// DÀN TRANG 03 · KỶ NIỆM LỚP HỌC' }
      },
      {
        src: '/assets/Projects/Our%20Memories%20-%20K%E1%BB%B7%20y%E1%BA%BFu/anh%204.webp',
        span: 'half',
        badge: { en: '// EDITORIAL SPREAD 04 · COMMEMORATIVE FINALE', vi: '// DÀN TRANG 04 · LƯU BÚT TỐT NGHIỆP' }
      }
    ],
    results: {
      en: 'Printed as a commemorative yearbook treasured by students, teachers, and parents, receiving extensive acclaim for its elegant editorial layout, typography harmony, and emotional storytelling.',
      vi: 'Xuất bản thành ấn phẩm kỷ yếu lưu niệm trang trọng được thầy cô, phụ huynh và tập thể lớp gìn giữ, nhận được nhiều lời khen ngợi về dàn trang tinh tế, typography hài hòa và chiều sâu cảm xúc.'
    },
    link: '/assets/Projects/Our%20Memories%20-%20K%E1%BB%B7%20y%E1%BA%BFu/1.webp'
  },
  4: {
    file: '03_unleash_campaign.sys', year: '06/2023 — 07/2023', startDate: 'JUN 2023', endDate: 'JUL 2023', duration: '2 MONTHS',
    category: 'campaign',
    title: {
      en: 'Unleash — Freshmen Orientation Program · Viet Tri High School',
      vi: 'Unleash — Chương trình chào tân học sinh THPT Việt Trì'
    },
    client: {
      en: '// ROLE: Media Advisor — Unleash 2023 · Viet Tri High School',
      vi: '// VAI TRÒ: Cố vấn Media — Unleash 2023 · Trường THPT Việt Trì'
    },
    tags: {
      en: '<span class="tag tag-pink">Key Visual</span><span class="tag tag-purple">Event Campaign</span><span class="tag tag-yellow">Brutalist</span>',
      vi: '<span class="tag tag-pink">Key Visual</span><span class="tag tag-purple">Sự kiện</span><span class="tag tag-yellow">Brutalist</span>'
    },
    process: {
      en: 'Served as Media Advisor for Unleash 2023 from June to July 2023. Responsible for visual direction and designing media publications during the transition phase of the freshmen orientation program at Viet Tri High School.',
      vi: 'Đảm nhiệm vai trò Cố vấn Media cho Unleash 2023 từ 06/2023 đến 07/2023. Phụ trách định hướng và thiết kế các ấn phẩm truyền thông thị giác trong giai đoạn chuyển giao của chương trình chào tân học sinh THPT Việt Trì.'
    },
    gallery: [
      {
        src: '/assets/Projects/Unleash/Coreteam%20Recruitment.webp',
        span: 'third',
        badge: { en: 'PHASE 01 · RECRUITMENT', vi: 'GIAI ĐOẠN 01 · TUYỂN NÒNG CỐT' }
      },
      {
        src: '/assets/Projects/Unleash/3h%20left.webp',
        span: 'third',
        badge: { en: 'PHASE 02 · 3-HOUR COUNTDOWN', vi: 'GIAI ĐOẠN 02 · ĐẾM NGƯỢC 3 GIỜ' }
      },
      {
        src: '/assets/Projects/Unleash/Form%20Closed.webp',
        span: 'third',
        badge: { en: 'PHASE 03 · APPLICATION CLOSED', vi: 'GIAI ĐOẠN 03 · ĐÓNG ĐƠN ĐĂNG KÝ' }
      }
    ],
    results: {
      en: 'The promotional campaign generated viral countdown urgency in the final hours, securing top-tier core team applications and laying the foundation for a successful orientation event.',
      vi: 'Chiến dịch truyền thông tạo hiệu ứng đếm ngược lan tỏa mạnh mẽ trong những giờ chót, thu hút nhiều hồ sơ nòng cốt chất lượng cao và tạo tiền đề vững chắc cho chuỗi sự kiện chào tân học sinh.'
    },
    link: '/assets/Projects/Unleash/Coreteam%20Recruitment.webp'
  }
};

function openDetail(id) {
  const d = WORKS_DATA[id];
  if (!d || !worksDetailOverlay) return;

  currentWorkId = id;
  const lang = currentLang === 'vi' ? 'vi' : 'en';
  const getLoc = field => (typeof field === 'object' && field !== null) ? (field[lang] || field.en) : field;

  if (detailFileName) detailFileName.textContent = d.file;
  if (detailYear) detailYear.textContent = d.year;
  if (detailTags) detailTags.innerHTML = getLoc(d.tags);
  if (detailTitle) detailTitle.textContent = getLoc(d.title);
  if (detailClient) detailClient.textContent = getLoc(d.client);
  if (detailProcess) detailProcess.textContent = getLoc(d.process);
  if (detailResults) detailResults.textContent = getLoc(d.results);
  if (detailLink) detailLink.href = d.link;

  if (detailGalleryCount) {
    const count = d.gallery ? d.gallery.length : 0;
    detailGalleryCount.textContent = lang === 'vi' ? `// [${count} TƯ LIỆU]` : `// [${count} ASSETS]`;
  }

  if (detailGallery) {
    if (d.gallery && d.gallery.length > 0) {
      let currentSectionDivision = null;
      detailGallery.innerHTML = d.gallery.map(item => {
        const isObj = typeof item === 'object' && item !== null;
        const src = isObj ? item.src : item;
        const decodedSrc = decodeURIComponent(src);
        const fileName = decodedSrc.split('/').pop() || 'Asset';

        let span = 'half';
        if (isObj && item.span) {
          span = item.span;
        } else if (/(banner|milestone|^1\.png)/i.test(fileName)) {
          span = 'full';
        }

        const spanClass = `detail-item--${span}`;

        let badgeHtml = '';
        if (isObj && item.badge) {
          const badgeText = typeof item.badge === 'object' ? (item.badge[lang] || item.badge.en) : item.badge;
          if (badgeText) {
            badgeHtml = `<span class="detail-item-badge">${badgeText}</span>`;
          }
        }

        let sectionHeaderHtml = '';
        if (isObj && item.divisionLabel && item.division && item.division !== currentSectionDivision) {
          currentSectionDivision = item.division;
          const divisionTitle = typeof item.divisionLabel === 'object' ? (item.divisionLabel[lang] || item.divisionLabel.en) : item.divisionLabel;
          sectionHeaderHtml = `<div class="detail-gallery-division-header mono-text">
            <span class="division-header-badge">${lang === 'vi' ? 'PHÂN HỆ' : 'MODULE'}</span>
            <span class="division-header-title">${divisionTitle}</span>
          </div>`;
        }

        const hintText = lang === 'vi' ? 'PHÓNG TO ↗' : 'EXPAND ↗';

        if (src.endsWith('.mp4') || src.endsWith('.webm')) {
          return `${sectionHeaderHtml}<div class="detail-gallery-item ${spanClass}">
            ${badgeHtml}
            <video src="${src}" controls playsinline></video>
            <div class="detail-item-footer">
              <span class="detail-item-name">${fileName}</span>
            </div>
          </div>`;
        }

        return `${sectionHeaderHtml}<div class="detail-gallery-item ${spanClass}" data-src="${src}" data-name="${fileName}" role="button" tabindex="0" title="${lang === 'vi' ? 'Nhấn để phóng to' : 'Click to enlarge'}">
          ${badgeHtml}
          <img src="${src}" alt="${fileName}" loading="lazy" />
          <div class="detail-item-footer">
            <span class="detail-item-name">${fileName}</span>
            <span class="detail-item-hint">${hintText}</span>
          </div>
        </div>`;
      }).join('');
      detailGallery.style.display = 'grid';
    } else {
      detailGallery.innerHTML = `<p style="font-size:.78rem;color:var(--muted);font-family:var(--font-mono);grid-column:span 12;">${lang === 'vi' ? '// Hướng dẫn đồ hoạ vector và thông số kỹ thuật chi tiết có sẵn trên kho lưu trữ của dự án.' : '// Comprehensive vector guidelines and design specs available on project repository.'}</p>`;
      detailGallery.style.display = 'grid';
    }
  }

  if (detailScrollArea) detailScrollArea.scrollTop = 0;

  worksDetailOverlay.classList.add('is-visible');
  document.body.classList.add('modal-open');
  lenis.stop();
  worksDetailOverlay.setAttribute('aria-hidden', 'false');
  detailOverlayOpen = true;
}

function closeDetail() {
  if (!worksDetailOverlay || !detailOverlayOpen) return;
  triggerHaptic(8);
  worksDetailOverlay.classList.remove('is-visible');
  document.body.classList.remove('modal-open');
  lenis.start();
  worksDetailOverlay.setAttribute('aria-hidden', 'true');
  worksDetailOverlay.style.transform = '';
  worksDetailOverlay.style.transition = '';
  detailOverlayOpen = false;
  currentWorkId = null;
}

/* Lightbox Modal Controller with Prev / Next Gallery Navigation */
function renderLightboxAt(idx) {
  if (!lightboxImg || lightboxItems.length === 0) return;
  lightboxIndex = (idx + lightboxItems.length) % lightboxItems.length;
  const item = lightboxItems[lightboxIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.name || 'Enlarged project asset';
  if (lightboxFilename) lightboxFilename.textContent = item.name || decodeURIComponent(item.src).split('/').pop() || 'asset.webp';
  if (lightboxCounter) {
    lightboxCounter.textContent = lightboxItems.length > 1 ? `${lightboxIndex + 1} / ${lightboxItems.length}` : '';
  }
  const hideNav = lightboxItems.length <= 1;
  lightboxPrevBtn?.classList.toggle('is-hidden', hideNav);
  lightboxNextBtn?.classList.toggle('is-hidden', hideNav);
}

function openLightbox(src, name) {
  if (!lightboxModal || !lightboxImg) return;
  triggerHaptic(10);
  const galleryEls = detailGallery ? Array.from(detailGallery.querySelectorAll('.detail-gallery-item[data-src]')) : [];
  if (galleryEls.length > 0) {
    lightboxItems = galleryEls.map(el => ({
      src: el.getAttribute('data-src'),
      name: el.getAttribute('data-name') || ''
    }));
    const foundIdx = lightboxItems.findIndex(i => i.src === src);
    lightboxIndex = foundIdx >= 0 ? foundIdx : 0;
  } else {
    lightboxItems = [{ src, name: name || '' }];
    lightboxIndex = 0;
  }
  renderLightboxAt(lightboxIndex);
  lightboxModal.classList.add('is-open');
  document.body.classList.add('modal-open');
  lenis.stop();
  lightboxModal.setAttribute('aria-hidden', 'false');
}

function navigateLightbox(delta) {
  if (lightboxItems.length <= 1) return;
  triggerHaptic(8);
  renderLightboxAt(lightboxIndex + delta);
}

function closeLightbox() {
  if (!lightboxModal) return;
  triggerHaptic(8);
  lightboxModal.classList.remove('is-open');
  if (!detailOverlayOpen) {
    document.body.classList.remove('modal-open');
    lenis.start();
  }
  lightboxModal.setAttribute('aria-hidden', 'true');
  if (lightboxImg) lightboxImg.src = '';
}

lightboxPrevBtn?.addEventListener('click', e => { e.stopPropagation(); navigateLightbox(-1); });
lightboxNextBtn?.addEventListener('click', e => { e.stopPropagation(); navigateLightbox(1); });

/* Swipe-down-to-dismiss gestures for mobile detail modal and lightbox */
let detailTouchStartY = 0;
let detailTouchStartX = 0;
let detailIsPulling = false;

worksDetailOverlay?.addEventListener('touchstart', e => {
  if (!detailOverlayOpen || !e.touches || !e.touches[0]) return;
  detailTouchStartY = e.touches[0].clientY;
  detailTouchStartX = e.touches[0].clientX;
  detailIsPulling = false;
}, { passive: true });

worksDetailOverlay?.addEventListener('touchmove', e => {
  if (!detailOverlayOpen || !e.touches || !e.touches[0]) return;
  const dy = e.touches[0].clientY - detailTouchStartY;
  const dx = Math.abs(e.touches[0].clientX - detailTouchStartX);

  const isAtTop = !detailScrollArea || detailScrollArea.scrollTop <= 2;
  const isHeaderTarget = Boolean(e.target.closest && e.target.closest('.detail-chrome-bar, .detail-swipe-indicator'));

  if ((isAtTop || isHeaderTarget) && dy > 12 && dy > dx * 1.3) {
    detailIsPulling = true;
    if (dy > 0 && dy < 250) {
      worksDetailOverlay.style.transform = `translateY(${Math.round(dy * 0.72)}px)`;
      worksDetailOverlay.style.transition = 'none';
    }
  }
}, { passive: true });

worksDetailOverlay?.addEventListener('touchend', e => {
  if (!detailOverlayOpen || !detailIsPulling) return;
  detailIsPulling = false;
  const endY = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0;
  const diffY = endY - detailTouchStartY;

  worksDetailOverlay.style.transition = '';
  worksDetailOverlay.style.transform = '';

  if (diffY > 65) {
    triggerHaptic(12);
    closeDetail();
  }
}, { passive: true });

let lightboxTouchStartY = 0;
let lightboxTouchStartX = 0;

lightboxModal?.addEventListener('touchstart', e => {
  if (!lightboxModal.classList.contains('is-open') || !e.touches || !e.touches[0]) return;
  lightboxTouchStartY = e.touches[0].clientY;
  lightboxTouchStartX = e.touches[0].clientX;
}, { passive: true });

lightboxModal?.addEventListener('touchend', e => {
  if (!lightboxModal.classList.contains('is-open') || !e.changedTouches || !e.changedTouches[0]) return;
  const dy = e.changedTouches[0].clientY - lightboxTouchStartY;
  const rawDx = e.changedTouches[0].clientX - lightboxTouchStartX;
  const absDx = Math.abs(rawDx);
  if (dy > 60 && dy > absDx * 1.3) {
    triggerHaptic(10);
    closeLightbox();
  } else if (absDx > 45 && absDx > Math.abs(dy) * 1.2) {
    navigateLightbox(rawDx < 0 ? 1 : -1);
  }
}, { passive: true });

// Lightbox click delegation on detail gallery items
detailGallery?.addEventListener('click', e => {
  const item = e.target.closest('.detail-gallery-item');
  if (!item) return;
  const src = item.getAttribute('data-src');
  const name = item.getAttribute('data-name');
  if (src) {
    openLightbox(src, name);
  }
});

// Lightbox keyboard accessibility (Enter / Space to open)
detailGallery?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const item = e.target.closest('.detail-gallery-item');
    if (item) {
      e.preventDefault();
      const src = item.getAttribute('data-src');
      const name = item.getAttribute('data-name');
      if (src) openLightbox(src, name);
    }
  }
});

lightboxCloseBtn?.addEventListener('click', closeLightbox);
lightboxBackdrop?.addEventListener('click', closeLightbox);

// Attach "SEE MORE" button handlers and card click handlers
document.querySelectorAll('.timeline-see-more-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id = parseInt(btn.dataset.workId, 10);
    if (id) openDetail(id);
  });
});

/* ===================== SOCIAL POST CAROUSEL & INTERACTIONS ===================== */
function initSocialCarousels() {
  document.querySelectorAll('.social-carousel').forEach(carousel => {
    const card = carousel.closest('.timeline-project');
    const divisionTabs = card ? card.querySelectorAll('.division-tab') : [];
    const allSlides = Array.from(carousel.querySelectorAll('.social-slide'));
    const dotsContainer = carousel.querySelector('.social-carousel-dots');
    const counterCur = carousel.querySelector('.current-slide');
    const counterTotal = carousel.querySelector('.total-slides');
    const prevBtn = carousel.querySelector('.carousel-arrow--prev');
    const nextBtn = carousel.querySelector('.carousel-arrow--next');

    let currentDivision = 'all';
    let filteredSlides = allSlides;
    let currentIndex = 0;

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      filteredSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot${i === currentIndex ? ' is-active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('data-index', String(i));
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', e => {
          e.stopPropagation();
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDivision(div) {
      currentDivision = div;
      if (div === 'all') {
        filteredSlides = allSlides;
      } else {
        filteredSlides = allSlides.filter(s => s.dataset.division === div);
      }
      if (counterTotal) {
        counterTotal.textContent = String(filteredSlides.length);
      }
      currentIndex = 0;
      renderDots();
      goToSlide(0);
    }

    function goToSlide(idx) {
      if (filteredSlides.length === 0) return;
      if (idx < 0) idx = filteredSlides.length - 1;
      if (idx >= filteredSlides.length) idx = 0;
      currentIndex = idx;

      allSlides.forEach(s => {
        s.classList.remove('is-active');
        s.style.display = 'none';
      });

      const activeSlide = filteredSlides[currentIndex];
      if (activeSlide) {
        activeSlide.style.display = '';
        activeSlide.classList.add('is-active');
      }

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('is-active', i === currentIndex);
        });
      }

      if (counterCur) {
        counterCur.textContent = String(currentIndex + 1);
      }
    }

    // Initialize dots and default display
    renderDots();
    goToSlide(0);

    divisionTabs.forEach(tab => {
      tab.addEventListener('click', e => {
        e.stopPropagation();
        divisionTabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        const div = tab.dataset.division || 'all';
        updateDivision(div);
      });
    });

    prevBtn?.addEventListener('click', e => {
      e.stopPropagation();
      goToSlide(currentIndex - 1);
    });

    nextBtn?.addEventListener('click', e => {
      e.stopPropagation();
      goToSlide(currentIndex + 1);
    });

    // Mobile touch swipe support with false-tap protection
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    let totalMoved = 0;

    carousel.addEventListener('touchstart', e => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
        totalMoved = 0;
      }
    }, { passive: true });

    carousel.addEventListener('touchmove', e => {
      if (!e.touches || !e.touches[0]) return;
      const dx = touchStartX - e.touches[0].clientX;
      const dy = touchStartY - e.touches[0].clientY;
      totalMoved += Math.hypot(dx, dy);
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        isSwiping = true;
      }
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      if (e.changedTouches && e.changedTouches[0]) {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        const diffY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diffX) > 28 && Math.abs(diffX) > Math.abs(diffY) * 1.1) {
          isSwiping = true;
          triggerHaptic(8);
          if (diffX > 0) goToSlide(currentIndex + 1);
          else goToSlide(currentIndex - 1);
        }
      }
      setTimeout(() => { isSwiping = false; totalMoved = 0; }, 220);
    }, { passive: true });

    // Clicking on slide image directly opens detail modal (only when genuinely tapping, not swiping)
    allSlides.forEach(slide => {
      slide.addEventListener('click', e => {
        if (isSwiping || totalMoved > 10) return;
        if (e.target.closest('.carousel-arrow, .carousel-dot')) return;
        const c = carousel.closest('.timeline-project');
        const id = c ? parseInt(c.dataset.workId, 10) : null;
        if (id) openDetail(id);
      });
    });
  });
}

function initSocialInteractions() {
  // Interactive like heart buttons
  document.querySelectorAll('.btn-like').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      triggerHaptic(12);
      const countEl = btn.querySelector('.like-count');
      const isLiked = btn.classList.toggle('is-liked');
      if (countEl) {
        const text = countEl.textContent.trim();
        let num = parseFloat(text);
        const isK = text.includes('k');
        if (isK) {
          num = Math.round(num * 1000);
        }
        num = isLiked ? num + 1 : Math.max(0, num - 1);
        countEl.textContent = num >= 1000 ? (num / 1000).toFixed(1) + 'k' : String(num);
      }
    });
  });

  // Comment buttons -> open full project details overlay
  document.querySelectorAll('.btn-comment').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      triggerHaptic(10);
      const card = btn.closest('.timeline-project');
      const id = card ? parseInt(card.dataset.workId, 10) : null;
      if (id) openDetail(id);
    });
  });

  // Works category filter buttons
  const filterBtns = document.querySelectorAll('.works-filter-btn');
  const workCards = document.querySelectorAll('.timeline-project');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      triggerHaptic(10);
      const cat = btn.dataset.filter || 'all';
      filterBtns.forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      workCards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.classList.toggle('is-filtered-out', !match);
      });
    });
  });

  // Bookmark save buttons
  document.querySelectorAll('.btn-bookmark').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      triggerHaptic(12);
      btn.classList.toggle('is-bookmarked');
    });
  });

  // Share buttons
  document.querySelectorAll('.btn-share').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      triggerHaptic(10);
      const card = btn.closest('.timeline-project');
      const title = card?.querySelector('.social-post-title')?.textContent || 'Hoàng Duy Design Portfolio';
      if (navigator.share) {
        navigator.share({
          title,
          url: window.location.href,
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          const msg = currentLang === 'vi' ? 'Đã sao chép liên kết dự án!' : 'Project link copied to clipboard!';
          showToast(msg);
        }).catch(() => {});
      }
    });
  });
}

initSocialCarousels();
initSocialInteractions();

detailCloseBtn?.addEventListener('click', closeDetail);
detailDismissBtn?.addEventListener('click', closeDetail);

// Close detail modal on clicking backdrop outside detail body
worksDetailOverlay?.addEventListener('click', e => {
  if (e.target === worksDetailOverlay || e.target === detailScrollArea) {
    if (!e.target.closest('.detail-body, .detail-chrome-bar')) {
      closeDetail();
    }
  }
});

// Keyboard navigation for Lightbox & Detail modal
window.addEventListener('keydown', e => {
  if (lightboxModal?.classList.contains('is-open')) {
    if (e.key === 'Escape') { closeLightbox(); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); navigateLightbox(-1); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); navigateLightbox(1); return; }
  }
  if (e.key === 'Escape' && detailOverlayOpen) {
    closeDetail();
  }
});

// Hero entrance animations
gsap.from('#heroTag',   { y: 20, opacity: 0, duration: .6, delay: .1 });
gsap.from('.name-line', { y: 40, opacity: 0, duration: .6, stagger: .1, delay: .2 });
gsap.from('#heroRole',  { y: 20, opacity: 0, duration: .5, delay: .4 });
gsap.from('#heroCta',   { y: 20, opacity: 0, duration: .5, delay: .5 });

/* ===================== CONTACT COPY TRIGGERS ===================== */
document.querySelectorAll('.copy-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    triggerHaptic(14);
    const target = btn.getAttribute('data-copy-target');
    if (!target) return;

    const copyText = target;
    const textEl = btn.querySelector('.copy-btn-text');
    const dict = translations[currentLang] || translations.en;
    const copiedLabel = dict.contact_btn_copied || 'Copied ✓';
    const origLabel = textEl ? textEl.textContent : '';

    const doFeedback = () => {
      btn.classList.add('is-copied');
      if (textEl) textEl.textContent = copiedLabel;
      showToast(currentLang === 'vi' ? `Đã sao chép: ${copyText}` : `Copied: ${copyText}`);
      setTimeout(() => {
        btn.classList.remove('is-copied');
        if (textEl) textEl.textContent = dict.contact_btn_copy || origLabel;
      }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(copyText).then(doFeedback).catch(() => {});
    } else {
      // Fallback for non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = copyText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); doFeedback(); } catch (_) {}
      document.body.removeChild(ta);
    }
  });
});



/* ===================== TOPBAR CLOCK ===================== */
const MONTHS_EN    = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DAYS_FULL_EN = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTHS_VI    = ['THG 1','THG 2','THG 3','THG 4','THG 5','THG 6','THG 7','THG 8','THG 9','THG 10','THG 11','THG 12'];
const DAYS_FULL_VI = ['CN','T2','T3','T4','T5','T6','T7'];

const bkkFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Bangkok',
  year: 'numeric', month: 'numeric', day: 'numeric',
  weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
});
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const tbDigitsEl = document.getElementById('tbDigits');
const tbAmpmEl   = document.getElementById('tbAmpm');
const tbDateEl   = document.getElementById('tbDate');

function updateTopbarClock() {
  const parts = {};
  for (const p of bkkFormatter.formatToParts(new Date())) {
    parts[p.type] = p.value;
  }
  if (tbDigitsEl) {
    tbDigitsEl.innerHTML = `${parts.hour}<span class="topbar-colon">:</span>${parts.minute}<span class="topbar-colon">:</span>${parts.second}`;
  }
  if (tbAmpmEl) tbAmpmEl.textContent = (parts.dayPeriod || 'AM').toUpperCase();
  if (tbDateEl) {
    const isVi = currentLang === 'vi';
    const dayIdx = WEEKDAY_INDEX[parts.weekday] ?? 0;
    const monthIdx = (parseInt(parts.month, 10) || 1) - 1;
    const dayName = isVi ? DAYS_FULL_VI[dayIdx] : DAYS_FULL_EN[dayIdx];
    const monthName = isVi ? MONTHS_VI[monthIdx] : MONTHS_EN[monthIdx];
    tbDateEl.textContent = `${dayName} · ${parts.day} ${monthName} ${parts.year}`;
  }
}

updateTopbarClock();
setInterval(updateTopbarClock, 1000);

/* Glitch logo */
const logo = document.querySelector('.nav-logo');
function glitchLogo() {
  if (!logo) return;
  gsap.timeline()
    .to(logo, { skewX: 8, duration: .05 })
    .to(logo, { skewX: -8, duration: .05 })
    .to(logo, { skewX: 0, duration: .05 });
}
setInterval(glitchLogo, 4500);

/* ===================== MOBILE NAVIGATION DRAWER ===================== */
const mobileMenuBtn       = document.getElementById('mobileMenuBtn');
const mobileMenuIcon      = document.getElementById('mobileMenuIcon');
const mobileMenuLabel     = document.getElementById('mobileMenuLabel');
const mobileDrawer        = document.getElementById('mobileDrawer');
const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');

const hamburgerSvg = `<svg class="btn-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
const closeSvg = `<svg class="btn-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

function toggleMobileMenu(force) {
  if (!mobileDrawer || !mobileMenuBtn) return;
  const isOpen = typeof force === 'boolean' ? force : !mobileDrawer.classList.contains('open');
  const dict = translations[currentLang] || translations.en;

  if (isOpen) {
    triggerHaptic(12);
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawerBackdrop?.classList.add('is-active');
    mobileDrawerBackdrop?.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-nav-open');
    lenis.stop();
    if (mobileMenuIcon) mobileMenuIcon.innerHTML = closeSvg;
    if (mobileMenuLabel) mobileMenuLabel.textContent = dict.menu_close;
  } else {
    triggerHaptic(8);
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawerBackdrop?.classList.remove('is-active');
    mobileDrawerBackdrop?.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-nav-open');
    lenis.start();
    if (mobileMenuIcon) mobileMenuIcon.innerHTML = hamburgerSvg;
    if (mobileMenuLabel) mobileMenuLabel.textContent = dict.menu;
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

mobileDrawerBackdrop?.addEventListener('click', () => {
  toggleMobileMenu(false);
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    toggleMobileMenu(false);
  });
});

document.addEventListener('click', (e) => {
  if (mobileDrawer && mobileDrawer.classList.contains('open')) {
    if (!mobileDrawer.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
      toggleMobileMenu(false);
    }
  }
});

/* ===================== SHOWCASE CARD — exact-width hover / tap ===================== */
document.querySelectorAll('.sc-card').forEach(card => {
  const img = card.querySelector('img');
  const bar = card.querySelector('.sc-bar');

  const expand = () => {
    const rowH  = card.closest('.showcase-track-wrap')?.offsetHeight || 280;
    const barH  = bar ? bar.offsetHeight : 0;
    const imgH  = rowH - barH;
    const ratio = (img && img.naturalWidth && img.naturalHeight) ? (img.naturalWidth / img.naturalHeight) : 1;
    const maxW  = window.innerWidth <= 600 ? 320 : 680;
    const w     = Math.min(Math.round(imgH * ratio), maxW);
    card.style.width = w + 'px';
  };

  const collapse = () => {
    card.style.width = '';
  };

  if (img) {
    card.addEventListener('mouseenter', expand);
    card.addEventListener('mouseleave', collapse);

    card.addEventListener('click', () => {
      if (window.matchMedia('(hover: none)').matches) {
        if (card.style.width) {
          collapse();
        } else {
          document.querySelectorAll('.sc-card').forEach(c => { if (c !== card) c.style.width = ''; });
          expand();
        }
      }
    });
  }
});

// Initialize language (restores saved language or defaults to 'en')
applyLanguage(currentLang);

/* ===================== PIXEL POP MINIGAME (LANDING PAGE) ===================== */
(function initPixelPopGame() {
  const layer = document.getElementById('pixelGameLayer');
  const scoreEl = document.getElementById('pixelGameScore');
  const toggleBtn = document.getElementById('pixelGameToggle');
  if (!layer || !scoreEl || !toggleBtn) return;

  const BALLOON_COLOR_VARS = ['--pop-c1', '--pop-c2', '--pop-c3', '--pop-c4', '--pop-c5'];
  const getMaxTargets = () => (window.innerWidth <= 600 ? 4 : 6);
  const getSpawnMs = () => (window.innerWidth <= 600 ? 1850 : 1550);

  let score = 0;
  let bestScore = parseInt(localStorage.getItem('des_pop_best') || '0', 10) || 0;
  let isActive = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let spawnTimer = null;
  let rafId = null;
  let audioCtx = null;
  const targets = [];

  function playPopSound(isStar) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = isStar ? 'triangle' : 'square';
      osc.frequency.setValueAtTime(isStar ? 580 : 340, now);
      osc.frequency.exponentialRampToValueAtTime(isStar ? 1040 : 680, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (_) {}
  }

  function createPixelBalloonSvg(colorVar) {
    return `<svg width="28" height="36" viewBox="0 0 7 9" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="2" y="0" width="3" height="1" fill="var(${colorVar})"/>
      <rect x="1" y="1" width="5" height="4" fill="var(${colorVar})"/>
      <rect x="2" y="2" width="1" height="1" fill="var(--pop-shine)"/>
      <rect x="2" y="5" width="3" height="1" fill="var(${colorVar})"/>
      <rect x="3" y="6" width="1" height="1" fill="var(${colorVar})"/>
      <rect x="3" y="7" width="1" height="2" fill="var(--pop-string)"/>
    </svg>`;
  }

  function createPixelStarSvg() {
    return `<svg width="28" height="28" viewBox="0 0 7 7" shape-rendering="crispEdges" aria-hidden="true">
      <rect x="3" y="0" width="1" height="7" fill="var(--pop-star)"/>
      <rect x="0" y="3" width="7" height="1" fill="var(--pop-star)"/>
      <rect x="2" y="1" width="3" height="5" fill="var(--pop-star)"/>
      <rect x="1" y="2" width="5" height="3" fill="var(--pop-star)"/>
      <rect x="3" y="2" width="1" height="1" fill="var(--pop-star-core)"/>
    </svg>`;
  }

  function updateHud() {
    const formatted = String(score).padStart(2, '0');
    scoreEl.textContent = `★ ${formatted}`;
    scoreEl.title = bestScore > 0 ? `Best: ${bestScore}` : 'Click floating pixel balloons & stars!';
    toggleBtn.setAttribute('aria-pressed', String(isActive));
    toggleBtn.textContent = isActive ? 'PLAY: ON' : 'PLAY: OFF';
  }

  function spawnConfetti(x, y, colorVar, label) {
    const particleCount = window.innerWidth <= 600 ? 6 : 8;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('span');
      p.className = 'pixel-particle';
      p.style.background = `var(${colorVar})`;
      layer.appendChild(p);
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.35;
      const dist = 22 + Math.random() * 26;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      gsap.fromTo(p,
        { x, y, scale: 1, opacity: 1 },
        { x: x + dx, y: y + dy, scale: 0.2, opacity: 0, duration: 0.45, ease: 'power2.out', onComplete: () => p.remove() }
      );
    }
    const text = document.createElement('span');
    text.className = 'pixel-pop-float';
    text.textContent = label;
    text.style.color = `var(${colorVar})`;
    layer.appendChild(text);
    gsap.fromTo(text,
      { x: x - 8, y: y - 10, opacity: 1, scale: 0.8 },
      { y: y - 42, opacity: 0, scale: 1.2, duration: 0.65, ease: 'power2.out', onComplete: () => text.remove() }
    );
  }

  function spawnTarget() {
    if (!isActive || targets.length >= getMaxTargets()) return;
    const rect = layer.getBoundingClientRect();
    if (rect.width < 60 || rect.height < 60) return;

    const isStar = Math.random() < 0.25;
    const colorVar = isStar ? '--pop-star' : BALLOON_COLOR_VARS[Math.floor(Math.random() * BALLOON_COLOR_VARS.length)];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pixel-target';
    btn.setAttribute('aria-label', isStar ? 'Pop pixel star (+3 points)' : 'Pop pixel balloon (+1 point)');
    btn.innerHTML = isStar ? createPixelStarSvg() : createPixelBalloonSvg(colorVar);

    const startX = 18 + Math.random() * Math.max(40, rect.width - 64);
    const startY = rect.height + 10;
    const item = {
      el: btn,
      x: startX,
      y: startY,
      baseX: startX,
      speedY: (isStar ? 1.15 : 0.72) + Math.random() * 0.45,
      swayAmp: 8 + Math.random() * 14,
      swayFreq: 0.015 + Math.random() * 0.015,
      phase: Math.random() * Math.PI * 2,
      isStar,
      colorVar,
      popped: false,
    };

    btn.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
    btn.addEventListener('pointerdown', e => {
      e.stopPropagation();
      if (item.popped) return;
      item.popped = true;
      triggerHaptic(12);
      playPopSound(item.isStar);
      const pts = item.isStar ? 3 : 1;
      score += pts;
      if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('des_pop_best', String(bestScore));
      }
      updateHud();
      spawnConfetti(item.x + 14, item.y + 14, item.colorVar, item.isStar ? '+3 ★' : '+1');
      if (score === 10 || score === 25 || score === 50) {
        const msg = currentLang === 'vi'
          ? `Combo ${score} điểm Pixel Pop! Tuyệt vời 🎉`
          : `Reached ${score} Pixel Pop points! 🎉`;
        showToast(msg);
      }
      btn.remove();
      const idx = targets.indexOf(item);
      if (idx !== -1) targets.splice(idx, 1);
    });

    layer.appendChild(btn);
    targets.push(item);
  }

  function tick() {
    if (!isActive) return;
    for (let i = targets.length - 1; i >= 0; i--) {
      const t = targets[i];
      if (t.popped) continue;
      t.y -= t.speedY;
      t.phase += t.swayFreq;
      t.x = t.baseX + Math.sin(t.phase) * t.swayAmp;
      if (t.y < -48) {
        t.el.remove();
        targets.splice(i, 1);
      } else {
        t.el.style.transform = `translate3d(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px, 0)`;
      }
    }
    rafId = requestAnimationFrame(tick);
  }

  function startGame() {
    clearInterval(spawnTimer);
    cancelAnimationFrame(rafId);
    isActive = true;
    updateHud();
    spawnTarget();
    setTimeout(spawnTarget, 450);
    spawnTimer = setInterval(spawnTarget, getSpawnMs());
    rafId = requestAnimationFrame(tick);
  }

  function stopGame() {
    isActive = false;
    clearInterval(spawnTimer);
    cancelAnimationFrame(rafId);
    while (targets.length) {
      const t = targets.pop();
      t?.el.remove();
    }
    updateHud();
  }

  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    triggerHaptic(10);
    if (isActive) stopGame();
    else startGame();
  });

  if (isActive) startGame();
  else updateHud();
})();
