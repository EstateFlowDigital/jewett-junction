// Careers page (jewettconstruction.com/careers) custom code, "Before </body> tag".
// Lives in the Webflow page settings, not in this app — kept here so it is
// versioned next to the endpoint it calls (src/pages/api/public/open-positions.ts).
//
// 1. Lists "Current Open Positions:" under the hero paragraph, from the roles
//    switched on in the HubSpot Careers form. Shows nothing if there are none
//    or the endpoint fails.
// 2. Pins the hero text to the top. The hero container centers the grid and the
//    grid centers its columns, so the text dropped ~125px once the HubSpot form
//    loaded and grew its column. Two classes on each selector to outrank the
//    site's own single-class rules.
(function () {
  var style = document.createElement('style');
  style.textContent =
    '.split_hero_contain.u-container{justify-content:flex-start}' +
    '.split_hero_grid.u-grid-column-2{align-items:start}' +
    '.open_positions_list{margin:0;padding-left:1.25em;list-style:disc;font-weight:700}' +
    '.open_positions_list li{margin:.25em 0}';
  document.head.appendChild(style);

  var anchor = document.querySelector('.split_hero_grid .text_content_wrap');
  if (!anchor) return;

  fetch('/jewett-junction/api/public/open-positions')
    .then(function (res) { return res.ok ? res.json() : null; })
    .then(function (data) {
      if (!data || !data.positions || !data.positions.length) return;
      var wrap = document.createElement('div');
      wrap.className = 'open_positions_wrap u-vflex-left-top u-gap-xsmall';
      var heading = document.createElement('div');
      heading.className = 'g_heading_wrap u-text-h5';
      heading.textContent = 'Current Open Positions:';
      var list = document.createElement('ul');
      list.className = 'open_positions_list';
      data.positions.forEach(function (title) {
        var item = document.createElement('li');
        item.textContent = title;
        list.appendChild(item);
      });
      wrap.appendChild(heading);
      wrap.appendChild(list);
      anchor.appendChild(wrap);
    })
    .catch(function () {});
})();
