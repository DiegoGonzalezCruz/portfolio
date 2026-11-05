import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy | ${site.name}`,
  description: "What this site collects, why, and how to ask for your data to be deleted.",
  alternates: { canonical: "/privacy" },
};

const updated = "November 5, 2026";

/*
 * Plain-language summary of what the site actually does. Draft written for
 * Diego to review; not legal advice. Keep it in sync with the code: contact
 * form (SES), Google tag (only when NEXT_PUBLIC_GOOGLE_ADS_ID is set), theme
 * preference in localStorage, Vercel hosting.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-32 pb-24 md:px-6">
      <h1 className="font-display text-4xl font-bold tracking-tight">Privacy</h1>
      <p className="mt-2 text-sm text-muted">Last updated {updated}</p>

      <div className="mt-10 flex flex-col gap-8 leading-relaxed text-pretty [&_a]:text-cyan [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-2 [&_p]:text-muted">
        <section>
          <h2>Who I am</h2>
          <p>
            This site belongs to {site.name}, based in {site.location.city},{" "}
            {site.location.regionName}. Questions about your data go to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>

        <section>
          <h2>The contact form</h2>
          <p>
            When you send the form, I receive your name, email address, the service you
            picked and your message, and you get a confirmation email. Both emails are sent
            through Amazon Web Services (SES). I use this information only to reply to you
            and keep it in my email for as long as we&apos;re in touch. I don&apos;t sell it
            or share it with anyone else.
          </p>
          <p>
            To keep out automated spam, the form uses Vercel BotID, an invisible check of
            signals from your browser that tells people apart from automated scripts, and
            limits how often it can be sent from one IP address. Both are used only to
            protect the form.
          </p>
        </section>

        <section>
          <h2>Advertising measurement</h2>
          <p>
            I advertise on Google. This site uses the Google tag so that, when someone who
            clicked one of my ads sends the contact form, Google can count it as a
            conversion. Google may set cookies to do this; how Google uses that data is
            described in{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Google&apos;s advertising policies
            </a>
            . You can limit ad personalization in{" "}
            <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">
              My Ad Center
            </a>{" "}
            and block cookies in your browser settings. The site uses no other analytics.
          </p>
        </section>

        <section>
          <h2>Everything else</h2>
          <p>
            Your light or dark theme choice is saved in your own browser and never sent
            anywhere. The site is hosted on Vercel, which processes standard request data,
            such as IP addresses, to deliver and protect it.
          </p>
        </section>

        <section>
          <h2>Deleting your data</h2>
          <p>
            Email <a href={`mailto:${site.email}`}>{site.email}</a> and I&apos;ll delete
            your messages.
          </p>
        </section>
      </div>
    </main>
  );
}
