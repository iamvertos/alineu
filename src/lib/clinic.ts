export const CLINIC = {
  name: "AlineU Physiotherapy & Rehabilitation Center",
  shortName: "AlineU",
  tagline: "Move Better. Recover Stronger.",
  phoneDisplay: "+91 94069 75017",
  phoneHref: "tel:+919406975017",
  whatsappHref:
    "https://wa.me/919406975017?text=Hi%20AlineU%2C%20I%27d%20like%20to%20book%20a%20physiotherapy%20appointment.",
  address:
    "Pachhadi Kheda Rd, Soni Colony, Yadav Colony, Ashoknagar, Madhya Pradesh 473331",
  addressLines: [
    "Pachhadi Kheda Rd, Soni Colony",
    "Yadav Colony, Ashoknagar",
    "Madhya Pradesh 473331",
  ],
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "AlineU Physiotherapy, Pachhadi Kheda Rd, Soni Colony, Yadav Colony, Ashoknagar, Madhya Pradesh 473331",
    ),
  mapEmbedSrc:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent(
      "Pachhadi Kheda Rd, Soni Colony, Yadav Colony, Ashoknagar, Madhya Pradesh 473331",
    ) +
    "&z=15&output=embed",
  rating: "4.9",
  reviews: 41,
  instagram: "https://www.instagram.com/alineu.physio/",
  facebook: "https://www.facebook.com/people/AlineU-Physio/",
  doctor: {
    name: "Dr. Chinmay Jain",
    title: "Physiotherapist & Rehabilitation Specialist",
    experience: "5+ years of experience",
  },
  hours: [
    { day: "Monday", time: "9:00 AM – 11:00 AM · 6:00 PM – 8:00 PM" },
    { day: "Tuesday", time: "9:00 AM – 11:00 AM · 6:00 PM – 8:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 11:00 AM · 6:00 PM – 8:00 PM" },
    { day: "Thursday", time: "9:00 AM – 11:00 AM · 6:00 PM – 8:00 PM" },
    { day: "Friday", time: "9:00 AM – 11:00 AM · 6:00 PM – 8:00 PM" },
    { day: "Saturday", time: "9:00 AM – 11:00 AM · 6:00 PM – 8:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
} as const;

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#conditions", label: "Conditions We Treat" },
  { href: "#why", label: "Why AlineU" },
  { href: "#contact", label: "Contact" },
] as const;
