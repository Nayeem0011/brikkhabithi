import { Home, Sprout, Briefcase, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import FeatureList from "./FeatureList";

const audience = [
  {
    icon: Home,
    title: "ছাদবাগান ও হোম গার্ডেন প্রেমীরা",
    text: "টবে, ড্রামে বা ব্যালকনিতে সহজেই ফলাতে পারবেন মিষ্টি আঙ্গুর।",
  },
  {
    icon: Sprout,
    title: "নতুন উদ্যোক্তা কৃষকরা",
    text: "নিজের চাষ শুরু করতে চাইলে এই উন্নত জাতের চারা হতে পারে সেরা শুরু।",
  },
  {
    icon: Briefcase,
    title: "বাণিজ্যিকভাবে চাষে আগ্রহীরা",
    text: "বেশি ফলন আর কম খরচে একটি লাভজনক প্রকল্পের জন্য উপযুক্ত বাছাই।",
  },
  {
    icon: MapPin,
    title: "বাড়িতে অব্যবহৃত জায়গা আছে যাদের",
    text: "ফাঁকা জায়গাকে বদলে ফেলুন এক টুকরো ফলের বাগানে।",
  },
];

export default function TargetAudience() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="এই চারা কাদের জন্য"
        title="আপনিও হতে পারেন একজন সফল চাষি"
      />
      <div className="mt-10">
        <FeatureList items={audience} accent="plum" />
      </div>
    </section>
  );
}
