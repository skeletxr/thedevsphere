import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features" },
  { label: "Contact Us" },
  { label: "Internship Program" },
  { label: "Testimonials" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Real-World Projects",
    description:
      "Work on practical projects designed to simulate real-world challenges, helping you build a portfolio that showcases your skills and creativity.",
  },
  {
    icon: <Fingerprint />,
    text: "Web Development Training",
    description:
      "Master the essentials of web development, including HTML, CSS, JavaScript, and responsive design, through live sessions, tutorials, and hands-on projects.",
  },
  {
    icon: <ShieldHalf />,
    text: "Internship Assistance",
    description:
      "We will guide you for the way by which you can get the internship in the top companies and also provide you the resume building and preparation.",
  },
  {
    icon: <BatteryCharging />,
    text: "Certification of Completion",
    description:
      "Earn a professional certificate to validate your expertise and boost your resume, opening doors to exciting career opportunities",
  },
  {
    icon: <PlugZap />,
    text: "Collaborative Learning",
    description:
      "Work together with other batchmates in real-time online meets, enabling seamless collaboration and idea sharing.",
  },
  {
    icon: <GlobeLock />,
    text: "Referral Rewards Program",
    description:
      "Refer a friend and earn ₹2000 for each successful enrollment, making learning rewarding and affordable for you and your peers.",
  },
];

export const checklistItems = [
  {
    title: "Code merge made easy",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Review code without worry",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "AI Assistance to reduce time",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
  {
    title: "Share work in minutes",
    description:
      "Track the performance of your VR apps and gain insights into user behavior.",
  },
];

export const pricingOptions = [
  {
    title: "Web Development",
    price: "INR 9,990",
    features: [
      "MERN Stack",
      "Live Training sessions",
      "Internship Assistance",
      "Industry Relevant Projects",
      "Learn Frontend and Backend",
      "Learn Database management",
    ],
  },
  {
    title: "Development Operations", 
    price: "INR 9,990",
    features: [
      "Automate development workflows",
      "Docker, Kubernetes, and CI/CD",
      "Learn scalable deployment",
      "Learn cloud platforms like AWS",
      "Learn Monitoring and Logging",
      "Earn a Certificate of Completion"
    ],
  },
  {
    title: "Mobile App Development",
    price: "INR 9,990",
    features: [
      "Build apps with ReactNative",
      "Apps on both Android and iOS",
      "Optimization for mobile interfaces",
      "Learn engaging UI/UX designs",
      "Lern to deploy on app stores",
      "Earn a Certificate of Completion"
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
