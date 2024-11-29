export const templates = [
  {
    id: "contact-form",
    name: "Contact Form",
    thumbnail: "/templates/contact-form.png",
    elements: [
      {
        id: "heading_1",
        type: "heading",
        content: "Contact Us",
        x: 50,
        y: 30,
        width: 300,
        height: 50,
        styles: {
          fontSize: "32px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#2563eb",
        },
      },
      {
        id: "input_name",
        type: "input",
        content: "",
        placeholder: "Your Name",
        x: 50,
        y: 100,
        width: 300,
        height: 40,
        styles: {
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #e5e7eb",
        },
      },
      {
        id: "input_email",
        type: "input",
        content: "",
        placeholder: "Your Email",
        x: 50,
        y: 160,
        width: 300,
        height: 40,
        styles: {
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #e5e7eb",
        },
      },
      {
        id: "button_submit",
        type: "button",
        content: "Send Message",
        x: 50,
        y: 220,
        width: 300,
        height: 40,
        styles: {
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        },
      },
    ],
  },
  {
    id: "hero-section",
    name: "Hero Section",
    thumbnail: "/templates/hero-section.png",
    elements: [
      {
        id: "heading_hero",
        type: "heading",
        content: "Welcome to Our Platform",
        x: 50,
        y: 50,
        width: 500,
        height: 60,
        styles: {
          fontSize: "48px",
          fontWeight: "bold",
          color: "#1f2937",
        },
      },
      {
        id: "paragraph_hero",
        type: "paragraph",
        content: "Create beautiful designs with our easy-to-use builder",
        x: 50,
        y: 130,
        width: 400,
        height: 60,
        styles: {
          fontSize: "20px",
          color: "#6b7280",
        },
      },
      {
        id: "button_cta",
        type: "button",
        content: "Get Started",
        x: 50,
        y: 210,
        width: 200,
        height: 50,
        styles: {
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "8px",
          fontSize: "18px",
          border: "none",
          cursor: "pointer",
        },
      },
    ],
  },
  {
    id: "pricing-card",
    name: "Pricing Card",
    thumbnail: "/templates/pricing-card.png",
    elements: [
      {
        id: "heading_price",
        type: "heading",
        content: "Pro Plan",
        x: 40,
        y: 30,
        width: 200,
        height: 40,
        styles: {
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#1f2937",
        },
      },
      {
        id: "heading_amount",
        type: "heading",
        content: "$49/month",
        x: 40,
        y: 80,
        width: 200,
        height: 50,
        styles: {
          fontSize: "36px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#2563eb",
        },
      },
      {
        id: "button_subscribe",
        type: "button",
        content: "Subscribe Now",
        x: 40,
        y: 150,
        width: 200,
        height: 40,
        styles: {
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        },
      },
    ],
  },
];
