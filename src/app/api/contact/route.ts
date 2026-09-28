import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  'Ano Energy Website <contact@anoenergy.org>'

const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ||
  'contact@anoenergy.org'

const ENQUIRIES = [
  'Procurement',
  'Distribution & Supply',
  'System Design & Feasibility',
  'Agriculture & Agro-Processing',
  'Property & Estate Development',
  'Fleet & Mobility',
  'Investment & Partnership',
  'Government & Development Finance',
  'Media',
]

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured.')

      return NextResponse.json(
        {
          success: false,
          message:
            'Email service is not configured. Please contact us directly.',
        },
        { status: 500 }
      )
    }

    const body = await request.json()

    const {
      name,
      email,
      company,
      enquiryType,
      siteLocation,
      message,
      website,
    } = body

    // Honeypot spam protection.
    // Real users never fill this field.
    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Thank you. Your enquiry has been received.',
      })
    }

    if (!name || !email || !enquiryType || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please complete all required fields.',
        },
        { status: 400 }
      )
    }

    if (!ENQUIRIES.includes(enquiryType)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid enquiry type.',
        },
        { status: 400 }
      )
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a valid email address.',
        },
        { status: 400 }
      )
    }

    const cleanName = escapeHtml(name.trim())
    const cleanEmail = escapeHtml(email.trim())
    const cleanCompany = escapeHtml(
      typeof company === 'string' ? company.trim() : ''
    )
    const cleanEnquiry = escapeHtml(enquiryType)
    const cleanSite = escapeHtml(
      typeof siteLocation === 'string'
        ? siteLocation.trim()
        : ''
    )
    const cleanMessage = escapeHtml(message.trim())

    const prefix =
      enquiryType === 'System Design & Feasibility'
        ? '[SYSTEM DESIGN]'
        : enquiryType === 'Agriculture & Agro-Processing'
          ? '[AGRICULTURE]'
          : enquiryType ===
              'Property & Estate Development'
            ? '[ESTATES]'
            : enquiryType === 'Fleet & Mobility'
              ? '[E-MOBILITY]'
              : enquiryType === 'Distribution & Supply'
                ? '[DISTRIBUTION]'
                : enquiryType === 'Procurement'
                  ? '[PROCUREMENT]'
                  : enquiryType ===
                      'Investment & Partnership'
                    ? '[PARTNERSHIP]'
                    : enquiryType ===
                        'Government & Development Finance'
                      ? '[GOVERNMENT / DFI]'
                      : enquiryType === 'Media'
                        ? '[MEDIA]'
                        : '[WEBSITE]'

    /*
     * --------------------------------------------------
     * 1. SEND ENQUIRY TO ANO ENERGY
     * --------------------------------------------------
     */

    const internalEmail = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],

      // Clicking Reply will reply directly
      // to the person who submitted the form.
      replyTo: email,

      subject: `${prefix} ${enquiryType} — ${name}`,

      html: `
        <div
          style="
            margin:0;
            padding:40px 20px;
            background:#FAF7F0;
            font-family:Arial,Helvetica,sans-serif;
            color:#333333;
          "
        >
          <div
            style="
              max-width:680px;
              margin:0 auto;
              background:#ffffff;
              border-top:4px solid #1B4332;
              padding:40px;
            "
          >
            <p
              style="
                margin:0 0 10px;
                color:#2D6A4F;
                font-size:11px;
                font-weight:700;
                letter-spacing:2px;
                text-transform:uppercase;
              "
            >
              Ano Energy Website Enquiry
            </p>

            <h1
              style="
                margin:0 0 35px;
                color:#1B4332;
                font-size:28px;
                line-height:1.2;
              "
            >
              ${cleanEnquiry}
            </h1>

            <table
              cellpadding="0"
              cellspacing="0"
              style="
                width:100%;
                border-collapse:collapse;
                font-size:14px;
              "
            >
              <tr>
                <td
                  style="
                    width:160px;
                    padding:12px 0;
                    border-bottom:1px solid #eeeeee;
                    font-weight:bold;
                  "
                >
                  Name
                </td>

                <td
                  style="
                    padding:12px 0;
                    border-bottom:1px solid #eeeeee;
                  "
                >
                  ${cleanName}
                </td>
              </tr>

              <tr>
                <td
                  style="
                    padding:12px 0;
                    border-bottom:1px solid #eeeeee;
                    font-weight:bold;
                  "
                >
                  Email
                </td>

                <td
                  style="
                    padding:12px 0;
                    border-bottom:1px solid #eeeeee;
                  "
                >
                  <a
                    href="mailto:${cleanEmail}"
                    style="
                      color:#1B4332;
                      text-decoration:none;
                    "
                  >
                    ${cleanEmail}
                  </a>
                </td>
              </tr>

              ${
                cleanCompany
                  ? `
                    <tr>
                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #eeeeee;
                          font-weight:bold;
                        "
                      >
                        Organisation
                      </td>

                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #eeeeee;
                        "
                      >
                        ${cleanCompany}
                      </td>
                    </tr>
                  `
                  : ''
              }

              ${
                cleanSite
                  ? `
                    <tr>
                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #eeeeee;
                          font-weight:bold;
                        "
                      >
                        Site
                      </td>

                      <td
                        style="
                          padding:12px 0;
                          border-bottom:1px solid #eeeeee;
                        "
                      >
                        ${cleanSite}
                      </td>
                    </tr>
                  `
                  : ''
              }

              <tr>
                <td
                  style="
                    padding:12px 0;
                    border-bottom:1px solid #eeeeee;
                    font-weight:bold;
                  "
                >
                  Enquiry
                </td>

                <td
                  style="
                    padding:12px 0;
                    border-bottom:1px solid #eeeeee;
                  "
                >
                  ${cleanEnquiry}
                </td>
              </tr>
            </table>

            <div
              style="
                margin-top:32px;
                padding-top:25px;
                border-top:1px solid #dddddd;
              "
            >
              <p
                style="
                  margin:0 0 12px;
                  font-size:12px;
                  font-weight:bold;
                  letter-spacing:1px;
                  text-transform:uppercase;
                  color:#2D6A4F;
                "
              >
                Project details
              </p>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  line-height:1.75;
                  white-space:pre-wrap;
                "
              >${cleanMessage}</p>
            </div>

            <div
              style="
                margin-top:35px;
                padding-top:20px;
                border-top:1px solid #eeeeee;
                color:#777777;
                font-size:12px;
                line-height:1.6;
              "
            >
              Submitted through the Ano Energy website.
            </div>
          </div>
        </div>
      `,
    })

    if (internalEmail.error) {
      console.error(
        'Resend internal email error:',
        internalEmail.error
      )

      return NextResponse.json(
        {
          success: false,
          message:
            'We could not send your enquiry. Please try again.',
        },
        { status: 500 }
      )
    }

    /*
     * --------------------------------------------------
     * 2. SEND ACKNOWLEDGEMENT TO VISITOR
     * --------------------------------------------------
     */

    const confirmation = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],

      // If the visitor replies to the confirmation,
      // it goes to Ano Energy.
      replyTo: TO_EMAIL,

      subject:
        'Your enquiry has been received | Ano Energy',

      html: `
        <div
          style="
            margin:0;
            padding:40px 20px;
            background:#FAF7F0;
            font-family:Arial,Helvetica,sans-serif;
            color:#333333;
          "
        >
          <div
            style="
              max-width:620px;
              margin:0 auto;
              background:#ffffff;
              border-top:4px solid #1B4332;
              padding:40px;
            "
          >
            <p
              style="
                margin:0;
                color:#2D6A4F;
                font-size:11px;
                font-weight:700;
                letter-spacing:2px;
                text-transform:uppercase;
              "
            >
              Ano Energy Africa Limited
            </p>

            <h1
              style="
                margin:20px 0;
                color:#1B4332;
                font-size:30px;
                line-height:1.2;
              "
            >
              Thank you, ${cleanName}.
            </h1>

            <p
              style="
                font-size:15px;
                line-height:1.75;
              "
            >
              We have received your enquiry regarding
              <strong>${cleanEnquiry}</strong>.
            </p>

            <p
              style="
                font-size:15px;
                line-height:1.75;
              "
            >
              Our team will review the information you
              provided and respond as appropriate.
            </p>

            <div
              style="
                margin:28px 0;
                padding:22px;
                background:#F5F7F3;
                border-left:3px solid #2D6A4F;
              "
            >
              <p
                style="
                  margin:0 0 8px;
                  font-size:11px;
                  color:#2D6A4F;
                  font-weight:bold;
                  letter-spacing:1px;
                  text-transform:uppercase;
                "
              >
                Enquiry type
              </p>

              <p
                style="
                  margin:0;
                  font-size:15px;
                  font-weight:bold;
                  color:#1B4332;
                "
              >
                ${cleanEnquiry}
              </p>
            </div>

            <p
              style="
                font-size:15px;
                line-height:1.75;
              "
            >
              If you need to add anything to your enquiry,
              simply reply to this email.
            </p>

            <p
              style="
                font-size:15px;
                line-height:1.75;
              "
            >
              You can also contact us directly at
              <a
                href="mailto:${TO_EMAIL}"
                style="
                  color:#1B4332;
                  font-weight:bold;
                  text-decoration:none;
                "
              >
                ${TO_EMAIL}
              </a>.
            </p>

            <div
              style="
                margin-top:35px;
                padding-top:20px;
                border-top:1px solid #dddddd;
                color:#666666;
                font-size:12px;
                line-height:1.7;
              "
            >
              <strong
                style="
                  color:#1B4332;
                "
              >
                Ano Energy Africa Limited
              </strong>

              <br />

              An Ano Global Holdings company
            </div>
          </div>
        </div>
      `,
    })

    /*
     * The main form should still succeed if the visitor's
     * acknowledgement fails. The Ano Energy team already
     * received the enquiry.
     */
    if (confirmation.error) {
      console.error(
        'Acknowledgement email error:',
        confirmation.error
      )
    }

    return NextResponse.json({
      success: true,
      message:
        'Thank you. Your enquiry has been sent successfully.',
    })
  } catch (error) {
    console.error('Contact route error:', error)

    return NextResponse.json(
      {
        success: false,
        message:
          'Something went wrong. Please try again.',
      },
      { status: 500 }
    )
  }
}