export interface Candidate {
  id: string;
  name: string;
  region: string;
  image: string;
  images?: string[];
  age?: number;
  bio?: string;
}

export const candidatesData: Candidate[] = [
  {
    id: '1',
    name: 'Maria Santos',
    region: 'Metro Manila',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop',
    ],
    age: 24,
    bio: 'A passionate advocate for Philippine tourism and cultural preservation. Maria has been actively promoting local destinations and sustainable tourism practices in Metro Manila.',
  },
  {
    id: '2',
    name: 'Isabella Cruz',
    region: 'Cebu',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop',
    ],
    age: 23,
    bio: 'From the Queen City of the South, Isabella is dedicated to showcasing Cebu\'s rich heritage and beautiful beaches to the world.',
  },
  {
    id: '3',
    name: 'Sofia Reyes',
    region: 'Davao',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop',
    ],
    age: 25,
    bio: 'Sofia represents the vibrant city of Davao, promoting eco-tourism and the region\'s diverse natural attractions.',
  },
  {
    id: '4',
    name: 'Gabriela Torres',
    region: 'Iloilo',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop',
    ],
    age: 22,
    bio: 'Gabriela is a proud Ilongga showcasing the warmth and hospitality that Iloilo is known for.',
  },
  {
    id: '5',
    name: 'Elena Morales',
    region: 'Baguio',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop',
    ],
    age: 24,
    bio: 'Representing the Summer Capital of the Philippines, Elena promotes Baguio\'s cool climate and scenic mountain views.',
  },
  {
    id: '6',
    name: 'Carmen Dela Cruz',
    region: 'Pampanga',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    ],
    age: 26,
    bio: 'Carmen is passionate about sharing Pampanga\'s culinary heritage and historical landmarks with visitors.',
  },
  {
    id: '7',
    name: 'Victoria Garcia',
    region: 'Palawan',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=800&fit=crop',
    ],
    age: 23,
    bio: 'Victoria advocates for Palawan\'s pristine beaches and marine biodiversity conservation efforts.',
  },
  {
    id: '8',
    name: 'Angelica Ramos',
    region: 'Batangas',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
    ],
    age: 25,
    bio: 'Angelica promotes Batangas\' beautiful diving spots and rich coffee culture to both local and international tourists.',
  },
  {
    id: '9',
    name: 'Daniela Martinez',
    region: 'Laguna',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
    ],
    age: 22,
    bio: 'Daniela showcases Laguna\'s hot springs, historical sites, and artistic heritage to promote local tourism.',
  },
];
