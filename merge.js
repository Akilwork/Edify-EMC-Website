const fs = require('fs');
const file = 'c:/Users/akilj/Desktop/Website/Edify EMC Website/src/data/service-details.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Append capabilities to IT Solutions
content = content.replace(
    /heading: "IT & Digital Capabilities",\s*items: \[([\s\S]*?)\]/,
    (match, p1) => {
        return `heading: "IT & Digital Capabilities",
        items: [${p1}          { title: "Online Platforms & Portals", description: "Custom web platforms for engagement and transactions." },
          { title: "E-Commerce & Payments", description: "Secure online stores and payment integration." },
          { title: "Web & App Development", description: "Fast, responsive sites and applications." },
          { title: "Digital Marketing", description: "Campaigns that grow reach and conversions." },
          { title: "Analytics & Optimization", description: "Insight-driven improvement over time." },
          { title: "Managed Digital Operations", description: "Ongoing support that keeps you performing." },
        ]`;
    }
);

// 2. Append WhyItMatters to IT Solutions
content = content.replace(
    /heading: "Why Digital Transformation Matters",\s*items: \[([\s\S]*?)\]/,
    (match, p1) => {
        return `heading: "Why Digital Transformation Matters",
        items: [${p1}          { title: "Modern E-Commerce Platform", description: "Custom, scalable online storefronts designed for seamless digital commerce." },
          { title: "Digital Commerce Analytics", description: "Real-time data insights and performance tracking to optimize online sales." },
          { title: "Software & Web Development", description: "High-performance, responsive websites and web applications built to scale." },
          { title: "Secure Digital Payments", description: "Frictionless, multi-gateway payment processing with robust data security." },
          { title: "Order Fulfillment & Logistics", description: "Streamlined order processing and automated supply chain integration." },
          { title: "Digital Growth Strategy", description: "Targeted digital marketing and strategy to reach new audiences and grow revenue." },
        ]`;
    }
);

// 3. Delete ecommerce-digital-services
const ecommerceRegex = /\/\*.*?E-Commerce & Digital Services.*?\*\/\s*"ecommerce-digital-services": \{[\s\S]*?\},/g;
content = content.replace(ecommerceRegex, '');

// 4. Remove 'ecommerce-digital-services' from any slugs arrays
content = content.replace(/,\s*"ecommerce-digital-services"/g, '');
content = content.replace(/"ecommerce-digital-services",\s*/g, '');
content = content.replace(/"ecommerce-digital-services"/g, '');

fs.writeFileSync(file, content);
console.log('Merged successfully.');
