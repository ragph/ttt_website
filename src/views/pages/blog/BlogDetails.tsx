import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// This would typically come from an API or database
const articles = [
  {
    id: "10-essential-travel-tips-for-first-time-backpackers",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200",
    title: "10 Essential Travel Tips for First-Time Backpackers",
    excerpt:
      "Planning your first backpacking adventure? Learn the essential tips that will make your journey smooth and memorable.",
    category: "Travel Tips",
    date: "Nov 20, 2024",
    author: "Sarah Johnson",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    readTime: "8 min read",
    content: `
      <p>Embarking on your first backpacking adventure is an exciting milestone. Whether you're exploring Southeast Asia, trekking through Europe, or discovering hidden gems in South America, proper preparation can make all the difference between a stressful trip and an unforgettable experience.</p>

      <h2>1. Pack Light, Pack Right</h2>
      <p>The golden rule of backpacking is to pack only what you need. A heavy backpack will slow you down and drain your energy. Aim for a pack that weighs no more than 20% of your body weight. Roll your clothes instead of folding them to save space, and choose versatile items that can be mixed and matched.</p>

      <h2>2. Research Your Destinations</h2>
      <p>While spontaneity is part of the adventure, having a general understanding of your destinations will help you make the most of your time. Research local customs, transportation options, and must-see attractions. Know the visa requirements and any health precautions you should take.</p>

      <h2>3. Budget Wisely</h2>
      <p>Create a realistic daily budget and stick to it. Factor in accommodation, food, transportation, activities, and a buffer for emergencies. Use apps to track your spending and look for ways to save, such as cooking your own meals or staying in hostels.</p>

      <h2>4. Stay Connected</h2>
      <p>Keep your loved ones informed about your whereabouts. Share your itinerary with family or friends, and check in regularly. Consider getting a local SIM card or an international data plan to stay connected.</p>

      <h2>5. Embrace the Local Culture</h2>
      <p>One of the best parts of backpacking is immersing yourself in different cultures. Learn a few phrases in the local language, try traditional foods, and respect local customs and traditions. This will enrich your experience and help you connect with locals.</p>

      <h2>6. Stay Safe</h2>
      <p>Always prioritize your safety. Keep copies of important documents, be aware of your surroundings, and trust your instincts. Avoid walking alone at night in unfamiliar areas and keep your valuables secure.</p>

      <h2>7. Be Flexible</h2>
      <p>Things don't always go as planned when traveling. Flights get delayed, weather changes, and sometimes the best experiences come from unexpected detours. Embrace flexibility and see challenges as part of the adventure.</p>

      <h2>8. Meet Fellow Travelers</h2>
      <p>Staying in hostels, joining group tours, or using travel apps can help you meet like-minded travelers. Some of the best memories come from the people you meet along the way.</p>

      <h2>9. Take Care of Your Health</h2>
      <p>Don't neglect your health while on the road. Stay hydrated, get enough sleep, and be mindful of what you eat. Pack a basic first-aid kit and any medications you might need.</p>

      <h2>10. Document Your Journey</h2>
      <p>Whether through photos, journaling, or video, capture your experiences. These memories will be priceless when you look back on your adventure years from now.</p>

      <p>Remember, backpacking is about the journey, not just the destination. Embrace every moment, learn from every experience, and most importantly, enjoy the adventure!</p>
    `,
  },
  {
    id: "how-to-maximize-your-et-credits-while-traveling",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200",
    title: "How to Maximize Your ET Credits While Traveling",
    excerpt:
      "Discover proven strategies to earn more ET credits on your trips and turn your travels into substantial rewards.",
    category: "Rewards",
    date: "Nov 18, 2024",
    author: "Michael Chen",
    authorAvatar: "https://i.pravatar.cc/150?img=7",
    readTime: "6 min read",
    content: `
      <p>ET credits are a fantastic way to make your travel experiences even more rewarding. With the right strategies, you can maximize your earnings and unlock exclusive benefits that enhance your journeys.</p>

      <h2>Understanding ET Credits</h2>
      <p>ET credits are earned through various activities on our platform, including booking flights, hotels, and travel packages. The more you book, the more you earn. These credits can be redeemed for discounts on future bookings, exclusive deals, and partner offers.</p>

      <h2>Book Through the Platform</h2>
      <p>The simplest way to earn ET credits is to make all your travel bookings through our platform. Each booking earns you a percentage of credits based on the total value. Premium members earn even higher rates.</p>

      <h2>Take Advantage of Promotions</h2>
      <p>Keep an eye out for special promotions that offer bonus credits. These often coincide with holidays, special events, or partnership deals. Subscribe to our newsletter to stay informed about these opportunities.</p>

      <h2>Refer Friends and Family</h2>
      <p>Our referral program rewards you for spreading the word. When someone you refer makes their first booking, both of you earn bonus credits. It's a win-win situation!</p>

      <h2>Upgrade Your Membership Tier</h2>
      <p>Higher membership tiers earn more credits per booking. Consider upgrading to Affiliate or Victors status to maximize your earning potential and access exclusive benefits.</p>

      <p>Start implementing these strategies today and watch your ET credits grow with every adventure!</p>
    `,
  },
  {
    id: "hidden-gems-5-underrated-destinations-in-southeast-asia",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200",
    title: "Hidden Gems: 5 Underrated Destinations in Southeast Asia",
    excerpt:
      "Explore breathtaking destinations that most tourists miss. These hidden gems offer authentic experiences.",
    category: "Destinations",
    date: "Nov 15, 2024",
    author: "Emma Davis",
    authorAvatar: "https://i.pravatar.cc/150?img=9",
    readTime: "7 min read",
    content: `
      <p>Southeast Asia is home to countless stunning destinations, but many travelers stick to the well-worn tourist trail. If you're looking for authentic experiences away from the crowds, these hidden gems deserve a spot on your itinerary.</p>

      <h2>1. Kep, Cambodia</h2>
      <p>Once a French colonial retreat, Kep offers a peaceful alternative to the busier Sihanoukville. Famous for its fresh crab market, relaxed atmosphere, and nearby Rabbit Island, it's perfect for travelers seeking tranquility.</p>

      <h2>2. Phong Nha, Vietnam</h2>
      <p>Home to some of the world's largest caves, including Son Doong, Phong Nha is a paradise for adventure seekers. The stunning karst landscapes and underground rivers make it a truly unique destination.</p>

      <h2>3. Kampot, Cambodia</h2>
      <p>Known for its famous pepper plantations and charming riverside setting, Kampot offers a glimpse into a slower pace of life. Explore French colonial architecture, take a sunset river cruise, or visit nearby Bokor Hill Station.</p>

      <h2>4. Hsipaw, Myanmar</h2>
      <p>This small town in Shan State is a gateway to trekking adventures through hill tribe villages. The scenic train ride from Mandalay, crossing the famous Gokteik Viaduct, is an experience in itself.</p>

      <h2>5. Nusa Penida, Indonesia</h2>
      <p>While Bali draws millions of visitors, its neighbor Nusa Penida remains relatively untouched. Dramatic cliffs, pristine beaches, and excellent diving opportunities await those who make the short ferry crossing.</p>

      <p>These destinations offer the authentic Southeast Asian experience that many travelers seek but few find. Add them to your bucket list and discover the region's best-kept secrets!</p>
    `,
  },
  {
    id: "the-complete-guide-to-budget-travel-in-europe",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200",
    title: "The Complete Guide to Budget Travel in Europe",
    excerpt:
      "Travel Europe without breaking the bank. Our comprehensive guide covers accommodation, transportation, and dining tips.",
    category: "Guide",
    date: "Nov 12, 2024",
    author: "David Wilson",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    readTime: "10 min read",
    content: `
      <p>Europe doesn't have to be expensive. With smart planning and insider knowledge, you can explore the continent's rich history, diverse cultures, and stunning landscapes without draining your savings.</p>

      <h2>Transportation</h2>
      <p>Budget airlines like Ryanair and EasyJet offer incredibly cheap flights if you book in advance and travel light. For longer distances, consider overnight trains or buses to save on accommodation. Eurail passes can be economical for extensive train travel.</p>

      <h2>Accommodation</h2>
      <p>Hostels remain the budget traveler's best friend, with many offering private rooms as well as dorms. Platforms like Couchsurfing provide free stays with locals, while house-sitting can offer luxury accommodation at no cost.</p>

      <h2>Food and Dining</h2>
      <p>Shop at local markets and supermarkets to prepare your own meals. Many hostels have kitchens you can use. When eating out, look for lunch specials and avoid tourist areas. Street food is often both cheap and delicious.</p>

      <h2>Free Activities</h2>
      <p>Many museums offer free admission on certain days. Walking tours on a tip basis let you explore cities with local guides. Parks, beaches, and historic neighborhoods cost nothing to enjoy.</p>

      <h2>Shoulder Season Travel</h2>
      <p>Traveling in spring or fall means lower prices and fewer crowds. You'll still enjoy pleasant weather while saving significantly on flights and accommodation.</p>

      <p>With these strategies, a European adventure is within reach for any budget. Start planning your trip today!</p>
    `,
  },
  {
    id: "beach-paradise-top-10-coastal-destinations",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    title: "Beach Paradise: Top 10 Coastal Destinations",
    excerpt:
      "From pristine white sands to crystal-clear waters, discover the world's most stunning beach destinations.",
    category: "Destinations",
    date: "Nov 10, 2024",
    author: "Lisa Park",
    authorAvatar: "https://i.pravatar.cc/150?img=16",
    readTime: "8 min read",
    content: `
      <p>There's something magical about the ocean. The sound of waves, the feel of sand between your toes, and the endless horizon create an unmatched sense of peace and adventure. Here are ten coastal destinations that belong on every beach lover's bucket list.</p>

      <h2>1. Maldives</h2>
      <p>Crystal-clear lagoons, overwater bungalows, and some of the world's best diving make the Maldives the ultimate tropical paradise.</p>

      <h2>2. Palawan, Philippines</h2>
      <p>Consistently voted among the world's best islands, Palawan offers dramatic limestone cliffs, hidden lagoons, and pristine beaches.</p>

      <h2>3. Seychelles</h2>
      <p>Unique granite boulder formations, powder-soft sand, and lush jungle make these African islands truly distinctive.</p>

      <h2>4. Bora Bora, French Polynesia</h2>
      <p>The iconic Mount Otemanu backdrop and turquoise lagoon create picture-perfect scenery at every turn.</p>

      <h2>5. Zanzibar, Tanzania</h2>
      <p>White sand beaches meet rich Swahili culture on this East African island paradise.</p>

      <p>Whether you seek adventure, relaxation, or romance, these coastal destinations offer unforgettable experiences for every type of traveler.</p>
    `,
  },
  {
    id: "adventure-travel-thrilling-experiences-await",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200",
    title: "Adventure Travel: Thrilling Experiences Await",
    excerpt:
      "Push your limits with these adrenaline-pumping adventures around the globe. From bungee jumping to skydiving.",
    category: "Adventure",
    date: "Nov 8, 2024",
    author: "Jake Thompson",
    authorAvatar: "https://i.pravatar.cc/150?img=18",
    readTime: "7 min read",
    content: `
      <p>For those who crave excitement and live for the rush of adrenaline, adventure travel offers experiences that create lifelong memories. Here are some of the world's most thrilling activities and where to experience them.</p>

      <h2>Bungee Jumping in New Zealand</h2>
      <p>The birthplace of commercial bungee jumping, Queenstown offers multiple jump sites with stunning scenery. The Nevis Bungy, at 134 meters, is one of the highest in the world.</p>

      <h2>Skydiving in Dubai</h2>
      <p>Jump over the iconic Palm Jumeirah for views of the world's most impressive skyline as you freefall at 120 mph.</p>

      <h2>White Water Rafting in Costa Rica</h2>
      <p>The Pacuare River offers Class III and IV rapids through pristine rainforest, combining adventure with incredible natural beauty.</p>

      <h2>Safari in Tanzania</h2>
      <p>Witness the Great Migration in the Serengeti, where millions of wildebeest and zebras cross crocodile-infested rivers in one of nature's most spectacular events.</p>

      <p>Adventure awaits around every corner. Which experience will you tackle first?</p>
    `,
  },
  {
    id: "road-trip-essentials-everything-you-need-to-know",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200",
    title: "Road Trip Essentials: Everything You Need to Know",
    excerpt:
      "Hit the open road with confidence. Our comprehensive guide covers planning, packing, and staying safe on your journey.",
    category: "Guide",
    date: "Nov 5, 2024",
    author: "Anna Martinez",
    authorAvatar: "https://i.pravatar.cc/150?img=20",
    readTime: "9 min read",
    content: `
      <p>There's nothing quite like the freedom of a road trip. The open highway, ever-changing landscapes, and the ability to stop wherever catches your eye make road trips one of the most rewarding ways to travel.</p>

      <h2>Planning Your Route</h2>
      <p>While spontaneity is part of the fun, having a general route planned helps with booking accommodations and estimating fuel costs. Use apps like Google Maps or Roadtrippers to discover interesting stops along the way.</p>

      <h2>Vehicle Preparation</h2>
      <p>Before setting off, ensure your vehicle is road-ready. Check tire pressure, oil levels, brakes, and lights. Pack an emergency kit including jumper cables, a flashlight, and basic tools.</p>

      <h2>Packing Smart</h2>
      <p>Pack layers for varying weather, comfortable driving shoes, and entertainment for passengers. Don't forget snacks, water, and a cooler for longer stretches between stops.</p>

      <h2>Staying Safe</h2>
      <p>Take regular breaks to stay alert. Share your itinerary with someone at home. Keep valuables out of sight when parked, and always lock your vehicle.</p>

      <p>With proper preparation, your road trip will be an adventure to remember. Happy travels!</p>
    `,
  },
  {
    id: "solo-travel-a-journey-of-self-discovery",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200",
    title: "Solo Travel: A Journey of Self-Discovery",
    excerpt:
      "Embrace the freedom of traveling alone. Tips for staying safe, meeting people, and making the most of your solo adventure.",
    category: "Travel Tips",
    date: "Nov 3, 2024",
    author: "Chris Anderson",
    authorAvatar: "https://i.pravatar.cc/150?img=22",
    readTime: "8 min read",
    content: `
      <p>Solo travel is one of the most transformative experiences you can have. It pushes you out of your comfort zone, builds confidence, and offers unparalleled freedom to explore at your own pace.</p>

      <h2>Why Travel Solo?</h2>
      <p>When you travel alone, every decision is yours. Want to spend three hours in a museum? Go ahead. Feel like changing your plans last minute? No problem. This freedom leads to authentic self-discovery.</p>

      <h2>Safety First</h2>
      <p>Research your destinations thoroughly. Stay in well-reviewed accommodations, keep copies of important documents, and always let someone know your plans. Trust your instincts – if something feels wrong, it probably is.</p>

      <h2>Meeting People</h2>
      <p>Solo travel doesn't mean lonely travel. Stay in hostels, join group tours, or use apps designed for travelers to meet like-minded people. Some of your best travel memories will come from unexpected friendships.</p>

      <h2>Embrace the Experience</h2>
      <p>There will be challenging moments – getting lost, feeling lonely, or facing language barriers. Embrace these challenges as part of the journey. They're often the experiences that shape you most.</p>

      <p>Solo travel isn't just about seeing new places – it's about discovering yourself along the way.</p>
    `,
  },
  {
    id: "mountain-retreats-best-alpine-destinations",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
    title: "Mountain Retreats: Best Alpine Destinations",
    excerpt:
      "Escape to the mountains for breathtaking views and fresh air. Discover the world's most stunning alpine retreats.",
    category: "Destinations",
    date: "Nov 1, 2024",
    author: "Emily Brown",
    authorAvatar: "https://i.pravatar.cc/150?img=24",
    readTime: "7 min read",
    content: `
      <p>Mountains have always held a special allure for travelers. Whether you seek adventure on the slopes, tranquility in alpine meadows, or simply breathtaking views, these mountain destinations deliver unforgettable experiences.</p>

      <h2>Swiss Alps, Switzerland</h2>
      <p>The quintessential alpine destination offers world-class skiing, charming villages, and some of Europe's most dramatic peaks, including the iconic Matterhorn.</p>

      <h2>Canadian Rockies</h2>
      <p>Banff and Jasper National Parks showcase pristine wilderness, turquoise lakes, and abundant wildlife in one of North America's most spectacular mountain ranges.</p>

      <h2>Patagonia, Argentina/Chile</h2>
      <p>The end of the world offers otherworldly landscapes, from the towers of Torres del Paine to the glaciers of Los Glaciares National Park.</p>

      <h2>Himalayas, Nepal</h2>
      <p>Home to the world's highest peaks, Nepal offers trekking experiences ranging from accessible day hikes to the ultimate challenge: Everest Base Camp.</p>

      <p>Whether you're an avid mountaineer or simply appreciate nature's grandeur, these destinations will leave you awestruck.</p>
    `,
  },
  {
    id: "cultural-immersion-travel-like-a-local",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200",
    title: "Cultural Immersion: Travel Like a Local",
    excerpt:
      "Go beyond tourist spots and experience authentic local culture. Learn how to connect with communities worldwide.",
    category: "Travel Tips",
    date: "Oct 28, 2024",
    author: "Marcus Lee",
    authorAvatar: "https://i.pravatar.cc/150?img=26",
    readTime: "6 min read",
    content: `
      <p>The best travel experiences often come from stepping off the beaten path and immersing yourself in local culture. Here's how to travel more authentically and create meaningful connections wherever you go.</p>

      <h2>Learn the Language</h2>
      <p>Even a few basic phrases show respect and open doors. Locals appreciate the effort, and you'll access experiences unavailable to those who don't try.</p>

      <h2>Stay in Local Neighborhoods</h2>
      <p>Skip the tourist districts and stay where locals live. You'll discover authentic restaurants, neighborhood markets, and daily life that most travelers miss.</p>

      <h2>Eat Where Locals Eat</h2>
      <p>The best food is rarely in tourist areas. Follow the crowds of locals, ask for recommendations, and don't be afraid to try unfamiliar dishes.</p>

      <h2>Participate in Local Activities</h2>
      <p>Take a cooking class, join a community event, or volunteer with a local organization. These experiences create lasting memories and meaningful connections.</p>

      <h2>Respect Local Customs</h2>
      <p>Research cultural norms before you visit. Understanding local etiquette shows respect and helps you navigate social situations gracefully.</p>

      <p>Travel is at its best when it connects us with people and cultures different from our own. Embrace the unfamiliar and let it change you.</p>
    `,
  },
];

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const article = articles.find((a) => a.id === slug);

  if (!article) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">Article not found</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 350, md: 450 },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={article.image}
          alt={article.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            py: 3,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              color: "white",
              alignSelf: "flex-start",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Back to Home
          </Button>
          <Box>
            <Chip
              label={article.category}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                fontWeight: 600,
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                lineHeight: 1.2,
              }}
            >
              {article.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={article.authorAvatar}
                  sx={{ width: 40, height: 40 }}
                >
                  <PersonIcon />
                </Avatar>
                <Typography sx={{ color: "white", fontWeight: 500 }}>
                  {article.author}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarTodayIcon sx={{ color: "white", fontSize: 18 }} />
                <Typography sx={{ color: "white" }}>{article.date}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <AccessTimeIcon sx={{ color: "white", fontSize: 18 }} />
                <Typography sx={{ color: "white" }}>{article.readTime}</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              fontSize: "1rem",
              lineHeight: 1.8,
              mb: 4,
              fontStyle: "italic",
            }}
          >
            {article.excerpt}
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Box
            sx={{
              "& h2": {
                fontSize: "1.2rem",
                fontWeight: 600,
                mt: 4,
                mb: 2,
                color: "text.primary",
              },
              "& p": {
                fontSize: "1rem",
                lineHeight: 1.8,
                mb: 2,
                color: "text.secondary",
              },
            }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </Paper>

        {/* Back Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              borderRadius: 999,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back to All Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetails;
