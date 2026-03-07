import { Icons } from "@/components/shared/icons";

export const infos: any[] = [
  {
    title: "Punting Made Easy",
    description:
      "Thats the moto of Lay Back and Win. We take the guess work out of betting on horses. Our system is designed to provide you with the best possible chance of making a profit, without the need to spend hours analysing the form.",
    image: "/images/info2.png",
    list: [
      {
        title: "40 Years of Experience",
        description: "40 years of experience in the horse racing industry.",
        icon: "lightbulb",
      },
      {
        title: "Innovative",
        description:
          "A platform that is constantly evolving to meet your needs.",
        icon: "lightningbolt",
      },
      {
        title: "Scalable",
        description:
          "As your bankroll grows, our system can grow with you, allowing you to place larger bets with confidence.",
        icon: "dollar",
      },
    ],
  },
  {
    title: "A Platform Built With Purpose",
    description:
      "We realised that in the punting market there was a gap for a system that was easy to use, reliable and most importantly profitable. Lay Back and Win was born out of this need. Our system is designed to provide you with the best possible chance of making a profit, without the need to spend hours analysing the form.",
    image: "/images/info1.png",
    list: [
      {
        title: "Flexible",
        description:
          "Customize your settings to suit your betting style and preferences.",
        icon: "laptop",
      },
      {
        title: "Efficient",
        description:
          "We utilise cutting-edge technology to ensure we able to capitalise on market opportunities.",
        icon: "search",
      },
      {
        title: "Reliable",
        description:
          "Rely on our robust infrastructure utilising edge networks around the world and comprehensive documentation.",
        icon: "settings",
      },
    ],
  },
];

interface Features {
  title: string;
  description: string;
  link?: string;
  icon: () => JSX.Element;
}

export const features: Features[] = [
  {
    title: "Real-time Market Analysis",
    description:
      "Our AI-powered system provides you with up-to-the second analysis of the horse racing market, giving you a competitive edge when it comes to placing bets.",
    link: "/",
    icon: () => <Icons.laptop className="size-6 text-primary" />,
  },
  {
    title: "Back Tested Over 200,000 Races",
    description:
      "Rigorously tested over 200,000 races, giving you the confidence to place bets with peace of mind. By analyzing historical data and identifying patterns, we've developed a system that consistently delivers results.",
    link: "/",
    icon: () => <Icons.check className="size-6 text-primary" />,
  },
  {
    title: "High Precision Infrastructure",
    description:
      "Ensures that our system is always running at peak performance. By leveraging cutting-edge technology and state-of-the-art hardware, we're able to deliver fast, accurate results that help you make smarter bets.",
    link: "/",
    icon: () => <Icons.lightningbolt className="size-6 text-primary" />,
  },
  {
    title: "Play Both Sides",
    description:
      "We don't just rely on backing horses to make a profit. We also lay horses that we believe are overvalued, giving you the opportunity to profit from both sides of the market.",
    link: "/",
    icon: () => <Icons.ellipsis className="size-6 text-primary" />,
  },
  {
    title: "Refund Guarantee",
    description:
      "Subscribe to the Members Plus Package and if any week you don't profit, we'll refund your subscription fee for that week",
    icon: () => <Icons.billing className="size-6 text-primary" />,
  },
  {
    title: "Constantly Evolving",
    description:
      "We don't just rely on a strategy that may become outdated. We're constantly evolving our system to ensure that we're always delivering the best results possible.",
    link: "/",
    icon: () => <Icons.copy className="size-6 text-primary" />,
  },
];

export const testimonials = [
  {
    name: "Simon",
    job: "Premium Member",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    review:
      "I have been with LBW for over 2 years and the advancement made with the integration to Betfair with transactions automatically occurring in the background has been a revelation! John and the team at LBW are always ensuring profits are maximised and I can go about my day knowing my long term strategy to accumulate funds is in the best hands.",
  },
  {
    name: "Matt",
    job: "Starter Member",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    review:
      "LBW made it easy for to get up and runnning with betting automation. It allowed to me to place bets without having to be in front of my computer all day. I've been able to make a profit without needing to think",
  },
  {
    name: "Steven",
    job: "Pro Member",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "LBW has truly transformed my betting experience with its insightful strategies and user-friendly platform. Their expert information thorough analysis have consistently guided me to make more informed decisions, significantly improving my win rate. I highly recommend LBW to anyone looking for an alternative to your standard run of the mill 'tipsters'",
  },
  {
    name: "Glenn",
    job: "Pro Member",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    review:
      "The key to Lay Back and Win is the people. The team at LBW provide a system proven to deliver profits based off market analysis and NOT guess work. This combined with an easy-to-use interface and superior one-on one customer account management means, that if you use the system as per instructions you can set, forget and profit. Now who doesn’t want that! I highly recommend that you speak with John or Zach today. You won’t regret it!",
  },
  {
    name: "Mark",
    job: "Pro Member",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    review:
      "Before Lay Back and Win I was your run of the mill punter, losing most weeks and getting frustrated tbh. Lay Back and Win has changed my mindset and approach to betting on horses. LBW isn't a get rich overnight thing, but sticking at it has paid dividends for me.",
  },
  {
    name: "Jayden",
    job: "Starter Member",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    review:
      "I've been using LBW for a few months now and I'm really happy with the results. The system is easy to use and the support team are always on hand to help with any questions I have. I've been able to make a profit every month since I started using LBW and I'm looking forward to seeing how much I can make in the future.",
  },
];
