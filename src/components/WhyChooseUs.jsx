import { TrendingUp, Leaf, CloudSun, Clock3, Home } from "lucide-react";
import SectionHeading from "./SectionHeading";
import FeatureList from "./FeatureList";

const reasons = [
  {
    icon: TrendingUp,
    title: "উচ্চ ফলনশীল জাত",
    text: "প্রতিটি গাছেই ভরপুর ফলন হয়, যা দেয় সন্তুষ্টি ও বাড়তি আয় দুটোই।",
  },
  {
    icon: Leaf,
    title: "১০০% খাঁটি ও প্রাকৃতিক",
    text: "কোনো রকম ক্ষতিকর কেমিক্যাল ছাড়াই সম্পূর্ণ প্রাকৃতিক পদ্ধতিতে তৈরি চারা।",
  },
  {
    icon: CloudSun,
    title: "বাংলাদেশের আবহাওয়ায় উপযোগী",
    text: "খরা বা বৃষ্টি — স্থানীয় জলবায়ুর সাথে সহজেই মানিয়ে নিতে সক্ষম।",
  },
  {
    icon: Clock3,
    title: "কম পরিচর্যায় চাষযোগ্য",
    text: "নতুন বা অভিজ্ঞ, যে কেউ বাড়তি যত্ন ছাড়াই সহজে গাছ লাগাতে পারবেন।",
  },
  {
    icon: Home,
    title: "ছাদ, বারান্দা বা মাঠ — যেকোনো জায়গায়",
    text: "টব, ড্রাম কিংবা খোলা জমি — চাষের জন্য জায়গা কোনো বাধা নয়।",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-vine/5 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="কেন আমাদের চারা বেছে নেবেন"
          title="শুধু চারা নয়, একটি বাগানের শুরু"
        />
        <div className="mt-10">
          <FeatureList items={reasons} accent="vine" />
        </div>
      </div>
    </section>
  );
}
