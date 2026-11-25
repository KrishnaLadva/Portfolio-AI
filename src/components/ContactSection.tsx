import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import type { ContactFormErrors, ContactFormValues, ProfileData } from '../types/portfolio';
import { hasValidationErrors, validateContactForm } from '../utils/portfolioLogic';

interface ContactSectionProps {
  profile: ProfileData;
}

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  collaborationType: 'Digital Marketing Internship',
  message: '',
};

export default function ContactSection({ profile }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateContactForm(values);
    setErrors(validation);
    setServerError('');

    if (hasValidationErrors(validation)) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not send message.');
      }
      setSubmittedRef(data.referenceId || 'SENT');
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Unable to submit contact message.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-[#E6E1D8] bg-[#F2EFE9]/60 py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Direct Contact Info */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#2563EB]">Let&apos;s Collaborate</p>
            <h2 className="mt-2 font-editorial text-3xl font-semibold tracking-tight text-[#18181B] sm:text-4xl [text-wrap:balance]">
              Open for Digital Marketing Internships &amp; Creative Collaborations
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#52525B]">
              Looking for a motivated BCA graduate with creative social media instincts, SEO
              foundations, AI workflow curiosity, and full-stack web literacy? Reach out directly.
            </p>

            <div className="mt-8 space-y-4 border-t border-[#E6E1D8] pt-6">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-sm font-medium text-[#18181B] hover:text-[#2563EB]"
              >
                <Mail className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-sm font-medium text-[#18181B] hover:text-[#2563EB]"
              >
                <Phone className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                <span className="tabular-nums">{profile.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-[#52525B]">
                <MapPin className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                <span>{profile.location}</span>
              </div>
              {profile.linkedinUrl.trim() ? (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8]"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <a
                  href="#about"
                  className="inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-[#52525B] underline decoration-[#D4CEC3] underline-offset-4 hover:text-[#2563EB]"
                >
                  <span>Add exact LinkedIn profile URL in About → Edit Profile</span>
                </a>
              )}
            </div>

            {/* Tactile Pinterest Keepsake Card */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border-2 border-[#18181B] bg-white p-3 shadow-[5px_5px_0px_0px_#E6E1D8]">
              <div className="h-16 w-3 shrink-0 overflow-hidden rounded-full border border-[#18181B]/20">
                <img
                  src="/assets/aistudio/iPhone_wallpaper_a21cd8b7.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <img
                src="/assets/aistudio/I_think_so___502dd031.jpg"
                alt="The Chai Story glass illustration"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-16 w-14 shrink-0 rounded-xl border border-[#E6E1D8] object-cover -rotate-2"
              />
              <div>
                <p className="font-handwritten text-xl font-semibold leading-tight text-[#18181B]">
                  always down for chai &amp; campaign ideas
                </p>
                <p className="mt-0.5 text-xs text-[#71717A]">
                  Available for internships &amp; freelance creative collabs
                </p>
              </div>
            </div>
          </div>

          {/* Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#E6E1D8] bg-white p-6 sm:p-8"
            >
              <h3 className="font-editorial text-2xl font-semibold text-[#18181B]">
                Send a Message
              </h3>

              {submittedRef && (
                <div
                  role="status"
                  className="mt-4 flex items-start gap-3 rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-4 text-sm text-[#166534]"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Thank you! Your message has been received.</p>
                    <p className="mt-0.5 text-xs">
                      Reference: {submittedRef} · Krishna will reply to your email soon.
                    </p>
                  </div>
                </div>
              )}

              {serverError && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4 text-sm text-[#991B1B]"
                >
                  {serverError}
                </div>
              )}

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[#52525B]">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={values.name}
                    onChange={(e) => {
                      setValues({ ...values, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    aria-invalid={Boolean(errors.name)}
                    placeholder="Priya Sharma"
                    className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[#52525B]">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={values.email}
                    onChange={(e) => {
                      setValues({ ...values, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    aria-invalid={Boolean(errors.email)}
                    placeholder="priya@company.com"
                    className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-[#52525B]"
                  >
                    Collaboration Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={values.collaborationType}
                    onChange={(e) => {
                      setValues({ ...values, collaborationType: e.target.value });
                      if (errors.collaborationType)
                        setErrors({ ...errors, collaborationType: undefined });
                    }}
                    aria-invalid={Boolean(errors.collaborationType)}
                    className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                  >
                    <option value="Digital Marketing Internship">Digital Marketing Internship</option>
                    <option value="Social Media & Content Creation">Social Media &amp; Content Creation</option>
                    <option value="SEO & Website Support">SEO &amp; Website Support</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                  {errors.collaborationType && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                      {errors.collaborationType}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#52525B]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => {
                      setValues({ ...values, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Share details about the internship, project, or opportunity..."
                    className="mt-1.5 w-full rounded-lg border border-[#D4CEC3] bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-[#18181B]"
                  />
                  {errors.message && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-[#DC2626]">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-60"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  <span>{submitting ? 'Sending...' : "Let's Collaborate"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
