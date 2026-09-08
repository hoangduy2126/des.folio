const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(htmlPath, 'utf8');

const startTag = `<!-- ╔══════════════════════════════╗ -->
      <!-- ║  PANEL 4 · CONTACT & OUTRO   ║ -->
      <!-- ╚══════════════════════════════╝ -->
      <section class="panel panel--contact" id="contact" data-panel-index="3" data-panel-name="CONTACT">`;

// Find start by looking for the panel comment
const startSearch = '<!-- ║  PANEL 4 · CONTACT';
const startIdx = content.indexOf(startSearch);
if (startIdx === -1) { console.error('START not found'); process.exit(1); }

// Walk backwards to find the actual comment opening
const commentStart = content.lastIndexOf('<!-- ╔', startIdx);
console.log('Comment start:', commentStart);

// Find the closing </section> tag
const sectionClose = '</section>';
let searchFrom = startIdx + 100;
// We need the FIRST </section> after startIdx
const endIdx = content.indexOf(sectionClose, searchFrom) + sectionClose.length;
console.log('End idx:', endIdx);

const newSection = `<!-- ╔══════════════════════════════╗ -->
      <!-- ║  PANEL 4 · CONTACT & OUTRO   ║ -->
      <!-- ╚══════════════════════════════╝ -->
      <section class="panel panel--contact" id="contact" data-panel-index="3" data-panel-name="CONTACT">
        <div class="contact-panel-inner">
          <div class="cell-label mono-text" data-i18n="contact_label">04_CONTACT_&amp;_COLLABORATE</div>

          <div class="contact-body">
            <!-- Availability + Headline -->
            <div class="contact-pitch" data-reveal>
              <div class="contact-avail-pill mono-text">
                <span class="pulse-beacon"></span>
                <span data-i18n="contact_status">● Đang nhận dự án mới</span>
              </div>
              <h2 class="contact-big-headline" data-i18n="contact_headline">Có ý tưởng hay dự án mới?<br>Nhắn <span class="accent2">Duy</span> ngay nhé.</h2>
              <p class="contact-tagline mono-text" data-i18n="contact_tagline">// liên hệ qua mail hoặc zalo — phản hồi nhanh, không form phức tạp.</p>
            </div>

            <!-- Primary Channel Cards -->
            <div class="contact-cards" data-reveal>

              <!-- Email Card -->
              <div class="reach-card reach-card--email">
                <div class="reach-card-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div class="reach-card-content">
                  <span class="reach-card-label mono-text" data-i18n="contact_email_label">Email</span>
                  <a href="mailto:hoangduy2126@gmail.com" class="reach-card-val mono-text" id="emailDisplayVal">hoangduy2126@gmail.com</a>
                </div>
                <div class="reach-card-actions">
                  <a href="mailto:hoangduy2126@gmail.com" class="reach-btn reach-btn--primary mono-text" id="btnSendMail" data-i18n="contact_btn_mail">Gửi mail</a>
                  <button type="button" class="reach-btn reach-btn--copy mono-text copy-trigger" data-copy-target="hoangduy2126@gmail.com" id="btnCopyEmail">
                    <svg class="copy-icon-default" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span class="copy-btn-text" data-i18n="contact_btn_copy">Sao chép</span>
                  </button>
                </div>
              </div>

              <!-- Phone / Zalo Card -->
              <div class="reach-card reach-card--phone">
                <div class="reach-card-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div class="reach-card-content">
                  <span class="reach-card-label mono-text" data-i18n="contact_phone_label">Zalo / Hotline</span>
                  <a href="tel:0987654321" class="reach-card-val mono-text" id="phoneDisplayVal">+84 (0) 987 654 321</a>
                </div>
                <div class="reach-card-actions">
                  <a href="https://zalo.me/0987654321" target="_blank" rel="noopener" class="reach-btn reach-btn--zalo mono-text" id="btnChatZalo" data-i18n="contact_btn_zalo">Chat Zalo</a>
                  <a href="tel:0987654321" class="reach-btn reach-btn--ghost mono-text" id="btnCall" data-i18n="contact_btn_call">Gọi ngay</a>
                  <button type="button" class="reach-btn reach-btn--copy mono-text copy-trigger" data-copy-target="0987654321" id="btnCopyPhone">
                    <svg class="copy-icon-default" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span class="copy-btn-text" data-i18n="contact_btn_copy">Sao chép</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- Social / DM Strip -->
            <div class="contact-socials" data-reveal>
              <span class="contact-socials-label mono-text" data-i18n="contact_socials_label">// hoặc tìm mình ở đây —</span>
              <div class="contact-socials-links">
                <a href="https://m.me/moeedidauuu/" target="_blank" rel="noopener" class="social-link hover-msg pixel-text">MESSENGER</a>
                <a href="https://www.facebook.com/moeedidauuu/" target="_blank" rel="noopener" class="social-link hover-fb pixel-text">FACEBOOK</a>
                <a href="https://www.instagram.com/06s_.moe" target="_blank" rel="noopener" class="social-link hover-ig pixel-text">INSTAGRAM</a>
                <a href="https://www.behance.net/hoangduy2126" target="_blank" rel="noopener" class="social-link hover-be pixel-text">BEHANCE</a>
                <a href="https://www.linkedin.com/in/duy-ho%C3%A0ng-720699405/" target="_blank" rel="noopener" class="social-link hover-in pixel-text">LINKEDIN</a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <footer class="footer-inline" data-reveal>
            <div class="footer-inner">
              <span class="pixel-text footer-logo">DES<span class="dot">.</span><span class="accent">FOLIO</span></span>
              <span class="mono-text footer-copy" data-i18n="footer_copy">© 2026 — Crafted with ♥ &amp; lots of ☕</span>
              <span class="mono-text footer-version" data-i18n="footer_version">v2.2.0 · HORIZONTAL PAN</span>
            </div>
          </footer>
        </div>
      </section>`;

const newContent = content.slice(0, commentStart) + newSection + content.slice(endIdx);
fs.writeFileSync(htmlPath, newContent, 'utf8');
console.log('Done. File written.');
console.log('Old length:', content.length, 'New length:', newContent.length);
