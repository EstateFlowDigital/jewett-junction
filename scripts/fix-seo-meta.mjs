const API_TOKEN = process.env.WEBFLOW_API_TOKEN;
const COLLECTION_ID = '67a464bc7184fcb8aacb0ef9';
const BASE_URL = 'https://api.webflow.com/v2';

if (!API_TOKEN) {
  console.error('WEBFLOW_API_TOKEN not set');
  process.exit(1);
}

// Each entry is a SEO rewrite built from the item's actual card_short content.
// Only items with wrong or missing title/meta are included. Correct items are skipped.
const fixes = [
  { id: '69c1ab8f7a9bfe5f93302e5f', name: 'Long Cadillac',
    title: 'Long Cadillac | Jewett Construction',
    meta: 'Long Cadillac dealership project in Southborough, MA, delivered by Jewett Construction.' },

  { id: '67b7bd85c1cb22b4c069e7ae', name: 'Volkswagen of Rochester',
    meta: 'Volkswagen of Rochester completed a fast-tracked 12,000 SF dealership renovation in Rochester, NH, modernizing both the showroom and service center.' },

  { id: '67b7bd84bb4bc5162893d58d', name: 'WoofMeow',
    meta: 'WoofMeow in Dover, NH, completed a large-scale retail space overhaul with facade upgrades, modernized infrastructure, and enhanced pet care amenities.' },

  { id: '67b7bd84f681a98dff8dc479', name: 'US Foods',
    meta: 'US Foods transformed a 65,000 SF facility in Seabrook, NH, into a state-of-the-art freezer warehouse with new offices, kitchens, and fueling stations.' },

  { id: '67b7bd848e7de3ec780181e5', name: 'Route 44 Toyota-Scion',
    meta: 'Route 44 Toyota-Scion in Raynham, MA, completed a 1,000 SF dealership renovation featuring a modernized customer lounge and new Toyota portal.' },

  { id: '67b7bd83dcbf6b2c8b5eb6d9', name: 'Upper Valley Honda',
    meta: 'Upper Valley Honda in White River Junction, VT, is a 34,690 SF energy-efficient dealership with 23 service bays and solar power integration.' },

  { id: '67b7bd836cda8c3167fbe1cb', name: 'Tulley Buick-GMC',
    meta: 'Tulley Buick-GMC in Nashua, NH, received interior and exterior showroom renovations complying with the latest GMC corporate branding standards.' },

  { id: '67b7bd83a07048fd373cd980', name: 'Stoneham Ford',
    meta: 'Stoneham Ford completed a 6,200 SF multi-phase dealership renovation with expanded customer service areas and modernized showroom aesthetics.' },

  { id: '67b7bd838953e3f92b24898d', name: 'The One Hundred Club',
    meta: 'The One Hundred Club in Portsmouth, NH, underwent a luxury 2,800 SF renovation featuring custom finishes, a wine display, and a private event space.' },

  { id: '67b7bd825b8fa1e37901544e', name: 'SIG SAUER Corporate Offices',
    meta: 'SIG SAUER Corporate Offices in Newington, NH, underwent a 57,000 SF renovation with new executive offices, a showroom, and modernized production areas.' },

  { id: '67b7bd8249d06a2f2804bf4b', name: 'Rockingham Toyota-Scion',
    meta: 'Rockingham Toyota-Scion in Salem, NH, features a 33,000 SF showroom and service area, incorporating the latest Toyota corporate design elements.' },

  { id: '67b7bd827421e2cef948be6b', name: 'Rockingham Honda',
    meta: 'Rockingham Honda in Salem, NH, is a 26,000 SF eco-friendly dealership featuring rain gardens, high-speed service bays, and a modern showroom.' },

  { id: '67b7bd82c8884acc8423b461', name: "Ricetta's Brick Oven Ristorante",
    meta: "Ricetta's Brick Oven Ristorante in Saco, ME, completed a 7,245 SF transformation featuring custom brick ovens and an enhanced dining experience." },

  { id: '67b7bd828e7de3ec78017fff', name: 'LAARS Office Expansion',
    title: 'LAARS Office Expansion - Optimized Work & Research Space',
    meta: 'LAARS Office Expansion in Rochester, NH, added 25,330 SF of R&D labs, clean rooms, and ergonomic office spaces for optimized research and operations.' },

  { id: '67b7bd8239aced918fbec1b6', name: "Reynolds' Subaru",
    meta: "Reynolds' Subaru in Old Lyme, CT, integrates modern energy-efficient design with New England charm in a sustainable waterfront dealership." },

  { id: '67b7bd82a018a8c53867f907', name: 'Portland Stoneware',
    meta: 'Portland Stoneware in Dracut, MA, expanded its 15,000 SF production facility, supporting 170 years of quality manufacturing and craftsmanship.' },

  { id: '67b7bd81ce55b1bf142bd444', name: 'NineZero Washington',
    meta: 'NineZero Washington in Salem, MA, is a 24,000 SF historic office building restoration with a two-story addition and full facade renovation.' },

  { id: '67b7bd8131fcb48dfc137c9a', name: 'McFarland Ford',
    meta: 'McFarland Ford in Exeter, NH, added a 1,200 SF showroom and 19,700 SF service department expansion with daylight harvesting and energy-efficient design.' },

  { id: '67b7bd81ea31714312dcc548', name: 'NH Motor Speedway',
    meta: 'NH Motor Speedway in Loudon, NH, built a 9,600 SF support facility housing track operations, vehicle storage, wash bays, and a parts showroom.' },

  { id: '67b7bd81c1cb22b4c069e205', name: 'Monarch School of New England',
    meta: 'Monarch School of New England in Rochester, NH, features custom education and vocational training spaces with a full gym and therapy rooms.' },

  { id: '67b7bd81e217f0f3e46dd45d', name: 'Lowell Five Bank',
    meta: "Lowell Five Bank's 3,150 SF ground-up branch in North Andover, MA, features high-end architectural finishes and a snow-melt walkway system." },

  { id: '67b7bd806e15b707f3e8ccf5', name: 'Lexus of Northborough',
    meta: 'Lexus of Northborough underwent a 15,268 SF showroom and service center renovation featuring the new Lexus Blade Wall exterior and modernized interior.' },

  { id: '67b7bd806e15b707f3e8ccb9', name: 'LAARS Warehouse',
    meta: 'LAARS Warehouse in Rochester, NH, adds 35,000 SF of efficient storage and manufacturing space with high-performance mechanical and electrical systems.' },

  { id: '67b7bd80bb4bc5162893d215', name: 'Jaffarian Toyota',
    meta: 'Jaffarian Toyota in Haverhill, MA, completed an extensive exterior renovation aligning with the latest Toyota corporate branding updates.' },

  { id: '67b7bd7f2202819e522610a0', name: 'Herb Chambers Ford',
    meta: 'Herb Chambers Ford in Braintree, MA, completed a 31,800 SF multi-phase renovation including showroom, service area, and exterior upgrades.' },

  { id: '67b7bd7fea31714312dcc426', name: 'Herb Chambers Bentley Boston',
    meta: "Herb Chambers Bentley Boston in Wayland, MA, received a luxury showroom renovation aligning with Bentley's latest corporate image and high-end finishes." },

  { id: '67b7bd7f5ab2d4489199da7a', name: 'Hannaford Supermarket',
    meta: 'Hannaford Supermarket in Waterboro, ME, completed a 45,000 SF full renovation with department relocations, site upgrades, and modernized interiors.' },

  { id: '67b7bd7fea31714312dcc3e2', name: 'Haigh-Farr',
    meta: "Haigh-Farr in Bedford, NH, expanded its high-tech aerospace manufacturing and office space, boosting efficiency for world-renowned antenna production." },

  { id: '67b7bd7f6cda8c3167fbae99', name: 'Grappone Toyota',
    meta: "Grappone Toyota's 77,000 SF renovation in Bow, NH, transformed the dealership into an energy-efficient, high-performance facility with an expanded service center." },

  { id: '67b7bd7ea07048fd373cd672', name: 'Granite State Indoor Range and Gun Shop',
    meta: 'Granite State Indoor Range in Hudson, NH, completed a 12,960 SF firearms training facility and retail store with custom ventilation and advanced shooting lanes.' },

  { id: '67b7bd7ef51f4b0b8a89f5a6', name: 'Gengras CDJR',
    title: 'Gengras CDJR - Complete Dealership Renovation',
    meta: 'Gengras CDJR in East Hartford, CT, completed a 17,000 SF renovation of a fully occupied dealership showroom, service area, and customer lounge.' },

  { id: '67b7bd7edcbf6b2c8b5eb10f', name: 'FedEx Ground Facility',
    meta: 'FedEx Ground Facility in Saco, ME, added 84,500 SF of warehouse space and seven loading docks while maintaining active operations.' },

  { id: '67b7bd7e915ae86730df8b3e', name: 'Exeter YMCA',
    meta: 'Exeter YMCA in Exeter, NH, is a 33,000 SF energy-efficient community wellness center featuring an indoor track, gym, and modern amenities.' },

  { id: '67b7bd7ece55b1bf142bc97f', name: 'Exeter Subaru',
    meta: 'Exeter Subaru in Stratham, NH, completed a 17,500 SF energy-efficient renovation and expansion, doubling its showroom and service capabilities.' },

  { id: '67b7bd7e915ae86730df8afb', name: 'Confidential Cannabis Facility (Holyoke, MA)',
    meta: 'Confidential Cannabis Facility in Holyoke, MA, is a 27,000 SF high-tech cultivation, processing, and retail space with advanced security systems.' },

  { id: '67b7bd7e8e7de3ec78017de5', name: "Darling's Hyundai Chrysler",
    meta: "Darling's Hyundai Chrysler in Augusta, ME, is a 32,578 SF hybrid metal building combining Hyundai and Chrysler brands in one energy-efficient dealership." },

  { id: '67b7bd7dc8884acc8423af9d', name: 'Camp Carpenter',
    meta: 'Camp Carpenter in Manchester, NH, completed a 21,000 SF dining hall and facilities upgrade for the Boy Scouts, overcoming unique design and site challenges.' },

  { id: '67b7bd7d5c16b8a455068210', name: 'Confidential Cannabis Facility (Athol, MA)',
    meta: 'Confidential Cannabis Facility in Athol, MA, expanded into 172,999 SF of high-security cultivation, processing, and extraction spaces in a renovated mill complex.' },

  { id: '67b7bd7d2202819e52260faa', name: 'Confidential Aerospace Client',
    meta: 'Confidential Aerospace Client in Rochester, NH, constructed a specialized -20 degree composite storage freezer while maintaining full production operations.' },

  { id: '67b7bd7d8953e3f92b248637', name: 'Center for Wildlife',
    meta: 'Center for Wildlife in Cape Neddick, ME, opened a 16,000 SF medical clinic and visitor center focused on conservation and sustainable construction.' },

  { id: '67b7bd7c6052e08452eba83d', name: 'Bolles Chrysler Dodge Jeep Ram',
    meta: 'Bolles Chrysler in Ellington, CT, expanded its dealership to 16,000 SF with an updated showroom, dedicated brand areas, and quick lube lanes.' },

  { id: '67b7bd7cf51f4b0b8a89f1a9', name: 'Bill Dube Ford Toyota',
    meta: "Bill Dube Ford Toyota's 40,000 SF dealership in Dover, NH, features an expansive showroom, service center, and a customer-friendly lounge." },

  { id: '67b7bd7b6cda8c3167fba9db', name: 'AutoServ Kia',
    meta: "AutoServ Kia's 5,729 SF ground-up showroom in Tilton, NH, integrates Kia's latest branding with energy-efficient insulated glass and ACM panels." },

  { id: '67b7bd7bf51f4b0b8a89f123', name: 'AutoSaver South Burlington Mazda',
    meta: 'AutoSaver Mazda in Westminster, VT, transformed from a used car center into a modern dealership with an iconic showroom jewel box lift.' },

  { id: '67b7bd7b6052e08452eba78a', name: 'Autofair Ford',
    meta: 'Autofair Ford in Haverhill, MA, completed a 30,370 SF dealership overhaul featuring a new service drive, parts storage, and showroom modernization.' },

  { id: '67b7bd7b306ebf42e1ec5211', name: 'Autofair Subaru',
    meta: 'Autofair Subaru in Haverhill, MA, completed a 24,500 SF renovation and addition featuring a new service drive and showroom upgrades.' },

  { id: '67b7bd7bf681a98dff8db6f4', name: 'Bean Group',
    meta: "Bean Group's 8,000 SF corporate headquarters in Portsmouth, NH, features distinctive coastal-inspired design and high-end architectural finishes." },
];

async function main() {
  const items = fixes.map(f => {
    const fieldData = { 'seo-meta-description': f.meta };
    if (f.title) fieldData['seo-title-tag'] = f.title;
    return { id: f.id, fieldData };
  });

  console.log(`Updating SEO on ${items.length} items...`);
  const res = await fetch(`${BASE_URL}/collections/${COLLECTION_ID}/items`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error(`update ${res.status}: ${await res.text()}`);
  const data = await res.json();
  console.log(`Updated ${data.items?.length || 0} items`);

  const itemIds = items.map(i => i.id);
  console.log(`Publishing ${itemIds.length} items...`);
  const pub = await fetch(`${BASE_URL}/collections/${COLLECTION_ID}/items/publish`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ itemIds }),
  });
  if (!pub.ok) throw new Error(`publish ${pub.status}: ${await pub.text()}`);
  const pubData = await pub.json();
  console.log(`Published: ${pubData.publishedItemIds?.length || 0}`);
  if (pubData.errors?.length) console.log('Publish errors:', pubData.errors);
}

main().catch(e => { console.error(e); process.exit(1); });
