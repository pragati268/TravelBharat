import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/category-model.js';
dotenv.config();

const categoriesData = [
  { name: 'Heritage', slug: 'heritage', description: 'Historic sites, ancient ruins and culturally significant landmarks that showcase India\'s rich past.', icon: 'Landmark', featured: true },
  { name: 'Religious', slug: 'religious', description: 'Sacred places of worship including temples, mosques, churches, gurdwaras and monasteries.', icon: 'Church', featured: true },
  { name: 'Nature', slug: 'nature', description: 'Scenic natural landscapes, valleys, forests and biodiversity hotspots.', icon: 'Leaf', featured: true },
  { name: 'Adventure', slug: 'adventure', description: 'Thrilling experiences like trekking, river rafting, paragliding, skiing and mountaineering.', icon: 'Tent', featured: false },
  { name: 'Wildlife', slug: 'wildlife', description: 'National parks, wildlife sanctuaries and animal reserves for spotting endangered species.', icon: 'PawPrint', featured: true },
  { name: 'Beaches', slug: 'beaches', description: 'Pristine coastal stretches, sandy shores and seaside getaways along India\'s coastline.', icon: 'Waves', featured: true },
  { name: 'Hill Stations', slug: 'hill-stations', description: 'Mountain retreats offering cool climates, panoramic views and serene landscapes.', icon: 'Snow', featured: true },
  { name: 'Museums', slug: 'museums', description: 'Institutions preserving art, history, culture and scientific artifacts for public education.', icon: 'Building2', featured: false },
  { name: 'Forts', slug: 'forts', description: 'Historic fortifications, palaces and military strongholds reflecting India\'s royal legacy.', icon: 'Castle', featured: false },
  { name: 'National Parks', slug: 'national-parks', description: 'Protected areas dedicated to conserving India\'s rich biodiversity and natural ecosystems.', icon: 'Trees', featured: true },
  { name: 'Waterfalls', slug: 'waterfalls', description: 'Majestic cascades and plunging waterfalls surrounded by lush greenery.', icon: 'Droplet', featured: false },
  { name: 'Lakes', slug: 'lakes', description: 'Serene water bodies offering boating, scenic views and peaceful getaways.', icon: 'Sailboat', featured: false },
  { name: 'Monuments', slug: 'monuments', description: 'Iconic architectural marvels and memorials commemorating historical events and figures.', icon: 'Landmark', featured: true },
  { name: 'Temples', slug: 'temples', description: 'Ancient and modern Hindu temples showcasing exquisite architecture and spiritual traditions.', icon: 'Church', featured: true },
  { name: 'Palaces', slug: 'palaces', description: 'Opulent royal residences and majestic palaces that narrate tales of India\'s princely era.', icon: 'Crown', featured: false },
  { name: 'Caves', slug: 'caves', description: 'Natural and man-made cave formations featuring ancient art, sculptures and meditation halls.', icon: 'Mountain', featured: false },
  { name: 'Pilgrimage', slug: 'pilgrimage', description: 'Sacred destinations and spiritual circuits drawing devotees from across the world.', icon: 'Church', featured: true },
  { name: 'Cultural', slug: 'cultural', description: 'Destinations showcasing India\'s diverse traditions, festivals, performing arts and craftsmanship.', icon: 'Theatre', featured: false },
  { name: 'Historical', slug: 'historical', description: 'Sites of significant historical importance spanning ancient, medieval and modern eras.', icon: 'ScrollText', featured: true },
  { name: 'Gardens', slug: 'gardens', description: 'Beautifully landscaped gardens, botanical parks and green spaces for relaxation.', icon: 'Flower', featured: false },
  { name: 'Dams', slug: 'dams', description: 'Massive river engineering projects offering scenic views and recreational activities.', icon: 'Dam', featured: false },
  { name: 'Zoos', slug: 'zoos', description: 'Wildlife parks and zoological gardens housing diverse animal species for conservation and education.', icon: 'Rabbit', featured: false },
];

async function seedCategories() {
  let inserted = 0;
  let skipped = 0;
  let failed = 0;

  for (const cat of categoriesData) {
    try {
      const existing = await Category.findOne({ slug: cat.slug });
      if (existing) {
        console.log(`  ~ Category skipped (exists): ${cat.name}`);
        skipped++;
        continue;
      }
      await Category.create(cat);
      console.log(`  + Category inserted: ${cat.name}`);
      inserted++;
    } catch (err) {
      console.log(`  ! Category failed: ${cat.name} - ${err.message}`);
      failed++;
    }
  }

  return { inserted, skipped, failed };
}

export { seedCategories };

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');
    console.log('--- Seeding Categories ---');
    const result = await seedCategories();
    console.log('\n========================================');
    console.log('      CATEGORY SEEDING COMPLETE');
    console.log('========================================');
    console.log(`  Inserted: ${result.inserted}`);
    console.log(`  Skipped:  ${result.skipped}`);
    console.log(`  Failed:   ${result.failed}`);
    console.log('========================================\n');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\nSeeding error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].includes('categorySeed')) {
  main();
}
