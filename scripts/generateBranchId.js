#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ID_FILE = path.join(process.cwd(), '.git', 'branch-ids.json');

function generateShortId() {
  const timestamp = Date.now().toString().slice(-6);
  const randomBytes = crypto.randomBytes(4);
  const random = (randomBytes.readUInt32BE(0) % 1000).toString().padStart(3, '0');
  return (timestamp + random).toString().slice(0, 6);
}

function loadExistingIds() {
  try {
    if (fs.existsSync(ID_FILE)) {
      const data = fs.readFileSync(ID_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(error);
  }
  return { ids: [], lastGenerated: null };
}

function saveIds(idsData) {
  const dir = path.dirname(ID_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(ID_FILE, JSON.stringify(idsData, null, 2));
}

function generateUniqueId() {
  const idsData = loadExistingIds();
  let id;
  let attempts = 0;

  do {
    id = generateShortId();
    attempts++;
    if (attempts > 10) {
      id = Date.now().toString().slice(-8);
      break;
    }
  } while (idsData.ids.includes(id));

  idsData.ids.push(id);
  idsData.lastGenerated = new Date().toISOString();

  if (idsData.ids.length > 1000) {
    idsData.ids = idsData.ids.slice(-500);
  }

  saveIds(idsData);
  return id;
}

if (require.main === module) {
  const id = generateUniqueId();
  console.log(`Generated Branch ID: ${id}`);
  console.log(`\nUse this ID in your branch name:`);
  console.log(`Example: feature/${id}--add-user-authentication`);
}

module.exports = { generateUniqueId };



