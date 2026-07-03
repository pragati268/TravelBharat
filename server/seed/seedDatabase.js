import mongoose from 'mongoose';
import dotenv from 'dotenv';
import State from '../models/state-model.js';
import City from '../models/city-model.js';
import { allStates } from './stateSeed.js';
import { citiesByState } from './citySeed.js';

dotenv.config();

async function seedStates() {
  let inserted = 0;
  for (const stateData of allStates) {
    const existing = await State.findOne({ slug: stateData.slug });
    if (!existing) {
      await State.create(stateData);
      console.log(`  + State inserted: ${stateData.name}`);
      inserted++;
    } else {
      console.log(`  ~ State skipped (exists): ${stateData.name}`);
    }
  }
  return inserted;
}

async function seedCities() {
  let inserted = 0;
  for (const [stateSlug, cities] of Object.entries(citiesByState)) {
    const state = await State.findOne({ slug: stateSlug });
    if (!state) {
      console.log(`  ! State not found for slug: ${stateSlug} — skipping its cities`);
      continue;
    }
    for (const cityData of cities) {
      const existing = await City.findOne({ slug: cityData.slug });
      if (!existing) {
        await City.create({ ...cityData, state: state._id });
        console.log(`  + City inserted: ${cityData.name} (${state.name})`);
        inserted++;
      } else {
        console.log(`  ~ City skipped (exists): ${cityData.name}`);
      }
    }
  }
  return inserted;
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    console.log('--- Seeding States ---');
    const statesInserted = await seedStates();

    console.log('\n--- Seeding Cities ---');
    const citiesInserted = await seedCities();

    const stateCount = await State.countDocuments();
    const cityCount = await City.countDocuments();

    console.log('\n========================================');
    console.log('         SEEDING COMPLETE');
    console.log('========================================');
    console.log(`  New states added:    ${statesInserted}`);
    console.log(`  Total states in DB:  ${stateCount}`);
    console.log(`  New cities added:    ${citiesInserted}`);
    console.log(`  Total cities in DB:  ${cityCount}`);
    console.log('========================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\nSeeding error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

main();
