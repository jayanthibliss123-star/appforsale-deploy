package com.example.appforsale.service;

import com.example.appforsale.dto.ContactRequest;
import com.example.appforsale.entity.ContactInquiry;
import com.example.appforsale.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.contact.receiver-email}")
    private String receiverEmail;

    public ContactInquiry submitInquiry(ContactRequest req) {

        // 1. Save to DB
        ContactInquiry inquiry = ContactInquiry.builder()
                .name(req.getName())
                .email(req.getEmail())
                .mobile(req.getMobile())
                .subject(req.getSubject())
                .message(req.getMessage())
                .build();

        ContactInquiry saved = contactRepository.save(inquiry);

        // 2. Send email
        try {
            sendInquiryEmail(saved);
        } catch (Exception e) {
            log.error("Failed to send contact inquiry email: {}", e.getMessage());
            // Don't fail the request if email fails – just log it
        }

        return saved;
    }

    private void sendInquiryEmail(ContactInquiry inquiry) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setFrom(fromEmail);
        helper.setTo(receiverEmail);
        helper.setReplyTo(inquiry.getEmail());
        helper.setSubject("📩 New Contact Inquiry – " + inquiry.getSubject());

        String htmlBody = buildEmailHtml(inquiry);
        helper.setText(htmlBody, true);

        mailSender.send(mimeMessage);
        log.info("Contact inquiry email sent for ID: {}", inquiry.getId());
    }

    private String buildEmailHtml(ContactInquiry inquiry) {
        return """
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8" />
                    <style>
                      body { margin: 0; padding: 0; background: #0f1621; font-family: 'Segoe UI', Arial, sans-serif; }
                      .wrapper { max-width: 600px; margin: 0 auto; background: #141b27; border-radius: 16px; overflow: hidden; }
                      .header { background: linear-gradient(135deg, #1fcfd6 0%%, #42dde2 100%%); padding: 32px 28px; text-align: center; }
                      .header h1 { color: #0d2b2e; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
                      .header p { color: #14464a; margin: 6px 0 0; font-size: 13px; }
                      .body { padding: 28px; }
                      .badge { display: inline-block; background: rgba(103,230,232,0.12); border: 1px solid rgba(103,230,232,0.3); color: #67e6e8; font-size: 11px; font-weight: 700; letter-spacing: 1px; border-radius: 999px; padding: 4px 12px; margin-bottom: 18px; }
                      .section-title { color: #67e6e8; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 14px; }
                      .info-table { width: 100%%; border-collapse: collapse; margin-bottom: 22px; }
                      .info-table tr td { padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
                      .info-table tr:last-child td { border-bottom: none; }
                      .label { color: #8899aa; font-size: 12px; font-weight: 600; width: 110px; }
                      .value { color: #e8f0f8; font-size: 13px; font-weight: 500; }
                      .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 16px; margin-bottom: 24px; }
                      .message-box p { color: #c5d3e0; font-size: 13px; line-height: 1.7; margin: 0; }
                      .footer { background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.06); padding: 18px 28px; text-align: center; }
                      .footer p { color: #556677; font-size: 11px; margin: 0; }
                    </style>
                  </head>
                  <body>
                    <div class="wrapper">
                      <div class="header">
                        <h1>📩 New Contact Inquiry</h1>
                        <p>AppForSale – Inquiry Management</p>
                      </div>
                      <div class="body">
                        <div class="badge">INQUIRY #%d</div>
                        <p class="section-title">Sender Details</p>
                        <table class="info-table">
                          <tr>
                            <td class="label">Full Name</td>
                            <td class="value">%s</td>
                          </tr>
                          <tr>
                            <td class="label">Email</td>
                            <td class="value">%s</td>
                          </tr>
                          <tr>
                            <td class="label">Mobile</td>
                            <td class="value">%s</td>
                          </tr>
                          <tr>
                            <td class="label">Subject</td>
                            <td class="value">%s</td>
                          </tr>
                          <tr>
                            <td class="label">Submitted At</td>
                            <td class="value">%s</td>
                          </tr>
                        </table>
                        <p class="section-title">Message</p>
                        <div class="message-box">
                          <p>%s</p>
                        </div>
                      </div>
                      <div class="footer">
                        <p>This email was sent via AppForSale Contact Form. Reply directly to respond to the sender.</p>
                      </div>
                    </div>
                  </body>
                </html>
                """.formatted(
                inquiry.getId(),
                inquiry.getName(),
                inquiry.getEmail(),
                inquiry.getMobile(),
                inquiry.getSubject(),
                inquiry.getCreatedAt() != null ? inquiry.getCreatedAt().toString().replace("T", " ") : "N/A",
                inquiry.getMessage().replace("\n", "<br/>")
        );
    }
}
